"use client";

import { siteConfig } from "@/data/site";
import { useEditableData } from "./EditableDataProvider";
import SectionHeader from "./SectionHeader";
import EventCard from "./EventCard";
import CTAButton from "./CTAButton";

/**
 * UpcomingEvents — 빌드 브리프 10.5
 * - 그룹이 실제 목표를 향해 훈련 중임을 표시
 * - HYROX, Mini HYROX, 5K, Half Marathon 일정 보드
 * - 공식 대회 등록처럼 보이지 않도록 주의
 * - Manager edit mode: EventCard 각각 인라인 수정 가능
 */
export default function UpcomingEvents() {
  const { data, isEditing } = useEditableData();

  return (
    <section
      id="events"
      className="relative py-16 md:py-24 px-4 md:px-6 bg-bg-soft"
      aria-label="Upcoming Goals"
    >
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          titleEn="Upcoming Goals"
          titleKo="함께 준비하는 목표"
          introEn="We share upcoming HYROX, Mini HYROX, 5K, and Half Marathon plans here."
          introKo="HYROX, Mini HYROX, 5K, Half Marathon 일정을 공유하고 함께 준비합니다."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
          {data.upcomingEvents.map((event, i) => (
            <EventCard
              key={i}
              index={i}
              type={event.type}
              nameEn={event.nameEn}
              nameKo={event.nameKo}
              date={event.date}
              location={event.location}
              statusEn={event.statusEn}
              statusKo={event.statusKo}
              link={event.link}
              noteEn={event.noteEn}
              noteKo={event.noteKo}
            />
          ))}
        </div>

        {/* 섹션 하단 CTA (edit mode에서는 숨김) */}
        {!isEditing && (
          <div className="mt-8 md:mt-12 text-center">
            <p className="text-base md:text-lg text-text mb-2">
              Want to train for one of these?
            </p>
            <p className="ko-text text-base text-muted mb-5">
              같이 준비하고 싶다면 오픈채팅으로 들어와 주세요.
            </p>
            <CTAButton
              href={siteConfig.kakaoOpenChatUrl}
              variant="primary"
              trackingId="click_openchat_events"
              ariaLabel="Join Kakao OpenChat to train together"
            >
              <span>Join Kakao OpenChat</span>
              <span className="ko-text">/ 카카오 오픈채팅 참여하기</span>
            </CTAButton>
          </div>
        )}
      </div>
    </section>
  );
}