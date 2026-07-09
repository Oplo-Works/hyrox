"use client";

import { useState } from "react";
import { siteConfig } from "@/data/site";
import SectionHeader from "./SectionHeader";

/**
 * FAQ — 빌드 브리프 10.8
 * - 짧은 FAQ (6개 질문)
 * - 아코디언 형태
 * - 영어/한국어 함께 표시
 */
export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section
      id="faq"
      className="relative py-16 md:py-24 px-4 md:px-6"
      aria-label="FAQ"
    >
      <div className="mx-auto max-w-3xl">
        <SectionHeader titleEn="FAQ" titleKo="자주 묻는 질문" />

        <div className="space-y-3">
          {siteConfig.faq.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={i}
                className="bg-card border border-card-border rounded-xl overflow-hidden"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="w-full text-left p-4 md:p-5 flex items-start justify-between gap-4 focus:outline-none"
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${i}`}
                >
                  <div className="flex-1">
                    <p className="font-bold text-text text-base md:text-lg">
                      {item.questionEn}
                    </p>
                    <p className="ko-text text-sm text-muted mt-0.5">
                      {item.questionKo}
                    </p>
                  </div>
                  <span
                    className={`text-orange text-xl shrink-0 transition-transform duration-200 ${
                      isOpen ? "rotate-45" : ""
                    }`}
                    aria-hidden="true"
                  >
                    +
                  </span>
                </button>

                {isOpen && (
                  <div
                    id={`faq-answer-${i}`}
                    className="px-4 md:px-5 pb-4 md:pb-5 pt-0"
                  >
                    <div className="pt-3 border-t border-line">
                      <p className="text-sm md:text-base text-muted leading-relaxed mt-3">
                        {item.answerEn}
                      </p>
                      <p className="ko-text text-sm md:text-base text-muted/80 leading-relaxed mt-2">
                        {item.answerKo}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}