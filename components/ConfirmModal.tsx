"use client";

import { useEffect } from "react";

/**
 * ConfirmModal — 삭제 전 확인 경고 모달
 *
 * - Manager가 delete 클릭 시 한번 더 확인하도록 노출
 * - "정말 삭제하시겠습니까?" 경고 문구 + Confirm/Cancel 버튼
 * - Confirm 버튼을 눌러야만 실제 삭제 진행
 */

type ConfirmModalProps = {
  open: boolean;
  title?: string;
  message?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onClose: () => void;
};

export default function ConfirmModal({
  open,
  title = "삭제 확인",
  message = "정말 이 스케쥴을 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.",
  confirmLabel = "Confirm / 삭제",
  cancelLabel = "Cancel / 취소",
  onConfirm,
  onClose,
}: ConfirmModalProps) {
  // ESC 키로 닫기
  useEffect(() => {
    if (!open) return;
    const handler = (e: globalThis.KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[110] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Delete confirmation"
    >
      {/* 배경 오버레이 */}
      <div
        className="absolute inset-0 bg-bg/80 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* 모달 카드 */}
      <div className="relative bg-card border border-red-500/40 rounded-2xl p-6 md:p-8 w-full max-w-sm shadow-2xl">
        {/* 경고 아이콘 */}
        <div className="flex justify-center mb-4">
          <div className="w-12 h-12 rounded-full bg-red-500/15 border border-red-500/40 flex items-center justify-center">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M12 9v4M12 17h.01M10.3 3.9L2.5 17.5C1.8 18.7 2.6 20 4 20h16c1.4 0 2.2-1.3 1.5-2.5L13.7 3.9c-.7-1.2-2.7-1.2-3.4 0z"
                stroke="#ef4444"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>

        <h2 className="font-heading text-xl text-text text-center mb-2">
          {title}
        </h2>
        <p className="text-sm text-muted text-center mb-6 leading-relaxed">
          {message}
        </p>

        {/* 버튼 */}
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-3 px-4 rounded-xl border border-line text-muted font-bold text-sm hover:text-text hover:border-text/40 transition-colors"
          >
            {cancelLabel}
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 py-3 px-4 rounded-xl bg-red-500 text-white font-bold text-sm hover:bg-red-500/90 transition-colors"
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}