"use client";

import { useState, useEffect } from "react";
import { useEditableData } from "./EditableDataProvider";
import ManagerEditButton from "./ManagerEditButton";
import ConfirmModal from "./ConfirmModal";

/**
 * EventCard — 빌드 브리프 21.1
 * - link가 있으면 "View details / 자세히 보기" 표시
 * - 외부 링크는 새 탭에서 열기
 * - link가 없으면 버튼 숨김
 * - TBD를 깨진 내용이 아닌 깔끔하게 표시
 * - Manager edit mode: 인라인 수정 가능 (이 카드만)
 * - Manager delete: 삭제 버튼 + 확인 모달
 */

type EventCardProps = {
  index: number;
  type: string;
  nameEn: string;
  nameKo: string;
  date: string;
  location: string;
  statusEn: string;
  statusKo: string;
  link?: string;
  noteEn?: string;
  noteKo?: string;
};

export default function EventCard({
  index,
  type,
  nameEn,
  nameKo,
  date,
  location,
  statusEn,
  statusKo,
  link,
  noteEn,
  noteKo,
}: EventCardProps) {
  const {
    editingId,
    setEditingId,
    updateUpcomingEvents,
    deleteUpcomingEvent,
    data,
  } = useEditableData();

  const editId = `event-${index}`;
  const isThisEditing = editingId === editId;

  const [editData, setEditData] = useState({
    type,
    nameEn,
    nameKo,
    date,
    location,
    statusEn,
    statusKo,
    link: link ?? "",
    noteEn: noteEn ?? "",
    noteKo: noteKo ?? "",
  });

  // edit mode 진입 시 현재 데이터로 초기화
  useEffect(() => {
    if (isThisEditing) {
      setEditData({
        type,
        nameEn,
        nameKo,
        date,
        location,
        statusEn,
        statusKo,
        link: link ?? "",
        noteEn: noteEn ?? "",
        noteKo: noteKo ?? "",
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isThisEditing]);

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const updateField = (field: keyof typeof editData, value: string) => {
    setEditData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    const updated = [...data.upcomingEvents];
    updated[index] = editData;
    updateUpcomingEvents(updated);
    setEditingId(null);
  };

  const handleCancel = () => {
    setEditData({
      type,
      nameEn,
      nameKo,
      date,
      location,
      statusEn,
      statusKo,
      link: link ?? "",
      noteEn: noteEn ?? "",
      noteKo: noteKo ?? "",
    });
    setEditingId(null);
  };

  const handleDeleteClick = () => {
    setShowDeleteConfirm(true);
  };

  const handleDeleteConfirm = () => {
    setShowDeleteConfirm(false);
    deleteUpcomingEvent(index);
    setEditingId(null);
  };

  const hasLink = link && link.length > 0 && !link.startsWith("TODO");

  if (isThisEditing) {
    /* ============ EDIT MODE ============ */
    return (
      <article className="bg-card border border-orange/40 rounded-2xl p-5 md:p-6 flex flex-col h-full relative">
        <div className="absolute top-3 right-3 z-20 flex items-center gap-1.5">
          {/* 삭제 버튼 (edit mode에서만 노출) */}
          <button
            onClick={handleDeleteClick}
            className="w-9 h-9 flex items-center justify-center rounded-lg border bg-red-500/10 border-red-500/40 text-red-400 hover:bg-red-500/20 transition-all"
            aria-label="Delete this schedule"
            title="스케쥴 삭제"
          >
            <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path
                d="M5 5l10 10M15 5L5 15"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
          <ManagerEditButton
            editId={editId}
            isThisEditing={isThisEditing}
            onCancelEdit={handleCancel}
          />
        </div>

        <div className="flex items-center gap-2 text-xs text-orange mb-3">
          <span className="w-1.5 h-1.5 rounded-full bg-orange animate-pulse" />
          <span>Edit</span>
        </div>

        <div className="space-y-3">
          <EditInput
            label="Type"
            value={editData.type}
            onChange={(v) => updateField("type", v)}
            placeholder="HYROX, 5K, etc."
          />
          <EditInput
            label="Name (EN)"
            value={editData.nameEn}
            onChange={(v) => updateField("nameEn", v)}
          />
          <EditInput
            label="Name (KO)"
            value={editData.nameKo}
            onChange={(v) => updateField("nameKo", v)}
            ko
          />
          <EditInput
            label="Date"
            value={editData.date}
            onChange={(v) => updateField("date", v)}
            placeholder="TBD or date"
          />
          <EditInput
            label="Location"
            value={editData.location}
            onChange={(v) => updateField("location", v)}
          />
          <EditInput
            label="Status (EN)"
            value={editData.statusEn}
            onChange={(v) => updateField("statusEn", v)}
          />
          <EditInput
            label="Status (KO)"
            value={editData.statusKo}
            onChange={(v) => updateField("statusKo", v)}
            ko
          />
          <EditInput
            label="Link (optional)"
            value={editData.link}
            onChange={(v) => updateField("link", v)}
            placeholder="https://..."
          />
          <EditInput
            label="Note (EN)"
            value={editData.noteEn}
            onChange={(v) => updateField("noteEn", v)}
            textarea
          />
          <EditInput
            label="Note (KO)"
            value={editData.noteKo}
            onChange={(v) => updateField("noteKo", v)}
            ko
            textarea
          />
        </div>

        <div className="flex gap-2 mt-4 pt-4 border-t border-line">
          <button
            onClick={handleSave}
            className="flex-1 py-2.5 px-4 rounded-lg bg-orange text-bg font-bold text-xs hover:bg-orange/90 transition-colors"
          >
            ✓ Save
          </button>
          <button
            onClick={handleCancel}
            className="flex-1 py-2.5 px-4 rounded-lg border border-line text-muted font-bold text-xs hover:text-text transition-colors"
          >
            Cancel
          </button>
        </div>

        <ConfirmModal
          open={showDeleteConfirm}
          onConfirm={handleDeleteConfirm}
          onClose={() => setShowDeleteConfirm(false)}
        />
      </article>
    );
  }

  /* ============ VIEW MODE ============ */
  return (
    <article className="bg-card border border-card-border rounded-2xl p-5 md:p-6 flex flex-col h-full transition-colors hover:border-orange/40 relative">
      <ManagerEditButton
        editId={editId}
        isThisEditing={isThisEditing}
        onCancelEdit={handleCancel}
      />

      <div className="flex items-center justify-between mb-3 pr-11">
        <span className="inline-block text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-orange/15 text-orange border border-orange/30">
          {type}
        </span>
        <span className="text-xs text-muted uppercase tracking-wide">
          {statusEn}
        </span>
      </div>

      <h3 className="font-heading text-xl md:text-2xl font-bold text-text leading-tight mb-1">
        {nameEn}
      </h3>
      <p className="ko-text text-base text-muted mb-4">{nameKo}</p>

      <dl className="space-y-2 text-sm mb-4">
        <div className="flex items-center gap-2">
          <dt className="text-muted shrink-0 w-16">Date</dt>
          <dd className="text-text font-medium">{date}</dd>
        </div>
        <div className="flex items-center gap-2">
          <dt className="text-muted shrink-0 w-16">Location</dt>
          <dd className="text-text font-medium">{location}</dd>
        </div>
        <div className="flex items-center gap-2">
          <dt className="text-muted shrink-0 w-16">Status</dt>
          <dd className="ko-text text-text font-medium">{statusKo}</dd>
        </div>
      </dl>

      {(noteEn || noteKo) && (
        <div className="space-y-1 text-xs text-muted/80 mb-4 pt-3 border-t border-line">
          {noteEn && <p>{noteEn}</p>}
          {noteKo && <p className="ko-text">{noteKo}</p>}
        </div>
      )}

      <div className="mt-auto">
        {hasLink ? (
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-orange hover:text-purple transition-colors"
          >
            View details
            <span className="ko-text ml-1">/ 자세히 보기</span>
            <span aria-hidden="true">→</span>
          </a>
        ) : (
          <span className="inline-flex items-center gap-1.5 text-sm text-muted/80">
            <span className="ko-text">공식 일정 확인 중</span>
          </span>
        )}
      </div>
    </article>
  );
}

/* ============ Edit Input Helper ============ */
function EditInput({
  label,
  value,
  onChange,
  placeholder,
  ko = false,
  textarea = false,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  ko?: boolean;
  textarea?: boolean;
}) {
  return (
    <div>
      <label className="block text-[10px] uppercase tracking-widest text-muted mb-1">
        {label}
      </label>
      {textarea ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          rows={2}
          className={`w-full px-2.5 py-2 rounded-lg bg-bg/60 border border-line text-text text-xs font-medium focus:border-orange focus:outline-none transition-colors placeholder:text-muted/40 resize-none ${
            ko ? "ko-text" : ""
          }`}
        />
      ) : (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={`w-full px-2.5 py-2 rounded-lg bg-bg/60 border border-line text-text text-xs font-medium focus:border-orange focus:outline-none transition-colors placeholder:text-muted/40 ${
            ko ? "ko-text" : ""
          }`}
        />
      )}
    </div>
  );
}