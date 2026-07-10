type EventCardProps = {
  type: string;
  nameEn: string;
  nameKo: string;
  date: string;
  location: string;
  statusEn: string;
  statusKo: string;
  link?: string;
  noteEn?: string;
  noteKo?: string;
};

/**
 * EventCard — 빌드 브리프 21.1
 * - link가 있으면 "View details / 자세히 보기" 표시
 * - 외부 링크는 새 탭에서 열기
 * - link가 없으면 버튼 숨김
 * - TBD를 깨진 내용이 아닌 깔끔하게 표시
 */
export default function EventCard({
  type,
  nameEn,
  nameKo,
  date,
  location,
  statusEn,
  statusKo,
  link,
  noteEn,
  noteKo,
}: EventCardProps) {
  const hasLink = link && link.length > 0 && !link.startsWith("TODO");

  return (
    <article className="bg-card border border-card-border rounded-2xl p-5 md:p-6 flex flex-col h-full transition-colors hover:border-orange/40">
      <div className="flex items-center justify-between mb-3">
        <span className="inline-block text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-orange/15 text-orange border border-orange/30">
          {type}
        </span>
        <span className="text-xs text-muted uppercase tracking-wide">
          {statusEn}
        </span>
      </div>

      <h3 className="font-heading text-xl md:text-2xl font-bold text-text leading-tight mb-1">
        {nameEn}
      </h3>
      <p className="ko-text text-base text-muted mb-4">{nameKo}</p>

      <dl className="space-y-2 text-sm mb-4">
        <div className="flex items-center gap-2">
          <dt className="text-muted shrink-0 w-16">Date</dt>
          <dd className="text-text font-medium">{date}</dd>
        </div>
        <div className="flex items-center gap-2">
          <dt className="text-muted shrink-0 w-16">Location</dt>
          <dd className="text-text font-medium">{location}</dd>
        </div>
        <div className="flex items-center gap-2">
          <dt className="text-muted shrink-0 w-16">Status</dt>
          <dd className="ko-text text-text font-medium">{statusKo}</dd>
        </div>
      </dl>

      {(noteEn || noteKo) && (
        <div className="space-y-1 text-xs text-muted/80 mb-4 pt-3 border-t border-line">
          {noteEn && <p>{noteEn}</p>}
          {noteKo && <p className="ko-text">{noteKo}</p>}
        </div>
      )}

      <div className="mt-auto">
        {hasLink ? (
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-orange hover:text-purple transition-colors"
          >
            View details
            <span className="ko-text ml-1">/ 자세히 보기</span>
            <span aria-hidden="true">→</span>
          </a>
        ) : (
          <span className="inline-flex items-center gap-1.5 text-sm text-muted/80">
            <span className="ko-text">공식 일정 확인 중</span>
          </span>
        )}
      </div>
    </article>
  );
}