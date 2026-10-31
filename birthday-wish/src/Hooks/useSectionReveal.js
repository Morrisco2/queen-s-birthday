
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";

const useSectionReveal = (sectionRef) => {
  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      const elements = gsap.utils.toArray(
        "[data-reveal]",
        section
      );

      gsap.set(elements, {
        autoAlpha: 0,
        y: 30,
      });

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (!entry.isIntersecting) return;

          gsap.to(elements, {
            autoAlpha: 1,
            y: 0,
            duration: 1,
            stagger: 0.15,
            ease: "power3.out",
            clearProps: "transform,opacity,visibility",
          });

          observer.disconnect();
        },
        {
          threshold: 0.15,
          rootMargin: "0px 0px -40px 0px",
        }
      );

      observer.observe(section);

      return () => observer.disconnect();
    },
    { scope: sectionRef }
  );
};

export default useSectionReveal;
