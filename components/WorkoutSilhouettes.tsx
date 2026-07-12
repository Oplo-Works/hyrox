import type { ReactNode } from "react";

/**
 * WorkoutSilhouettes — 스크롤 진행에 따라 HYROX 8개 스테이션을 레이스 순서대로
 * 수행하는 단독 피겨 배경 레이어. 순수 장식(aria-hidden, pointer-events 없음).
 *
 * - 모든 피겨는 직접 그린 오리지널 픽토그램 스타일 SVG (공식 자산 미사용).
 * - rev 6: 필드 근육 실루엣 → **라인 픽토그램** (머티리얼 심볼 운동 아이콘 스타일,
 *   사용자 레퍼런스 이미지 기준): 균일 두께의 라운드 스트로크 사지·몸통 + 몸에서
 *   분리된 점(dot) 머리. 손·발·근육·머리카락 디테일 없음. 두께·머리 크기는
 *   LINE_W/HEAD_R 상수와 globals.css `--ws-line`으로 조정.
 * - 각 종목은 2개 프레임(A/B)으로 구성되며 CSS가 교차 재생해 동작을 표현한다.
 * - 씬마다 선수는 한 명이고 종목이 바뀔 때마다 성별이 교대한다 (rev 2):
 *   짝수 스테이션=남(오렌지), 홀수=여(퍼플). 러닝 브릿지는 다음 종목과 동일 성별
 *   (run-m/run-f 두 씬을 두고 globals.css가 data-station 짝홀로 선택).
 *   rev 6부터 픽토그램은 유니섹스 — 성별 교대는 색(+미세한 선 두께)으로만 표현.
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
  /** [팔꿈치, 손] — F는 앞, B는 뒤 */
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

/* ── 렌더 유틸 ─────────────────────────────────────────────────── */

const r1 = (n: number) => Math.round(n * 10) / 10;
const fmt = (p: Pt) => `${r1(p[0])} ${r1(p[1])}`;
const lerpPt = (a: Pt, b: Pt, t: number): Pt => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t];

/** 머리(점) 크기 — 픽토그램 비례: 머리 지름 ≈ 선 두께의 약 2.2배 */
const HEAD_R = { m: 5.8, f: 5.4 };
/** 사지·몸통 선 두께 — Scene이 SVG 속성으로 지정 (CSS는 색·캡만 담당) */
export const LINE_W = { m: 5.4, f: 4.8 };
/** 머리(점)와 몸통 스트로크 사이 최소 간격 — 분리된 점 머리 특징 보장 */
const HEAD_GAP = 1.2;

/* ── 라인 픽토그램 피겨 (머티리얼 운동 아이콘 스타일) ───────────── */

function AthleteFigure({ pose, female }: { pose: Pose; female?: boolean }) {
  const { head, neck, hip, armF, armB, legF, legB } = pose;
  const headR = female ? HEAD_R.f : HEAD_R.m;
  const lineW = female ? LINE_W.f : LINE_W.m;
  // 팔은 목 바로 아래 어깨 지점에서 시작 (몸통 축 12% 지점)
  const sh = lerpPt(neck, hip, 0.12);
  // 머리가 목에 가까운 웅크림 포즈에서도 점 머리가 몸통과 겹치지 않도록,
  // 필요한 만큼만 몸통 시작점을 골반 쪽으로 내린다
  const axisLen = Math.hypot(hip[0] - neck[0], hip[1] - neck[1]) || 1;
  const headDist = Math.hypot(head[0] - neck[0], head[1] - neck[1]);
  const inset = Math.max(0, headR + lineW / 2 + HEAD_GAP - headDist);
  const torsoTop = lerpPt(neck, hip, Math.min(inset / axisLen, 0.3));
  const limb = (root: Pt, seg: readonly [Pt, Pt]) =>
    `M ${fmt(root)} L ${fmt(seg[0])} L ${fmt(seg[1])}`;
  return (
    <>
      <path d={limb(sh, armB)} className="ws-limb" />
      <path d={limb(hip, legB)} className="ws-limb" />
      <path d={`M ${fmt(torsoTop)} L ${fmt(hip)}`} className="ws-torso" />
      <circle cx={head[0]} cy={head[1]} r={headR} className="ws-head" />
      <path d={limb(sh, armF)} className="ws-limb" />
      <path d={limb(hip, legF)} className="ws-limb" />
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
        head: [54, 34], neck: [58, 50], hip: [52, 84],
        armF: [[71, 32], [80, 21]], armB: [[66, 31], [75, 19]],
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
        head: [34, 52], neck: [37, 64], hip: [47, 94],
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
        head: [22, 74], neck: [30, 88], hip: [37, 112],
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
        head: [55, 56], neck: [54, 65], hip: [55, 101],
        armF: [[63, 73], [68, 66]], armB: [[45, 73], [40, 66]],
        legF: [[68, 104], [66, 121]], legB: [[44, 114], [31, 120]],
      },
      gear: <path d="M 40 66 H 68" className="ws-bag" />,
    },
    b: {
      pose: {
        head: [55, 40], neck: [54, 49], hip: [54, 84],
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
      <g
        className={`ws-athlete ${female ? "ws-athlete--f" : "ws-athlete--m"}`}
        strokeWidth={female ? LINE_W.f : LINE_W.m}
      >
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
