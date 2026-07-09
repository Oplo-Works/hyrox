import { siteConfig } from "@/data/site";
import SectionHeader from "./SectionHeader";
import TrainingCard from "./TrainingCard";

/**
 * TrainingTypes — 빌드 브리프 10.4
 * - HYROX 외의 범위 표시
 * - 러너와 초보자 포함 느낌
 * - 모바일: 2열 그리드, 작은 화면: 1열
 */
export default function TrainingTypes() {
  return (
    <section
      id="training"
      className="relative py-16 md:py-24 px-4 md:px-6"
      aria-label="What We Train"
    >
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          titleEn="What We Train"
          titleKo="우리가 함께 준비하는 것"
          introEn="We train for hybrid fitness races and running events together."
          introKo="하이브리드 피트니스 레이스와 러닝 이벤트를 함께 준비합니다."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {siteConfig.trainingTypes.map((training, i) => (
            <TrainingCard
              key={i}
              titleEn={training.titleEn}
              titleKo={training.titleKo}
              descriptionEn={training.descriptionEn}
              descriptionKo={training.descriptionKo}
            />
          ))}
        </div>
      </div>
    </section>
  );
}