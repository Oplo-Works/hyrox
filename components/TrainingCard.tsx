type TrainingCardProps = {
  titleEn: string;
  titleKo: string;
  descriptionEn: string;
  descriptionKo: string;
};

/**
 * TrainingCard — 빌드 브리프 21.2
 * 훈련 종류 카드 (영어 제목 + 한국어 제목 + 설명)
 */
export default function TrainingCard({
  titleEn,
  titleKo,
  descriptionEn,
  descriptionKo,
}: TrainingCardProps) {
  return (
    <article className="bg-card border border-card-border rounded-2xl p-5 md:p-6 h-full transition-all hover:border-orange/40 hover:translate-y-[-2px]">
      <div className="flex items-start gap-3 mb-3">
        <span
          className="mt-1 h-2 w-2 rounded-full bg-green shrink-0"
          aria-hidden="true"
        />
        <div>
          <h3 className="font-heading text-lg md:text-xl font-bold text-text leading-tight">
            {titleEn}
          </h3>
          <p className="ko-text text-sm text-muted mt-0.5">{titleKo}</p>
        </div>
      </div>
      <p className="text-sm text-muted leading-relaxed mb-2">{descriptionEn}</p>
      <p className="ko-text text-sm text-muted/80 leading-relaxed">
        {descriptionKo}
      </p>
    </article>
  );
}