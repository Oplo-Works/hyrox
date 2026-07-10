import { siteConfig } from "@/data/site";
import SectionHeader from "./SectionHeader";

/**
 * AllLevelsWelcome — 빌드 브리프 10.6
 * - 초보자의 두려움 감소
 * - 클럽이 접근 가능함을 표시
 * - 3단계 카드 (Beginner / Build / Race Prep)
 * - 공식 코칭/의료/PT 함의 금지
 */
export default function AllLevelsWelcome() {
  return (
    <section
      id="levels"
      className="relative py-16 md:py-24 px-4 md:px-6"
      aria-label="All Levels Welcome"
    >
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          titleEn="All Levels Welcome"
          titleKo="모든 실력 환영"
        />

        {/* 핵심 메시지 */}
        <div className="mb-10 md:mb-14 max-w-3xl">
          <p className="font-heading text-2xl md:text-4xl font-bold text-text uppercase leading-tight mb-3">
            New to HYROX or running?
            <br />
            <span className="bg-[image:var(--gradient-nitro)] bg-clip-text text-transparent">
              You are welcome here.
            </span>
          </p>
          <div className="space-y-1 text-base md:text-lg text-muted">
            <p>You do not need to be fast.</p>
            <p>You do not need to be experienced.</p>
            <p>Just show up, move, and build with the group.</p>
          </div>
          <div className="ko-text space-y-1 text-base md:text-lg text-muted/80 mt-4">
            <p>하이록스나 러닝이 처음이어도 괜찮습니다.</p>
            <p>빠를 필요 없습니다. 경험이 많을 필요도 없습니다.</p>
            <p>같이 시작하고, 같이 꾸준히 하면 됩니다.</p>
          </div>
        </div>

        {/* 3단계 카드 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {siteConfig.levels.map((level, i) => (
            <div
              key={i}
              className="bg-card border border-card-border rounded-2xl p-6 md:p-8 relative overflow-hidden"
            >
              <div className="flex items-center gap-3 mb-4">
                <span
                  className="font-heading text-3xl font-bold text-orange/50"
                  aria-hidden="true"
                >
                  0{i + 1}
                </span>
                <div>
                  <h3 className="font-heading text-xl font-bold text-text uppercase">
                    {level.titleEn}
                  </h3>
                  <p className="ko-text text-sm text-muted">{level.titleKo}</p>
                </div>
              </div>
              <p className="text-sm text-muted leading-relaxed mb-2">
                {level.descriptionEn}
              </p>
              <p className="ko-text text-sm text-muted/80 leading-relaxed">
                {level.descriptionKo}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}