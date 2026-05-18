"use client";
import Image from "next/image";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";

const scenes = [
  { name: "Solo Boudoir", img: "/seattle/sls-5.webp", desc: "Your story, your shoot — intimate, editorial, unmistakably you" },
  { name: "Couples Boudoir", img: "/seattle/sbc-9.webp", desc: "Real chemistry, honest tenderness, zero awkwardness" },
  { name: "Bridal Boudoir", img: "/seattle/sbc-11.webp", desc: "The wedding-day gift your partner will never forget" },
  { name: "Glam & Beauty", img: "/seattle/sbc-4.webp", desc: "Editorial glamour — no lingerie required" },
  { name: "Empowerment", img: "/seattle/sbc-6.webp", desc: "Mark the milestone, reclaim the chapter, own the moment" },
  { name: "Erotica", img: "/seattle/sbc-1.webp", desc: "Bolder, braver, fully you — for the brave and the curious" },
];

export function SEAScenes() {
  return (
    <section className="bg-(--color-ink) py-24 px-6">
      <div className="max-w-7xl mx-auto flex flex-col gap-14">
        <AnimateOnScroll className="text-center flex flex-col gap-3">
          <span className="text-xs tracking-widest uppercase text-(--color-accent)">
            Choose Your Session
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-normal leading-tight text-(--color-cream)">
            Six Ways to{" "}
            <em className="italic">Be Seen.</em>
          </h2>
          <p className="text-sm text-(--color-cream)/60 max-w-md mx-auto leading-relaxed">
            From bridal to couples to solo empowerment — every session is
            fully tailored. No cookie-cutter packages, no scripted poses.
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
                alt={`${scene.name} session at Seattle Boudoir & Co studio`}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 flex flex-col gap-1">
                <h3 className="font-serif text-xl text-white">{scene.name}</h3>
                <p className="text-xs text-white/65 leading-relaxed">
                  {scene.desc}
                </p>
              </div>
            </AnimateOnScroll>
          ))}
        </div>

        <AnimateOnScroll delay={200} className="text-center">
          <p className="text-sm italic text-(--color-cream)/50 max-w-md mx-auto leading-relaxed">
            Themed shoots, maternity, branding, destination, fantasy and
            art-nude all available. If you can dream it, we can shoot it.
          </p>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
