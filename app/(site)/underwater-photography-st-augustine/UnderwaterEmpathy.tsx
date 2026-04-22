import Image from "next/image";

export function UnderwaterEmpathy() {
  return (
    <section className="bg-(--color-cream)">
      {/* Leading image — sets the mood before the letter */}
      <div className="relative w-full h-[360px] md:h-[460px] overflow-hidden">
        <Image
          src="/images/underwater/gallery-05.webp"
          alt="Woman floating weightlessly in a pool during underwater portrait session"
          fill
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-(--color-cream)" />
      </div>

      {/* Letter */}
      <div className="pt-4 pb-20 px-6">
        <div className="max-w-2xl mx-auto flex flex-col gap-7">
          <h2 className="font-serif text-4xl md:text-5xl font-normal leading-tight text-(--color-ink)">
            For the person reading this.
          </h2>

          <p className="text-sm leading-relaxed text-(--color-muted)">
            You found this page because something pulled you here. Maybe an image you couldn&apos;t
            stop thinking about. Maybe the idea of finally doing something just for yourself &mdash;
            something wild and beautiful and a little bit scary.
          </p>

          <p className="text-sm leading-relaxed text-(--color-muted)">
            And then the other voice showed up. <em>I&apos;m not a model. I can&apos;t hold my breath.
            I&apos;ll look awkward underwater. My body isn&apos;t&hellip;</em> whatever it is you tell yourself.
          </p>

          {/* Pullquote */}
          <blockquote className="border-l-2 border-(--color-accent) pl-6 py-1 my-1">
            <p className="font-serif text-xl italic text-(--color-ink) leading-relaxed">
              &ldquo;I used to stand in front of the mirror and count every single thing I needed
              to fix before I could feel beautiful. It turns out my body didn&apos;t need fixing.
              Just my perception of it.&rdquo;
            </p>
            <cite className="text-xs tracking-widest uppercase text-(--color-muted) mt-3 block not-italic">
              &mdash; Jennifer James
            </cite>
          </blockquote>

          <p className="text-sm leading-relaxed text-(--color-muted)">
            After nine years behind the camera, I can tell you: the water does something
            to people that nothing else does. The moment you go under, the noise stops. The
            comparisons, the self-criticism, the mental list of everything you wish were different
            &mdash; it all stays on the surface. Below the waterline, there is only the light,
            the movement, and exactly who you are. Most clients describe it as the first time
            they have ever felt completely weightless &mdash; in their body and in their head.
          </p>

          <p className="text-sm leading-relaxed text-(--color-muted)">
            I grew up between Virginia Beach, Honolulu, and Jacksonville. Always near water.
            Always most myself in it. Mermaids are literally the official mascot of my hometown,
            and I have considered myself one at heart my entire life. This work is not just
            photography to me. It is proof, for every person who floats in front of my lens,
            that they were always worth seeing clearly.
          </p>

          <p className="text-sm leading-relaxed text-(--color-muted)">
            Every client has surfaced saying some version of the same thing:{" "}
            <em>&ldquo;Oh my god &mdash; that&apos;s me?&rdquo;</em> Not a version of themselves
            they&apos;ve been chasing. Not themselves on a good day. Just them &mdash; seen clearly,
            maybe for the first time.
          </p>

          <p className="text-sm leading-relaxed text-(--color-muted)">
            That moment is why I do this.
          </p>

          <p className="text-sm font-medium text-(--color-ink)">&mdash; Jennifer James</p>
        </div>
      </div>
    </section>
  );
}
