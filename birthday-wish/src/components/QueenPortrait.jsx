
import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const QueenPortrait = ({
  image,
  position = "right",
  frame = "arch",
  className = "",
}) => {
  const portraitRef = useRef(null);
  const imageRef = useRef(null);

  useGSAP(
    () => {
      const portrait = portraitRef.current;
      const picture = imageRef.current;

      gsap.set(portrait, {
        autoAlpha: 0,
        y: 35,
        scale: 0.96,
      });

      gsap.set(picture, {
        scale: 1.12,
        filter: "blur(8px)",
      });

      gsap.to(portrait, {
        autoAlpha: 1,
        y: 0,
        scale: 1,
        duration: 1.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: portrait,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play reverse play reverse",
        },
      });

      gsap.to(picture, {
        scale: 1,
        filter: "blur(0px)",
        duration: 1.4,
        ease: "power3.out",
        scrollTrigger: {
          trigger: portrait,
          start: "top 80%",
          toggleActions: "play reverse play reverse",
        },
      });
    },
    { scope: portraitRef, dependencies: [image] }
  );

  const frameStyles = {
    arch: "rounded-t-[48%] rounded-b-[42%]",
    soft: "rounded-[45%_45%_18%_18%]",
    editorial: "rounded-[12rem_12rem_1.5rem_1.5rem]",
  };

  return (
    <div
      ref={portraitRef}
      className={`sticky top-24 mx-auto w-full max-w-[340px] self-start sm:max-w-[390px] lg:max-w-[420px] ${className}`}
    >
      <div className="relative">
        {/* Outer decorative ring */}
        <div
          className={`absolute ${
            position === "left" ? "-left-5 -top-5" : "-right-5 -top-5"
          } h-28 w-28 rounded-full border border-[#D5B77A]/70 sm:h-36 sm:w-36`}
        />

        {/* Secondary decorative frame */}
        <div
          className={`absolute ${
            position === "left" ? "-right-4 -bottom-5" : "-left-4 -bottom-5"
          } h-28 w-28 border border-[#B77C8C]/50 sm:h-36 sm:w-36`}
        />

        {/* Image frame */}
        <div
          className={`relative z-10 aspect-[4/5] overflow-hidden border-[7px] border-[#F9F0EE] bg-[#EACFD3] shadow-[0_25px_70px_rgba(114,47,73,0.18)] ${frameStyles[frame]}`}
        >
          <img
            ref={imageRef}
            src={image}
            alt="My Queen"
            loading="eager"
            className="h-full w-full object-cover"
          />

          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#38232D]/15 via-transparent to-white/10" />
        </div>

        {/* Small heart detail */}
        <div
          className={`absolute ${
            position === "left" ? "-left-3 bottom-12" : "-right-3 bottom-12"
          } z-20 flex h-16 w-16 items-center justify-center rounded-full border border-[#D5B77A] bg-[#F9F0EE] font-['Allura'] text-3xl text-[#B77C8C] shadow-lg sm:h-20 sm:w-20`}
        >
          ♡
        </div>
      </div>
    </div>
  );
};

export default QueenPortrait;
