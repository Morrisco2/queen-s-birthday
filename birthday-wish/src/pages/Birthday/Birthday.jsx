
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Button from "../../components/button";
import useSectionReveal from "../../Hooks/useSectionReveal";

const Birthday = () => {
    const navigate = useNavigate();

    const [isLetterOpen, setIsLetterOpen] = useState(false);

    const sectionRef = useRef(null);
    const modalRef = useRef(null);
    const letterRef = useRef(null);

    // Reveal birthday page contents as the page loads
    useSectionReveal(sectionRef);

    // Animate the birthday letter modal
    useGSAP(
        () => {
            if (!isLetterOpen) return;

            const timeline = gsap.timeline();

            timeline
                .fromTo(
                    modalRef.current,
                    { autoAlpha: 0 },
                    {
                        autoAlpha: 1,
                        duration: 0.35,
                        ease: "power2.out",
                    }
                )
                .fromTo(
                    letterRef.current,
                    {
                        y: 40,
                        scale: 0.92,
                        rotationX: 8,
                        autoAlpha: 0,
                    },
                    {
                        y: 0,
                        scale: 1,
                        rotationX: 0,
                        autoAlpha: 1,
                        duration: 0.8,
                        ease: "power3.out",
                    },
                    "-=0.1"
                );

            return () => timeline.kill();
        },
        {
            dependencies: [isLetterOpen],
            revertOnUpdate: true,
        }
    );

    const closeLetter = () => {
        gsap.to(letterRef.current, {
            y: 20,
            scale: 0.96,
            autoAlpha: 0,
            duration: 0.25,
            ease: "power2.in",
            onComplete: () => setIsLetterOpen(false),
        });
    };

    const continueJourney = () => {
        setIsLetterOpen(false);
        navigate("/her-world");
    };

    return (
        <main className="relative min-h-screen overflow-hidden bg-[#F9F0EE] text-[#38232D]">

            {/* Faint full-page background portrait */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
            >
                <img
                    src="/images/queen2.png"
                    alt=""
                    className="h-full w-full object-cover object-center opacity-[0.10]"
                />

                {/* Soft overlay for text readability */}
                <div className="absolute inset-0 bg-gradient-to-b from-[#F9F0EE]/80 via-[#F9F0EE]/65 to-[#F9F0EE]/90" />
            </div>

            {/* Background decoration */}
            <div className="pointer-events-none absolute -left-24 -top-24 z-[1] h-72 w-72 rounded-full bg-[#EACFD3]/30 blur-3xl" />

            <div className="pointer-events-none absolute -bottom-32 -right-20 z-[1] h-96 w-96 rounded-full bg-[#D5B77A]/20 blur-3xl" />

            {/* Birthday page */}
            <section
                ref={sectionRef}
                className="relative z-10 flex min-h-screen flex-col items-center justify-center px-5 py-16 text-center"
            >

                {/* Date */}
                <div
                    data-reveal
                    className="mb-5 flex items-center gap-3"
                >
                    <span className="h-px w-8 bg-[#B77C8C]" />

                    <p className="font-sans text-[10px] font-medium uppercase tracking-[0.35em] text-[#B77C8C] sm:text-xs">
                        November 01 · A special day
                    </p>

                    <span className="h-px w-8 bg-[#B77C8C]" />
                </div>

                {/* Intro text */}
                <p
                    data-reveal
                    className="mb-2 font-serif text-lg italic text-[#B77C8C] sm:text-xl"
                >
                    To the one who makes my world beautiful
                </p>

                {/* Main heading */}
                <h1
                    data-reveal
                    className="font-['Bodoni_Moda'] text-5xl leading-tight tracking-tight sm:text-7xl md:text-8xl"
                >
                    Happy Birthday,

                    <span className="mt-1 block font-serif italic text-[#B77C8C]">
                        Mine
                    </span>
                </h1>

                {/* Birthday description */}
                <p
                    data-reveal
                    className="mt-6 max-w-md text-sm leading-7 text-[#806772] sm:text-base"
                >
                    Today is all about celebrating you, the beautiful person
                    you are, and the happiness you bring into my life.
                </p>

                {/* Decorative hearts */}
                <div
                    data-reveal
                    className="my-8 flex items-center gap-5 text-2xl text-[#B77C8C]"
                >
                    <span>✧</span>
                    <span className="text-3xl text-[#D5B77A]">♡</span>
                    <span>✧</span>
                </div>

                {/* Personal message */}
                <p
                    data-reveal
                    className="max-w-sm text-sm leading-7 text-[#806772]"
                >
                    I made something special for you. A little world filled
                    with words, memories, and reminders of just how much
                    you mean to me.
                </p>

                {/* Open letter button */}
                <div data-reveal className="my-5">
                    <Button onClick={() => setIsLetterOpen(true)}>
                        OPEN YOUR LETTER →
                    </Button>
                </div>

                {/* Footer */}
                <p
                    data-reveal
                    className="mt-5 text-[10px] uppercase tracking-[0.25em] text-[#B77C8C]"
                >
                    Made with love, just for you
                </p>

            </section>

            {/* Birthday letter modal */}
            {isLetterOpen && (
                <div
                    ref={modalRef}
                    onClick={closeLetter}
                    className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-[#24151D]/70 px-4 py-8 opacity-0 backdrop-blur-sm"
                >
                    <div
                        ref={letterRef}
                        onClick={(event) => event.stopPropagation()}
                        className="relative my-auto w-full max-w-xl border border-[#EACFD3] bg-[#FFFCF8] px-6 py-10 shadow-2xl sm:px-12 sm:py-14"
                        style={{
                            backgroundImage:
                                "linear-gradient(rgba(183,124,140,0.035) 1px, transparent 1px)",
                            backgroundSize: "100% 32px",
                            transformPerspective: 1000,
                        }}
                    >

                        {/* Close button */}
                        <button
                            onClick={closeLetter}
                            aria-label="Close letter"
                            className="absolute right-5 top-5 flex h-8 w-8 items-center justify-center rounded-full text-xl text-[#B77C8C] transition hover:bg-[#F9F0EE]"
                        >
                            ×
                        </button>

                        {/* Letter content */}
                        <div className="flex flex-col items-center text-center">

                            <span className="mb-5 text-3xl text-[#B77C8C]">
                                ♡
                            </span>

                            <p className="text-[10px] font-medium uppercase tracking-[0.35em] text-[#B77C8C]">
                                A letter from my heart
                            </p>

                            <h2 className="mt-3 font-serif text-3xl italic text-[#722F49] sm:text-4xl">
                                To My Queen
                            </h2>

                            <div className="my-7 h-px w-16 bg-[#D5B77A]" />

                            <div className="space-y-5 text-left font-serif text-sm leading-8 text-[#604751] sm:text-base sm:leading-9">

                                <p>My love,</p>

                                <p>
                                    Today is all about you. A beautiful reminder
                                    that the world became a little more special
                                    on the day you were born.
                                </p>

                                <p>
                                    I hope this new chapter of your life brings
                                    you genuine happiness, peace of mind,
                                    beautiful opportunities, answered prayers,
                                    and everything your heart quietly wishes for.
                                </p>

                                <p>
                                    I am grateful that I get to know you, love
                                    you, learn you, and create beautiful memories
                                    with you. You deserve to be celebrated, not
                                    just today, but every single day.
                                </p>

                                <p>
                                    Never forget how special you are, how much
                                    you are appreciated, and how deeply you
                                    are loved.
                                </p>

                                <p className="pt-2">
                                    Happy birthday, my Queen. Here's to another
                                    beautiful chapter of your life.
                                </p>

                            </div>

                            {/* Signature */}
                            <div className="mt-8 self-start text-left">
                                <p className="font-serif text-sm italic text-[#806772]">
                                    With all my love,
                                </p>

                                <p className="mt-1 font-serif text-2xl italic text-[#722F49]">
                                    Always yours ♡
                                </p>
                            </div>

                            {/* Continue button */}
                            <div className="my-5">
                                <Button onClick={continueJourney}>
                                    CONTINUE THE SURPRISE →
                                </Button>
                            </div>

                            <p className="mt-5 text-[9px] uppercase tracking-[0.2em] text-[#B77C8C]">
                                There's more waiting for you
                            </p>

                        </div>
                    </div>
                </div>
            )}

        </main>
    );
};

export default Birthday;
