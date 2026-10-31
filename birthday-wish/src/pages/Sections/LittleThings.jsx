
import { useRef } from "react";
import useSectionReveal from "../../Hooks/useSectionReveal";

const things = [
  {
    number: "01",
    title: "Your Smile",
    description:
      "There's something about your smile that makes even an ordinary day feel special.",
  },
  {
    number: "02",
    title: "Your Heart",
    description:
      "The kindness, warmth, and beautiful heart you carry are things I deeply admire.",
  },
  {
    number: "03",
    title: "Your Presence",
    description:
      "Sometimes, simply having you around is enough to make everything feel better.",
  },
];

const LittleThings = () => {
  const sectionRef = useRef(null);

  useSectionReveal(sectionRef);

  return (
    <section
      ref={sectionRef}
      className="little-things-section bg-[#F2E6E5] px-6 py-20 sm:py-28 lg:px-16"
    >
      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2 lg:gap-20">

        {/* Content */}
        <div className="order-2 space-y-8 lg:order-1">
          <div className="space-y-5 text-center lg:text-left">
            <p
              data-reveal
              className="font-['Oswald'] text-xs tracking-[0.4em] text-[#B77C8C]"
            >
              THE LITTLE THINGS
            </p>

            <h2
              data-reveal
              className="font-['Bodoni_Moda'] text-4xl leading-tight text-[#38232D] sm:text-5xl lg:text-6xl"
            >
              It's the little things that make you extraordinary.
            </h2>

            <p
              data-reveal
              className="mx-auto max-w-lg text-base leading-8 text-[#725A62] sm:text-lg lg:mx-0"
            >
              Maybe I don't say it every day, but there are so many
              little things about you that I appreciate.
            </p>
          </div>

          {/* Appreciation cards */}
          <div className="space-y-4">
            {things.map((thing) => (
              <div
                key={thing.number}
                data-reveal
                className="flex gap-5 border-b border-[#B77C8C]/25 pb-5"
              >
                <span className="pt-1 font-['Bodoni_Moda'] text-xl text-[#B77C8C]">
                  {thing.number}
                </span>

                <div className="space-y-2">
                  <h3 className="font-['Bodoni_Moda'] text-2xl text-[#38232D]">
                    {thing.title}
                  </h3>

                  <p className="text-sm leading-7 text-[#725A62] sm:text-base">
                    {thing.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Portrait */}
        <div
          data-reveal
          className="order-1 mx-auto w-full max-w-md lg:order-2"
        >
          <div className="relative aspect-[4/5] overflow-hidden rounded-[48%_48%_20%_20%] border-[8px] border-[#F9F0EE] bg-[#EACFD3] shadow-[0_25px_70px_rgba(114,47,73,0.15)]">
            <img
              src="/images/queen2.png"
              alt="My Queen"
              className="h-full w-full object-cover"
            />
          </div>

          <p className="mt-5 text-center font-['Allura'] text-3xl text-[#B77C8C]">
            Every little thing matters.
          </p>
        </div>
      </div>
    </section>
  );
};

export default LittleThings;
