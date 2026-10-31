
import { useRef } from "react";
import useSectionReveal from "../../Hooks/useSectionReveal";

const Introduction = () => {
  const sectionRef = useRef(null);

  useSectionReveal(sectionRef);

  return (
    <section
      ref={sectionRef}
      className="introduction-section bg-[#FAF8F5] px-6 py-20 sm:py-28 lg:px-16"
    >
      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2 lg:gap-20">

        {/* Portrait */}
        <div data-reveal className="mx-auto w-full max-w-md">
          <div
            className="relative aspect-[4/5] overflow-hidden border-[8px] border-[#F9F0EE] bg-[#EACFD3] shadow-[0_25px_70px_rgba(114,47,73,0.15)]"
            style={{
              borderRadius: "48% 48% 42% 42%",
            }}
          >
            <img
              src="/images/queen1.png"
              alt="My Queen"
              className="h-full w-full object-cover"
            />
          </div>

          <p className="mt-5 text-center font-['Allura'] text-3xl text-[#B77C8C]">
            Simply beautiful, always.
          </p>
        </div>

        {/* Content */}
        <div className=" space-y-7 text-center lg:text-left">
          <p
            data-reveal
            className="font-['Oswald'] text-xs tracking-[0.4em] text-[#B77C8C]"
          >
            CHAPTER 01 — HER WORLD
          </p>

          <h2
            data-reveal
            className="font-['Bodoni_Moda'] text-4xl leading-tight text-[#38232D] sm:text-5xl lg:text-6xl"
          >
            A world made beautiful by you.
          </h2>

          <div
            data-reveal
            className="mx-auto h-px w-20 bg-[#D5B77A] lg:mx-0"
          />

          <p
            data-reveal
            className="mx-auto max-w-lg text-base leading-8 text-[#725A62] sm:text-lg lg:mx-0"
          >
            Some people don't just enter your life. They make it a more
            beautiful place to live. And you, my Queen, are one of them.
          </p>

          <p
            data-reveal
            className="mx-auto max-w-lg text-base leading-8 text-[#725A62] sm:text-lg lg:mx-0"
          >
            Before I tell you our story, I want to celebrate the person
            who makes that story worth telling. You.
          </p>

          <p
            data-reveal
            className="font-['Allura'] text-3xl text-[#B77C8C]"
          >
            This chapter is all about you.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Introduction;
