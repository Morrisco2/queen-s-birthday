
import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const portraits = [
  "/images/queen1.png",
  "/images/queen2.png",
  "/images/queen3.png",
];

const scenes = [
  {
    section: ".introduction-section",
    image: 0,
    left: "75%",
    radius: "48% 48% 42% 42%",
  },
  {
    section: ".little-things-section",
    image: 1,
    left: "25%",
    radius: "42% 42% 20% 20%",
  },
  {
    section: ".love-message-section",
    image: 2,
    left: "75%",
    radius: "12rem 12rem 1.5rem 1.5rem",
  },
];

const PortraitStage = () => {
  const stageRef = useRef(null);
  const frameRef = useRef(null);
  const imageRefs = useRef([]);

  useGSAP(
    () => {
      const isDesktop = () => window.innerWidth >= 1024;

      // Set the initial state. Nothing should animate on page load.
      gsap.set(stageRef.current, {
        left: isDesktop() ? "75%" : "50%",
        top: isDesktop() ? "50%" : "20px",
        xPercent: -50,
        yPercent: isDesktop() ? -50 : 0,
      });

      gsap.set(frameRef.current, {
        borderRadius: scenes[0].radius,
      });

      imageRefs.current.forEach((image, index) => {
        gsap.set(image, {
          autoAlpha: index === 0 ? 1 : 0,
          scale: index === 0 ? 1 : 1.08,
        });
      });

      scenes.forEach((scene, index) => {
        const section = document.querySelector(scene.section);

        if (!section) return;

        const nextScene = scenes[index + 1];

        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top center",
            end: "bottom center",
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });

        // Move the portrait according to the current section.
        if (index > 0) {
          timeline.to(
            stageRef.current,
            {
              left: () =>
                isDesktop() ? scene.left : "50%",
              ease: "none",
            },
            0
          );

          timeline.to(
            frameRef.current,
            {
              borderRadius: () =>
                isDesktop()
                  ? scene.radius
                  : "48% 48% 30% 30%",
              ease: "none",
            },
            0
          );

          // Crossfade into the current section's photograph.
          timeline.to(
            imageRefs.current[scene.image],
            {
              autoAlpha: 1,
              scale: 1,
              ease: "none",
            },
            0
          );

          timeline.to(
            imageRefs.current[index - 1],
            {
              autoAlpha: 0,
              scale: 1.08,
              ease: "none",
            },
            0
          );
        }

        // Keep the final scene in place until its section ends.
        if (!nextScene) {
          timeline.to({}, { duration: 0.1 });
        }
      });

      const refresh = () => ScrollTrigger.refresh();

      window.addEventListener("load", refresh);
      refresh();

      return () => {
        window.removeEventListener("load", refresh);
      };
    },
    { scope: stageRef }
  );

  return (
    <div
      ref={stageRef}
      className="pointer-events-none fixed z-20 w-36 sm:w-40 lg:w-[min(34vw,420px)]"
    >
      <div
        ref={frameRef}
        className="relative aspect-[4/5] overflow-hidden border-[7px] border-[#F9F0EE] bg-[#EACFD3] shadow-[0_25px_70px_rgba(114,47,73,0.20)]"
      >
        {portraits.map((src, index) => (
          <img
            key={src}
            ref={(element) => {
              imageRefs.current[index] = element;
            }}
            src={src}
            alt="My Queen"
            className="absolute inset-0 h-full w-full object-cover"
            loading="eager"
          />
        ))}

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#38232D]/15 via-transparent to-white/10" />
      </div>

      <div className="absolute -right-5 -top-5 -z-10 h-28 w-28 rounded-full border border-[#D5B77A]/70 sm:h-36 sm:w-36" />

      <div className="absolute -bottom-5 -left-5 -z-10 h-28 w-28 rounded-full border border-[#B77C8C]/50 sm:h-36 sm:w-36" />

      <div className="absolute -right-3 bottom-12 z-20 flex h-16 w-16 items-center justify-center rounded-full border border-[#D5B77A] bg-[#F9F0EE] font-['Allura'] text-3xl text-[#B77C8C] shadow-lg sm:h-20 sm:w-20">
        ♡
      </div>
    </div>
  );
};

export default PortraitStage;
