
import { useLayoutEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import "./Hero.css";
import Button from "../button";

const roses = Array.from({ length: 32 }, (_, index) => ({
  id: index,
  left: `${(index * 37 + 13) % 100}%`,
  size: 9 + ((index * 7) % 9),
  delay: (index * 0.37) % 8,
  duration: 7 + ((index * 11) % 8),
  drift: ((index * 19) % 100) - 50,
  rotation: (index * 47) % 360,
}));

export default function Hero({
  imageSrc = "./images/queen1.png",
  onBeginJourney,
}) {
  const sectionRef = useRef(null);
  const portraitRef = useRef(null);
  const portraitSlotRef = useRef(null);
  const backgroundRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const scriptRef = useRef(null);
  const buttonRef = useRef(null);
  const frameRef = useRef(null);
  const rosesRef = useRef([]);

  const navigate = useNavigate()

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const portrait = portraitRef.current;
      const slot = portraitSlotRef.current;

      if (!portrait || !slot) return;

      // Initial full-screen portrait.
      gsap.set(portrait, {
        x: 0,
        y: 0,
        width: window.innerWidth,
        height: window.innerHeight,
        rotation: 0,
        borderRadius: "0px",
        scale: 1,
      });

      gsap.set(
        [
          backgroundRef.current,
          titleRef.current,
          subtitleRef.current,
          scriptRef.current,
          buttonRef.current,
          frameRef.current,
        ],
        { autoAlpha: 0 }
      );

      gsap.set(".story-letter", {
        yPercent: 40,
        autoAlpha: 0,
      });

      // Continuous falling rose petals.
      rosesRef.current.forEach((rose, index) => {
        if (!rose) return;

        const data = roses[index];

        gsap.set(rose, {
          x: 0,
          y: -40 - Math.random() * 300,
          rotation: data.rotation,
          opacity: 0,
        });

        gsap.to(rose, {
          y: window.innerHeight + 100,
          x: data.drift,
          rotation: data.rotation + 360,
          opacity: 0.8,
          duration: data.duration,
          delay: data.delay,
          repeat: -1,
          ease: "none",
          onRepeat: () => {
            gsap.set(rose, {
              y: -60,
              x: 0,
              opacity: 0,
            });
          },
        });
      });

      // The main transformation timeline.
      const tl = gsap.timeline({
        defaults: { ease: "power3.inOut" },
      });

      // Give her picture a moment to breathe.
      tl.to({}, { duration: 1.4 });

      // Reveal the ivory background underneath.
      tl.to(
        backgroundRef.current,
        {
          autoAlpha: 1,
          duration: 1.8,
        },
        "-=0.3"
      );

      // Reveal the STORY composition.
      tl.to(
        titleRef.current,
        {
          autoAlpha: 1,
          duration: 0.8,
        },
        "-=1"
      );

      // Reveal the surrounding letters.
      tl.to(
        ".story-letter",
        {
          yPercent: 0,
          autoAlpha: 1,
          stagger: 0.18,
          duration: 1.4,
          ease: "power3.out",
        },
        "-=0.6"
      );

      // Reveal the handwritten "The".
      tl.to(
        scriptRef.current,
        {
          autoAlpha: 1,
          x: 0,
          rotation: -8,
          duration: 1.2,
          ease: "power2.out",
        },
        "-=1"
      );

      // Measure the actual destination of the portrait.
      tl.add(() => {
        const rect = slot.getBoundingClientRect();
        const padding = window.innerWidth <= 640 ? 7 : 9;

        const target = {
          x: rect.left + padding,
          y: rect.top + padding,
          width: rect.width - padding * 2,
          height: rect.height - padding * 2,
        };

        // The SAME image element moves from full-screen
        // into the O position of STORY.
        gsap.to(portrait, {
          ...target,
          rotation: 360,
          borderRadius: "50%",
          duration: 3.4,
          ease: "power3.inOut",
          onComplete: () => {
            gsap.set(portrait, {
              rotation: 0,
            });
          },
        });

      }, "-=0.8");

      // Reveal the decorative frame.
      tl.to(
        frameRef.current,
        {
          autoAlpha: 1,
          scale: 1,
          duration: 1.4,
          ease: "elastic.out(1, 0.65)",
        },
        "-=1.8"
      );

      // Reveal the subtitle.
      tl.to(
        subtitleRef.current,
        {
          autoAlpha: 1,
          y: 0,
          duration: 1.2,
          ease: "power2.out",
        },
        "-=1"
      );

      // Finally reveal the button.
      tl.to(
        buttonRef.current,
        {
          autoAlpha: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
        },
        "-=0.5"
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <main ref={sectionRef} className="queen-hero">

      {/* Continuous rose rain */}
      <div className="rose-rain" aria-hidden="true">
        {roses.map((rose, index) => (
          <span
            key={rose.id}
            ref={(el) => (rosesRef.current[index] = el)}
            className="falling-rose"
            style={{
              left: rose.left,
              fontSize: `${rose.size}px`,
            }}
          >
            🌹
          </span>
        ))}
      </div>

      {/* Main ivory background */}
      <div
        ref={backgroundRef}
        className="hero-background"
      >
        <div className="hero-content">

          {/* STORY title */}
          <div ref={titleRef} className="story-title">

            <span className="story-letter letter-s">S</span>
            <span className="story-letter letter-t">T</span>

            {/* The portrait destination */}
            <div
              ref={portraitSlotRef}
              className="portrait-slot"
            >
              <div
                ref={frameRef}
                className="portrait-ornament"
              >
                <span className="ornament-heart">♡</span>
                <span className="ornament-rose rose-top">✿</span>
                <span className="ornament-rose rose-left">❀</span>
                <span className="ornament-rose rose-right">❀</span>
                <span className="ornament-heart heart-bottom">♥</span>
              </div>
            </div>

            <span className="story-letter letter-r">R</span>
            <span className="story-letter letter-y">Y</span>

            {/* Handwritten The */}
            <span
              ref={scriptRef}
              className="the-script"
            >
              The
            </span>

          </div>

          {/* Subtitle */}
          <p
            ref={subtitleRef}
            className="hero-subtitle"
          >
            EVERY BEAUTIFUL STORY BEGINS WITH YOU
          </p>

          <div className="mt-5">
            <Button onClick={() => navigate("/birthday")} />
            
          </div>

        </div>

        <div className="hero-bottom-decoration">
          MADE WITH LOVE, JUST FOR YOU
        </div>
      </div>

      {/* The full-screen portrait.
          This exact element becomes the O. */}
      <div
        ref={portraitRef}
        className="queen-portrait"
      >
        <img
          src={imageSrc}
          alt="Queen"
          draggable="false"
        />
      </div>

    </main>
  );
}
