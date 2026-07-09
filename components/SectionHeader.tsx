type SectionHeaderProps = {
  titleEn: string;
  titleKo: string;
  introEn?: string;
  introKo?: string;
  id?: string;
};

/**
 * SectionHeader — 섹션 헤더 재사용 컴포넌트
 * 영어 헤드라인 + 한국어 부제 + 소개 문구
 */
export default function SectionHeader({
  titleEn,
  titleKo,
  introEn,
  introKo,
  id,
}: SectionHeaderProps) {
  return (
    <div className="mb-8 md:mb-12" id={id}>
      <div className="flex items-center gap-3 mb-3">
        <span className="h-6 w-1 bg-orange rounded-full" aria-hidden="true" />
        <h2 className="font-heading text-3xl md:text-5xl font-bold uppercase text-text leading-tight">
          {titleEn}
        </h2>
      </div>
      <p className="ko-text text-lg md:text-xl text-muted mb-4 font-medium">
        {titleKo}
      </p>
      {(introEn || introKo) && (
        <div className="space-y-1">
          {introEn && (
            <p className="text-base md:text-lg text-muted">{introEn}</p>
          )}
          {introKo && (
            <p className="ko-text text-base md:text-lg text-muted/80">
              {introKo}
            </p>
          )}
        </div>
      )}
    </div>
  );
}