import type { ReactNode } from "react";

/**
 * WorkoutSilhouettes — 스크롤 진행에 따라 HYROX 8개 스테이션을 레이스 순서대로
 * 수행하는 단독 실루엣 배경 레이어. 순수 장식(aria-hidden, pointer-events 없음).
 *
 * - 모든 실루엣은 직접 그린 오리지널 픽토그램 스타일 SVG (공식 자산 미사용).
 * - rev 4: 스틱 피겨 → 필드(filled) 근육질 애슬리트 실루엣. 스켈레톤 포즈에서
 *   파라메트릭 근육 아웃라인(테이퍼드 사지·측면 토르소·주먹·발·포니테일)을 생성한다.
 *   폭 프로필 상수(ARM_W/LEG_W/TORSO_W)만 조정하면 체형이 바뀐다.
 * - 각 종목은 2개 프레임(A/B)으로 구성되며 CSS가 교차 재생해 동작을 표현한다.
 * - 씬마다 선수는 한 명이고 종목이 바뀔 때마다 성별이 교대한다 (rev 2):
 *   짝수 스테이션=남(오렌지), 홀수=여(퍼플). 러닝 브릿지는 다음 종목과 동일 성별
 *   (run-m/run-f 두 씬을 두고 globals.css가 data-station 짝홀로 선택).
 * - 활성 스테이션은 ScrollEnergy가 body[data-station] / body[data-bridge]로 지정하고,
 *   표시·전환·모션은 전부 globals.css에서 처리한다 (이 컴포넌트는 서버 컴포넌트).
 *
 * 좌표계: 뷰박스 "10 2 120 126" = 피겨 로컬 좌표 그대로, 지면 y=122, 진행 방향 +x(오른쪽).
 */

type Pt = readonly [number, number];

interface Pose {
  head: Pt;
  neck: Pt;
  hip: Pt;
  /** [팔꿈치, 손] — F는 앞(진하게), B는 뒤(흐리게) */
  armF: readonly [Pt, Pt];
  armB: readonly [Pt, Pt];
  /** [무릎, 발] */
  legF: readonly [Pt, Pt];
  legB: readonly [Pt, Pt];
}

interface FrameDef {
  pose: Pose;
  gear?: ReactNode;
}

interface SceneDef {
  id: string;
  a: FrameDef;
  b: FrameDef;
}

/* ── 벡터/경로 유틸 ─────────────────────────────────────────────── */

const sub = (a: Pt, b: Pt): Pt => [a[0] - b[0], a[1] - b[1]];
const add = (a: Pt, b: Pt): Pt => [a[0] + b[0], a[1] + b[1]];
const mul = (a: Pt, s: number): Pt => [a[0] * s, a[1] * s];
const lerpPt = (a: Pt, b: Pt, t: number): Pt => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t];
const unit = (a: Pt): Pt => {
  const l = Math.hypot(a[0], a[1]) || 1;
  return [a[0] / l, a[1] / l];
};
const perp = (a: Pt): Pt => [-a[1], a[0]];
const r1 = (n: number) => Math.round(n * 10) / 10;
const fmt = (p: Pt) => `${r1(p[0])} ${r1(p[1])}`;

/** [t, width] 키프레임을 t(0~1)에서 선형 보간 */
type WidthProfile = readonly (readonly [number, number])[];
function widthAt(profile: WidthProfile, t: number): number {
  if (t <= profile[0][0]) return profile[0][1];
  for (let i = 1; i < profile.length; i++) {
    const [t1, w1] = profile[i];
    const [t0, w0] = profile[i - 1];
    if (t <= t1) return w0 + ((w1 - w0) * (t - t0)) / (t1 - t0);
  }
  return profile[profile.length - 1][1];
}

/** 촘촘한 점열을 midpoint-Q 방식으로 부드럽게 잇는다 (시작·끝점은 정확히 통과) */
function smoothSegment(pts: Pt[]): string {
  if (pts.length < 3) return pts.map((p, i) => `${i === 0 ? "M" : "L"} ${fmt(p)}`).join(" ");
  let d = `M ${fmt(pts[0])}`;
  for (let i = 1; i < pts.length - 1; i++) {
    d += ` Q ${fmt(pts[i])} ${fmt(lerpPt(pts[i], pts[i + 1], 0.5))}`;
  }
  d += ` L ${fmt(pts[pts.length - 1])}`;
  return d;
}

/** 원을 path 서브패스로 (여러 도형을 한 <path>에 합치기 위함).
 *  sweep=0: 캡슐 아웃라인과 같은 음(-) 방향 — nonzero fill에서 겹침이 구멍이 되지 않도록. */
function circleSub(c: Pt, r: number): string {
  return ` M ${r1(c[0] + r)} ${r1(c[1])} A ${r1(r)} ${r1(r)} 0 1 0 ${r1(c[0] - r)} ${r1(c[1])} A ${r1(r)} ${r1(r)} 0 1 0 ${r1(c[0] + r)} ${r1(c[1])} Z`;
}

/**
 * 직선 세그먼트 하나의 근육 캡슐 아웃라인(닫힌 서브패스).
 * 법선이 하나뿐이라 굽힘 자기교차가 원천적으로 없다.
 * wPlus/wMinus: +법선/−법선 쪽 폭 (t=0/⅓/⅔/1) — 비대칭 근육(종아리 후면, 대퇴 전면 등).
 * capA/capB: 끝 볼록 캡 크기 계수(0 = 평평).
 */
type SegWidths = [number, number, number, number];
function segOutline(a: Pt, b: Pt, wPlus: SegWidths, wMinus: SegWidths, capA: number, capB: number): string {
  const dir = unit(sub(b, a));
  const n = perp(dir);
  const ts = [0, 1 / 3, 2 / 3, 1];
  const centers = ts.map((t) => lerpPt(a, b, t));
  const sideA = centers.map((c, i) => add(c, mul(n, wPlus[i])));
  const sideB = centers.map((c, i) => sub(c, mul(n, wMinus[i]))).reverse();
  const capW = (wPlus[3] + wMinus[3]) / 2;
  const rootW = (wPlus[0] + wMinus[0]) / 2;
  const capBCtrl = add(b, mul(dir, capW * capB));
  const capACtrl = sub(a, mul(dir, rootW * capA));
  // 주의: smoothSegment(sideB).slice(1)이 'M'만 제거하고 sideB[0] 좌표쌍을 그대로 내보내므로,
  // 여기서는 명령어(+제어점)만 붙인다 — 끝점을 중복 출력하면 SVG 문법 오류가 된다.
  const capBJoin = capB > 0 ? ` Q ${fmt(capBCtrl)}` : ` L`;
  const capAJoin = capA > 0 ? ` Q ${fmt(capACtrl)} ${fmt(sideA[0])} Z` : ` L ${fmt(sideA[0])} Z`;
  return smoothSegment(sideA) + capBJoin + smoothSegment(sideB).slice(1) + capAJoin;
}

/** 사지 한 종류의 비대칭 근육 스펙: 상/하 세그먼트 × +/− 법선 쪽 폭 4점 */
interface LimbSpec {
  upPlus: SegWidths;
  upMinus: SegWidths;
  loPlus: SegWidths;
  loMinus: SegWidths;
}

/**
 * 2세그먼트 사지(root→joint→end): 상완/대퇴 캡슐 + 하완/하퇴 캡슐 + 관절 원.
 * 서브패스 3개가 같은 색으로 겹쳐 하나의 실루엣으로 합쳐진다 (굽힘 결함 없음).
 * 세그먼트가 아래(+y)를 향할 때 +법선 = 몸 뒤쪽(후면) — 종아리/햄스트링 볼록이 뒤로 간다.
 */
function limbPath(root: Pt, joint: Pt, end: Pt, spec: LimbSpec): string {
  const jointW = (spec.upPlus[3] + spec.upMinus[3]) / 2;
  const upper = segOutline(root, joint, spec.upPlus, spec.upMinus, 1.1, 0);
  const lower = segOutline(joint, end, spec.loPlus, spec.loMinus, 0, 0.35);
  return upper + lower + circleSub(joint, jointW);
}

/** 단순 대칭 캡슐 */
function capsulePath(a: Pt, b: Pt, wA: number, wB: number): string {
  const m1 = wA + (wB - wA) / 3;
  const m2 = wA + ((wB - wA) * 2) / 3;
  const w: SegWidths = [wA, m1, m2, wB];
  return segOutline(a, b, w, w, 0.9, 0.9);
}

/* ── 체형 스펙 (비대칭 근육: 아래로 향한 세그먼트 기준 +법선 = 후면) ── */

const LEG_M: LimbSpec = {
  upPlus: [5.0, 5.6, 4.4, 3.7], // 둔근→햄스트링 (후면)
  upMinus: [5.0, 6.0, 4.7, 3.7], // 대퇴 quad (전면)
  loPlus: [3.7, 5.0, 3.6, 1.9], // 종아리 (후면 볼록)
  loMinus: [3.7, 3.3, 2.5, 1.9], // 정강이 (직선)
};
const ARM_M: LimbSpec = {
  upPlus: [4.2, 4.4, 3.4, 2.9], // 삼두
  upMinus: [4.2, 4.7, 3.5, 2.9], // 이두
  loPlus: [2.9, 3.4, 2.4, 1.7], // 신전근
  loMinus: [2.9, 3.2, 2.2, 1.7], // 굴곡근
};
const LEG_F: LimbSpec = {
  upPlus: [4.7, 5.3, 4.1, 3.4],
  upMinus: [4.7, 5.6, 4.3, 3.4],
  loPlus: [3.4, 4.6, 3.3, 1.8],
  loMinus: [3.4, 3.0, 2.3, 1.8],
};
const ARM_F: LimbSpec = {
  upPlus: [3.5, 3.7, 2.9, 2.4],
  upMinus: [3.5, 3.9, 2.9, 2.4],
  loPlus: [2.4, 2.8, 2.0, 1.5],
  loMinus: [2.4, 2.6, 1.9, 1.5],
};

/* 토르소(측면): front = 가슴 쪽, back = 등/둔근 쪽. t: 0=목 → 1=엉덩이 */
const TORSO_M = {
  front: [[0, 3.2], [0.25, 4.9], [0.6, 3.8], [1, 3.3]] as WidthProfile,
  back: [[0, 3.0], [0.25, 4.6], [0.6, 3.5], [0.92, 5.2], [1, 4.3]] as WidthProfile,
};
const TORSO_F = {
  front: [[0, 2.8], [0.3, 4.6], [0.62, 3.2], [1, 3.4]] as WidthProfile,
  back: [[0, 2.6], [0.25, 4.0], [0.6, 3.1], [0.9, 5.5], [1, 4.5]] as WidthProfile,
};

/** 측면 토르소: 가슴·복부·둔근 윤곽의 닫힌 path */
function torsoPath(neck: Pt, hip: Pt, female?: boolean): string {
  const prof = female ? TORSO_F : TORSO_M;
  const axis = unit(sub(hip, neck));
  let front = perp(axis);
  if (front[0] < 0) front = mul(front, -1); // 항상 +x(진행 방향)가 가슴
  const STEPS = 6;
  const fPts: Pt[] = [];
  const bPts: Pt[] = [];
  for (let i = 0; i <= STEPS; i++) {
    const t = i / STEPS;
    const c = lerpPt(neck, hip, t);
    fPts.push(add(c, mul(front, widthAt(prof.front, t))));
    bPts.push(sub(c, mul(front, widthAt(prof.back, t))));
  }
  bPts.reverse();
  const crotchCtrl = add(hip, mul(axis, 3.4));
  const neckCtrl = sub(neck, mul(axis, 2.2));
  // smoothSegment(bPts).slice(1)이 bPts[0] 좌표쌍을 내보내므로 제어점까지만 붙인다 (문법 오류 방지)
  return (
    smoothSegment(fPts) +
    ` Q ${fmt(crotchCtrl)}` +
    smoothSegment(bPts).slice(1) +
    ` Q ${fmt(neckCtrl)} ${fmt(fPts[0])} Z`
  );
}

/** 발 = 운동화 형태 (힐컵·밑창·토박스). 정강이에 수직, 진행 방향(+x) 우선. */
function footPath(knee: Pt, ankle: Pt, female?: boolean): string {
  const shin = unit(sub(ankle, knee));
  let dir = perp(shin);
  // 발끝은 항상 진행 방향(+x); 수직 경계에선 위쪽(-y, 로잉 풋플레이트) 우선
  if (dir[0] < 0 || (dir[0] === 0 && dir[1] > 0)) dir = mul(dir, -1);
  let gd = perp(dir); // 밑창이 향하는 쪽 (화면 아래 우선)
  if (gd[1] < 0) gd = mul(gd, -1);
  const L = female ? 6.2 : 6.8;
  const H = female ? 2.4 : 2.7;
  const P = (dx: number, dy: number): Pt => add(add(ankle, mul(dir, dx)), mul(gd, dy));
  const pts: Pt[] = [
    P(-0.6, -0.6), // 발목 위 (다리 안으로)
    P(-2.3, 0.6), // 힐컵 뒤
    P(-1.9, H), // 힐 밑창
    P(L * 0.45, H + 0.2), // 밑창 중간
    P(L, H * 0.8), // 토 밑창
    P(L + 0.8, H * 0.3), // 토 팁
    P(L * 0.7, -0.1), // 토박스 위
    P(1.6, -0.8), // 발등
  ];
  return smoothSegment([...pts, pts[0]]) + " Z";
}

/**
 * 두상 유닛: 두개골·이마·턱·후두·목덜미·승모근을 한 닫힌 path로.
 * 원+막대 대신 실제 인체 옆모습 윤곽 — 아래쪽은 토르소 안으로 겹쳐 이어붙는다.
 */
function headNeckPath(neck: Pt, head: Pt, r: number, female?: boolean): string {
  const u = unit(sub(head, neck)); // 정수리 방향
  let f = perp(u); // 얼굴 방향 (+x 우선)
  if (f[0] < 0) f = mul(f, -1);
  const P = (fx: number, ux: number): Pt => add(add(head, mul(f, fx * r)), mul(u, ux * r));
  const crown = P(0, 1.05);
  const brow = P(0.98, 0.15);
  const chin = P(female ? 0.7 : 0.78, female ? -0.78 : -0.85);
  const jawN = add(neck, mul(f, female ? 2.2 : 2.6));
  const baseF = add(lerpPt(neck, head, -0.12), mul(f, female ? 2.2 : 2.6));
  const baseB = sub(lerpPt(neck, head, -0.15), mul(f, female ? 3.2 : 3.9));
  const nape = P(-0.72, -0.55);
  return (
    `M ${fmt(crown)}` +
    ` Q ${fmt(P(0.95, 0.72))} ${fmt(brow)}` + // 이마
    ` Q ${fmt(P(1.02, -0.45))} ${fmt(chin)}` + // 얼굴→턱
    ` L ${fmt(jawN)} L ${fmt(baseF)} L ${fmt(baseB)}` + // 목 앞→토르소 안
    ` Q ${fmt(sub(add(neck, mul(u, 2)), mul(f, female ? 3.4 : 4.1)))} ${fmt(nape)}` + // 승모근→목덜미
    ` Q ${fmt(P(-1.08, 0.4))} ${fmt(crown)} Z` // 후두→정수리
  );
}

/* ── 근육질 애슬리트 피겨 ──────────────────────────────────────── */

function AthleteFigure({ pose, female }: { pose: Pose; female?: boolean }) {
  const { head, neck, hip, armF, armB, legF, legB } = pose;
  const armSpec = female ? ARM_F : ARM_M;
  const legSpec = female ? LEG_F : LEG_M;
  const headR = female ? 5.5 : 5.9;
  const fistR = female ? 2.2 : 2.5;
  const [hx, hy] = head;
  return (
    <>
      <g className="ws-back">
        <path d={limbPath(neck, armB[0], armB[1], armSpec)} className="ws-limb" />
        <circle cx={armB[1][0]} cy={armB[1][1]} r={fistR} className="ws-limb" />
      </g>
      <g className="ws-back">
        <path d={limbPath(hip, legB[0], legB[1], legSpec)} className="ws-limb" />
        <path d={footPath(legB[0], legB[1], female)} className="ws-limb" />
      </g>
      <path d={torsoPath(neck, hip, female)} className="ws-torso" />
      <path d={headNeckPath(neck, head, headR, female)} className="ws-head" />
      {female && (
        <path
          d={`M ${r1(hx + 0.5)} ${r1(hy - 5.4)} Q ${r1(hx - 8.5)} ${r1(hy - 5.2)} ${r1(hx - 11)} ${r1(hy + 0.5)} Q ${r1(hx - 12.5)} ${r1(hy + 4.5)} ${r1(hx - 15)} ${r1(hy + 8)} Q ${r1(hx - 11)} ${r1(hy + 4)} ${r1(hx - 9.2)} ${r1(hy + 1)} Q ${r1(hx - 7)} ${r1(hy - 1.8)} ${r1(hx + 0.5)} ${r1(hy - 2.4)} Z`}
          className="ws-hair"
        />
      )}
      <path d={limbPath(neck, armF[0], armF[1], armSpec)} className="ws-limb" />
      <circle cx={armF[1][0]} cy={armF[1][1]} r={fistR} className="ws-limb" />
      <path d={limbPath(hip, legF[0], legF[1], legSpec)} className="ws-limb" />
      <path d={footPath(legF[0], legF[1], female)} className="ws-limb" />
    </>
  );
}

/* ── 1 km Run (스테이션 사이 브릿지) ───────────────────────────── */

const RUN: SceneDef = {
  id: "run",
  // 대측(contralateral) 보행: 앞다리 프레임엔 근측 팔이 뒤로, 뒷다리 프레임엔 앞으로
  a: {
    pose: {
      head: [69, 40], neck: [64, 48], hip: [56, 80],
      armF: [[50, 64], [41, 67]], armB: [[74, 64], [85, 56]],
      legF: [[74, 94], [80, 114]], legB: [[44, 98], [30, 108]],
    },
  },
  b: {
    pose: {
      head: [69, 42], neck: [64, 50], hip: [56, 82],
      armF: [[74, 64], [85, 56]], armB: [[50, 64], [41, 67]],
      legF: [[44, 98], [32, 108]], legB: [[74, 94], [80, 114]],
    },
  },
};

/* ── 8개 스테이션 (레이스 순서) ────────────────────────────────── */

const STATIONS: SceneDef[] = [
  {
    // 1. SkiErg — 하이 리치 → 풀다운 (머리가 팔 사이로 보이도록 팔꿈치를 올림)
    id: "skierg",
    a: {
      pose: {
        head: [59, 38], neck: [58, 50], hip: [52, 84],
        armF: [[70, 31], [79, 21]], armB: [[65, 30], [74, 19]],
        legF: [[55, 102], [53, 121]], legB: [[48, 103], [44, 121]],
      },
      gear: (
        <>
          <path d="M 91 14 V 121 M 82 121 H 104" className="ws-gear" />
          <path d="M 79 21 L 91 15 M 74 19 L 90 14" className="ws-gear ws-gear--thin" />
        </>
      ),
    },
    b: {
      pose: {
        head: [68, 60], neck: [64, 66], hip: [50, 88],
        armF: [[70, 80], [67, 93]], armB: [[65, 79], [62, 91]],
        legF: [[55, 104], [53, 121]], legB: [[48, 105], [44, 121]],
      },
      gear: (
        <>
          <path d="M 91 14 V 121 M 82 121 H 104" className="ws-gear" />
          <path d="M 67 93 L 91 15 M 62 91 L 90 14" className="ws-gear ws-gear--thin" />
        </>
      ),
    },
  },
  {
    // 2. Sled Push — 45도 드라이브, 슬레드가 전진
    id: "sledpush",
    a: {
      pose: {
        head: [79, 54], neck: [73, 61], hip: [46, 86],
        armF: [[85, 69], [95, 75]], armB: [[83, 66], [93, 71]],
        legF: [[57, 102], [51, 120]], legB: [[34, 102], [20, 116]],
      },
      gear: (
        <>
          <path d="M 96 44 V 112 M 106 44 V 112" className="ws-gear" />
          <path d="M 92 88 H 116 V 110 H 92 Z M 90 116 H 120" className="ws-gear" />
        </>
      ),
    },
    b: {
      pose: {
        head: [84, 54], neck: [78, 61], hip: [51, 86],
        armF: [[90, 69], [100, 75]], armB: [[88, 66], [98, 71]],
        legF: [[39, 103], [25, 117]], legB: [[62, 102], [56, 120]],
      },
      gear: (
        <>
          <path d="M 101 44 V 112 M 111 44 V 112" className="ws-gear" />
          <path d="M 97 88 H 121 V 110 H 97 Z M 95 116 H 125" className="ws-gear" />
        </>
      ),
    },
  },
  {
    // 3. Sled Pull — 후경 자세, 로프를 당겨 슬레드가 끌려옴
    id: "sledpull",
    a: {
      pose: {
        head: [32, 52], neck: [37, 61], hip: [45, 92],
        armF: [[53, 68], [65, 74]], armB: [[51, 72], [63, 78]],
        legF: [[55, 104], [63, 120]], legB: [[47, 106], [40, 121]],
      },
      gear: (
        <>
          <path d="M 65 74 L 96 98" className="ws-gear ws-gear--thin" />
          <path d="M 96 96 H 116 V 110 H 96 Z M 96 110 V 114 M 116 110 V 114 M 94 114 H 120" className="ws-gear" />
        </>
      ),
    },
    b: {
      pose: {
        head: [31, 54], neck: [36, 64], hip: [47, 94],
        armF: [[41, 76], [55, 88]], armB: [[39, 80], [53, 91]],
        legF: [[56, 105], [64, 121]], legB: [[48, 107], [41, 121]],
      },
      gear: (
        <>
          <path d="M 55 88 L 88 98" className="ws-gear ws-gear--thin" />
          <path d="M 88 96 H 108 V 110 H 88 Z M 88 110 V 114 M 108 110 V 114 M 86 114 H 112" className="ws-gear" />
        </>
      ),
    },
  },
  {
    // 4. Burpee Broad Jumps — 웅크림 → 공중 도약
    id: "burpee",
    a: {
      pose: {
        head: [64, 66], neck: [60, 75], hip: [50, 97],
        armF: [[47, 86], [39, 94]], armB: [[45, 88], [37, 96]],
        legF: [[63, 103], [57, 121]], legB: [[57, 105], [49, 121]],
      },
    },
    b: {
      pose: {
        head: [74, 36], neck: [69, 44], hip: [59, 66],
        armF: [[85, 41], [95, 33]], armB: [[81, 45], [91, 37]],
        legF: [[55, 77], [44, 86]], legB: [[51, 81], [40, 90]],
      },
    },
  },
  {
    // 5. Rowing — 캐치(압축, 무릎이 실루엣을 가름) → 피니시(레이백, 핸들 몸쪽)
    //    씬 전체를 공용 지면(y=122)에 맞춰 배치 (레일 y=120)
    id: "row",
    a: {
      pose: {
        head: [68, 82], neck: [63, 91], hip: [56, 112],
        armF: [[73, 99], [84, 97]], armB: [[71, 101], [82, 99]],
        legF: [[69, 93], [80, 113]], legB: [[67, 95], [78, 115]],
      },
      gear: (
        <>
          <path d="M 16 120 H 94 M 100 110 V 122 M 78 110 L 86 122" className="ws-gear" />
          <circle cx={100} cy={98} r={11} className="ws-gear" />
          <path d="M 52 116 H 62" className="ws-gear" />
          <path d="M 84 97 L 90 97" className="ws-gear ws-gear--thin" />
        </>
      ),
    },
    b: {
      pose: {
        head: [26, 79], neck: [30, 88], hip: [37, 112],
        armF: [[36, 99], [43, 101]], armB: [[34, 101], [41, 103]],
        legF: [[58, 108], [80, 113]], legB: [[56, 110], [78, 115]],
      },
      gear: (
        <>
          <path d="M 16 120 H 94 M 100 110 V 122 M 78 110 L 86 122" className="ws-gear" />
          <circle cx={100} cy={98} r={11} className="ws-gear" />
          <path d="M 33 116 H 43" className="ws-gear" />
          <path d="M 43 101 L 90 97" className="ws-gear ws-gear--thin" />
        </>
      ),
    },
  },
  {
    // 6. Farmer's Carry — 케틀벨 양손, 보행 교차
    id: "carry",
    a: {
      pose: {
        head: [59, 36], neck: [56, 46], hip: [56, 80],
        armF: [[66, 63], [68, 84]], armB: [[46, 63], [44, 84]],
        legF: [[66, 98], [72, 119]], legB: [[47, 100], [38, 117]],
      },
      gear: (
        <>
          <path d="M 64 88 Q 68 82 72 88 M 40 88 Q 44 82 48 88" className="ws-gear" />
          <circle cx={68} cy={94} r={6} className="ws-fill" />
          <circle cx={44} cy={94} r={6} className="ws-fill" />
        </>
      ),
    },
    b: {
      pose: {
        head: [59, 38], neck: [56, 48], hip: [56, 82],
        armF: [[66, 64], [68, 86]], armB: [[46, 64], [44, 86]],
        legF: [[48, 99], [40, 118]], legB: [[66, 99], [73, 119]],
      },
      gear: (
        <>
          <path d="M 64 90 Q 68 84 72 90 M 40 90 Q 44 84 48 90" className="ws-gear" />
          <circle cx={68} cy={96} r={6} className="ws-fill" />
          <circle cx={44} cy={96} r={6} className="ws-fill" />
        </>
      ),
    },
  },
  {
    // 7. Sandbag Lunges — 어깨 샌드백(양끝 그립, 머리 옆 여백 확보), 딥 런지 → 상승
    id: "lunge",
    a: {
      pose: {
        head: [56, 52], neck: [54, 65], hip: [55, 101],
        armF: [[63, 73], [68, 66]], armB: [[45, 73], [40, 66]],
        legF: [[68, 104], [66, 121]], legB: [[44, 114], [31, 120]],
      },
      gear: <path d="M 40 66 H 68" className="ws-bag" />,
    },
    b: {
      pose: {
        head: [56, 36], neck: [54, 49], hip: [54, 84],
        armF: [[63, 57], [68, 50]], armB: [[45, 57], [40, 50]],
        legF: [[63, 102], [66, 121]], legB: [[46, 106], [34, 119]],
      },
      gear: <path d="M 40 50 H 68" className="ws-bag" />,
    },
  },
  {
    // 8. Wall Balls — 스쿼트 → 타깃으로 볼 던지기
    id: "wallball",
    a: {
      pose: {
        head: [56, 59], neck: [54, 69], hip: [46, 95],
        armF: [[63, 81], [67, 73]], armB: [[59, 83], [64, 75]],
        legF: [[62, 99], [56, 121]], legB: [[56, 101], [46, 121]],
      },
      gear: (
        <>
          <path d="M 97 8 V 121" className="ws-gear" />
          <circle cx={90} cy={20} r={6} className="ws-gear" />
          <circle cx={70} cy={69} r={6} className="ws-gear" />
        </>
      ),
    },
    b: {
      pose: {
        head: [55, 38], neck: [54, 47], hip: [50, 79],
        armF: [[67, 35], [71, 25]], armB: [[63, 37], [67, 27]],
        legF: [[54, 100], [52, 121]], legB: [[48, 102], [44, 121]],
      },
      gear: (
        <>
          <path d="M 97 8 V 121" className="ws-gear" />
          <circle cx={90} cy={20} r={6} className="ws-gear" />
          <circle cx={75} cy={23} r={6} className="ws-gear" />
        </>
      ),
    },
  },
];

function Frames({ def, female }: { def: SceneDef; female?: boolean }) {
  return (
    <>
      <g className="ws-frame ws-frame--a">
        <AthleteFigure pose={def.a.pose} female={female} />
        {def.a.gear}
      </g>
      <g className="ws-frame ws-frame--b">
        <AthleteFigure pose={def.b.pose} female={female} />
        {def.b.gear}
      </g>
    </>
  );
}

function Scene({ label, def, female }: { label: string; def: SceneDef; female?: boolean }) {
  return (
    <g className={`ws-scene ws-scene--${label}`}>
      <g className={`ws-athlete ${female ? "ws-athlete--f" : "ws-athlete--m"}`}>
        <Frames def={def} female={female} />
      </g>
    </g>
  );
}

export default function WorkoutSilhouettes() {
  return (
    <div className="workout-silhouettes" aria-hidden="true">
      <svg viewBox="10 2 120 126" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="ws-nitro" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#ff8b1e" />
            <stop offset="0.55" stopColor="#ed5fa4" />
            <stop offset="1" stopColor="#a45ceb" />
          </linearGradient>
        </defs>
        <path d="M 14 122 H 126" className="ws-ground" />
        <Scene label="run-m" def={RUN} />
        <Scene label="run-f" def={RUN} female />
        {STATIONS.map((station, index) => (
          <Scene key={station.id} label={`s${index}`} def={station} female={index % 2 === 1} />
        ))}
      </svg>
    </div>
  );
}
