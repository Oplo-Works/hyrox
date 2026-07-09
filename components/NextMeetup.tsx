import { siteConfig } from "@/data/site";
import SectionHeader from "./SectionHeader";
import CTAButton from "./CTAButton";

/**
 * NextMeetup — 빌드 브리프 10.3
 * - 실용적인 참여 정보 표시
 * - 클럽이 활동 중임을 보여줌
 * - 정확한 장소는 OpenChat에서 공유
 */
export default function NextMeetup() {
  const m = siteConfig.nextMeetup;

  return (
    <section
      id="meetup"
      className="relative py-16 md:py-24 px-4 md:px-6 bg-bg-soft"
      aria-label="Next Meetup"
    >
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          titleEn="Next Meetup"
          titleKo="다음 모임"
          introEn="Join our next group session for a mix of running, strength, and HYROX-style conditioning."
          introKo="러닝, 근력 운동, HYROX 스타일 컨디셔닝을 함께 진행하는 그룹 세션입니다."
        />

        <div className="bg-card border border-card-border rounded-3xl p-6 md:p-10 relative overflow-hidden">
          {/* 카드 배경 장식 */}
          <div
            className="absolute top-0 right-0 w-40 h-40 bg-orange/5 rounded-full blur-3xl"
            aria-hidden="true"
          />

          <div className="relative grid md:grid-cols-2 gap-6 md:gap-10">
            {/* 왼쪽: 날짜/시간/장소 */}
            <div className="space-y-5">
              <div>
                <p className="text-xs uppercase tracking-widest text-muted mb-1">
                  When
                </p>
                <p className="font-heading text-2xl md:text-3xl font-bold text-text">
                  {m.day}
                </p>
                <p className="text-lg md:text-xl text-orange font-bold">
                  {m.time}
                </p>
              </div>

              <div>
                <p className="text-xs uppercase tracking-widest text-muted mb-1">
                  Where
                </p>
                <p className="text-lg md:text-xl text-text font-medium">
                  {m.locationAreaEn}
                </p>
                <p className="ko-text text-base text-muted">
                  {m.locationAreaKo}
                </p>
              </div>

              <div>
                <p className="text-xs uppercase tracking-widest text-muted mb-1">
                  Format
                </p>
                <p className="text-base md:text-lg text-text font-medium">
                  {m.formatEn}
                </p>
                <p className="ko-text text-base text-muted">{m.formatKo}</p>
              </div>
            </div>

            {/* 오른쪽: 난이도/참가비/준비물 */}
            <div className="space-y-5">
              <div>
                <p className="text-xs uppercase tracking-widest text-muted mb-1">
                  Level
                </p>
                <p className="text-base md:text-lg text-text font-medium">
                  {m.levelEn}
                </p>
                <p className="ko-text text-base text-muted">{m.levelKo}</p>
              </div>

              <div>
                <p className="text-xs uppercase tracking-widest text-muted mb-1">
                  Fee
                </p>
                <p className="text-base md:text-lg text-text font-medium">
                  {m.feeEn}
                </p>
                <p className="ko-text text-base text-muted">{m.feeKo}</p>
              </div>

              <div>
                <p className="text-xs uppercase tracking-widest text-muted mb-1">
                  Bring
                </p>
                <ul className="flex flex-wrap gap-2 mt-2">
                  {m.bringEn.map((item, i) => (
                    <li
                      key={i}
                      className="text-sm bg-bg/60 border border-line rounded-lg px-3 py-1.5 text-text"
                    >
                      {item}
                      <span className="ko-text text-muted ml-1.5">
                        {m.bringKo[i]}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* 정확한 장소 안내 */}
          {!m.exactLocationPublic && (
            <div className="relative mt-6 md:mt-8 p-4 bg-bg/60 border border-line rounded-xl">
              <p className="text-sm text-muted flex items-start gap-2">
                <span className="text-orange" aria-hidden="true">
                  ℹ
                </span>
                <span>{m.exactLocationNoteEn}</span>
              </p>
              <p className="ko-text text-sm text-muted/80 mt-1 ml-6">
                {m.exactLocationNoteKo}
              </p>
            </div>
          )}

          {/* CTA */}
          <div className="relative mt-6 md:mt-8">
            <CTAButton
              href={siteConfig.kakaoOpenChatUrl}
              variant="primary"
              trackingId="click_openchat_meetup"
              ariaLabel="Join Kakao OpenChat for meetup details"
            >
              <span>Join Kakao OpenChat</span>
              <span className="ko-text">/ 카카오 오픈채팅 참여하기</span>
            </CTAButton>
          </div>
        </div>
      </div>
    </section>
  );
}