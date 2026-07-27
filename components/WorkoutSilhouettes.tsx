import type { ReactNode } from "react";

/**
 * WorkoutSilhouettes — 스크롤 진행에 따라 HYROX 8개 스테이션을 레이스 순서대로
 * 수행하는 단독 피겨 배경 레이어. 순수 장식(aria-hidden, pointer-events 없음).
 *
 * - 모든 피겨는 직접 그린 오리지널 픽토그램 스타일 SVG (공식 자산 미사용).
 * - rev 7: 사용자 제공 8-station 참고 이미지의 동작 구도를 바탕으로, 얇은 라인 피겨를
 *   넓은 어깨·좁은 허리의 채움형 몸통과 굵은 캡슐형 사지로 교체했다. 참고 이미지는
 *   포즈/장비 확인에만 사용하고 이미지 자체나 외부 아이콘은 포함하지 않는다.
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
  /** Large equipment and cables rendered behind the athlete. */
  gear?: ReactNode;
  /** Small carried equipment that must remain legible over the silhouette. */
  gearFront?: ReactNode;
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
const offsetPt = (p: Pt, normal: Pt, amount: number): Pt => [
  p[0] + normal[0] * amount,
  p[1] + normal[1] * amount,
];

/** 참고 이미지처럼 머리는 몸과 분리된 단순 원형으로 유지한다. */
const HEAD_R = { m: 6.2, f: 5.8 };
/** 굵은 캡슐형 사지의 기준 두께. 몸통은 별도 채움 path로 렌더링한다. */
export const LINE_W = { m: 8.8, f: 8.1 };

function torsoPath(neck: Pt, hip: Pt, female: boolean) {
  const dx = hip[0] - neck[0];
  const dy = hip[1] - neck[1];
  const len = Math.hypot(dx, dy) || 1;
  const normal: Pt = [-dy / len, dx / len];
  const shoulder = lerpPt(neck, hip, 0.16);
  const chest = lerpPt(neck, hip, 0.38);
  const waist = lerpPt(neck, hip, 0.7);
  const shoulderW = female ? 6.8 : 7.8;
  const chestW = female ? 6 : 6.8;
  const waistW = female ? 4.3 : 4.8;
  const hipW = female ? 5.8 : 6.2;
  const shoulderL = offsetPt(shoulder, normal, shoulderW);
  const shoulderR = offsetPt(shoulder, normal, -shoulderW);
  const chestL = offsetPt(chest, normal, chestW);
  const chestR = offsetPt(chest, normal, -chestW);
  const waistL = offsetPt(waist, normal, waistW);
  const waistR = offsetPt(waist, normal, -waistW);
  const hipL = offsetPt(hip, normal, hipW);
  const hipR = offsetPt(hip, normal, -hipW);

  return [
    `M ${fmt(shoulderL)}`,
    `Q ${fmt(chestL)} ${fmt(waistL)}`,
    `L ${fmt(hipL)}`,
    `Q ${fmt(hip)} ${fmt(hipR)}`,
    `L ${fmt(waistR)}`,
    `Q ${fmt(chestR)} ${fmt(shoulderR)}`,
    `Q ${fmt(neck)} ${fmt(shoulderL)}`,
    "Z",
  ].join(" ");
}

/* ── 채움형 운동 픽토그램 피겨 ────────────────────────────────── */

function AthleteFigure({ pose, female }: { pose: Pose; female?: boolean }) {
  const { head, neck, hip, armF, armB, legF, legB } = pose;
  const isFemale = Boolean(female);
  const headR = isFemale ? HEAD_R.f : HEAD_R.m;
  const lineW = isFemale ? LINE_W.f : LINE_W.m;
  const dx = hip[0] - neck[0];
  const dy = hip[1] - neck[1];
  const len = Math.hypot(dx, dy) || 1;
  const normal: Pt = [-dy / len, dx / len];
  const shoulder = lerpPt(neck, hip, 0.18);
  const shoulderF = offsetPt(shoulder, normal, 2.2);
  const shoulderB = offsetPt(shoulder, normal, -2.2);
  const hipF = offsetPt(hip, normal, 2);
  const hipB = offsetPt(hip, normal, -2);
  const limb = (root: Pt, seg: readonly [Pt, Pt]) =>
    `M ${fmt(root)} L ${fmt(seg[0])} L ${fmt(seg[1])}`;
  const foot = (seg: readonly [Pt, Pt]) => {
    const direction = Math.sign(seg[1][0] - seg[0][0]) || 1;
    return `M ${fmt(seg[1])} L ${fmt([seg[1][0] + direction * 4.5, seg[1][1]] as Pt)}`;
  };

  return (
    <>
      <path d={limb(shoulderB, armB)} className="ws-limb ws-limb--arm ws-limb--back" strokeWidth={lineW * 0.82} />
      <path d={limb(hipB, legB)} className="ws-limb ws-limb--leg ws-limb--back" strokeWidth={lineW * 1.08} />
      <path d={foot(legB)} className="ws-foot ws-limb--back" strokeWidth={lineW * 0.78} />
      <path d={torsoPath(neck, hip, isFemale)} className="ws-torso" />
      <circle cx={head[0]} cy={head[1]} r={headR} className="ws-head" />
      <path d={limb(shoulderF, armF)} className="ws-limb ws-limb--arm" strokeWidth={lineW * 0.88} />
      <path d={limb(hipF, legF)} className="ws-limb ws-limb--leg" strokeWidth={lineW * 1.14} />
      <path d={foot(legF)} className="ws-foot" strokeWidth={lineW * 0.82} />
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
    // 1. SkiErg — 참고 이미지의 힙힌지/스쿼트 자세와 전면 풀다운
    id: "skierg",
    a: {
      pose: {
        head: [55, 40], neck: [59, 51], hip: [51, 84],
        armF: [[69, 48], [80, 36]], armB: [[66, 46], [77, 34]],
        legF: [[59, 101], [55, 120]], legB: [[45, 102], [38, 119]],
      },
      gear: (
        <>
          <path d="M 91 14 V 121 M 82 121 H 104" className="ws-gear" />
          <path d="M 80 36 L 91 15 M 77 34 L 90 14" className="ws-gear ws-gear--thin" />
        </>
      ),
    },
    b: {
      pose: {
        head: [57, 56], neck: [61, 66], hip: [50, 91],
        armF: [[71, 69], [73, 82]], armB: [[68, 67], [70, 80]],
        legF: [[61, 103], [56, 121]], legB: [[44, 105], [35, 119]],
      },
      gear: (
        <>
          <path d="M 91 14 V 121 M 82 121 H 104" className="ws-gear" />
          <path d="M 73 82 L 91 15 M 70 80 L 90 14" className="ws-gear ws-gear--thin" />
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
    // 3. Sled Pull — 참고 이미지처럼 슬레드를 등지고 뒤로 기울여 당기는 자세
    id: "sledpull",
    a: {
      pose: {
        head: [92, 45], neck: [85, 55], hip: [88, 86],
        armF: [[76, 66], [63, 76]], armB: [[78, 63], [65, 72]],
        legF: [[100, 101], [102, 121]], legB: [[82, 104], [73, 120]],
      },
      gear: (
        <>
          <path d="M 63 76 L 46 98" className="ws-gear ws-gear--thin" />
          <path d="M 28 94 V 112 M 45 94 V 112 M 25 114 H 50" className="ws-gear" />
          <path d="M 29 98 H 44 V 108 H 29 Z" className="ws-gear-solid" />
        </>
      ),
    },
    b: {
      pose: {
        head: [88, 48], neck: [81, 58], hip: [84, 89],
        armF: [[70, 72], [56, 84]], armB: [[72, 68], [59, 80]],
        legF: [[94, 103], [98, 121]], legB: [[77, 106], [68, 120]],
      },
      gear: (
        <>
          <path d="M 56 84 L 44 98" className="ws-gear ws-gear--thin" />
          <path d="M 26 94 V 112 M 43 94 V 112 M 23 114 H 48" className="ws-gear" />
          <path d="M 27 98 H 42 V 108 H 27 Z" className="ws-gear-solid" />
        </>
      ),
    },
  },
  {
    // 4. Burpee Broad Jumps — 손을 짚은 로드 자세 → 전방 도약
    id: "burpee",
    a: {
      pose: {
        head: [66, 67], neck: [59, 76], hip: [49, 96],
        armF: [[49, 88], [42, 112]], armB: [[46, 87], [38, 110]],
        legF: [[62, 103], [57, 120]], legB: [[54, 105], [45, 119]],
      },
    },
    b: {
      pose: {
        head: [84, 48], neck: [76, 58], hip: [65, 88],
        armF: [[84, 73], [91, 107]], armB: [[80, 75], [86, 105]],
        legF: [[78, 101], [73, 120]], legB: [[59, 103], [49, 119]],
      },
    },
  },
  {
    // 5. Rowing — 참고 이미지처럼 좌측 시트에서 우측 플라이휠을 향해 당긴다
    id: "row",
    a: {
      pose: {
        head: [56, 70], neck: [61, 80], hip: [51, 105],
        armF: [[72, 87], [84, 91]], armB: [[70, 90], [82, 94]],
        legF: [[68, 100], [79, 114]], legB: [[65, 103], [77, 116]],
      },
      gear: (
        <>
          <path d="M 16 120 H 94 M 100 110 V 122 M 78 110 L 86 122" className="ws-gear" />
          <circle cx={100} cy={98} r={11} className="ws-gear" />
          <circle cx={100} cy={98} r={4.5} className="ws-gear-solid" />
          <path d="M 47 114 H 60" className="ws-gear" />
          <path d="M 84 97 L 90 97" className="ws-gear ws-gear--thin" />
        </>
      ),
    },
    b: {
      pose: {
        head: [35, 67], neck: [41, 79], hip: [46, 106],
        armF: [[53, 89], [61, 96]], armB: [[50, 91], [58, 98]],
        legF: [[64, 103], [81, 114]], legB: [[61, 106], [79, 117]],
      },
      gear: (
        <>
          <path d="M 16 120 H 94 M 100 110 V 122 M 78 110 L 86 122" className="ws-gear" />
          <circle cx={100} cy={98} r={11} className="ws-gear" />
          <circle cx={100} cy={98} r={4.5} className="ws-gear-solid" />
          <path d="M 40 114 H 53" className="ws-gear" />
          <path d="M 61 96 L 90 97" className="ws-gear ws-gear--thin" />
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
      gearFront: (
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
      gearFront: (
        <>
          <path d="M 64 90 Q 68 84 72 90 M 40 90 Q 44 84 48 90" className="ws-gear" />
          <circle cx={68} cy={96} r={6} className="ws-fill" />
          <circle cx={44} cy={96} r={6} className="ws-fill" />
        </>
      ),
    },
  },
  {
    // 7. Sandbag Lunges — 참고 이미지처럼 샌드백을 등 위에 얹은 깊은 런지
    id: "lunge",
    a: {
      pose: {
        head: [67, 51], neck: [61, 61], hip: [57, 91],
        armF: [[70, 68], [75, 61]], armB: [[52, 69], [46, 62]],
        legF: [[73, 102], [72, 121]], legB: [[45, 111], [30, 120]],
      },
      gearFront: (
        <path
          d="M 35 59 C 42 47 53 46 63 52 C 68 55 67 60 62 64 C 52 59 45 61 39 68 C 34 67 32 63 35 59 Z"
          className="ws-bag"
        />
      ),
    },
    b: {
      pose: {
        head: [65, 39], neck: [59, 49], hip: [57, 81],
        armF: [[69, 57], [74, 50]], armB: [[51, 58], [45, 51]],
        legF: [[70, 99], [71, 121]], legB: [[49, 103], [37, 119]],
      },
      gearFront: (
        <path
          d="M 34 47 C 41 36 52 35 62 41 C 67 44 66 49 61 53 C 51 48 44 50 38 57 C 33 56 31 51 34 47 Z"
          className="ws-bag"
        />
      ),
    },
  },
  {
    // 8. Wall Balls — 가슴 앞 캐치 → 타깃을 향한 오버헤드 드라이브
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
          <circle cx={90} cy={20} r={7} className="ws-target" />
          <circle cx={90} cy={20} r={3} className="ws-target" />
          <circle cx={71} cy={69} r={6} className="ws-gear-solid" />
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
          <circle cx={90} cy={20} r={7} className="ws-target" />
          <circle cx={90} cy={20} r={3} className="ws-target" />
          <circle cx={76} cy={23} r={6} className="ws-gear-solid" />
        </>
      ),
    },
  },
];

function Frames({ def, female }: { def: SceneDef; female?: boolean }) {
  return (
    <>
      <g className="ws-frame ws-frame--a">
        {def.a.gear}
        <AthleteFigure pose={def.a.pose} female={female} />
        {def.a.gearFront}
      </g>
      <g className="ws-frame ws-frame--b">
        {def.b.gear}
        <AthleteFigure pose={def.b.pose} female={female} />
        {def.b.gearFront}
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
