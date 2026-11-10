"use client";

import { useEffect, useState, type FormEvent, type MouseEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowUpRight,
  AudioLines,
  Film,
  Heart,
  LockKeyhole,
  Sparkles,
  Volume2,
  X,
} from "lucide-react";

type Section = "cinema" | "voices" | null;

const PASSCODE = "041125";
const CANVA_URL = "https://lynx-cfd0k7.my.canva.site/dahzr40q3ns";

const VIDEOS = [
  {
    title: "All I Want Is You",
    src: "/videos/little-moment-01.mp4",
    note: "A memory pressed between the pages.",
  },
  {
    title: "A Little Moment",
    src: "/videos/little-moment-02.mp4",
    note: "For the days we want to revisit.",
  },
];

const AUDIO = [
  {
    title: "Your ILOVEYOU",
    src: "/audio/a-voice-to-keep.ogg",
    note: "I Loved you tooo sweetheart",
  },
  {
    title: "Voice Note 02",
    src: "/audio/audio2.ogg",
    note: "Abbas, where are those words now? Did you forget everything you once promised me?",
  },
  {
    title: "Voice Note 03",
    src: "/audio/audio3.ogg",
    note: "You said you'd take the risk for us. So what changed? Why did you give up?",
  },
  {
    title: "Voice Note 04",
    src: "/audio/audio4.ogg",
    note: "When did we stop trying to make things work and start choosing to let go?",
  },
  {
    title: "Voice Note 05",
    src: "/audio/audio5.ogg",
    note: "I wonder if you remember saying all these things, or if I'm the only one holding on.",
  },
  {
    title: "You said, although you were tired",
    src: "/audio/last.ogg",
    note: "You said this was your last I love you. So, Abbas, you made it happen, didn't you?",
  },
  {
    title: "A Little Piece of Me",
    src: "/audio/mine-audio.ogg",
    note: "And somewhere between all your voice notes, there's a little piece of me, too.",
  },
];

const CINEMA_ITEMS = [
  {
    kind: "photo",
    title: "The Sleepiest Little You",
    src: "/photos/baby.jpeg",
    note: "How cutely you are sleeping. I fall for you every single time I see this. I could honestly sit beside you and watch you sleep without getting bored. You looked so peaceful, baby. I wish I could have more moments like these.",
  },
  {
    kind: "photo",
    title: "The Words We Once Promised",
    src: "/photos/image2.jpeg",
    note: "Remember this Convo? We said IJWYTBWMFTROML. We didn't keep that word, did we? We made promises so casually, believing we had forever. I wonder when those forever words started becoming temporary.",
  },
  {
    kind: "video",
    title: "A Flying Kiss, Really?",
    src: "/videos/flyingkiss.mp4",
    note: "Cringe, but you actually gave me a flying kiss. I remember smiling like an idiot. You probably don't even realise how the smallest things you did could make my entire day.",
  },
  {
    kind: "video",
    title: "Just You, Being You",
    src: "/videos/his%20video.mp4",
    note: "I wanted to add this because I could listen to you and watch how cute you are forever. There's something about your voice that I could never get tired of. I miss the random little moments when I could simply look at you and feel happy.",
  },
  {
    kind: "video",
    title: "Memories in Your Home",
    src: "/videos/our.mp4",
    note: "You should remember this. Your cute gestures and all those memories of us in your home. Every little corner had a memory attached to it. I never thought I'd be looking back at those moments instead of making new ones with you.",
  },
  {
    kind: "video",
    title: "The Year We Didn't Finish",
    src: "/videos/review.mp4",
    note: "I would have made this recap, but do you really think we completed one year together abbas?? We didn't even get to celebrate a whole year of us. How unlucky is that? We had so many plans, so many little things left to experience, and somehow our story stopped before we could get there. I wonder, am I really that unlucky when it comes to loving someone? We weren't supposed to be making an incomplete recap baby. We were supposed to be making more memories. We weren't supposed to be looking back at an unfinished year abbas. We were supposed to be living the rest of it..",
  },
  {
    kind: "video",
    title: "The Butterflies You Gave Me",
    src: "/videos/twist.mp4",
    note: "You have no idea how good I felt when you did this. Just you touching my waist gave me butterflies that day. I swear, I could feel my heart doing something silly. It was such a small gesture for you, but such a big moment for me. I wish you knew how happy you made me feel.",
  },
  {
    kind: "video",
    title: "You Said I Looked Pretty",
    src: "/videos/you-said-i-looked-pretty.mp4",
    note: "I wanted to add this because even when things were bad, you still told me I looked pretty. You said my lips were pretty. And Abbas, do you know why I remember that? Because even in the middle of everything falling apart, a part of me was still so happy to hear you say that. Some compliments stay, especially when they come from someone you love.",
  },
  {
    kind: "photo",
    title: "A Still Moment to Keep",
    src: "/photos/image.png",
    note: "Another photograph from the little archive, kept here between all our moving memories.",
  },
  {
    kind: "video",
    title: VIDEOS[0].title,
    src: VIDEOS[0].src,
    note: VIDEOS[0].note,
  },
  {
    kind: "video",
    title: VIDEOS[1].title,
    src: VIDEOS[1].src,
    note: VIDEOS[1].note,
  },
];

const SURPRISE_URL = "https://psynie.github.io/error_del/";

const PHOTOS = CINEMA_ITEMS.filter(
  (item) => item.kind === "photo" && item.src
);

export default function Home() {
  const [passcode, setPasscode] = useState("");
  const [unlocked, setUnlocked] = useState(false);
  const [error, setError] = useState(false);
  const [activeSection, setActiveSection] = useState<Section>(null);
  const [playing, setPlaying] = useState<string | null>(null);
  const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null);
  const [sessionRestored, setSessionRestored] = useState(false);
  const [invitationOpen, setInvitationOpen] = useState(false);
  const [finalWordsOpen, setFinalWordsOpen] = useState(false);

  useEffect(() => {
    const wasUnlocked = sessionStorage.getItem("archive-unlocked") === "true";
    const savedSection = window.location.hash.replace("#", "");

    if (wasUnlocked) {
      setUnlocked(true);
      if (savedSection === "cinema" || savedSection === "voices") {
        setActiveSection(savedSection);
      }
    } else if (savedSection) {
      window.history.replaceState(null, "", window.location.pathname + window.location.search);
    }

    setSessionRestored(true);
  }, []);

  function openSection(section: Exclude<Section, null>) {
    setActiveSection(section);
    window.history.replaceState(null, "", `#${section}`);
  }

  function addPasscodeDigit(digit: string) {
    setPasscode((current) => {
      if (current.length >= 6) return current;
      setError(false);
      return current + digit;
    });
  }

  function removePasscodeDigit() {
    setPasscode((current) => current.slice(0, -1));
    setError(false);
  }

  function unlock(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (passcode === PASSCODE) {
      setUnlocked(true);
      sessionStorage.setItem("archive-unlocked", "true");
      setError(false);
    } else {
      setError(true);
    }
  }

  function openCanva() {
    if (
      CANVA_URL.startsWith("https://") &&
      !CANVA_URL.includes("PASTE_YOUR")
    ) {
      window.location.href = CANVA_URL;
    } else {
      alert("Add your published Canva website URL in app/page.tsx first.");
    }
  }

  function closeSection() {
    setActiveSection(null);
    setPlaying(null);
    setSelectedPhoto(null);
    window.history.replaceState(null, "", window.location.pathname + window.location.search);
  }

  function showPreviousPhoto(e: MouseEvent<HTMLButtonElement>) {
    e.stopPropagation();

    setSelectedPhoto((current) => {
      if (current === null || PHOTOS.length === 0) return null;
      return (current - 1 + PHOTOS.length) % PHOTOS.length;
    });
  }

  function showNextPhoto(e: MouseEvent<HTMLButtonElement>) {
    e.stopPropagation();

    setSelectedPhoto((current) => {
      if (current === null || PHOTOS.length === 0) return null;
      return (current + 1) % PHOTOS.length;
    });
  }

  if (!sessionRestored) return null;

  return (
    <main className={unlocked ? "site unlocked" : "site"}>
      <style jsx global>{`
              .invitation-gate {
                min-height: 100svh;
                width: 100%;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                gap: 1rem;
                padding: 2.2rem 1.1rem;
                position: relative;
                overflow: hidden;
                background:
                  radial-gradient(ellipse at 50% 34%, rgba(255, 235, 207, .3), transparent 54%),
                  linear-gradient(135deg, #d8c1a4 0%, #b99779 48%, #e4d1b8 100%);
              }
              .invitation-gate::before,
              .invitation-gate::after {
                content: "❦";
                position: absolute;
                color: rgba(91, 34, 27, .2);
                font-family: Georgia, serif;
                font-size: clamp(5rem, 13vw, 10rem);
                pointer-events: none;
              }
              .invitation-gate::before { left: 3%; top: 4%; transform: rotate(-24deg); }
              .invitation-gate::after { right: 3%; bottom: 3%; transform: rotate(18deg); }
              .invitation-topline {
                width: min(100%, 650px);
                display: flex;
                justify-content: space-between;
                gap: 1rem;
                color: #5e2924;
                font: 600 .62rem/1.4 Georgia, serif;
                letter-spacing: .2em;
                text-transform: uppercase;
                position: relative;
                z-index: 1;
              }
              .invitation-envelope {
                width: min(100%, 570px);
                height: 650px;
                max-height: calc(100svh - 100px);
                min-height: 560px;
                position: relative;
                isolation: isolate;
                filter: drop-shadow(0 24px 28px rgba(48, 16, 13, .28));
              }
              .invitation-letter {
                position: absolute;
                z-index: 1;
                top: 0;
                left: 8%;
                width: 84%;
                height: 390px;
                padding: 2.6rem 1.5rem 5rem;
                text-align: center;
                color: #592820;
                background:
                  radial-gradient(circle at 15% 15%, rgba(151, 99, 62, .08), transparent 28%),
                  radial-gradient(circle at 85% 75%, rgba(151, 99, 62, .08), transparent 30%),
                  repeating-linear-gradient(0deg, rgba(99, 61, 39, .018) 0 1px, transparent 1px 4px),
                  #f2e4cf;
                border: 1px solid rgba(111, 66, 45, .35);
                box-shadow: inset 0 0 0 7px rgba(255,255,255,.17), 0 4px 12px rgba(48, 16, 13, .12);
                clip-path: polygon(0 0, 100% 0, 100% 100%, 50% 88%, 0 100%);
              }
              .invitation-letter::before {
                content: "✧  ❦  ✧";
                display: block;
                margin-bottom: 1.2rem;
                color: #9b5d49;
                letter-spacing: .45em;
                font-size: .85rem;
              }
              .invitation-kicker {
                margin: 0 0 1.1rem;
                font: 600 .62rem/1.5 Georgia, serif;
                letter-spacing: .28em;
                text-transform: uppercase;
              }
              .invitation-letter h1 {
                margin: 0;
                font: 500 clamp(2.5rem, 7vw, 4.4rem)/.95 Georgia, serif;
                letter-spacing: .025em;
                color: #642c25;
              }
              .invitation-letter h1 em {
                display: block;
                margin-top: .15em;
                font-style: italic;
                font-size: 1.12em;
                font-weight: 400;
              }
              .invitation-letter-copy {
                max-width: 310px;
                margin: 1.3rem auto 0;
                font: italic 1rem/1.65 Georgia, serif;
                color: #70443a;
              }
              .invitation-envelope-body {
                position: absolute;
                z-index: 2;
                left: 0;
                right: 0;
                top: 245px;
                bottom: 0;
                overflow: hidden;
                background: linear-gradient(145deg, #9c1718, #740d13 58%, #51090f);
                border-radius: 8px 8px 4px 4px;
                box-shadow: inset 0 2px 12px rgba(255, 190, 160, .15), inset 0 -10px 22px rgba(35, 0, 0, .24);
              }
              .invitation-envelope-body::before {
                content: "";
                position: absolute;
                inset: 0;
                background:
                  linear-gradient(145deg, transparent 49.7%, rgba(45, 0, 4, .38) 50%, transparent 50.5%),
                  linear-gradient(215deg, transparent 49.7%, rgba(255, 190, 160, .13) 50%, transparent 50.5%);
                pointer-events: none;
              }
              .invitation-front-flap {
                position: absolute;
                z-index: 3;
                left: 0;
                right: 0;
                top: 245px;
                height: 250px;
                background: linear-gradient(145deg, #a51c1d, #7e1015 65%, #650b12);
                clip-path: polygon(0 0, 50% 75%, 100% 0, 100% 100%, 0 100%);
                pointer-events: none;
              }
              .invitation-seal {
                position: absolute;
                z-index: 5;
                top: 440px;
                left: 50%;
                transform: translateX(-50%);
                width: 76px;
                height: 76px;
                display: grid;
                place-items: center;
                border-radius: 50%;
                color: #f6c3ad;
                background: radial-gradient(circle at 35% 28%, #ef8d83, #b83d42 52%, #76151d 78%);
                border: 5px solid #c75b5b;
                box-shadow: 0 5px 10px rgba(35,0,0,.35), inset 0 0 0 2px rgba(255,220,195,.35), inset 0 -4px 8px rgba(54,0,0,.35);
              }
              .invitation-access {
                position: absolute;
                z-index: 6;
                left: 9%;
                right: 9%;
                bottom: 2rem;
                text-align: center;
                color: #f4d7bd;
              }
              .invitation-access-label {
                margin: 0 0 1rem;
                font: 600 .68rem/1.4 Georgia, serif;
                letter-spacing: .28em;
                text-transform: uppercase;
              }
              .invitation-passcode {
                display: flex;
                align-items: center;
                gap: .7rem;
                width: 100%;
                min-height: 58px;
                padding: .35rem .9rem;
                border: 1px solid rgba(246, 205, 171, .75);
                border-radius: 12px;
                background: rgba(53, 3, 9, .24);
                color: #f5d6bd;
                box-shadow: inset 0 2px 8px rgba(30,0,0,.2);
              }
              .invitation-passcode input {
                width: 100%;
                min-width: 0;
                border: 0;
                outline: 0;
                background: transparent;
                color: #fff0df;
                font: italic 1rem Georgia, serif;
              }
              .invitation-passcode input::placeholder { color: rgba(255, 224, 202, .72); }
              .invitation-unlock {
                display: inline-flex;
                align-items: center;
                justify-content: center;
                gap: .7rem;
                min-width: 175px;
                margin-top: 1.1rem;
                padding: .9rem 1.8rem;
                border: 1px solid #e9c8a8;
                border-radius: 5px;
                color: #5e241e;
                background: linear-gradient(180deg, #f6e5cf, #d8b997);
                box-shadow: 0 4px 0 rgba(54, 5, 9, .35), 0 8px 16px rgba(28,0,0,.18);
                font: 700 .7rem Georgia, serif;
                letter-spacing: .22em;
                cursor: pointer;
                transition: transform .2s ease, filter .2s ease;
              }
              .invitation-unlock:hover { transform: translateY(-2px); filter: brightness(1.06); }
              .invitation-error {
                margin: .65rem 0 0;
                color: #ffe2d4;
                font: italic .85rem Georgia, serif;
              }
              .invitation-bottom-mark {
                margin-top: 1rem;
                color: #e7b99b;
                letter-spacing: .55em;
                font-size: .8rem;
              }
              .invitation-layout {
                width: min(1180px, 100%);
                display: grid;
                grid-template-columns: minmax(0, 1.12fr) minmax(320px, .88fr);
                align-items: center;
                justify-items: center;
                gap: clamp(2rem, 6vw, 5.5rem);
                position: relative;
                z-index: 1;
              }
              .invitation-left {
                width: 100%;
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 1.1rem;
              }
              .invitation-left .invitation-topline {
                width: min(100%, 570px);
              }
              .invitation-envelope {
                transform: rotate(-4deg);
                transform-origin: center;
                transition: transform .45s ease;
              }
              .invitation-envelope:hover { transform: rotate(-2deg) translateY(-4px); }
              .invitation-right {
                width: min(100%, 440px);
                padding: clamp(2rem, 4vw, 3.3rem);
                position: relative;
                text-align: center;
                color: #5b2923;
                background:
                  repeating-linear-gradient(0deg, rgba(99, 61, 39, .018) 0 1px, transparent 1px 4px),
                  rgba(246, 233, 214, .78);
                border: 1px solid rgba(111, 66, 45, .34);
                box-shadow: 0 18px 45px rgba(48, 16, 13, .17), inset 0 0 0 8px rgba(255,255,255,.18);
              }
              .invitation-right::before,
              .invitation-right::after {
                content: "❦";
                display: block;
                color: #a56d58;
                font-size: 1.25rem;
                letter-spacing: .35em;
              }
              .invitation-right-kicker {
                margin: 1rem 0 .85rem;
                color: #93614e;
                font: 600 .65rem Georgia, serif;
                letter-spacing: .24em;
                text-transform: uppercase;
              }
              .invitation-right h2 {
                margin: 0;
                color: #642c25;
                font: 500 clamp(2.1rem, 4vw, 3.2rem)/1.05 Georgia, serif;
              }
              .invitation-right h2 em {
                display: block;
                margin-top: .12em;
                font-weight: 400;
              }
              .invitation-right-copy {
                max-width: 330px;
                margin: 1.2rem auto 1.8rem;
                color: #795044;
                font: italic 1rem/1.7 Georgia, serif;
              }
              .invitation-access {
                position: static;
                color: #642c25;
                text-align: center;
              }
              .invitation-access-label {
                margin: 0 0 .8rem;
                color: #754338;
                font-size: .66rem;
              }
              .invitation-passcode {
                min-height: 58px;
                padding: .35rem .85rem;
                border-color: rgba(116, 62, 48, .42);
                background: rgba(255, 250, 241, .8);
                color: #754338;
                box-shadow: inset 0 2px 8px rgba(80, 42, 28, .06);
              }
              .invitation-passcode input { color: #592820; }
              .invitation-passcode input::placeholder { color: #a27b6c; }
              .invitation-unlock {
                width: 100%;
                margin-top: 1rem;
                color: #f7e7d4;
                border-color: #8f3030;
                background: linear-gradient(180deg, #9f292b, #6f1018);
                box-shadow: 0 4px 0 rgba(54, 5, 9, .22), 0 8px 16px rgba(28,0,0,.12);
              }
              .invitation-error { color: #9a252b; }
              .invitation-bottom-mark {
                color: #9b6553;
                margin-top: 1.35rem;
              }
              @media (max-width: 850px) {
                .invitation-layout {
                  grid-template-columns: minmax(0, 1fr);
                  gap: 1.5rem;
                }
                .invitation-left { max-width: 570px; }
                .invitation-right { width: min(100%, 520px); }
                .invitation-envelope { transform: rotate(-2deg); }
              }
              @media (max-width: 600px) {
                .invitation-gate { padding: 1.2rem .8rem; gap: .6rem; }
                .invitation-topline { font-size: .48rem; letter-spacing: .13em; }
                .invitation-envelope { height: 590px; min-height: 540px; max-width: 440px; }
                .invitation-letter { height: 345px; padding: 2rem 1rem 4rem; }
                .invitation-letter h1 { font-size: clamp(2.25rem, 11vw, 3.4rem); }
                .invitation-letter-copy { font-size: .88rem; }
                .invitation-envelope-body { top: 215px; }
                .invitation-front-flap { top: 215px; height: 220px; }
                .invitation-seal { top: 390px; width: 66px; height: 66px; }
                .invitation-access { left: 7%; right: 7%; bottom: 1.35rem; }
                .invitation-passcode { min-height: 52px; }
              }
              
              .invitation-gate {
                background:
                  radial-gradient(ellipse at 18% 18%, rgba(255,255,255,.42), transparent 34%),
                  radial-gradient(ellipse at 82% 85%, rgba(112,69,43,.13), transparent 38%),
                  repeating-linear-gradient(0deg, rgba(105,76,54,.025) 0 1px, transparent 1px 4px),
                  linear-gradient(135deg, #e8ddca 0%, #cbb99e 48%, #eee4d3 100%);
              }
              .invitation-gate::before,
              .invitation-gate::after {
                color: rgba(100, 66, 48, .17);
              }
              .invitation-left .invitation-topline {
                color: #765a47;
              }
              .invitation-envelope {
                width: min(100%, 520px);
                height: 570px;
                min-height: 520px;
                filter: drop-shadow(0 22px 24px rgba(58, 43, 31, .23));
              }
              .invitation-letter {
                left: 8%;
                width: 84%;
                height: 330px;
                padding: 2.15rem 1.35rem 4.5rem;
                background:
                  radial-gradient(circle at 12% 18%, rgba(139,102,69,.10), transparent 30%),
                  radial-gradient(circle at 88% 72%, rgba(139,102,69,.09), transparent 28%),
                  repeating-linear-gradient(0deg, rgba(99, 61, 39, .025) 0 1px, transparent 1px 5px),
                  #f8f0e2;
                border: 1px solid rgba(126, 98, 72, .38);
                box-shadow: inset 0 0 0 6px rgba(255,255,255,.3), 0 5px 14px rgba(56, 39, 26, .13);
                clip-path: polygon(0 0, 100% 0, 100% 100%, 50% 88%, 0 100%);
              }
              .invitation-letter::before {
                color: #a27b5d;
                margin-bottom: .9rem;
              }
              .invitation-kicker {
                color: #73533e;
                margin-bottom: .8rem;
              }
              .invitation-letter h1 {
                color: #4e3026;
                font-size: clamp(2.35rem, 5.5vw, 3.8rem);
              }
              .invitation-letter h1 em {
                color: #743d35;
              }
              .invitation-letter-copy {
                margin-top: 1rem;
                color: #765a47;
                font-size: .92rem;
              }
              .invitation-envelope-body {
                top: 210px;
                background:
                  linear-gradient(145deg, rgba(255,255,255,.35), transparent 42%),
                  repeating-linear-gradient(0deg, rgba(109,83,59,.025) 0 1px, transparent 1px 5px),
                  linear-gradient(135deg, #f1e7d6, #d9c8ad 58%, #eee3d1);
                border: 1px solid rgba(125, 99, 74, .38);
                border-radius: 3px;
                box-shadow: inset 0 2px 12px rgba(255,255,255,.42), inset 0 -10px 22px rgba(75,54,34,.08);
              }
              .invitation-envelope-body::before {
                background:
                  linear-gradient(145deg, transparent 49.5%, rgba(125,99,74,.22) 50%, transparent 50.5%),
                  linear-gradient(215deg, transparent 49.5%, rgba(255,255,255,.58) 50%, transparent 50.5%);
              }
              .invitation-front-flap {
                top: 210px;
                height: 245px;
                background:
                  linear-gradient(145deg, rgba(255,255,255,.42), transparent 45%),
                  linear-gradient(135deg, #f4ead9, #dfcfb7 65%, #f0e4d2);
                clip-path: polygon(0 0, 50% 72%, 100% 0, 100% 100%, 0 100%);
                filter: drop-shadow(0 -1px 2px rgba(91,68,48,.14));
              }
              .invitation-seal {
                top: 405px;
                width: 68px;
                height: 68px;
                color: #f3d4bd;
                background: radial-gradient(circle at 34% 26%, #d77d70, #9b3436 55%, #651b24 82%);
                border-color: #b95a55;
                box-shadow: 0 5px 10px rgba(47,25,20,.25), inset 0 0 0 2px rgba(255,220,195,.42), inset 0 -4px 8px rgba(54,0,0,.25);
              }
              .invitation-right {
                background:
                  radial-gradient(circle at 10% 10%, rgba(255,255,255,.55), transparent 28%),
                  repeating-linear-gradient(0deg, rgba(99, 61, 39, .025) 0 1px, transparent 1px 5px),
                  #f4ead9;
                border-color: rgba(126, 98, 72, .4);
                box-shadow: 0 18px 45px rgba(58, 43, 31, .15), inset 0 0 0 8px rgba(255,255,255,.22);
              }
              .invitation-right h2 { color: #57362b; }
              .invitation-right-copy { color: #795e4b; }
              .invitation-unlock {
                background: linear-gradient(180deg, #8e3938, #642329);
                border-color: #7b3433;
                color: #f8ead8;
              }
              @media (max-width: 850px) {
                .invitation-envelope {
                  width: min(100%, 480px);
                  height: 550px;
                  min-height: 510px;
                }
              }
              @media (max-width: 600px) {
                .invitation-envelope {
                  height: 520px;
                  min-height: 500px;
                  max-width: 400px;
                }
                .invitation-letter {
                  height: 300px;
                  padding: 1.8rem .9rem 3.7rem;
                }
                .invitation-envelope-body { top: 195px; }
                .invitation-front-flap { top: 195px; height: 220px; }
                .invitation-seal { top: 370px; width: 60px; height: 60px; }
              }
              
              .invitation-gate {
                min-height: 100svh;
                padding: clamp(1.5rem, 4vw, 3rem);
                background:
                  radial-gradient(ellipse at 12% 12%, rgba(255,255,255,.48), transparent 30%),
                  radial-gradient(ellipse at 90% 88%, rgba(103,73,49,.16), transparent 36%),
                  repeating-linear-gradient(0deg, rgba(90,67,47,.025) 0 1px, transparent 1px 5px),
                  linear-gradient(135deg, #e8dece 0%, #cbb99f 48%, #eee5d7 100%);
              }
              .invitation-gate::before,
              .invitation-gate::after {
                color: rgba(105, 75, 53, .13);
              }
              .invitation-layout {
                width: min(1220px, 100%);
                grid-template-columns: minmax(0, 1.08fr) minmax(330px, .92fr);
                gap: clamp(2.5rem, 7vw, 6rem);
              }
              .invitation-left {
                gap: .75rem;
              }
              .invitation-left .invitation-topline {
                width: min(100%, 560px);
                color: #765f4d;
              }
              .invitation-envelope {
                width: min(100%, 530px);
                height: 570px;
                min-height: 570px;
                max-height: none;
                transform: rotate(-2.5deg);
                filter: drop-shadow(0 24px 25px rgba(65, 47, 31, .2));
              }
              .invitation-envelope:hover {
                transform: rotate(-1.5deg) translateY(-3px);
              }
              .invitation-letter {
                z-index: 2;
                top: 0;
                left: 12%;
                width: 76%;
                height: 355px;
                padding: 2.15rem 1.25rem 4rem;
                transform: rotate(-4deg);
                transform-origin: 50% 80%;
                clip-path: none;
                border-radius: 2px;
                background:
                  radial-gradient(circle at 12% 16%, rgba(139,102,69,.11), transparent 30%),
                  radial-gradient(circle at 90% 78%, rgba(139,102,69,.09), transparent 28%),
                  repeating-linear-gradient(0deg, rgba(99,61,39,.025) 0 1px, transparent 1px 5px),
                  #fbf4e8;
                border: 1px solid rgba(126, 98, 72, .42);
                box-shadow: 0 8px 18px rgba(65, 45, 29, .16), inset 0 0 0 6px rgba(255,255,255,.28);
              }
              .invitation-letter::before {
                content: "✧  ❦  ✧";
                margin-bottom: 1.35rem;
                color: #a17a5d;
                letter-spacing: .42em;
              }
              .invitation-kicker {
                color: #80634c;
                letter-spacing: .25em;
                font-size: .64rem;
              }
              .invitation-letter h1 {
                color: #57372b;
                font-size: clamp(2.55rem, 5.2vw, 3.9rem);
                line-height: .98;
              }
              .invitation-letter h1 em {
                color: #7b443b;
                font-size: 1.14em;
              }
              .invitation-letter-copy {
                max-width: 300px;
                margin-top: 1.15rem;
                color: #80634f;
                font: italic .96rem/1.65 Georgia, serif;
              }
              .invitation-envelope-body {
                z-index: 3;
                top: 225px;
                bottom: 0;
                border-radius: 2px 2px 3px 3px;
                background:
                  linear-gradient(145deg, rgba(255,255,255,.48), transparent 40%),
                  repeating-linear-gradient(0deg, rgba(109,83,59,.022) 0 1px, transparent 1px 5px),
                  linear-gradient(135deg, #f3eadb 0%, #ddcdb6 58%, #eee3d2 100%);
                border: 1px solid rgba(125, 99, 74, .42);
                box-shadow: inset 0 2px 12px rgba(255,255,255,.48), inset 0 -12px 24px rgba(75,54,34,.08);
              }
              .invitation-envelope-body::before {
                background:
                  linear-gradient(145deg, transparent 49.5%, rgba(125,99,74,.24) 50%, transparent 50.5%),
                  linear-gradient(215deg, transparent 49.5%, rgba(255,255,255,.68) 50%, transparent 50.5%);
              }
              .invitation-front-flap {
                z-index: 4;
                top: 225px;
                height: 265px;
                background:
                  linear-gradient(145deg, rgba(255,255,255,.5), transparent 48%),
                  linear-gradient(135deg, #f7efe2 0%, #e4d5bf 62%, #f2e8d9 100%);
                clip-path: polygon(0 0, 50% 76%, 100% 0, 100% 100%, 0 100%);
                border-bottom: 1px solid rgba(125, 99, 74, .28);
                filter: drop-shadow(0 -1px 2px rgba(91,68,48,.12));
              }
              .invitation-seal {
                display: none;
                z-index: 5;
                top: 425px;
                width: 62px;
                height: 62px;
                color: #f7e6d4;
                background: radial-gradient(circle at 34% 26%, #d99a82, #a85a4e 58%, #783b37 84%);
                border: 4px solid #c48a72;
                box-shadow: 0 4px 9px rgba(47,25,20,.2), inset 0 0 0 2px rgba(255,235,215,.42);
              }
              .invitation-right {
                padding: clamp(2.2rem, 4vw, 3.4rem);
                background:
                  radial-gradient(circle at 10% 10%, rgba(255,255,255,.62), transparent 28%),
                  repeating-linear-gradient(0deg, rgba(99,61,39,.024) 0 1px, transparent 1px 5px),
                  #f6eee1;
                border: 1px solid rgba(126,98,72,.42);
                box-shadow: 0 20px 48px rgba(58,43,31,.14), inset 0 0 0 8px rgba(255,255,255,.24);
              }
              .invitation-right-kicker {
                color: #98745b;
              }
              .invitation-right h2 {
                color: #5c3c30;
                font-size: clamp(2.15rem, 3.8vw, 3.15rem);
              }
              .invitation-right-copy {
                color: #806754;
              }
              .invitation-passcode {
                background: rgba(255,252,246,.86);
                border-color: rgba(126,98,72,.45);
              }
              .invitation-passcode input {
                color: #593d31;
              }
              .invitation-passcode input::placeholder {
                color: #a38a76;
              }
              .invitation-unlock {
                background: linear-gradient(180deg, #8d4b43, #65332f);
                border-color: #754039;
                color: #fbf0e2;
              }
              .invitation-bottom-mark {
                color: #a17b60;
              }
              @media (max-width: 850px) {
                .invitation-layout {
                  grid-template-columns: minmax(0, 1fr);
                  gap: 1.2rem;
                }
                .invitation-envelope {
                  width: min(100%, 480px);
                  height: 540px;
                  min-height: 540px;
                }
                .invitation-right {
                  width: min(100%, 520px);
                }
              }
              @media (max-width: 600px) {
                .invitation-gate { padding: 1rem .75rem 2rem; }
                .invitation-envelope {
                  width: min(100%, 390px);
                  height: 475px;
                  min-height: 475px;
                }
                .invitation-letter {
                  left: 11%;
                  width: 78%;
                  height: 295px;
                  padding: 1.55rem .8rem 3.4rem;
                }
                .invitation-letter h1 { font-size: clamp(2.15rem, 10vw, 3rem); }
                .invitation-letter-copy { font-size: .82rem; margin-top: .85rem; }
                .invitation-envelope-body { top: 185px; }
                .invitation-front-flap { top: 185px; height: 225px; }
                .invitation-seal { top: 355px; width: 54px; height: 54px; }
                .invitation-right { padding: 2rem 1.35rem; }
              }

              .invitation-gate {
                background:
                  radial-gradient(ellipse at 15% 15%, rgba(255,255,255,.48), transparent 32%),
                  radial-gradient(ellipse at 85% 90%, rgba(99,67,43,.18), transparent 38%),
                  linear-gradient(135deg, #e9dfcf 0%, #cdbba2 48%, #eee5d8 100%);
              }
              .invitation-layout {
                width: min(1240px, 100%);
                grid-template-columns: minmax(0, 1.12fr) minmax(320px, .88fr);
                gap: clamp(2rem, 6vw, 5.5rem);
              }
              .invitation-artwork-wrap {
                width: min(100%, 620px);
                padding: clamp(12px, 1.6vw, 20px);
                position: relative;
                transform: rotate(-2.2deg);
                transform-origin: center;
                background:
                  repeating-linear-gradient(45deg, rgba(116,83,54,.035) 0 1px, transparent 1px 5px),
                  linear-gradient(145deg, #f7efdf, #d9c7aa);
                border: 1px solid rgba(116,83,54,.55);
                box-shadow:
                  0 26px 55px rgba(54,38,25,.24),
                  0 5px 12px rgba(54,38,25,.14),
                  inset 0 0 0 5px rgba(255,255,255,.42),
                  inset 0 0 0 7px rgba(125,91,61,.17);
                animation: invitation-art-float 7s ease-in-out infinite;
              }
              .invitation-artwork-wrap::before,
              .invitation-artwork-wrap::after {
                content: "❦";
                position: absolute;
                z-index: 2;
                color: #9a7657;
                font: 2rem Georgia, serif;
                opacity: .82;
                text-shadow: 0 1px rgba(255,255,255,.55);
                pointer-events: none;
              }
              .invitation-artwork-wrap::before {
                top: 7px;
                left: 12px;
              }
              .invitation-artwork-wrap::after {
                right: 12px;
                bottom: 7px;
                transform: rotate(180deg);
              }
              .invitation-artwork-mat {
                padding: 8px;
                background: #eee2cf;
                border: 1px solid rgba(118,86,58,.48);
                box-shadow: inset 0 0 0 1px rgba(255,255,255,.75);
              }
              .invitation-artwork {
                display: block;
                width: 100%;
                height: auto;
                aspect-ratio: 1374 / 1145;
                object-fit: contain;
                border: 1px solid rgba(91,62,39,.28);
                filter: sepia(.08) contrast(1.025) saturate(.92);
              }
              @keyframes invitation-art-float {
                0%, 100% { transform: translateY(0) rotate(-2.2deg); }
                50% { transform: translateY(-9px) rotate(-1.2deg); }
              }
              @media (prefers-reduced-motion: reduce) {
                .invitation-artwork-wrap { animation: none; }
              }
              @media (max-width: 850px) {
                .invitation-layout {
                  grid-template-columns: minmax(0, 1fr);
                  gap: 1.5rem;
                }
                .invitation-artwork-wrap { width: min(100%, 560px); }
              }
              @media (max-width: 600px) {
                .invitation-gate { padding: 1.25rem .85rem 2rem; }
                .invitation-artwork-wrap { padding: 10px; }
                .invitation-artwork-mat { padding: 5px; }
                .invitation-right { padding: 2rem 1.35rem; }
              }

              .invitation-passcode-form {
                width: min(100%, 330px);
                margin: 0 auto;
              }
              .passcode-display {
                display: grid;
                grid-template-columns: repeat(6, minmax(0, 1fr));
                gap: .55rem;
                margin: 0 auto 1rem;
              }
              .passcode-digit {
                display: grid;
                place-items: center;
                height: 48px;
                border: 1px solid rgba(126,98,72,.48);
                border-radius: 9px;
                background: linear-gradient(145deg, rgba(255,255,255,.82), rgba(235,222,202,.72));
                box-shadow: inset 0 1px 3px rgba(91,61,43,.08), 0 2px 4px rgba(91,61,43,.06);
                color: #754238;
                font: 700 1.5rem Georgia, serif;
              }
              .passcode-digit.is-filled {
                border-color: rgba(128,66,55,.72);
                background: linear-gradient(145deg, #fffaf0, #ead8c2);
              }
              .vintage-keypad {
                display: grid;
                grid-template-columns: repeat(3, minmax(0, 1fr));
                gap: .55rem;
                width: 100%;
              }
              .keypad-button {
                min-height: 44px;
                display: grid;
                place-items: center;
                border: 1px solid rgba(126,98,72,.38);
                border-radius: 9px;
                background: linear-gradient(145deg, #fffaf1, #e9dcc9);
                color: #654438;
                box-shadow: 0 3px 0 rgba(111,78,55,.15), inset 0 1px 0 rgba(255,255,255,.8);
                font: 600 1.05rem Georgia, serif;
                cursor: pointer;
                transition: transform .16s ease, box-shadow .16s ease, background .16s ease;
              }
              .keypad-button:hover:not(:disabled) {
                transform: translateY(-2px);
                background: linear-gradient(145deg, #fffdf7, #e4cfb6);
                box-shadow: 0 5px 0 rgba(111,78,55,.13), inset 0 1px 0 rgba(255,255,255,.9);
              }
              .keypad-button:active:not(:disabled) {
                transform: translateY(1px);
                box-shadow: 0 1px 0 rgba(111,78,55,.16);
              }
              .keypad-button:disabled { opacity: .45; cursor: not-allowed; }
              .keypad-button.keypad-action {
                color: #8a5d4d;
                font: 600 .58rem Georgia, serif;
                letter-spacing: .1em;
              }
              .keypad-button.keypad-delete { color: #7d3934; }
              .invitation-unlock:disabled {
                opacity: .48;
                cursor: not-allowed;
                transform: none;
                filter: none;
              }
              .invitation-passcode-form .invitation-unlock { margin-top: .85rem; }
              @media (max-width: 600px) {
                .invitation-passcode-form { width: min(100%, 320px); }
                .passcode-digit { height: 43px; }
                .keypad-button { min-height: 42px; }
              }

              
              .invitation-gate {
                min-height: 100svh;
                padding: 1.5rem 1rem;
                justify-content: center;
              }
              .invitation-layout {
                width: min(1240px, 100%);
                display: grid;
                grid-template-columns: minmax(0, 1.12fr) minmax(320px, .88fr);
                align-items: center;
                justify-items: center;
                gap: clamp(2rem, 6vw, 5.5rem);
              }
              .invitation-left {
                width: 100%;
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 1.1rem;
              }
              .invitation-right {
                width: min(100%, 440px);
                max-width: 440px;
                padding: clamp(2rem, 4vw, 3.3rem);
                border-radius: 4px;
                box-shadow: 0 18px 48px rgba(48,16,13,.2), inset 0 0 0 7px rgba(255,255,255,.2);
              }
              .invitation-right-kicker { margin: .65rem 0 .85rem; font-size: .62rem; }
              .invitation-right h2 { font-size: clamp(1.8rem, 3vw, 2.5rem); line-height: 1.12; }
              .invitation-right-copy { max-width: 330px; margin: .9rem auto 1.1rem; font-size: .9rem; line-height: 1.55; }
              .invitation-access-label { margin-bottom: .7rem; font-size: .62rem; }
              .invitation-passcode-form { width: min(100%, 300px); margin: 0 auto; }
              .passcode-display { gap: .45rem; margin-bottom: .85rem; }
              .passcode-digit { height: 43px; min-width: 0; font-size: 1.2rem; }
              .vintage-keypad { gap: .45rem; }
              .keypad-button { min-height: 42px; border-radius: 7px; }
              .invitation-passcode-form .invitation-unlock { min-height: 43px; padding: .7rem .9rem; margin-top: .7rem; font-size: .62rem; }
              .invitation-bottom-mark { margin-top: .9rem; }
              .invitation-right::before, .invitation-right::after { font-size: 1.2rem; }
              @media (max-width: 850px) {
                .invitation-layout { grid-template-columns: minmax(0, 1fr); gap: 1.5rem; }
                .invitation-left { max-width: 560px; }
                .invitation-right { width: min(100%, 520px); }
              }
              @media (max-width: 600px) {
                .invitation-gate { padding: 1rem .8rem 2rem; }
                .invitation-right { padding: 1.5rem 1rem 1.25rem; }
                .passcode-digit { height: 38px; }
                .keypad-button { min-height: 37px; }
              }
            

        .floating-invitation {
          position: fixed;
          z-index: 30;
          right: clamp(16px, 3vw, 38px);
          bottom: clamp(18px, 4vh, 38px);
          width: 132px;
          min-height: 86px;
          padding: 1rem .7rem .7rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: .28rem;
          border: 1px solid rgba(121,72,49,.55);
          border-radius: 4px 4px 12px 4px;
          color: #63372d;
          background: linear-gradient(145deg,#fff8e9,#e6d1b4);
          box-shadow: 0 9px 22px rgba(45,25,16,.2), inset 0 0 0 4px rgba(255,255,255,.35);
          cursor: pointer;
        }
        .floating-invitation::before {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(145deg,transparent 49.5%,rgba(130,82,57,.12) 50%,transparent 50.6%), linear-gradient(215deg,transparent 49.5%,rgba(130,82,57,.1) 50%,transparent 50.6%);
          pointer-events: none;
        }
        .floating-invitation-seal { display:grid; place-items:center; color:#963b3d; }
        .floating-invitation-label { font: 600 .49rem Georgia,serif; letter-spacing:.12em; }
        .floating-invitation-open { font: italic .72rem Georgia,serif; color:#985c48; }
        .invitation-popup-backdrop {
          position: fixed; inset: 0; z-index: 100;
          display: grid; place-items: center; padding: 1.2rem;
          background: rgba(29,18,14,.66); backdrop-filter: blur(5px);
        }
        .invitation-popup-card {
          position: relative; width: min(100%, 560px); max-height: min(88svh, 850px);
          overflow-y: auto; padding: 2.1rem clamp(1rem,4vw,2.2rem) 1.5rem;
          text-align: center; color:#60392f;
          border:1px solid rgba(126,83,58,.5); border-radius:4px;
          background: repeating-linear-gradient(0deg,rgba(99,61,39,.025) 0 1px,transparent 1px 4px),linear-gradient(145deg,#fbf1df,#e8d8c1);
          box-shadow:0 25px 75px rgba(0,0,0,.34),inset 0 0 0 8px rgba(255,255,255,.24);
        }
        .invitation-popup-close {
          position:absolute; top:.7rem; right:.7rem; width:34px; height:34px;
          display:grid; place-items:center; border:1px solid rgba(110,70,50,.25);
          border-radius:50%; color:#74483b; background:rgba(255,250,240,.7); cursor:pointer;
        }
        .invitation-popup-kicker { margin:.25rem 2rem .7rem; font:600 .58rem Georgia,serif; letter-spacing:.2em; color:#986c58; }
        .invitation-popup-card h2 { margin:0 0 1.1rem; font: 500 clamp(1.7rem,5vw,2.4rem)/1.1 Georgia,serif; }
        .invitation-popup-card h2 em { display:block; font-weight:400; }
        .invitation-screenshot-frame { padding:.55rem; border:1px solid rgba(124,81,57,.45); background:#fffaf0; box-shadow:0 8px 22px rgba(73,45,30,.16); }
        .invitation-screenshot-frame img { display:block; width:100%; max-height:58vh; object-fit:contain; }
        .invitation-popup-note { margin:1rem 0 .5rem; font:italic .9rem/1.5 Georgia,serif; color:#805b4c; }
        .invitation-popup-flourish { color:#a16d57; letter-spacing:.2em; }
        @media(max-width:600px) {
          .floating-invitation { width:112px; min-height:76px; right:12px; bottom:14px; }
          .invitation-popup-card { padding:2rem 1rem 1.2rem; }
        }
        .final-words-note {
          position: relative;
          margin: 1.25rem auto .5rem;
          max-width: 390px;
          padding: 1.2rem 1.15rem 1.1rem;
          text-align: left;
          color: #643d30;
          border: 1px solid rgba(126,83,58,.42);
          background:
            radial-gradient(ellipse at 90% 100%, rgba(174,111,67,.12), transparent 38%),
            repeating-linear-gradient(0deg, rgba(99,61,39,.025) 0 1px, transparent 1px 5px),
            linear-gradient(145deg, #fff7e8, #ead7b9);
          box-shadow: 0 8px 17px rgba(73,45,30,.14), inset 0 0 0 4px rgba(255,255,255,.28);
          transform: rotate(-.6deg);
        }
        .final-words-note::before {
          content: "";
          position: absolute;
          top: -9px;
          left: 50%;
          width: 17px;
          height: 17px;
          border-radius: 50%;
          transform: translateX(-50%);
          background: radial-gradient(circle at 32% 27%, #e8c99a, #a97743 68%, #79502e);
          border: 1px solid rgba(103,65,37,.55);
          box-shadow: 0 2px 4px rgba(49,30,18,.25), inset 0 1px 2px rgba(255,255,255,.6);
        }
        .final-words-leaf {
          position: absolute;
          right: 12px;
          bottom: 7px;
          color: #a34f35;
          font: 2rem Georgia, serif;
          transform: rotate(-24deg);
          opacity: .82;
        }
        .final-words-kicker {
          margin: .1rem 0 .45rem;
          color: #95664e;
          font: 600 .58rem Georgia, serif;
          letter-spacing: .17em;
          text-transform: uppercase;
        }
        .final-words-note h3 {
          margin: 0 0 .45rem;
          color: #63382d;
          font: italic 1.55rem/1.1 Georgia, serif;
        }
        .final-words-note p {
          max-width: 290px;
          margin: 0;
          color: #805c49;
          font: italic .88rem/1.55 Georgia, serif;
        }
        .final-words-button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: .45rem;
          margin-top: .85rem;
          padding: .65rem .9rem;
          border: 1px solid rgba(126,83,58,.45);
          border-radius: 2px;
          color: #f8eddd;
          background: linear-gradient(145deg, #895047, #63332f);
          box-shadow: 0 3px 0 rgba(74,39,32,.16);
          font: 600 .62rem Georgia, serif;
          letter-spacing: .06em;
          cursor: pointer;
          transition: transform .2s ease, filter .2s ease;
        }
        .final-words-button:hover { transform: translateY(-2px); filter: brightness(1.07); }
        .final-words-letter {
          position: relative;
          margin: 1.2rem auto .25rem;
          max-width: 440px;
          padding: 1.7rem clamp(1rem, 4vw, 2rem) 1.45rem;
          text-align: left;
          color: #5f3b30;
          border: 1px solid rgba(126,83,58,.48);
          background:
            radial-gradient(ellipse at 8% 5%, rgba(178,123,72,.12), transparent 30%),
            radial-gradient(ellipse at 95% 95%, rgba(178,123,72,.13), transparent 32%),
            repeating-linear-gradient(0deg, rgba(99,61,39,.025) 0 1px, transparent 1px 5px),
            #f8eedc;
          box-shadow: 0 13px 28px rgba(73,45,30,.17), inset 0 0 0 6px rgba(255,255,255,.24);
        }
        .final-words-letter::after {
          content: "❦";
          position: absolute;
          right: 13px;
          bottom: 8px;
          color: #a35f49;
          font: 1.5rem Georgia, serif;
          opacity: .7;
        }
        .final-words-letter-topline {
          display: flex;
          justify-content: space-between;
          gap: .7rem;
          padding-bottom: .7rem;
          border-bottom: 1px solid rgba(126,83,58,.28);
          color: #9a7258;
          font: 600 .5rem Georgia, serif;
          letter-spacing: .13em;
        }
        .final-words-letter h3 {
          margin: 1.1rem 0 .8rem;
          color: #693c30;
          font: italic 1.8rem/1.1 Georgia, serif;
        }
        .final-words-letter p {
          margin: 0 0 .8rem;
          font: .88rem/1.75 Georgia, serif;
          color: #725344;
        }
        .final-words-signoff {
          margin-top: 1.1rem !important;
          font-style: italic !important;
          color: #874d40 !important;
        }
        .final-words-letter-footer {
          display: flex;
          justify-content: space-between;
          align-items: end;
          gap: .8rem;
          margin-top: 1rem;
          padding-top: .7rem;
          border-top: 1px solid rgba(126,83,58,.25);
          color: #946d55;
          font: italic .75rem Georgia, serif;
        }
        .final-words-popup-backdrop {
          position: fixed;
          inset: 0;
          z-index: 10000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1rem;
          overflow-y: auto;
          background: rgba(31, 22, 19, .76);
          backdrop-filter: blur(7px);
          -webkit-backdrop-filter: blur(7px);
        }
        .final-words-popup-card {
          position: relative;
          width: min(100%, 560px);
          max-height: min(88dvh, 900px);
          overflow-y: auto;
          padding: clamp(1.1rem, 3vw, 1.7rem);
          border: 1px solid rgba(197, 157, 112, .65);
          background: linear-gradient(145deg, #e9d7bd, #f5e8d3 48%, #e7d1b2);
          box-shadow: 0 25px 80px rgba(0,0,0,.38), inset 0 0 0 5px rgba(255,255,255,.22);
          scrollbar-color: #a77b5c #ead9c2;
        }
        .final-words-popup-card .final-words-letter {
          width: 100%;
          max-width: none;
          margin: 0;
          padding: clamp(1.5rem, 4vw, 2.4rem);
          box-shadow: 0 10px 25px rgba(73,45,30,.12), inset 0 0 0 6px rgba(255,255,255,.24);
        }
        .final-words-popup-close {
          position: sticky;
          top: 0;
          z-index: 2;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: .45rem;
          width: fit-content;
          margin: 0 0 .8rem auto;
          padding: .5rem .7rem;
          border: 1px solid rgba(126,83,58,.4);
          color: #704638;
          background: rgba(255,248,235,.9);
          font: .7rem Georgia, serif;
          cursor: pointer;
        }
        @media(max-width:600px) {
          .final-words-note { padding: 1.1rem .9rem .95rem; }
          .final-words-letter { padding: 1.35rem 1rem 1.2rem; }
          .final-words-letter p { font-size: .84rem; }
          .final-words-letter-topline { font-size: .44rem; }
          .final-words-popup-backdrop { padding: .55rem; }
          .final-words-popup-card { max-height: 92dvh; padding: .7rem; }
          .final-words-popup-card .final-words-letter { padding: 1.35rem 1rem 1.2rem; }
        }
      `}</style>
      <div className="grain" aria-hidden="true" />
      <div className="ambient ambient-one" aria-hidden="true" />
      <div className="ambient ambient-two" aria-hidden="true" />

      <AnimatePresence mode="wait">
        {!unlocked ? (
          <motion.section
            className="gate invitation-gate"
            key="gate"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, filter: "blur(8px)" }}
            transition={{ duration: 0.65 }}
          >
            

            <div className="invitation-layout">
              <div className="invitation-left">
                <div className="invitation-topline">
                  <span>THE ARCHIVE OF US</span>
                  <span>ONE LAST LITTLE KEEPSAKE</span>
                </div>

                <motion.div
                  className="invitation-artwork-wrap"
                  initial={{ opacity: 0, y: 28, rotate: -7, scale: 0.94 }}
                  animate={{ opacity: 1, y: 0, rotate: -2.2, scale: 1 }}
                  transition={{ duration: 1.05, ease: [0.2, 0.75, 0.25, 1] }}
                  whileHover={{ rotate: -1, scale: 1.015, y: -4 }}
                >
                  <div className="invitation-artwork-mat">
                    <img
                      src="/photos/invitation.jpeg"
                      alt="A vintage sunset illustration with the words I Love You for the one last time"
                      className="invitation-artwork"
                      fetchPriority="high"
                    />
                  </div>
                </motion.div>
              </div>

              <div className="invitation-right">
                <p className="invitation-right-kicker">A PRIVATE LITTLE WORLD</p>
                <h2>
                  Unlock the
                  <em>memories I've made for us.</em>
                </h2>
                <p className="invitation-right-copy">
                  Every photograph, every voice, every little moment has been
                  kept here. Enter the passcode to open our archive.
                </p>

                <div className="invitation-access">
                  <p className="invitation-access-label">ENTER THE SECRET PASSCODE</p>
                  <form className="invitation-passcode-form" onSubmit={unlock}>
                    <div
                      className="passcode-display"
                      role="group"
                      aria-label={`Passcode entered: ${passcode.length} of 6 digits`}
                    >
                      {Array.from({ length: 6 }, (_, index) => (
                        <span
                          className={`passcode-digit ${passcode[index] ? "is-filled" : ""}`}
                          key={index}
                          aria-hidden="true"
                        >
                          {passcode[index] ? "•" : ""}
                        </span>
                      ))}
                    </div>

                    <div className="vintage-keypad" aria-label="Numeric passcode keypad">
                      {["1", "2", "3", "4", "5", "6", "7", "8", "9"].map((digit) => (
                        <button
                          className="keypad-button"
                          key={digit}
                          type="button"
                          onClick={() => addPasscodeDigit(digit)}
                          disabled={passcode.length === 6}
                          aria-label={`Enter ${digit}`}
                        >
                          {digit}
                        </button>
                      ))}
                      <button
                        className="keypad-button keypad-action"
                        type="button"
                        onClick={() => setPasscode("")}
                        aria-label="Clear passcode"
                      >
                        CLEAR
                      </button>
                      <button
                        className="keypad-button"
                        type="button"
                        onClick={() => addPasscodeDigit("0")}
                        disabled={passcode.length === 6}
                        aria-label="Enter 0"
                      >
                        0
                      </button>
                      <button
                        className="keypad-button keypad-action keypad-delete"
                        type="button"
                        onClick={removePasscodeDigit}
                        aria-label="Delete last digit"
                      >
                        <ArrowLeft size={17} />
                      </button>
                    </div>

                    <button
                      className="invitation-unlock"
                      type="submit"
                      disabled={passcode.length !== 6}
                    >
                      UNLOCK OUR MEMORIES <ArrowUpRight size={16} />
                    </button>
                  </form>

                  <AnimatePresence>
                    {error && (
                      <motion.p
                        className="invitation-error"
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                      >
                        Not quite, baby. Try the secret again.
                      </motion.p>
                    )}
                  </AnimatePresence>
                  <div className="invitation-bottom-mark">— — ♡ — —</div>
                </div>
              </div>
            </div>
          </motion.section>
        ) : (
          <motion.section
            className="archive"
            key="archive"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, ease: "easeOut" }}
          >
            <header className="archive-header">
              <div className="monogram">
                A<span>·</span>F
                
                
              </div>

              <span className="header-note">A PRIVATE LITTLE COLLECTION</span>

              <button
                className="lock-again"
                onClick={() => {
                  setUnlocked(false);
                  sessionStorage.removeItem("archive-unlocked");
                  setPasscode("");
                  closeSection();
                }}
              >
                <LockKeyhole size={14} /> Lock away
              </button>
            </header>

            <div className="intro">
              <div
                className="intro-ornament intro-ornament-left"
                aria-hidden="true"
              >
                ❦
              </div>

              <div
                className="intro-ornament intro-ornament-right"
                aria-hidden="true"
              >
                ❦
              </div>

              <motion.div
                className="small-star"
                animate={{ rotate: 360 }}
                transition={{
                  duration: 24,
                  repeat: Infinity,
                  ease: "linear",
                }}
              >
                <Sparkles size={20} />
              </motion.div>

              <p className="eyebrow">A PRIVATE COLLECTION · VOL. I</p>
              <h1>
                The Archive <em>of Us.</em>
              </h1>
              <p className="intro-handwritten">little things, kept close</p>
              <p className="intro-text">
                A few little things, made with you in mind.
                <br />
                Take your time. There’s no hurry here.
              </p>

              <div className="divider">
                <span>✳</span>
              </div>
            </div>

            <div className="cards">
              <motion.button
                className="memory-card film-card"
                onClick={() => openSection("cinema")}
                whileHover={{ y: -8, rotate: -0.6 }}
                whileTap={{ scale: 0.985 }}
                transition={{
                  type: "spring",
                  stiffness: 240,
                  damping: 18,
                }}
              >
                <span className="card-number">
                  NO. 01 <span>·</span> MOVING MEMORIES
                </span>

                <div className="card-art film-art">
                  <div className="film-frame">
                    <Film size={36} strokeWidth={1.1} />
                    <span>PLAY OUR LITTLE FILM</span>
                  </div>
                  <span className="art-sparkle">✳</span>
                  <span className="art-caption">reel no. 001</span>
                </div>

                <span className="wax-mini">
                  <Heart size={14} fill="currentColor" />
                </span>

                <span className="card-title">
                  A Little Cinema <em>of Us</em>
                </span>
                <span className="card-subtitle">
                  Little moments, carefully kept.
                </span>
                <span className="card-open">
                  OPEN THIS ENVELOPE <ArrowUpRight size={14} />
                </span>
              </motion.button>

              <motion.button
                className="memory-card voice-card"
                onClick={() => openSection("voices")}
                whileHover={{ y: -8, rotate: 0.6 }}
                whileTap={{ scale: 0.985 }}
                transition={{
                  type: "spring",
                  stiffness: 240,
                  damping: 18,
                }}
              >
                <span className="card-number">
                  NO. 02 <span>·</span> LITTLE SOUND MEMORIES
                </span>

                <div className="card-art voice-art">
                  <div className="record">
                    <div className="record-center">
                      <AudioLines size={28} strokeWidth={1.1} />
                    </div>
                  </div>
                  <span className="voice-note">a voice to keep</span>
                  <span className="art-sparkle">✧</span>
                </div>

                <span className="wax-mini green-wax">
                  <Heart size={14} fill="currentColor" />
                </span>

                <span className="card-title">
                  Voices I Could Listen <em>to Forever</em>
                </span>
                <span className="card-subtitle">
                  Some moments are worth hearing twice.
                </span>
                <span className="card-open">
                  LISTEN A LITTLE <ArrowUpRight size={14} />
                </span>
              </motion.button>

              <motion.button
                className="memory-card letter-card"
                onClick={openCanva}
                whileHover={{ y: -8, rotate: -0.35 }}
                whileTap={{ scale: 0.985 }}
                transition={{
                  type: "spring",
                  stiffness: 240,
                  damping: 18,
                }}
              >
                <span className="card-number">
                  NO. 03 <span>·</span> WORDS FROM THE HEART
                </span>

                <div className="card-art letter-art">
                  <div className="letter-stack">
                    <div className="letter-sheet">
                      <span>my dearest,</span>
                      <i />
                      <i />
                      <i />
                      <i />
                      <small>with love, always</small>
                    </div>
                  </div>

                  <span className="letter-stamp">
                    YOURS
                    <br />
                    TRULY
                  </span>
                  <span className="art-sparkle">✳</span>
                </div>

                <span className="wax-mini">
                  <Heart size={14} fill="currentColor" />
                </span>

                <span className="card-title">
                  Letters the <em>Moon Kept</em>
                </span>
                <span className="card-subtitle">
                  Words I wanted you to find.
                </span>
                <span className="card-open">
                  READ MY LETTERS <ArrowUpRight size={14} />
                </span>
              </motion.button>

              <motion.a
                className="memory-card surprise-card"
                href={SURPRISE_URL}
                target="_blank"
                rel="noreferrer"
                whileHover={{ y: -8, rotate: 0.55 }}
                whileTap={{ scale: 0.985 }}
                transition={{
                  type: "spring",
                  stiffness: 240,
                  damping: 18,
                }}
              >
                <span className="card-number">
                  NO. 04 <span>·</span> A SURPRISE FROM YOU
                </span>

                <div className="card-art surprise-art">
                  <div className="surprise-paper">
                    <span className="surprise-small">A LITTLE SOMETHING</span>
                    <span className="surprise-script">left unfinished...</span>
                    <span className="surprise-flower">❦</span>
                  </div>

                  <span className="surprise-stamp">
                    OPEN
                    <br />
                    WHEN
                    <br />
                    READY
                  </span>

                  <span className="art-sparkle">✧</span>
                </div>

                <span className="wax-mini surprise-wax">
                  <Heart size={14} fill="currentColor" />
                </span>

                <span className="card-title">
                  The Little Surprise <em>You Left Unfinished</em>
                </span>
                <span className="card-subtitle">
                  A precious little something from you, still waiting for its
                  ending.
                </span>
                <span className="card-open">
                  OPEN YOUR SURPRISE <ArrowUpRight size={14} />
                </span>
              </motion.a>
            </div>

            <footer className="archive-footer">
              <span>SEALED WITH A LITTLE LOVE</span>
              <Heart size={13} fill="currentColor" />
              <span>OPENED ONLY BY YOU</span>
            </footer>

            <motion.button
                type="button"
                className="floating-invitation"
                aria-label="Open the little invitation"
                onClick={() => setInvitationOpen(true)}
                animate={{ y: [0, -13, 3, -9, 0], rotate: [-3, 4, -2, 3, -3] }}
                transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut" }}
                whileHover={{ scale: 1.08, rotate: 0 }}
                whileTap={{ scale: .94 }}
              >
                <span className="floating-invitation-seal"><Heart size={15} fill="currentColor" /></span>
                <span className="floating-invitation-label">A LITTLE INVITATION</span>
                <span className="floating-invitation-open">OPEN ME</span>
            </motion.button>
          </motion.section>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {invitationOpen && (
          <motion.div
            className="invitation-popup-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => { setInvitationOpen(false); setFinalWordsOpen(false); }}
          >
            <motion.section
              className="invitation-popup-card"
              role="dialog"
              aria-modal="true"
              aria-label="A little invitation"
              initial={{ opacity: 0, y: 28, scale: .9, rotate: -2 }}
              animate={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, y: 15, scale: .96 }}
              transition={{ type: "spring", stiffness: 220, damping: 22 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="invitation-popup-close"
                type="button"
                aria-label="Close invitation"
                onClick={() => { setInvitationOpen(false); setFinalWordsOpen(false); }}
              >
                <X size={19} />
              </button>
              <p className="invitation-popup-kicker">A LITTLE SOMETHING I SAVED FOR YOU</p>
              <h2>One more little <em>thing to keep.</em></h2>
              <div className="invitation-screenshot-frame">
                <img
                  src="/photos/invitation-screenshot.jpeg"
                  alt="The invitation screenshot"
                />
              </div>
              <p className="invitation-popup-note">Remember the excitement, the little butterflies, and the happiness we found in the smallest things. I hope you never forget how beautiful those moments felt.</p>
              <span className="invitation-popup-flourish">— — ❦ — —</span>

              <div className="final-words-note">
                <span className="final-words-leaf" aria-hidden="true">❧</span>
                <p className="final-words-kicker">A little note, kept between these pages</p>
                <h3>Before you leave...</h3>
                <p>There’s one last thing I want you to know.</p>
                <button
                  className="final-words-button"
                  type="button"
                  onClick={() => {
                    setInvitationOpen(false);
                    setFinalWordsOpen(false);
                    window.location.href = "/final-words.pdf";
                  }}
                  aria-expanded={false}
                >
                  Read my final words →
                </button>
              </div>
            </motion.section>
          </motion.div>
        )}
      </AnimatePresence>

      

      <AnimatePresence>
        {finalWordsOpen && (
          <motion.div
            className="final-words-popup-backdrop"
            role="presentation"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setFinalWordsOpen(false)}
          >
            <motion.section
              className="final-words-popup-card"
              role="dialog"
              aria-modal="true"
              aria-label="My final words"
              initial={{ opacity: 0, y: 28, scale: .94, rotate: -1 }}
              animate={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, y: 16, scale: .97 }}
              transition={{ type: "spring", stiffness: 220, damping: 23 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="final-words-popup-close"
                type="button"
                onClick={() => setFinalWordsOpen(false)}
              >
                <X size={15} />
                CLOSE LETTER
              </button>
              <article className="final-words-letter">
                <div className="final-words-letter-topline">
                  <span>THE LAST LITTLE LETTER</span>
                  <span>KEPT WITH LOVE</span>
                </div>
                <h3>Abbas, my dear,</h3>
                <p>
                  If you’re reading this, I hope you take a moment to remember us—not only how things ended, but how happy we were in the little moments that made our story ours.
                </p>
                <p>
                  Remember the excitement, the butterflies, the way the smallest things could make an ordinary day feel special. Remember how we looked forward to talking, how a few words could make us smile, and how much happiness we found in simply having each other.
                </p>
                <p>
                  I don’t want these memories to be remembered only with sadness. They were real, they mattered, and they brought so much happiness into my life. Whatever happens from here, I’ll always be grateful that I got to experience those moments with you.
                </p>
                <p>
                  I made this little archive so that, for a while, you could step back into those memories and feel the warmth they once held. You don’t have to do anything with these words. I only wanted you to know what they meant to me.
                </p>
                <p className="final-words-signoff">
                  Please remember the excitement, the happiness, and the little world we once made together.
                </p>
                <div className="final-words-letter-footer">
                  <span>With all the feelings I couldn’t fit into these pages,</span>
                  <span aria-hidden="true">❦</span>
                </div>
              </article>
            </motion.section>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {activeSection && (
          <motion.div
            className="modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeSection}
          >
            <motion.section
              className="content-modal"
              initial={{ opacity: 0, y: 24, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 14, scale: 0.98 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="modal-close"
                onClick={closeSection}
                aria-label="Close"
              >
                <X size={20} />
              </button>

              <button className="back-link" onClick={closeSection}>
                <ArrowLeft size={15} /> BACK TO THE ARCHIVE
              </button>

              {activeSection === "cinema" ? (
                <>
                  <div className="modal-icon">
                    <Film size={25} />
                  </div>

                  <p className="eyebrow">THE LITTLE FILM ARCHIVE</p>
                  <h2>
                    A Little Cinema <em>of Us</em>
                  </h2>
                  <p className="modal-copy">
                    Make yourself comfortable. The rest of the world can wait
                    a little while.
                  </p>

                  <div className="vintage-welcome">
                    <span className="welcome-ornament">✳</span>
                    <p className="welcome-kicker">
                      NOW SHOWING · JUST FOR YOU
                    </p>
                    <p className="welcome-line">
                      “Some moments deserve
                      <br />
                      their own little cinema.”
                    </p>
                    <span className="welcome-rule">— — — ❦ — — —</span>
                  </div>

                  <div className="media-list">
                    {CINEMA_ITEMS.map((item, index) => (
                      <article
                        className={`vintage-media-item ${
                          item.kind === "photo" ? "photo-item" : ""
                        }`}
                        key={`${item.kind}-${index}`}
                      >
                        <div className="media-item-heading">
                          
                          <h3>{item.title}</h3>
                          <p>{item.note}</p>
                        </div>

                        {item.kind === "video" ? (
                          <video
                            className="vintage-video"
                            controls
                            playsInline
                            preload="metadata"
                          >
                            <source src={item.src} type="video/mp4" />
                            Your browser does not support video playback.
                          </video>
                        ) : item.src ? (
                          <figure className="vintage-photo-frame">
                            <img
                              src={item.src}
                              alt={item.title}
                              className="scrapbook-photo"
                              onClick={() => {
                                const photoIndex = PHOTOS.findIndex(
                                  (photo) => photo.src === item.src
                                );
                                if (photoIndex !== -1) {
                                  setSelectedPhoto(photoIndex);
                                }
                              }}
                            />
                            <figcaption>
                              kept in the little archive of us
                            </figcaption>
                          </figure>
                        ) : (
                          <div className="photo-slot">
                            <span className="photo-slot-mark">✳</span>
                            <span className="photo-slot-label">
                              YOUR PHOTOGRAPH GOES HERE
                            </span>
                            
                          </div>
                        )}

                        <p className="media-footnote">
                          {item.kind === "video"
                            ? "A little memory from the archive · Take your time."
                            : "A still moment, pressed gently into the pages."}
                        </p>
                      </article>
                    ))}
                  </div>

                  <div className="vintage-endnote">
                    <span>❦</span>
                    <p>
                      And that is the end of this little reel.
                      <br />
                      Until there are more memories to keep.
                    </p>
                  </div>

                  
                </>
              ) : (
                <>
                  <div className="modal-icon green-icon">
                    <Volume2 size={25} />
                  </div>

                  <p className="eyebrow">A FEW THINGS TO LISTEN TO</p>
                  <h2>
                    Voices I Could Listen <em>to Forever</em>
                  </h2>
                  <p className="modal-copy">
                    If the day feels too loud, stay here for a moment and
                    listen.
                  </p>

                  <div className="vintage-welcome audio-welcome">
                    <span className="welcome-ornament">♫</span>
                    <p className="welcome-kicker">
                      A SMALL LISTENING ROOM
                    </p>
                    <p className="welcome-line">
                      “A familiar voice can make
                      <br />
                      even a quiet room feel warm.”
                    </p>
                    <span className="welcome-rule">— — — ❦ — — —</span>
                  </div>

                  <article className="voices-letter">
                    <div className="voices-letter-topline">
                      <span>A NOTE FOR YOU</span>
                      <span>KEPT BETWEEN US</span>
                    </div>

                    <p className="voices-letter-salutation">Abbas,</p>

                    <div className="voices-letter-body">
                      <p>
                        I don’t know if you ever open this now and then, but I do.
                        Maybe more often than I should. I made this little space
                        for us, and I’ve kept a few of your voice notes here..
                        little pieces of you I can return to whenever I miss
                        hearing your voice.
                      </p>
                      <p>
                        But guess what? Somewhere between all these recordings,
                        there’s a little piece of me too.
                      </p>
                      <p>
                        You once said you wouldn’t give up on this. You said you
                        wouldn’t want things to end like this. You said you’d be
                        willing to take risks for us.
                      </p>
                      <p>
                        Baby I still remember those words. So sometimes I
                        wonder what happened. We went from talking about taking
                        risks together to choosing to end everything.
                      </p>
                      <p>
                        I know things can become harder than we expect. Maybe
                        we got tired, maybe we got hurt, or maybe we didn’t know
                        how to find our way back to each other. But I believed
                        you when you said you would come to me. I believed there was
                        still something worth fighting for. Because we were in your hands.
                      </p>
                      <p>
                        These voice notes aren’t just recordings to me. They’re
                        little moments of you, and reminders of what we were.
                        If you ever listen to them again, I hope you remember
                        how real it all was to me.
                      </p>
                    </div>

                    <p className="voices-letter-signoff">
                      Some voices stay with us, even when the person behind
                      them chooses to leave.
                    </p>

                    <div className="voices-letter-footer">
                      <span>— a little piece of yours, kept here</span>
                      <span aria-hidden="true">❦</span>
                    </div>
                  </article>

                  <div className="media-list">
                    {AUDIO.map((track, index) => (
                      <article
                        className="vintage-media-item audio-item"
                        key={track.src}
                      >
                        <div className="audio-record-large">
                          <AudioLines size={27} />
                        </div>

                        <div className="media-item-heading">
                          
                          <h3>{track.title}</h3>
                          <p>{track.note}</p>
                        </div>

                        <audio
                          className="vintage-audio"
                          controls
                          preload="metadata"
                        >
                          <source src={track.src} type="audio/ogg" />
                          Your browser does not support audio playback.
                        </audio>

                        <p className="media-footnote">
                          Recorded once, kept here a little longer.
                        </p>
                      </article>
                    ))}
                  </div>

                  <div className="vintage-endnote">
                    <span>❦</span>
                    <p>
                      Press play, baby.
                      <br />
                      For a little while, let’s go back.
                    </p>
                  </div>

                  
                </>
              )}
            </motion.section>
          </motion.div>
        )}
      </AnimatePresence>

      
      <AnimatePresence>
        {selectedPhoto !== null && PHOTOS[selectedPhoto] && (
          <motion.div
            className="photo-lightbox"
            role="dialog"
            aria-modal="true"
            aria-label="Enlarged photograph"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setSelectedPhoto(null)}
          >
            <button
              className="lightbox-close"
              onClick={() => setSelectedPhoto(null)}
              aria-label="Close photo"
            >
              <X size={27} />
            </button>

            {PHOTOS.length > 1 && (
              <button
                className="lightbox-nav lightbox-prev"
                onClick={showPreviousPhoto}
                aria-label="Previous photo"
              >
                ‹
              </button>
            )}

            <motion.figure
              className="lightbox-figure"
              key={PHOTOS[selectedPhoto].src}
              initial={{ opacity: 0, scale: 0.94, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={PHOTOS[selectedPhoto].src}
                alt={PHOTOS[selectedPhoto].title}
                className="lightbox-image"
              />

              <figcaption className="lightbox-caption">
                <span>❦</span>
                <span>{PHOTOS[selectedPhoto].title}</span>
                <span>❦</span>
              </figcaption>
            </motion.figure>

            {PHOTOS.length > 1 && (
              <button
                className="lightbox-nav lightbox-next"
                onClick={showNextPhoto}
                aria-label="Next photo"
              >
                ›
              </button>
            )}

            
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
