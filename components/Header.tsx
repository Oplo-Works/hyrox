"use client";

import { useEffect, useState } from "react";
import { siteConfig } from "@/data/site";
import CTAButton from "./CTAButton";

/**
 * Header — 빌드 브리프 10.1
 * - 모바일 우선 헤더
 * - 클럽 이름 + Join CTA
 * - 스크롤 시 배경 변경
 * - 복잡한 메뉴 사용 안 함
 */
export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-bg/90 backdrop-blur-md border-b border-line"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          <a
            href="#top"
            className="flex flex-col leading-none"
            aria-label="NY/NJ Hybrid Race Club home"
          >
            <span className="font-heading text-base md:text-lg font-bold uppercase text-text tracking-wide">
              NY/NJ Hybrid Race Club
            </span>
            <span className="ko-text text-[10px] md:text-xs text-muted mt-0.5">
              뉴욕/뉴저지 하이브리드 레이스 클럽
            </span>
          </a>

          <CTAButton
            href={siteConfig.kakaoOpenChatUrl}
            variant="primary"
            trackingId="click_openchat_header"
            className="!px-4 !py-2 !text-sm"
            ariaLabel="Join Kakao OpenChat"
          >
            <span>Join</span>
            <span className="ko-text hidden xs:inline">/ 참여</span>
          </CTAButton>
        </div>
      </div>
    </header>
  );
}