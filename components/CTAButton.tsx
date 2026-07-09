import Link from "next/link";

type CTAButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  trackingId?: string;
  className?: string;
  ariaLabel?: string;
};

/**
 * CTAButton — 빌드 브리프 21.3
 * - 외부 Kakao 링크는 실제 anchor 태그 사용
 * - 새 탭에서 열기
 * - rel="noopener noreferrer" 적용
 * - 최소 44px 높이 (모바일 접근성)
 */
export default function CTAButton({
  href,
  children,
  variant = "primary",
  trackingId,
  className = "",
  ariaLabel,
}: CTAButtonProps) {
  const baseClasses =
    "inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-base font-bold min-h-[44px] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-race-yellow)] focus-visible:ring-offset-2 focus-visible:ring-offset-bg";

  const variantClasses =
    variant === "primary"
      ? "bg-[var(--color-race-yellow)] text-bg cta-glow hover:bg-[#dfe000]"
      : "bg-transparent text-text border border-line hover:border-[var(--color-race-yellow)] hover:text-[var(--color-race-yellow)]";

  const isExternal =
    href.startsWith("http") || href.startsWith("TODO") || href === "#";

  // TODO 링크인 경우 클릭해도 이동하지 않도록 처리
  const isPlaceholder = href.startsWith("TODO") || href === "#";

  if (isPlaceholder) {
    return (
      <span
        className={`${baseClasses} ${variantClasses} ${className} opacity-60 cursor-not-allowed`}
        aria-label={ariaLabel}
        data-tracking={trackingId}
        role="button"
        aria-disabled="true"
      >
        {children}
      </span>
    );
  }

  if (isExternal) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`${baseClasses} ${variantClasses} ${className}`}
        aria-label={ariaLabel}
        data-tracking={trackingId}
      >
        {children}
      </a>
    );
  }

  return (
    <Link
      href={href}
      className={`${baseClasses} ${variantClasses} ${className}`}
      aria-label={ariaLabel}
      data-tracking={trackingId}
    >
      {children}
    </Link>
  );
}
