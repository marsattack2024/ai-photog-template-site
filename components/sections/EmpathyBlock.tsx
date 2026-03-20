export function EmpathyBlock() {
  return (
    <section className="py-24 px-6 bg-(--color-cream)">
      <div className="max-w-2xl mx-auto text-center flex flex-col gap-6">
        <h2 className="font-serif text-4xl md:text-5xl font-normal leading-tight text-(--color-ink)">
          You hate how you look in photos.
          <br />
          <em className="italic">I hear that all the time.</em>
        </h2>
        <p className="text-sm leading-relaxed text-(--color-muted)">
          Most people feel awkward in front of a camera. They don&apos;t know where to look, what
          to do with their hands, or how to feel natural when someone is pointing a lens at them.
          That&apos;s not a you problem — that&apos;s a photographer problem. My job is to make
          you forget the camera is there.
        </p>
        <p className="text-sm leading-relaxed text-(--color-muted)">
          Every session includes full posing guidance, a pre-shoot style consultation, and a
          relaxed pace that lets you actually enjoy the experience. You don&apos;t need to know
          how to pose. You just need to show up.
        </p>
      </div>
    </section>
  );
}
