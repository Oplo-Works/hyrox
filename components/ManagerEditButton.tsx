"use client";

import { useEditableData } from "./EditableDataProvider";
import { useState } from "react";
import PasswordModal from "./PasswordModal";

/**
 * ManagerEditButton — 스케쥴 박스 우측 상단 수정 아이콘 버튼
 *
 * - 연필 아이콘으로 누가 봐도 수정 버튼임을 표시
 * - 클릭 시 비밀번호 모달 오픈
 * - 인증 성공 시 edit mode 토글
 * - 이미 인증된 경우 바로 edit mode 진입
 * - edit mode 중에는 "완료" 버튼으로 전환
 */

type ManagerEditButtonProps = {
  /** edit mode 토글 시 호출 (저장은 각 컴포넌트에서 처리) */
  onToggleEdit?: () => void;
  /** 현재 edit mode 상태 (저장/취소 버튼 표시용) */
  isThisEditing?: boolean;
  /** edit mode에서 취소 시 호출 */
  onCancelEdit?: () => void;
};

export default function ManagerEditButton({
  onToggleEdit,
  isThisEditing = false,
  onCancelEdit,
}: ManagerEditButtonProps) {
  const { isManagerAuthed, isEditing, setIsEditing, authenticate } = useEditableData();
  const [showPassword, setShowPassword] = useState(false);

  const handleClick = () => {
    if (isThisEditing) {
      // 현재 edit mode → 취소
      onCancelEdit?.();
      setIsEditing(false);
      return;
    }

    if (isManagerAuthed) {
      // 이미 인증됨 → edit mode 진입
      setIsEditing(!isEditing);
      onToggleEdit?.();
      return;
    }

    // 미인증 → 비밀번호 모달
    setShowPassword(true);
  };

  const handlePasswordSubmit = (password: string) => {
    const success = authenticate(password);
    if (success) {
      setShowPassword(false);
      setIsEditing(true);
      onToggleEdit?.();
    }
    return success;
  };

  // edit mode 중이고 이 버튼이 속한 섹션이 편집 중이면 "완료/취소" 스타일
  const isInEditMode = isThisEditing;

  return (
    <>
      <button
        onClick={handleClick}
        className={`absolute top-3 right-3 z-20 w-9 h-9 flex items-center justify-center rounded-lg border transition-all ${
          isInEditMode
            ? "bg-orange/20 border-orange/50 text-orange"
            : "bg-bg/40 border-line text-muted hover:text-orange hover:border-orange/40 opacity-60 hover:opacity-100"
        }`}
        aria-label={isInEditMode ? "Finish editing" : "Edit schedule"}
        title={isInEditMode ? "편집 완료" : "스케쥴 수정"}
      >
        {isInEditMode ? (
          // 체크 아이콘 (완료)
          <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <path
              d="M4 10l4 4 8-8"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        ) : (
          // 연필 아이콘 (수정)
          <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <path
              d="M13.5 3.5l3 3L7 16l-3.5.5L4 13l9.5-9.5z"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M12 5l3 3"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
          </svg>
        )}
      </button>

      <PasswordModal
        open={showPassword}
        onClose={() => setShowPassword(false)}
        onSubmit={handlePasswordSubmit}
      />
    </>
  );
}