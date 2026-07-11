"use client";

import { useState, useRef, useEffect, type KeyboardEvent } from "react";

/**
 * PasswordModal — 6-digit password gate for manager edit access
 *
 * - 6개의 개별 input 박스로 구성된 PIN 입력 UI
 * - 숫자만 입력 가능, 자동으로 다음 박스로 포커스 이동
 * - Backspace 시 이전 박스로 이동
 * - 6자리 완성 시 자동 검증 시도
 * - Enter 키로 수동 제출
 */

type PasswordModalProps = {
  open: boolean;
  onClose: () => void;
  onSubmit: (password: string) => boolean; // returns true if correct
};

export default function PasswordModal({ open, onClose, onSubmit }: PasswordModalProps) {
  const [digits, setDigits] = useState<string[]>(["", "", "", "", "", ""]);
  const [error, setError] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // 모달 열릴 때 첫 번째 input에 포커스
  useEffect(() => {
    if (open) {
      setDigits(["", "", "", "", "", ""]);
      setError(false);
      setAttempts(0);
      setTimeout(() => inputRefs.current[0]?.focus(), 50);
    }
  }, [open]);

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

  const handleChange = (index: number, value: string) => {
    // 숫자만 추출
    const num = value.replace(/\D/g, "");
    if (num.length === 0) {
      setDigits((prev) => {
        const next = [...prev];
        next[index] = "";
        return next;
      });
      return;
    }

    // 한 글자만 입력
    const single = num.slice(-1);
    setDigits((prev) => {
      const next = [...prev];
      next[index] = single;
      return next;
    });

    // 다음 박스로 이동
    if (index < 5) {
      inputRefs.current[index + 1]?.focus();
    } else {
      // 마지막 박스: 자동 제출
      const full = [...digits];
      full[index] = single;
      const password = full.join("");
      if (password.length === 6) {
        trySubmit(password);
      }
    }
  };

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && digits[index] === "" && index > 0) {
      // 현재 박스가 비어있고 Backspace → 이전 박스로 이동 후 삭제
      inputRefs.current[index - 1]?.focus();
      setDigits((prev) => {
        const next = [...prev];
        next[index - 1] = "";
        return next;
      });
    } else if (e.key === "Enter") {
      const password = digits.join("");
      if (password.length === 6) {
        trySubmit(password);
      }
    } else if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === "ArrowRight" && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (pasted.length === 0) return;

    const newDigits = ["", "", "", "", "", ""];
    for (let i = 0; i < pasted.length; i++) {
      newDigits[i] = pasted[i];
    }
    setDigits(newDigits);

    if (pasted.length === 6) {
      trySubmit(pasted);
    } else {
      inputRefs.current[pasted.length]?.focus();
    }
  };

  const trySubmit = (password: string) => {
    const success = onSubmit(password);
    if (!success) {
      setError(true);
      setAttempts((a) => a + 1);
      setDigits(["", "", "", "", "", ""]);
      setTimeout(() => inputRefs.current[0]?.focus(), 100);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Manager password"
    >
      {/* 배경 오버레이 */}
      <div
        className="absolute inset-0 bg-bg/80 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* 모달 카드 */}
      <div className="relative bg-card border border-card-border rounded-2xl p-6 md:p-8 w-full max-w-sm shadow-2xl">
        {/* 닫기 버튼 */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center text-muted hover:text-text transition-colors rounded-lg"
          aria-label="Close"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path
              d="M3 3L13 13M13 3L3 13"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>

        {/* 아이콘 */}
        <div className="flex justify-center mb-4">
          <div className="w-12 h-12 rounded-full bg-orange/15 border border-orange/30 flex items-center justify-center">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M7 10V8a5 5 0 0110 0v2M5 10h14v10H5V10z"
                stroke="var(--color-orange)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle cx="12" cy="15" r="1.5" fill="var(--color-orange)" />
            </svg>
          </div>
        </div>

        <h2 className="font-heading text-xl text-text text-center mb-1">
          Manager Access
        </h2>
        <p className="ko-text text-sm text-muted text-center mb-6">
          6자리 비밀번호를 입력하세요
        </p>

        {/* PIN 입력 */}
        <div className="flex justify-center gap-2 mb-4" onPaste={handlePaste}>
          {digits.map((digit, i) => (
            <input
              key={i}
              ref={(el) => {
                inputRefs.current[i] = el;
              }}
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(i, e.target.value)}
              onKeyDown={(e) => handleKeyDown(i, e)}
              onFocus={(e) => e.target.select()}
              className={`w-11 h-14 text-center text-2xl font-bold rounded-xl border-2 bg-bg/60 text-text transition-colors ${
                error
                  ? "border-red-500/60 animate-pulse"
                  : digit
                    ? "border-orange/50"
                    : "border-line focus:border-orange"
              }`}
              aria-label={`Digit ${i + 1}`}
              autoComplete="off"
            />
          ))}
        </div>

        {/* 에러 메시지 */}
        {error && (
          <p className="text-sm text-red-400 text-center mb-2">
            비밀번호가 올바르지 않습니다{attempts > 1 ? ` (${attempts}회 시도)` : ""}
          </p>
        )}

        {/* 힌트 */}
        <p className="text-xs text-muted/60 text-center mt-4">
          Manager 전용 수정 모드입니다.
        </p>
      </div>
    </div>
  );
}