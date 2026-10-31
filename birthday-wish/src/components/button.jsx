
import { useRef, useEffect } from "react";
import gsap from "gsap";

const particles = Array.from({ length: 22 }, (_, index) => ({
  angle: (index / 22) * Math.PI * 2,
  distance: 35 + Math.random() * 75,
  size: 5 + Math.random() * 7,
  symbol: ["♥", "✦", "♡", "◆", "✧"][index % 5],
  color: [
    "#28162e",
    "#43204f",
    "#5b2d6d",
    "#754581",
    "#b18abf",
    "#dfbd85",
  ][index % 6],
}));

const variants = {
  primary: `
    bg-[#28162e] text-[#fff9f5]
    border border-[#28162e]
    hover:bg-[#3b2143]
  `,
  outline: `
    bg-transparent text-[#28162e]
    border border-[#bd8d9a]
    hover:bg-[#edcfd6]/30
  `,
  light: `
    bg-[#fffaf7] text-[#28162e]
    border border-[#dfbd85]
    hover:bg-[#f9e9e9]
  `,
};

const Button = ({
  children = "BEGIN JOURNEY",
  onClick,
  type = "button",
  variant = "primary",
  disabled = false,
  className = "",
  showHeart = true,
}) => {
  const buttonRef = useRef(null);
  const heartRef = useRef(null);
  const particleRefs = useRef([]);
  const glowRef = useRef(null);
  const isHovered = useRef(false);
  const clickTimeline = useRef(null);

  // Subtle breathing glow
  useEffect(() => {
    if (disabled) return;

    const animation = gsap.to(glowRef.current, {
      opacity: 0.35,
      scale: 1.08,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    return () => {
      animation.kill();
      clickTimeline.current?.kill();

      gsap.killTweensOf([
        buttonRef.current,
        heartRef.current,
        glowRef.current,
        ...particleRefs.current,
      ]);
    };
  }, [disabled]);

  // Reset particles
  const resetParticles = () => {
    particleRefs.current.forEach((particle) => {
      if (!particle) return;

      gsap.killTweensOf(particle);

      gsap.set(particle, {
        x: 0,
        y: 0,
        scale: 0,
        rotation: 0,
        opacity: 0,
      });
    });
  };

  // Tiny love particle explosion
  const explodeLove = () => {
    resetParticles();

    particleRefs.current.forEach((particle, index) => {
      if (!particle) return;

      const item = particles[index];

      const x = Math.cos(item.angle) * item.distance;
      const y = Math.sin(item.angle) * item.distance;

      gsap.to(particle, {
        x,
        y,
        scale: 1,
        rotation: Math.random() * 100 - 50,
        opacity: 1,
        duration: 0.55 + Math.random() * 0.3,
        delay: index * 0.012,
        ease: "back.out(1.8)",
        onComplete: () => {
          gsap.to(particle, {
            opacity: 0,
            scale: 0,
            y: `+=${10}`,
            duration: 0.35,
            ease: "power2.in",
          });
        },
      });
    });
  };

  // Hover
  const handlePointerEnter = () => {
    if (disabled) return;

    isHovered.current = true;

    gsap.to(buttonRef.current, {
      scale: 1.025,
      y: -2,
      duration: 0.25,
      ease: "power2.out",
    });

    gsap.to(glowRef.current, {
      opacity: 0.65,
      scale: 1.12,
      duration: 0.3,
    });

    if (showHeart) {
      gsap.to(heartRef.current, {
        scale: 1.25,
        rotation: 12,
        duration: 0.3,
        ease: "back.out(2)",
      });
    }
  };

  // Pointer leave
  const handlePointerLeave = () => {
    if (disabled) return;

    isHovered.current = false;

    gsap.to(buttonRef.current, {
      scale: 1,
      y: 0,
      duration: 0.3,
      ease: "power2.out",
    });

    gsap.to(glowRef.current, {
      opacity: 0.25,
      scale: 1,
      duration: 0.4,
    });

    if (showHeart) {
      gsap.to(heartRef.current, {
        scale: 1,
        rotation: 0,
        duration: 0.3,
      });
    }
  };

  // Click explosion
  const handleClick = (event) => {
    if (disabled) return;

    clickTimeline.current?.kill();

    clickTimeline.current = gsap.timeline();

    clickTimeline.current
      .to(buttonRef.current, {
        scale: 0.94,
        duration: 0.1,
        ease: "power2.in",
      })
      .to(buttonRef.current, {
        scale: isHovered.current ? 1.025 : 1,
        duration: 0.4,
        ease: "elastic.out(1, 0.4)",
      });

    if (showHeart) {
      gsap.fromTo(
        heartRef.current,
        {
          scale: 1,
          rotation: 0,
        },
        {
          scale: 1.8,
          rotation: 360,
          duration: 0.5,
          ease: "back.out(2)",
          yoyo: true,
          repeat: 1,
        }
      );
    }

    gsap.fromTo(
      glowRef.current,
      { opacity: 0.3, scale: 1 },
      {
        opacity: 0.9,
        scale: 1.3,
        duration: 0.2,
        yoyo: true,
        repeat: 1,
      }
    );

    explodeLove();

    onClick?.(event);
  };

  return (
    <button
      ref={buttonRef}
      type={type}
      disabled={disabled}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      onClick={handleClick}
      className={`
        relative isolate
        inline-flex items-center justify-center
        gap-3
        min-h-12
        px-7 py-3.5
        rounded-xl
        font-['Oswald']
        text-sm font-medium
        tracking-[0.12em]
        whitespace-nowrap
        cursor-pointer
        select-none
        shadow-[0_4px_14px_rgba(40,22,46,0.15)]
        hover:shadow-[0_8px_24px_rgba(40,22,46,0.22)]
        focus-visible:outline
        focus-visible:outline-2
        focus-visible:outline-offset-4
        focus-visible:outline-[#dfbd85]
        disabled:opacity-50
        disabled:cursor-not-allowed
        disabled:pointer-events-none
        transition-colors duration-300
        ${variants[variant] || variants.primary}
        ${className}
      `}
    >
      {/* Soft glow */}
      <span
        ref={glowRef}
        className="
          absolute -inset-1 -z-10
          rounded-xl
          bg-[#754581]
          blur-lg
          opacity-25
          pointer-events-none
        "
      />

      {/* Button content */}
      <span className="relative z-10 flex items-center gap-3">
        {children}

        {showHeart && (
          <span
            ref={heartRef}
            className="
              inline-block
              text-[#e9b8ca]
              text-base
              leading-none
            "
          >
            ♥
          </span>
        )}
      </span>

      {/* Love explosion particles */}
      <span
        aria-hidden="true"
        className="
          absolute inset-0
          z-20
          overflow-visible
          pointer-events-none
        "
      >
        {particles.map((particle, index) => (
          <span
            key={index}
            ref={(el) => {
              particleRefs.current[index] = el;
            }}
            style={{
              left: "50%",
              top: "50%",
              color: particle.color,
              fontSize: `${particle.size}px`,
            }}
            className="
              absolute
              -translate-x-1/2
              -translate-y-1/2
              font-serif
              opacity-0
              pointer-events-none
              drop-shadow-[0_1px_3px_rgba(40,22,46,0.2)]
            "
          >
            {particle.symbol}
          </span>
        ))}
      </span>
    </button>
  );
};

export default Button;
