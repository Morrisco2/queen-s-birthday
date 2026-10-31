
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import useSectionReveal from "../../Hooks/useSectionReveal";
import Button from "../../components/button";

const LoveMessage = () => {
  const sectionRef = useRef(null);
  const navigate = useNavigate();

  useSectionReveal(sectionRef);

  return (
    <section
      ref={sectionRef}
      className="love-message-section bg-[#FAF8F5] px-6 py-20 sm:py-28 lg:px-16"
    >
      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2 lg:gap-20">

        {/* Portrait */}
        <div data-reveal className="mx-auto w-full max-w-md">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[12rem_12rem_1.5rem_1.5rem] border-[8px] border-[#F9F0EE] bg-[#EACFD3] shadow-[0_25px_70px_rgba(114,47,73,0.15)]">
            <img
              src="/images/queen3.png"
              alt="My Queen"
              className="h-full w-full object-cover"
            />
          </div>

          <p className="mt-5 text-center font-['Allura'] text-3xl text-[#B77C8C]">
            Loved beyond words.
          </p>
        </div>

        {/* Letter */}
        <div className="space-y-7 text-center lg:text-left">
          <p
            data-reveal
            className="font-['Oswald'] text-xs tracking-[0.4em] text-[#B77C8C]"
          >
            A LITTLE SOMETHING FROM ME
          </p>

          <h2
            data-reveal
            className="font-['Bodoni_Moda'] text-4xl leading-tight text-[#38232D] sm:text-5xl lg:text-6xl"
          >
            If only you could see yourself through my eyes.
          </h2>

          <div
            data-reveal
            className="mx-auto h-px w-20 bg-[#D5B77A] lg:mx-0"
          />

          <div className="space-y-5 text-left text-base leading-8 text-[#725A62] sm:text-lg">
            <p data-reveal>
              I don't think you fully understand how much beauty you
              bring into my life. Sometimes, even the simplest moments
              become special simply because I get to share them with you.
            </p>

            <p data-reveal>
              I may not always have the perfect words, and I may not
              always express everything perfectly, but I hope you never
              doubt how special you are to me.
            </p>

            <p data-reveal>
              This little corner of the internet is just one way of
              reminding you that you are loved, appreciated, and celebrated.
            </p>
          </div>

          <p
            data-reveal
            className="font-['Allura'] text-4xl text-[#B77C8C]"
          >
            With all my love, always.
          </p>

          <div data-reveal className="pt-4">
            <Button onClick={()=>navigate('/story')} > LET ME TELL YOU OUR STORY</Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoveMessage;
