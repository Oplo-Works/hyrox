"use client";

import { useState, useEffect } from "react";
import { siteConfig } from "@/data/site";
import { useEditableData } from "./EditableDataProvider";
import ManagerEditButton from "./ManagerEditButton";
import SectionHeader from "./SectionHeader";
import CTAButton from "./CTAButton";

/**
 * NextMeetup — 빌드 브리프 10.3
 * - 실용적인 참여 정보 표시
 * - 클럽이 활동 중임을 보여줌
 * - 정확한 장소는 OpenChat에서 공유
 * - Manager edit mode: 비밀번호 인증 후 인라인 수정 가능
 */
export default function NextMeetup() {
  const { data, isEditing, setIsEditing, updateNextMeetup } = useEditableData();
  const m = data.nextMeetup;

  // 로컬 편집 상태
  const [editData, setEditData] = useState(m);
  const [isThisEditing, setIsThisEditing] = useState(false);

  // edit mode 진입 시 현재 데이터로 초기화
  useEffect(() => {
    if (isEditing && !isThisEditing) {
      setEditData(m);
      setIsThisEditing(true);
    }
    if (!isEditing && isThisEditing) {
      setIsThisEditing(false);
    }
  }, [isEditing, isThisEditing, m]);

  const handleSave = () => {
    updateNextMeetup(editData);
    setIsEditing(false);
    setIsThisEditing(false);
  };

  const handleCancel = () => {
    setEditData(m);
    setIsEditing(false);
    setIsThisEditing(false);
  };

  const updateField = (field: keyof typeof editData, value: string | boolean | string[]) => {
    setEditData((prev) => ({ ...prev, [field]: value }));
  };

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
          {/* Manager Edit Button */}
          <ManagerEditButton
            isThisEditing={isThisEditing}
            onCancelEdit={handleCancel}
          />

          {/* 카드 배경 장식 */}
          <div
            className="absolute top-0 right-0 w-40 h-40 bg-orange/5 rounded-full blur-3xl"
            aria-hidden="true"
          />
          <div
            className="absolute bottom-0 left-0 w-40 h-40 bg-purple/5 rounded-full blur-3xl"
            aria-hidden="true"
          />

          {isThisEditing ? (
            /* ============ EDIT MODE ============ */
            <div className="relative space-y-6">
              {/* Edit mode indicator */}
              <div className="flex items-center gap-2 text-sm text-orange mb-2">
                <span className="w-2 h-2 rounded-full bg-orange animate-pulse" />
                <span>Edit Mode — 수정 중</span>
              </div>

              <div className="grid md:grid-cols-2 gap-6 md:gap-10">
                {/* 왼쪽: 날짜/시간/장소/포맷 */}
                <div className="space-y-4">
                  <EditField
                    label="Day (요일)"
                    value={editData.day}
                    onChange={(v) => updateField("day", v)}
                    placeholder="e.g. Saturday"
                  />
                  <EditField
                    label="Time (시간)"
                    value={editData.time}
                    onChange={(v) => updateField("time", v)}
                    placeholder="e.g. 8:00 AM"
                  />
                  <EditField
                    label="Location (EN)"
                    value={editData.locationAreaEn}
                    onChange={(v) => updateField("locationAreaEn", v)}
                    placeholder="e.g. Long Island City, NY"
                  />
                  <EditField
                    label="Location (KO)"
                    value={editData.locationAreaKo}
                    onChange={(v) => updateField("locationAreaKo", v)}
                    placeholder="예: 롱아일랜드시티, NY"
                    ko
                  />
                  <EditField
                    label="Format (EN)"
                    value={editData.formatEn}
                    onChange={(v) => updateField("formatEn", v)}
                    placeholder="e.g. HYROX-style circuit + easy run"
                  />
                  <EditField
                    label="Format (KO)"
                    value={editData.formatKo}
                    onChange={(v) => updateField("formatKo", v)}
                    placeholder="예: 하이록스 스타일 서킷 + 가벼운 러닝"
                    ko
                  />
                </div>

                {/* 오른쪽: 난이도/참가비/준비물 */}
                <div className="space-y-4">
                  <EditField
                    label="Level (EN)"
                    value={editData.levelEn}
                    onChange={(v) => updateField("levelEn", v)}
                    placeholder="e.g. All levels"
                  />
                  <EditField
                    label="Level (KO)"
                    value={editData.levelKo}
                    onChange={(v) => updateField("levelKo", v)}
                    placeholder="예: 누구나 참여 가능"
                    ko
                  />
                  <EditField
                    label="Fee (EN)"
                    value={editData.feeEn}
                    onChange={(v) => updateField("feeEn", v)}
                    placeholder="e.g. Free / $10"
                  />
                  <EditField
                    label="Fee (KO)"
                    value={editData.feeKo}
                    onChange={(v) => updateField("feeKo", v)}
                    placeholder="예: 무료 / $10"
                    ko
                  />
                  <EditField
                    label="Bring (EN) — comma separated"
                    value={editData.bringEn.join(", ")}
                    onChange={(v) =>
                      updateField(
                        "bringEn",
                        v.split(",").map((s) => s.trim()).filter(Boolean)
                      )
                    }
                    placeholder="Running shoes, Water, Towel"
                  />
                  <EditField
                    label="Bring (KO) — 쉼표로 구분"
                    value={editData.bringKo.join(", ")}
                    onChange={(v) =>
                      updateField(
                        "bringKo",
                        v.split(",").map((s) => s.trim()).filter(Boolean)
                      )
                    }
                    placeholder="운동화, 물, 수건"
                    ko
                  />
                </div>
              </div>

              {/* 저장/취소 버튼 */}
              <div className="flex gap-3 pt-4 border-t border-line">
                <button
                  onClick={handleSave}
                  className="flex-1 py-3 px-6 rounded-xl bg-orange text-bg font-bold text-sm hover:bg-orange/90 transition-colors"
                >
                  ✓ 저장 / Save
                </button>
                <button
                  onClick={handleCancel}
                  className="flex-1 py-3 px-6 rounded-xl border border-line text-muted font-bold text-sm hover:text-text hover:border-text/40 transition-colors"
                >
                  취소 / Cancel
                </button>
              </div>
            </div>
          ) : (
            /* ============ VIEW MODE ============ */
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
                        {m.bringKo[i] && (
                          <span className="ko-text text-muted ml-1.5">
                            {m.bringKo[i]}
                          </span>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* 정확한 장소 안내 (edit mode에서도 표시) */}
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

          {/* CTA (edit mode에서는 숨김) */}
          {!isThisEditing && (
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
          )}
        </div>
      </div>
    </section>
  );
}

/* ============ Edit Field Helper ============ */
function EditField({
  label,
  value,
  onChange,
  placeholder,
  ko = false,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  ko?: boolean;
}) {
  return (
    <div>
      <label className="block text-xs uppercase tracking-widest text-muted mb-1.5">
        {label}
      </label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`w-full px-3 py-2.5 rounded-lg bg-bg/60 border border-line text-text text-sm font-medium focus:border-orange focus:outline-none transition-colors placeholder:text-muted/40 ${
          ko ? "ko-text" : ""
        }`}
      />
    </div>
  );
}