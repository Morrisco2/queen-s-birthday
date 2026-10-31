
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import useSectionReveal from "../../Hooks/useSectionReveal";
import Button from "../../components/button";

// ==========================================
// STORY TIMELINE DATA
// ==========================================

const storyMoments = [
    {
        number: "01",
        label: "THE BEGINNING",
        date: "Year 2022",
        title: "The Year our paths crossed.",
        description:
            "It all started in the campus (IAUE), when i first sitted you. I coulded stop staring because of how beautiful you are. Your smile, your eyes, your height, and the way you made me feel while around you. But I thought it was just a mare admiration untill 2024 when i couldn't hold my heart anymore.",
        note: "And just like that, a beautiful story began.",
    },
    {
        number: "02",
        label: "GETTING CLOSER",
        date: "The moments that followed",
        title: "When you became someone special.",
        description:
            "The conversations, the laughter, the little things we shared. Somehow, spending time with you became something I looked forward to.",
        note: "I was beginning to realise how special you were.",
    },
    {
        number: "03",
        label: "MY FAVOURITE MEMORIES",
        date: "AUGUST 2026 P",
        title: "The memories I hold close.",
        description:
            "At the NYSC camp, despite the fact that we did't camp together, but you made the camp experience worth remebering. The constant calls, situation report etc, they all made me feel responsible, like a man with a beautiful family",
        note: "It's the little moments that mean the most.",
    },
    {
        number: "04",
        label: "STILL WRITING",
        date: "Today and every day after",
        title: "A story that isn't finished.",
        description:
            "We've made memories worth keeping, and there are still so many moments ahead of us. I look forward to the laughter, the adventures, the challenges, and everything else we will experience together.",
        note: "The best chapters are still ahead.",
    },
];

// ==========================================
// DIGITAL LETTERS
// ==========================================

const moodLetters = [
    {
        id: 1,
        mood: "WHEN YOU'RE HAPPY",
        title: "A letter to celebrate your happiness",
        subtitle: "For the days when your heart is full.",
        message: [
            "My Queen, seeing you happy is one of the things I genuinely love. Your happiness matters to me more than you probably realise.",
            "I hope you never lose that beautiful smile. Keep celebrating your wins, enjoying the little things, chasing your dreams, and finding reasons to laugh.",
            "May life continue to give you beautiful reasons to smile. And whenever something wonderful happens, I hope you remember that there's someone who is genuinely happy to see you win.",
        ],
        closing:
            "Keep smiling, my love. You deserve every bit of happiness. ♡",
        color: "#D5B77A",
    },
    //   {
    //     id: 2,
    //     mood: "WHEN YOU'RE SAD",
    //     title: "You don't have to be strong all the time",
    //     subtitle: "For the days when things feel heavy.",
    //     message: [
    //       "My love, if you're reading this because today hasn't been kind to you, I wish I could be right there beside you.",
    //       "I know I may not always have the perfect words to make everything better, but I want you to remember that you don't have to pretend to be okay all the time.",
    //       "Take your time. Breathe. Rest if you need to. Whatever you're going through does not reduce your worth, and one difficult day does not define your life.",
    //     ],
    //     closing:
    //       "I hope tomorrow is kinder to you. I'm always rooting for you. ♡",
    //     color: "#8C9DB8",
    //   },
    {
        id: 3,
        mood: "WHEN YOU MISS ME",
        title: "A little piece of me, just for you",
        subtitle: "For the moments when you wish I were closer.",
        message: [
            "If I could, I would close the distance between us right now and give you the longest hug.",
            "Until then, I hope these words remind you that distance doesn't change how special you are to me. Somewhere, someone is thinking about you, smiling because of you, and looking forward to the next time you get to be together.",
            "Think about our little moments, the laughter, the conversations, and all the beautiful memories we've made.",
        ],
        closing:
            "Until I see you again, consider this a warm hug from me. ♡",
        color: "#B77C8C",
    },
    {
        id: 4,
        mood: "WHEN YOU DOUBT YOURSELF",
        title: "I wish you could see yourself through my eyes",
        subtitle: "For the moments when you forget how amazing you are.",
        message: [
            "Mine, I wish you could see yourself the way I see you. Not just your beauty, but your heart, your strength, your intelligence, and all the little things that make you who you are.",
            "You are capable of more than you sometimes give yourself credit for. Don't allow a temporary setback to convince you that you aren't good enough.",
            "You don't have to have everything figured out. You are allowed to learn, grow, make mistakes, and begin again.",
        ],
        closing: "Believe in yourself, sweetheart. I certainly do. ♡",
        color: "#A78BBA",
    },
    {
        id: 5,
        mood: "WHEN YOU NEED REASSURANCE",
        title: "In case you ever forget",
        subtitle: "A reminder of how much you mean to me.",
        message: [
            "I know words cannot always communicate everything a heart feels, but I never want you to question whether you are special to me.",
            "I appreciate you. I appreciate your presence, your kindness, your laughter, your imperfections, and even the little things you probably don't notice about yourself.",
            "I don't expect you to be perfect. I simply want us to keep learning, understanding, supporting, and choosing each other through life's different seasons.",
        ],
        closing:
            "You are loved, appreciated, and never taken for granted. ♡",
        color: "#B77C8C",
    },
    //   {
    //     id: 6,
    //     mood: "WHEN YOU CAN'T SLEEP",
    //     title: "A quiet thought before you sleep",
    //     subtitle: "For the nights when your mind won't rest.",
    //     message: [
    //       "Hey beautiful, I hope you're comfortable wherever you are reading this.",
    //       "Whatever happened today, let it rest for now. You don't have to solve every problem tonight, and you don't have to carry tomorrow's worries into today.",
    //       "I hope you find peace in this moment. I hope your dreams are beautiful, your sleep is peaceful, and you wake up with a lighter heart.",
    //     ],
    //     closing:
    //       "Goodnight, my Queen. Sending you kisses and the warmest hugs. ♡",
    //     color: "#777A9B",
    //   },
];

// ==========================================
// STORY INTRODUCTION
// ==========================================

const StoryIntro = () => {
    const sectionRef = useRef(null);

    useSectionReveal(sectionRef);

    return (
        <section
            ref={sectionRef}
            id="story-start"
            className="bg-[#FAF8F5] px-6 pb-24 pt-24 sm:pt-32 lg:px-16"
        >
            <div className="mx-auto max-w-4xl text-center">
                <p
                    data-reveal
                    className="mb-7 font-['Oswald'] text-xs tracking-[0.45em] text-[#B77C8C]"
                >
                    CHAPTER 02 — US
                </p>

                <h1
                    data-reveal
                    className="font-['Bodoni_Moda'] text-5xl leading-tight text-[#38232D] sm:text-6xl lg:text-8xl"
                >
                    OUR <span className="text-[#B77C8C]">STORY</span>
                </h1>

                <div
                    data-reveal
                    className="mx-auto my-8 h-px w-24 bg-[#D5B77A]"
                />

                <p
                    data-reveal
                    className="mx-auto max-w-2xl text-base leading-8 text-[#725A62] sm:text-lg"
                >
                    Every love story has its own little details, unexpected moments,
                    laughter, and memories. This is a little collection of ours.
                </p>

                <p
                    data-reveal
                    className="mt-8 font-['Allura'] text-4xl text-[#B77C8C] sm:text-5xl"
                >
                    A story made special by you.
                </p>
            </div>
        </section>
    );
};

// ==========================================
// STORY TIMELINE
// ==========================================

const StoryTimeline = () => {
    const sectionRef = useRef(null);

    useSectionReveal(sectionRef);

    return (
        <section
            ref={sectionRef}
            className="bg-[#F2E6E5] px-6 py-24 lg:px-16"
        >
            <div className="mx-auto max-w-5xl">
                <div className="mb-16 text-center">
                    <p
                        data-reveal
                        className="font-['Oswald'] text-xs tracking-[0.4em] text-[#B77C8C]"
                    >
                        THE JOURNEY SO FAR
                    </p>

                    <h2
                        data-reveal
                        className="mt-5 font-['Bodoni_Moda'] text-4xl text-[#38232D] sm:text-5xl"
                    >
                        Little chapters of us.
                    </h2>
                </div>

                <div className="relative">
                    {/* Timeline line */}
                    <div className="absolute bottom-5 left-5 top-5 w-px bg-[#B77C8C]/40 sm:left-1/2 sm:-translate-x-1/2" />

                    <div className="space-y-14">
                        {storyMoments.map((moment, index) => (
                            <article
                                key={moment.number}
                                data-reveal
                                className={`relative pl-16 sm:w-1/2 sm:pl-0 ${index % 2 === 0
                                        ? "sm:pr-16"
                                        : "sm:ml-auto sm:pl-16"
                                    }`}
                            >
                                {/* Timeline marker */}
                                <div
                                    className={`absolute left-[11px] top-1 flex h-5 w-5 items-center justify-center rounded-full border border-[#B77C8C] bg-[#F2E6E5] sm:left-auto ${index % 2 === 0
                                            ? "sm:right-[-10px]"
                                            : "sm:left-[-10px]"
                                        }`}
                                >
                                    <span className="h-2 w-2 rounded-full bg-[#B77C8C]" />
                                </div>

                                <div className="border border-[#B77C8C]/20 bg-[#FAF8F5] p-6 shadow-[0_15px_40px_rgba(114,47,73,0.05)] sm:p-8">
                                    <p className="font-['Oswald'] text-xs tracking-[0.3em] text-[#B77C8C]">
                                        {moment.label}
                                    </p>

                                    <p className="mt-4 text-xs tracking-wider text-[#A58A8F]">
                                        {moment.date}
                                    </p>

                                    <h3 className="mt-3 font-['Bodoni_Moda'] text-2xl leading-snug text-[#38232D] sm:text-3xl">
                                        {moment.title}
                                    </h3>

                                    <p className="mt-5 text-sm leading-8 text-[#725A62] sm:text-base">
                                        {moment.description}
                                    </p>

                                    <p className="mt-6 font-['Allura'] text-2xl text-[#B77C8C]">
                                        {moment.note}
                                    </p>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

// ==========================================
// DIGITAL MOOD LETTERS
// ==========================================

const MoodLetters = () => {
    const sectionRef = useRef(null);
    const modalRef = useRef(null);
    const letterRef = useRef(null);

    const [selectedLetter, setSelectedLetter] = useState(null);

    useSectionReveal(sectionRef);

    // Animate the modal and letter when an envelope is opened
    useGSAP(
        () => {
            if (!selectedLetter) return;

            const timeline = gsap.timeline();

            timeline
                .fromTo(
                    modalRef.current,
                    { autoAlpha: 0 },
                    {
                        autoAlpha: 1,
                        duration: 0.4,
                        ease: "power2.out",
                    }
                )
                .fromTo(
                    letterRef.current,
                    {
                        y: 70,
                        scale: 0.85,
                        rotationX: 12,
                        autoAlpha: 0,
                    },
                    {
                        y: 0,
                        scale: 1,
                        rotationX: 0,
                        autoAlpha: 1,
                        duration: 0.9,
                        ease: "power3.out",
                    },
                    "-=0.1"
                )
                .fromTo(
                    ".letter-content",
                    { y: 15, autoAlpha: 0 },
                    {
                        y: 0,
                        autoAlpha: 1,
                        duration: 0.6,
                        stagger: 0.1,
                        ease: "power2.out",
                    },
                    "-=0.4"
                );

            return () => timeline.kill();
        },
        {
            dependencies: [selectedLetter],
            scope: sectionRef,
            revertOnUpdate: true,
        }
    );

    const closeLetter = () => {
        if (!letterRef.current || !modalRef.current) {
            setSelectedLetter(null);
            return;
        }

        gsap.to(letterRef.current, {
            y: 35,
            scale: 0.95,
            autoAlpha: 0,
            duration: 0.3,
            ease: "power2.in",
        });

        gsap.to(modalRef.current, {
            autoAlpha: 0,
            duration: 0.35,
            delay: 0.1,
            onComplete: () => setSelectedLetter(null),
        });
    };

    return (
        <section
            ref={sectionRef}
            className="relative bg-[#FAF8F5] px-6 py-24 lg:px-16"
        >
            <div className="mx-auto max-w-6xl">
                {/* Section heading */}
                <div className="mb-16 text-center">
                    <p
                        data-reveal
                        className="font-['Oswald'] text-xs tracking-[0.4em] text-[#B77C8C]"
                    >
                        A LITTLE SOMETHING FOR EVERY MOOD
                    </p>

                    <h2
                        data-reveal
                        className="mt-5 font-['Bodoni_Moda'] text-4xl text-[#38232D] sm:text-5xl"
                    >
                        Letters from my heart.
                    </h2>

                    <p
                        data-reveal
                        className="mx-auto mt-5 max-w-xl text-sm leading-7 text-[#725A62] sm:text-base"
                    >
                        I know life comes with different emotions and different moments.
                        So I left you a few little letters. Open one whenever you need
                        to hear something from me.
                    </p>
                </div>

                {/* Envelope collection */}
                <div className="grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
                    {moodLetters.map((letter) => (
                        <button
                            key={letter.id}
                            type="button"
                            data-reveal
                            onClick={() => setSelectedLetter(letter)}
                            className="group mx-auto w-full max-w-[310px] text-center outline-none"
                        >
                            {/* Envelope */}
                            <div className="relative mx-auto flex h-[175px] w-full items-center justify-center">
                                {/* Envelope shadow */}
                                <div className="absolute bottom-3 h-24 w-[85%] rounded-xl bg-[#38232D]/10 blur-xl transition-all duration-500 group-hover:translate-y-2 group-hover:bg-[#38232D]/15" />

                                {/* Envelope body */}
                                <div
                                    className="absolute bottom-4 z-10 h-[125px] w-[90%] overflow-hidden rounded-sm shadow-[0_12px_25px_rgba(56,35,45,0.12)] transition-transform duration-500 group-hover:-translate-y-2"
                                    style={{
                                        background: `linear-gradient(145deg, ${letter.color}35, #FFFDFB 75%)`,
                                        border: `1px solid ${letter.color}70`,
                                    }}
                                >
                                    {/* Envelope pocket */}
                                    <div
                                        className="absolute inset-0"
                                        style={{
                                            background: `linear-gradient(135deg, transparent 49.5%, ${letter.color}45 50%)`,
                                            clipPath: "polygon(0 100%, 50% 48%, 100% 100%)",
                                        }}
                                    />

                                    <div
                                        className="absolute inset-0"
                                        style={{
                                            background: `linear-gradient(225deg, transparent 49.5%, ${letter.color}30 50%)`,
                                            clipPath: "polygon(0 100%, 50% 48%, 100% 100%)",
                                        }}
                                    />

                                    {/* Envelope flap */}
                                    <div
                                        className="absolute left-0 top-0 h-[75px] w-full origin-top transition-transform duration-500 group-hover:scale-y-75"
                                        style={{
                                            background: `linear-gradient(135deg, ${letter.color}65, ${letter.color}35)`,
                                            clipPath: "polygon(0 0, 100% 0, 50% 100%)",
                                        }}
                                    />

                                    {/* Wax seal */}
                                    <div
                                        className="absolute left-1/2 top-[54px] z-20 flex h-10 w-10 -translate-x-1/2 items-center justify-center rounded-full border border-white/60 shadow-md transition-transform duration-500 group-hover:scale-110"
                                        style={{ backgroundColor: letter.color }}
                                    >
                                        <span className="font-serif text-xl text-white">♡</span>
                                    </div>
                                </div>

                                {/* Decorative detail */}
                                <span
                                    className="absolute right-2 top-3 text-2xl transition-all duration-500 group-hover:-translate-y-3 group-hover:rotate-12"
                                    style={{ color: letter.color }}
                                >
                                    ✧
                                </span>
                            </div>

                            {/* Envelope title */}
                            <p
                                className="mt-3 font-['Oswald'] text-[11px] tracking-[0.3em]"
                                style={{ color: letter.color }}
                            >
                                {letter.mood}
                            </p>

                            <p className="mx-auto mt-3 max-w-[260px] font-['Bodoni_Moda'] text-xl leading-snug text-[#38232D] transition-colors duration-300 group-hover:text-[#B77C8C]">
                                {letter.title}
                            </p>

                            <p className="mt-3 text-xs text-[#A58A8F]">
                                Click to open your letter
                            </p>
                        </button>
                    ))}
                </div>
            </div>

            {/* ======================================
          LETTER MODAL
      ====================================== */}

            {selectedLetter && (
                <div
                    ref={modalRef}
                    onClick={closeLetter}
                    className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-[#24151D]/75 px-4 py-8 opacity-0 backdrop-blur-md"
                    role="presentation"
                >
                    <div
                        ref={letterRef}
                        onClick={(event) => event.stopPropagation()}
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="mood-letter-title"
                        className="relative my-auto w-full max-w-xl overflow-hidden border border-[#EACFD3] bg-[#FFFCF8] px-6 py-12 shadow-2xl sm:px-12 sm:py-14"
                        style={{
                            backgroundImage:
                                "linear-gradient(rgba(183,124,140,0.045) 1px, transparent 1px)",
                            backgroundSize: "100% 34px",
                            transformPerspective: 1000,
                        }}
                    >
                        {/* Close button */}
                        <button
                            type="button"
                            onClick={closeLetter}
                            aria-label="Close letter"
                            className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full text-2xl text-[#B77C8C] transition hover:bg-[#F9F0EE]"
                        >
                            ×
                        </button>

                        {/* Letter content */}
                        <div className="flex flex-col items-center text-center">
                            <span
                                className="letter-content mb-5 text-4xl"
                                style={{ color: selectedLetter.color }}
                            >
                                ♡
                            </span>

                            <p className="letter-content font-['Oswald'] text-[10px] tracking-[0.35em] text-[#B77C8C]">
                                A LETTER FROM MY HEART
                            </p>

                            <h2
                                id="mood-letter-title"
                                className="letter-content mt-4 font-['Bodoni_Moda'] text-3xl italic leading-snug text-[#722F49] sm:text-4xl"
                            >
                                {selectedLetter.title}
                            </h2>

                            <p className="letter-content mt-4 font-['Allura'] text-2xl text-[#B77C8C] sm:text-3xl">
                                {selectedLetter.subtitle}
                            </p>

                            <div className="letter-content my-8 h-px w-20 bg-[#D5B77A]" />

                            <div className="w-full space-y-6 text-left font-serif text-sm leading-8 text-[#604751] sm:text-base sm:leading-9">
                                {selectedLetter.message.map((paragraph, index) => (
                                    <p className="letter-content" key={index}>
                                        {paragraph}
                                    </p>
                                ))}
                            </div>

                            <p className="letter-content mt-9 self-start text-left font-['Allura'] text-2xl leading-relaxed text-[#722F49] sm:text-3xl">
                                {selectedLetter.closing}
                            </p>

                            <div className="letter-content mt-10 h-px w-full bg-[#EACFD3]" />

                         

                            <Button  onClick={closeLetter}>
                                BACK TO MY ENVELOPES
                            </Button>

                            <p className="letter-content mt-5 font-['Allura'] text-xl text-[#B77C8C]">
                                Always with love, my Queen. ♡
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};

// ==========================================
// STORY ENDING
// ==========================================

const StoryEnding = () => {
    const sectionRef = useRef(null);
    const navigate = useNavigate();

    useSectionReveal(sectionRef);

    return (
        <section
            ref={sectionRef}
            className="bg-[#38232D] px-6 py-28 text-center sm:py-36"
        >
            <div className="mx-auto max-w-3xl space-y-8">
                <p
                    data-reveal
                    className="font-['Oswald'] text-xs tracking-[0.4em] text-[#D5B77A]"
                >
                    TO BE CONTINUED...
                </p>

                <h2
                    data-reveal
                    className="font-['Bodoni_Moda'] text-4xl leading-tight text-[#FAF8F5] sm:text-5xl lg:text-6xl"
                >
                    And somehow, my favourite part is knowing that our story is still
                    being written.
                </h2>

                <div
                    data-reveal
                    className="mx-auto h-px w-20 bg-[#D5B77A]"
                />

                <p
                    data-reveal
                    className="font-['Allura'] text-4xl text-[#EACFD3] sm:text-5xl"
                >
                    Here's to us, my Queen.
                </p>

                <p
                    data-reveal
                    className="text-sm leading-7 text-[#EACFD3]/75"
                >
                    Thank you for being part of my life and for making so many
                    ordinary moments feel extraordinary.
                </p>

                <div data-reveal className="pt-5">
                    <button
                        onClick={() => navigate("/")}
                        className="border border-[#D5B77A] px-8 py-4 text-xs tracking-[0.25em] text-[#FAF8F5] transition-all duration-500 hover:bg-[#D5B77A] hover:text-[#38232D]"
                    >
                        BACK TO THE BEGINNING
                    </button>
                </div>
            </div>
        </section>
    );
};

// ==========================================
// MAIN OUR STORY PAGE
// ==========================================

const OurStory = () => {
    return (
        <main className="min-h-screen overflow-x-hidden">
            <StoryIntro />
            <StoryTimeline />
            <MoodLetters />
            <StoryEnding />
        </main>
    );
};

export default OurStory;
