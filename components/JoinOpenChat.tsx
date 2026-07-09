import { siteConfig } from "@/data/site";
import SectionHeader from "./SectionHeader";
import CTAButton from "./CTAButton";

/**
 * JoinOpenChat — 빌드 브리프 10.7
 * - 최종 전환 섹션
 * - QR 이미지가 있으면 표시, 없으면 placeholder 숨김
 * - 깨진 이미지 표시 금지
 */
export default function JoinOpenChat() {
  return (
    <section
      id="join"
      className="relative py-16 md:py-24 px-4 md:px-6 bg-bg-soft"
      aria-label="Join Kakao OpenChat"
    >
      <div className="mx-auto max-w-6xl">
        <SectionHeader titleEn="Join the Club" titleKo="참여 방법" />

        <div className="grid md:grid-cols-2 gap-6 md:gap-10 items-center">
          {/* 왼쪽: 설명 + CTA */}
          <div className="space-y-4">
            <p className="text-base md:text-lg text-text">
              Most updates happen in Kakao OpenChat. Join to see meetup
              details, training updates, and upcoming race plans.
            </p>
            <p className="ko-text text-base md:text-lg text-muted">
              모임 일정, 장소, 운동 내용, 대회 일정은 카카오 오픈채팅에서
              공유합니다. 관심 있으신 분들은 편하게 들어와 주세요.
            </p>

            <div className="pt-4">
              <CTAButton
                href={siteConfig.kakaoOpenChatUrl}
                variant="primary"
                trackingId="click_openchat_final"
                ariaLabel="Join Kakao OpenChat"
                className="text-base md:text-lg"
              >
                <span>Join Kakao OpenChat</span>
                <span className="ko-text">/ 카카오 오픈채팅 참여하기</span>
              </CTAButton>
            </div>
          </div>

          {/* 오른쪽: QR 코드 (있을 경우만) */}
          {siteConfig.kakaoQrAvailable && (
            <div className="flex flex-col items-center md:items-end">
              <div className="bg-white p-4 rounded-2xl max-w-[220px] w-full">
                {/* TODO: 실제 QR 이미지 추가 시 next/image 컴포넌트로 교체 */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={siteConfig.kakaoQrImage}
                  alt="Kakao OpenChat QR code"
                  width={200}
                  height={200}
                  className="w-full h-auto rounded-lg"
                />
              </div>
              <p className="text-sm text-text mt-3 font-bold">Scan to join</p>
              <p className="ko-text text-sm text-muted">QR로 참여하기</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}