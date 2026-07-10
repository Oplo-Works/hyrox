"use client";

import { useState } from "react";
import { siteConfig } from "@/data/site";
import { useEditableData } from "./EditableDataProvider";
import SectionHeader from "./SectionHeader";
import EventCard from "./EventCard";
import CTAButton from "./CTAButton";
import PasswordModal from "./PasswordModal";

/**
 * UpcomingEvents — 빌드 브리프 10.5
 * - 그룹이 실제 목표를 향해 훈련 중임을 표시
 * - HYROX, Mini HYROX, 5K, Half Marathon 일정 보드
 * - 공식 대회 등록처럼 보이지 않도록 주의
 * - Manager edit mode: EventCard 각각 인라인 수정 가능 (개별)
 * - Manager add: 섹션 우측 상단 "+" 버튼 → 비밀번호 인증 → 새 스케쥴 추가 후 edit mode
 */
export default function UpcomingEvents() {
  const {
    data,
    editingId,
    isManagerAuthed,
    authenticate,
    setEditingId,
  } = useEditableData();
  const [showPassword, setShowPassword] = useState(false);
  // "새 스케줄 추가" 모드: 데이터에 아직 추가하지 않고 편집 폼만 노출.
  // 저장 시에만 addUpcomingEvent 호출, 취소 시 아무것도 추가하지 않음.
  const [isAddingNew, setIsAddingNew] = useState(false);

  const NEW_EVENT_EDIT_ID = "event-new";

  const handleAddClick = () => {
    if (isManagerAuthed) {
      startAddingNew();
      return;
    }
    setShowPassword(true);
  };

  const startAddingNew = () => {
    setIsAddingNew(true);
    setEditingId(NEW_EVENT_EDIT_ID);
  };

  const handlePasswordSubmit = (password: string) => {
    const success = authenticate(password);
    if (success) {
      setShowPassword(false);
      startAddingNew();
    }
    return success;
  };

  return (
    <section
      id="events"
      className="relative py-16 md:py-24 px-4 md:px-6 bg-bg-soft"
      aria-label="Upcoming Goals"
    >
      <div className="mx-auto max-w-6xl">
        <div className="relative">
          <SectionHeader
            titleEn="Upcoming Goals"
            titleKo="함께 준비하는 목표"
            introEn="We share upcoming HYROX, Mini HYROX, 5K, and Half Marathon plans here."
            introKo="HYROX, Mini HYROX, 5K, Half Marathon 일정을 공유하고 함께 준비합니다."
          />

          {/* Add schedule 버튼 (우측 상단) — Manager 비밀번호 필요 */}
          <button
            onClick={handleAddClick}
            className="absolute top-0 right-0 z-20 w-10 h-10 flex items-center justify-center rounded-xl border border-orange/40 bg-orange/10 text-orange hover:bg-orange/20 transition-all"
            aria-label="Add new schedule"
            title="스케쥴 추가"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path
                d="M10 4v12M4 10h12"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 mt-6">
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

          {/* 새 스케줄 추가 폼 (저장 전까지 데이터에 추가하지 않음) */}
          {isAddingNew && (
            <EventCard
              key="new-event"
              index={-1}
              type="TODO"
              nameEn="TODO: New Goal"
              nameKo="TODO: 새 목표"
              date="TBD"
              location="TBD"
              statusEn="Planning"
              statusKo="준비 중"
              link=""
              noteEn=""
              noteKo=""
              isNew
              onAddComplete={() => {
                setIsAddingNew(false);
              }}
              onAddCancel={() => {
                setIsAddingNew(false);
                setEditingId(null);
              }}
            />
          )}
        </div>

        {/* 섹션 하단 CTA (edit mode에서는 숨김) */}
        {editingId === null && (
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

      <PasswordModal
        open={showPassword}
        onClose={() => setShowPassword(false)}
        onSubmit={handlePasswordSubmit}
      />
    </section>
  );
}