"use client";

import { motion } from "framer-motion";
import { siteConfig } from "@/data/site";
import CTAButton from "./CTAButton";

/**
 * Hero — 빌드 브리프 10.2
 * - 다크, 고에너지, 다이나믹
 * - 큰 타이포그래피, 명확한 CTA
 * - 모바일에서 흥미롭게 보이도록
 * - HYROX 공식 로고/이미지 사용 금지
 */
export default function Hero() {
  return (
    <section
      id="top"
      className="relative hero-bg hero-race-surface min-h-[100svh] flex items-center overflow-hidden pt-20 md:pt-24"
      aria-label="Hero"
    >
      {/* 그리드 라인 배경 */}
      <div
        className="absolute inset-0 grid-lines opacity-40"
        aria-hidden="true"
      />

      {/* 모션 라인들 */}
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        <div
          className="motion-line w-full animate-line-move"
          style={{ top: "25%", animationDelay: "0s" }}
        />
        <div
          className="motion-line w-full animate-line-move"
          style={{ top: "55%", animationDelay: "2s" }}
        />
        <div
          className="motion-line w-full animate-line-move"
          style={{ top: "80%", animationDelay: "4s" }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-4 md:px-6 w-full py-16 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-3xl"
        >
          {/* 디스크립터 */}
          <div className="flex items-center gap-2 mb-4 md:mb-6">
            <span
              className="h-px w-8 bg-gradient-to-r from-orange via-magenta to-purple"
              aria-hidden="true"
            />
            <span className="text-xs md:text-sm font-bold uppercase tracking-widest text-orange">
              {siteConfig.descriptor}
            </span>
          </div>

          {/* 메인 헤드라인 (h1) */}
          <h1 className="font-heading text-4xl xs:text-5xl md:text-7xl lg:text-8xl font-bold uppercase text-text leading-[0.95] mb-3 md:mb-4">
            NY/NJ Hybrid
            <br />
            <span className="bg-[image:var(--gradient-nitro)] bg-clip-text text-transparent">
              Race Club
            </span>
          </h1>

          {/* 한국어 클럽명 */}
          <p className="ko-text text-xl md:text-3xl text-muted font-bold mb-6 md:mb-8">
            {siteConfig.clubNameKo}
          </p>

          {/* 핵심 메시지 */}
          <div className="space-y-1 mb-8 md:mb-10">
            <p className="font-heading text-2xl md:text-4xl font-bold text-text uppercase leading-tight">
              Train together. Race together.
            </p>
            <p className="font-heading text-xl md:text-3xl font-bold text-purple uppercase leading-tight">
              All levels welcome.
            </p>
            <p className="ko-text text-base md:text-xl text-muted mt-2">
              같이 운동하고, 같이 준비하고, 같이 도전합니다.
              <br />
              초보자부터 경험자까지 누구나 환영합니다.
            </p>
          </div>

          {/* CTA 버튼 */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <CTAButton
              href={siteConfig.kakaoOpenChatUrl}
              variant="primary"
              trackingId="click_openchat_hero"
              ariaLabel="Join Kakao OpenChat"
              className="text-base md:text-lg"
            >
              <span>Join Kakao OpenChat</span>
              <span className="ko-text">/ 카카오 오픈채팅 참여하기</span>
            </CTAButton>
            <CTAButton
              href="#meetup"
              variant="secondary"
              ariaLabel="See next meetup"
              className="text-base md:text-lg"
            >
              <span>See Next Meetup</span>
              <span className="ko-text">/ 다음 모임 보기</span>
            </CTAButton>
          </div>
        </motion.div>
      </div>

      <div className="hero-lane-markers" aria-hidden="true">
        <span />
        <span />
        <span />
        <span />
      </div>

      {/* 하단 그라데이션 페이드 */}
      <div
        className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-b from-transparent to-bg pointer-events-none"
        aria-hidden="true"
      />
    </section>
  );
}
