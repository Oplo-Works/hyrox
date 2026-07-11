import type { ReactNode } from "react";

/**
 * WorkoutSilhouettes — 스크롤 진행에 따라 HYROX 8개 스테이션을 레이스 순서대로
 * 수행하는 남녀 실루엣 배경 레이어. 순수 장식(aria-hidden, pointer-events 없음).
 *
 * - 모든 실루엣은 직접 그린 오리지널 픽토그램 스타일 SVG (공식 자산 미사용).
 * - 각 종목은 2개 프레임(A/B)으로 구성되며 CSS가 교차 재생해 동작을 표현한다.
 * - 활성 스테이션은 ScrollEnergy가 body[data-station] / body[data-bridge]로 지정하고,
 *   표시·전환·모션은 전부 globals.css에서 처리한다 (이 컴포넌트는 서버 컴포넌트).
 *
 * 좌표계: 피겨 로컬 0–120 × 0–130, 지면 y=121, 진행 방향 +x(오른쪽).
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

function line(...pts: Pt[]): string {
  const [first, ...rest] = pts;
  return `M ${first[0]} ${first[1]} ` + rest.map((p) => `L ${p[0]} ${p[1]}`).join(" ");
}

function PoseFigure({ pose, female }: { pose: Pose; female?: boolean }) {
  const { head, neck, hip, armF, armB, legF, legB } = pose;
  return (
    <>
      <path d={line(neck, ...armB)} className="ws-limb ws-back" />
      <path d={line(hip, ...legB)} className="ws-limb ws-back" />
      <path d={line(hip, neck)} className="ws-torso" />
      <path d={line(neck, ...armF)} className="ws-limb" />
      <path d={line(hip, ...legF)} className="ws-limb" />
      <circle cx={head[0]} cy={head[1]} r={7} className="ws-head" />
      {female && (
        <path
          d={`M ${head[0] - 4} ${head[1] - 4} Q ${head[0] - 13} ${head[1] - 2} ${head[0] - 15} ${head[1] + 7}`}
          className="ws-hair"
        />
      )}
    </>
  );
}

/* ── 1 km Run (스테이션 사이 브릿지) ───────────────────────────── */

const RUN: SceneDef = {
  id: "run",
  a: {
    pose: {
      head: [69, 40], neck: [64, 48], hip: [56, 80],
      armF: [[78, 62], [88, 50]], armB: [[50, 64], [42, 78]],
      legF: [[74, 94], [80, 114]], legB: [[44, 98], [30, 108]],
    },
  },
  b: {
    pose: {
      head: [69, 42], neck: [64, 50], hip: [56, 82],
      armF: [[50, 64], [42, 78]], armB: [[78, 62], [88, 50]],
      legF: [[44, 98], [32, 108]], legB: [[74, 94], [80, 114]],
    },
  },
};

/* ── 8개 스테이션 (레이스 순서) ────────────────────────────────── */

const STATIONS: SceneDef[] = [
  {
    // 1. SkiErg — 하이 리치 → 풀다운
    id: "skierg",
    a: {
      pose: {
        head: [62, 40], neck: [58, 50], hip: [52, 84],
        armF: [[70, 34], [79, 21]], armB: [[65, 33], [74, 19]],
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
        head: [69, 58], neck: [64, 66], hip: [50, 88],
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
          <path d="M 96 96 H 116 V 110 H 96 Z M 94 114 H 120" className="ws-gear" />
        </>
      ),
    },
    b: {
      pose: {
        head: [30, 56], neck: [35, 65], hip: [47, 94],
        armF: [[45, 76], [39, 84]], armB: [[43, 80], [37, 88]],
        legF: [[56, 105], [64, 121]], legB: [[48, 107], [41, 121]],
      },
      gear: (
        <>
          <path d="M 39 84 L 88 98" className="ws-gear ws-gear--thin" />
          <path d="M 88 96 H 108 V 110 H 88 Z M 86 114 H 112" className="ws-gear" />
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
        legF: [[49, 79], [37, 89]], legB: [[45, 83], [33, 93]],
      },
    },
  },
  {
    // 5. Rowing — 캐치 → 피니시 (시트 슬라이드)
    id: "row",
    a: {
      pose: {
        head: [63, 63], neck: [58, 72], hip: [46, 92],
        armF: [[72, 76], [84, 77]], armB: [[70, 78], [82, 79]],
        legF: [[63, 76], [80, 93]], legB: [[61, 78], [78, 95]],
      },
      gear: (
        <>
          <path d="M 16 100 H 94 M 100 90 V 102 M 78 90 L 86 102" className="ws-gear" />
          <circle cx={100} cy={78} r={11} className="ws-gear" />
          <path d="M 42 96 H 52" className="ws-gear" />
          <path d="M 84 77 L 90 77" className="ws-gear ws-gear--thin" />
        </>
      ),
    },
    b: {
      pose: {
        head: [26, 59], neck: [30, 68], hip: [37, 92],
        armF: [[40, 75], [48, 73]], armB: [[38, 77], [46, 75]],
        legF: [[58, 88], [80, 93]], legB: [[56, 90], [78, 95]],
      },
      gear: (
        <>
          <path d="M 16 100 H 94 M 100 90 V 102 M 78 90 L 86 102" className="ws-gear" />
          <circle cx={100} cy={78} r={11} className="ws-gear" />
          <path d="M 33 96 H 43" className="ws-gear" />
          <path d="M 48 73 L 90 77" className="ws-gear ws-gear--thin" />
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
    // 7. Sandbag Lunges — 어깨 샌드백, 딥 런지 → 상승
    id: "lunge",
    a: {
      pose: {
        head: [56, 49], neck: [54, 59], hip: [54, 93],
        armF: [[65, 68], [67, 57]], armB: [[43, 68], [41, 57]],
        legF: [[68, 102], [66, 121]], legB: [[42, 112], [29, 119]],
      },
      gear: <path d="M 40 56 H 68" className="ws-bag" />,
    },
    b: {
      pose: {
        head: [56, 41], neck: [54, 51], hip: [54, 84],
        armF: [[65, 61], [67, 49]], armB: [[43, 61], [41, 49]],
        legF: [[63, 102], [66, 121]], legB: [[46, 106], [34, 119]],
      },
      gear: <path d="M 40 48 H 68" className="ws-bag" />,
    },
  },
  {
    // 8. Wall Balls — 스쿼트 → 타깃으로 볼 던지기
    id: "wallball",
    a: {
      pose: {
        head: [56, 59], neck: [54, 69], hip: [46, 95],
        armF: [[64, 80], [63, 72]], armB: [[61, 82], [60, 74]],
        legF: [[62, 99], [56, 121]], legB: [[56, 101], [46, 121]],
      },
      gear: (
        <>
          <path d="M 97 8 V 121" className="ws-gear" />
          <circle cx={90} cy={20} r={6} className="ws-gear" />
          <circle cx={67} cy={69} r={7} className="ws-fill" />
        </>
      ),
    },
    b: {
      pose: {
        head: [56, 37], neck: [54, 47], hip: [50, 79],
        armF: [[64, 37], [70, 27]], armB: [[60, 39], [66, 29]],
        legF: [[54, 100], [52, 121]], legB: [[48, 102], [44, 121]],
      },
      gear: (
        <>
          <path d="M 97 8 V 121" className="ws-gear" />
          <circle cx={90} cy={20} r={6} className="ws-gear" />
          <circle cx={81} cy={17} r={7} className="ws-fill" />
        </>
      ),
    },
  },
];

function Frames({ def, female }: { def: SceneDef; female?: boolean }) {
  return (
    <>
      <g className="ws-frame ws-frame--a">
        <PoseFigure pose={def.a.pose} female={female} />
        {def.a.gear}
      </g>
      <g className="ws-frame ws-frame--b">
        <PoseFigure pose={def.b.pose} female={female} />
        {def.b.gear}
      </g>
    </>
  );
}

function Scene({ label, def }: { label: string; def: SceneDef }) {
  return (
    <g className={`ws-scene ws-scene--${label}`}>
      {/* 남(오렌지, 좌) / 여(퍼플, 우) — 지면 y=232 정렬 */}
      <g transform="translate(22 96.5) scale(1.12)">
        <g className="ws-athlete ws-athlete--m">
          <Frames def={def} />
        </g>
      </g>
      <g transform="translate(206 108.6) scale(1.02)">
        <g className="ws-athlete ws-athlete--f">
          <Frames def={def} female />
        </g>
      </g>
    </g>
  );
}

export default function WorkoutSilhouettes() {
  return (
    <div className="workout-silhouettes" aria-hidden="true">
      <svg viewBox="0 0 375 250" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="ws-nitro" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#ff8b1e" />
            <stop offset="0.55" stopColor="#ed5fa4" />
            <stop offset="1" stopColor="#a45ceb" />
          </linearGradient>
        </defs>
        <path d="M 10 232 H 365" className="ws-ground" />
        <Scene label="run" def={RUN} />
        {STATIONS.map((station, index) => (
          <Scene key={station.id} label={`s${index}`} def={station} />
        ))}
      </svg>
    </div>
  );
}
