import { siteConfig } from "@/data/site";
import CTAButton from "./CTAButton";

/**
 * Footer — 빌드 브리프 10.9
 * - 클럽 이름
 * - Kakao OpenChat CTA/링크
 * - 비공식 이벤트 등록 안내 문구 (필수)
 * - 법적 면책 문구 MVP 제외
 */
export default function Footer() {
  return (
    <footer className="relative bg-bg border-t border-line px-4 md:px-6 py-12 md:py-16">
      <div className="mx-auto max-w-6xl">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
          {/* 왼쪽: 클럽 정보 */}
          <div>
            <h2 className="font-heading text-xl md:text-2xl font-bold uppercase text-text mb-1">
              {siteConfig.clubNameEn}
            </h2>
            <p className="ko-text text-base text-muted mb-3">
              {siteConfig.clubNameKo}
            </p>
            <p className="text-sm text-orange font-bold uppercase tracking-wide mb-4">
              {siteConfig.descriptor}
            </p>

            <div className="mt-4">
              <CTAButton
                href={siteConfig.kakaoOpenChatUrl}
                variant="secondary"
                trackingId="click_openchat_footer"
                ariaLabel="Join Kakao OpenChat"
                className="text-sm"
              >
                <span>Join OpenChat</span>
                <span className="ko-text">/ 오픈채팅 참여</span>
              </CTAButton>
            </div>
          </div>

          {/* 오른쪽: 비공식 안내 문구 */}
          <div className="md:text-right">
            <p className="text-xs uppercase tracking-widest text-muted mb-3">
              Notice / 안내
            </p>
            <p className="text-sm text-muted leading-relaxed mb-3">
              {siteConfig.footerNoteEn}
            </p>
            <p className="ko-text text-sm text-muted/80 leading-relaxed">
              {siteConfig.footerNoteKo}
            </p>
          </div>
        </div>

        {/* 하단 카피라이트 */}
        <div className="mt-10 md:mt-14 pt-6 border-t border-line">
          <p className="text-xs text-muted/60 text-center">
            © {new Date().getFullYear()} {siteConfig.clubNameEn}. Community
            training group.
          </p>
        </div>
      </div>
    </footer>
  );
}