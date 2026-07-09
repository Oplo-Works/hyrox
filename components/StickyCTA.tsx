"use client";

import { useEffect, useState } from "react";
import { siteConfig } from "@/data/site";
import CTAButton from "./CTAButton";

/**
 * StickyCTA — 빌드 브리프 11
 * - 모바일 하단 고정 CTA
 * - hero 스크롤 후 표시
 * - iPhone safe-area 대응
 * - 중요 콘텐츠 가리지 않음
 */
export default function StickyCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // hero 높이(약 100svh)의 30% 스크롤 후 표시
      setVisible(window.scrollY > window.innerHeight * 0.3);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-40 md:hidden transition-transform duration-300 ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
      aria-hidden={!visible}
    >
      <div className="bg-bg/95 backdrop-blur-md border-t border-line safe-area-bottom">
        <div className="px-4 py-3">
          <CTAButton
            href={siteConfig.kakaoOpenChatUrl}
            variant="primary"
            trackingId="click_openchat_sticky"
            ariaLabel="Join Kakao OpenChat"
            className="w-full text-base"
          >
            <span>Join OpenChat</span>
            <span className="ko-text">/ 오픈채팅 참여</span>
          </CTAButton>
        </div>
      </div>
    </div>
  );
}