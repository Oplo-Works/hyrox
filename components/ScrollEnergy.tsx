"use client";

import { useEffect } from "react";

/**
 * ScrollEnergy keeps the decorative race treatment in sync with the reader's pace.
 * It avoids per-frame React rendering so mobile scrolling stays responsive.
 */
export default function ScrollEnergy() {
  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>("main > section")
    );

    sections.forEach((section) => section.classList.add("scroll-reveal"));

    if (reducedMotion.matches) {
      sections.forEach((section) => section.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );

    sections.forEach((section) => observer.observe(section));

    const root = document.documentElement;
    let lastScrollY = window.scrollY;
    let animationFrame: number | null = null;
    let settleTimer: number | null = null;

    const updateScrollEnergy = () => {
      const currentScrollY = window.scrollY;
      const maximumScroll = Math.max(
        document.documentElement.scrollHeight - window.innerHeight,
        1
      );
      const delta = currentScrollY - lastScrollY;
      const intensity = Math.min(Math.abs(delta) / 38, 1);

      root.style.setProperty("--scroll-progress", String(currentScrollY / maximumScroll));
      root.style.setProperty("--scroll-intensity", String(Math.max(intensity, 0.08)));
      document.body.dataset.scrollDirection = delta < 0 ? "up" : "down";
      document.body.dataset.scrolling = "true";

      if (settleTimer) window.clearTimeout(settleTimer);
      settleTimer = window.setTimeout(() => {
        document.body.dataset.scrolling = "false";
        root.style.setProperty("--scroll-intensity", "0");
      }, 120);

      lastScrollY = currentScrollY;
      animationFrame = null;
    };

    const handleScroll = () => {
      if (animationFrame === null) {
        animationFrame = window.requestAnimationFrame(updateScrollEnergy);
      }
    };

    updateScrollEnergy();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
      if (animationFrame !== null) window.cancelAnimationFrame(animationFrame);
      if (settleTimer) window.clearTimeout(settleTimer);
      delete document.body.dataset.scrollDirection;
      delete document.body.dataset.scrolling;
    };
  }, []);

  return (
    <div className="scroll-energy" aria-hidden="true">
      <span className="scroll-energy__progress" />
      <span className="scroll-energy__lane scroll-energy__lane--left" />
      <span className="scroll-energy__lane scroll-energy__lane--right" />
      <span className="scroll-energy__flash" />
    </div>
  );
}
