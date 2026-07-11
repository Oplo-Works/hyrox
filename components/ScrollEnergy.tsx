"use client";

import { useEffect } from "react";

/**
 * ScrollEnergy keeps the decorative race treatment in sync with the reader's pace.
 * It avoids per-frame React rendering so mobile scrolling stays responsive.
 * Also maps scroll progress to the 8 HYROX stations (race order) for
 * WorkoutSilhouettes via body[data-station] / body[data-bridge].
 */
const STATION_COUNT = 8;
/** 각 구간 앞 16%는 1 km Run 브릿지(러닝 실루엣) 구간 */
const RUN_BRIDGE_RATIO = 0.16;
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
      const progress = currentScrollY / maximumScroll;
      const stationSlot = Math.min(
        Math.floor(progress * STATION_COUNT),
        STATION_COUNT - 1
      );
      const stationProgress = progress * STATION_COUNT - stationSlot;

      root.style.setProperty("--scroll-progress", String(progress));
      root.style.setProperty("--scroll-intensity", String(Math.max(intensity, 0.08)));
      document.body.dataset.scrollDirection = delta < 0 ? "up" : "down";
      document.body.dataset.scrolling = "true";
      document.body.dataset.station = String(stationSlot);
      document.body.dataset.bridge =
        stationProgress < RUN_BRIDGE_RATIO ? "true" : "false";

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
      delete document.body.dataset.station;
      delete document.body.dataset.bridge;
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
