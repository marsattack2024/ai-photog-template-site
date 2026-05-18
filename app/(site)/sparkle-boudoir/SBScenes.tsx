"use client";
import Image from "next/image";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";

const scenes = [
  { name: "Wings", img: "/sparkle/scene-wings.jpg", desc: "Dramatic angel wings backdrop — ethereal and powerful" },
  { name: "Rain Room", img: "/sparkle/scene-rain.jpg", desc: "Real water, dramatic lighting — cinematic and unforgettable" },
  { name: "Smoke & Lights", img: "/sparkle/scene-smoke.jpg", desc: "Haze and moody lighting for an editorial feel" },
  { name: "The Bedroom", img: "/sparkle/scene-bedroom.jpg", desc: "Classic luxury bedroom — intimate and elegant" },
  { name: "Dance Pole", img: "/sparkle/scene-pole.jpg", desc: "Fierce, confident, and unapologetically bold" },
  { name: "Faux Shower", img: "/sparkle/scene-shower.jpg", desc: "Wet look without the mess — sensual and artistic" },
];

export function SBScenes() {
  return (
    <section className="bg-(--color-ink) py-24 px-6">
      <div className="max-w-7xl mx-auto flex flex-col gap-14">
        <AnimateOnScroll className="text-center flex flex-col gap-3">
          <span className="text-xs tracking-widest uppercase text-(--color-accent)">
            10+ Cinematic Sets
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-normal leading-tight text-(--color-cream)">
            Choose Your{" "}
            <em className="italic">Scene.</em>
          </h2>
          <p className="text-sm text-(--color-cream)/60 max-w-md mx-auto leading-relaxed">
            From ethereal wings to a rain room to smoke-filled editorial — your
            session can be anything you dream it to be.
          </p>
        </AnimateOnScroll>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {scenes.map((scene, i) => (
            <AnimateOnScroll
              key={scene.name}
              delay={i * 60}
              className="group relative h-80 overflow-hidden"
            >
              <Image
                src={scene.img}
                alt={`${scene.name} set at Empower & Sparkle Boudoir studio`}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 flex flex-col gap-1">
                <h3 className="font-serif text-xl text-white">{scene.name}</h3>
                <p className="text-xs text-white/60 leading-relaxed">
                  {scene.desc}
                </p>
              </div>
            </AnimateOnScroll>
          ))}
        </div>

        <AnimateOnScroll delay={200} className="text-center">
          <p className="text-sm italic text-(--color-cream)/50 max-w-md mx-auto leading-relaxed">
            Plus: Egg Chair, Swing, Wet Body, Bedsheets, and more.
            Your session includes access to every set in the studio.
          </p>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
