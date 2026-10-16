"use client";

import { useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

/** Split only static copy; leave controls and live React content intact. */
export function useTextReveal(selector: string, enabled = true, immediate = false) {
  useLayoutEffect(() => {
    if (!enabled) return;
    let disposed = false;
    const splits: SplitText[] = [];
    const media = gsap.matchMedia();
    void document.fonts.ready.then(() => {
      if (disposed) return;
      media.add("(prefers-reduced-motion: no-preference)", () => {
        document.querySelectorAll<HTMLElement>(selector).forEach((element, index) => {
          const accessibleText = element.innerText.replace(/\s+/g, " ").trim();
          const heading = /^H[1-6]$/.test(element.tagName);
          splits.push(SplitText.create(element, {
            type: "lines",
            mask: "lines",
            linesClass: "text-reveal-line",
            autoSplit: true,
            aria: "auto",
            onSplit(self) {
              element.setAttribute("aria-label", accessibleText);
              return gsap.from(self.lines, {
                yPercent: 105,
                opacity: 0,
                duration: heading ? 0.95 : 0.75,
                stagger: heading ? 0.09 : 0.055,
                ease: "power3.out",
                delay: immediate ? index * 0.16 : 0,
                ...(immediate ? {} : { scrollTrigger: {
                  trigger: element,
                  start: "top 92%",
                  once: true,
                  invalidateOnRefresh: true,
                } }),
              });
            },
          }));
        });
        ScrollTrigger.refresh();
        return () => {
          splits.forEach(split => split.revert());
          splits.length = 0;
        };
      });
    });
    return () => {
      disposed = true;
      media.revert();
    };
  }, [selector, enabled, immediate]);
}
