import Cursor from "@/components/Cursor";
import Loader from "@/components/Loader";
import ProcessStack from "@/components/ProcessStack";
import ServicesList from "@/components/ServicesList";
import ScrollLine from "@/components/ScrollLine";
import SmoothScroll from "@/components/SmoothScroll";
import { Fade, Words } from "@/components/Reveal";

const work = [
  ["Aurelia", "Identity / Web", "2026"],
  ["Kasi Eats", "Product / Motion", "2026"],
  ["Northbound", "Strategy / Brand", "2025"],
  ["Ondine", "Web Experience", "2025"],
];

const wrap = "mx-auto w-full max-w-7xl px-6 md:px-10";

export default function Home() {
  return (
    <>
      <SmoothScroll />
      <Loader />
      <Cursor />

      <header className="fixed inset-x-0 top-0 z-50 flex items-center justify-between bg-background/80 px-6 py-3 backdrop-blur-md md:px-10 md:py-4">
        <a href="#top" className="absolute left-1/2 flex -translate-x-1/2 items-center gap-2.5 text-lg font-semibold tracking-tight text-foreground">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.svg" alt="" className="h-8 w-auto" />
          Inevita
        </a>
      </header>

      <main id="top" className="relative overflow-x-clip">
        <ScrollLine />

        {/* Hero */}
        <section className={`${wrap} relative z-10 flex min-h-svh flex-col justify-end pb-16 pt-32`}>
          <h1 className="text-[clamp(2.5rem,13vw,13rem)] font-semibold leading-[0.88] tracking-tighter">
            <Words text="Made to feel" delay={1.4} />
            <br />
            <Words text="inevitable." className="bg-lime px-[0.15em] -mx-[0.05em] rounded-[0.12em] text-[#121212]" delay={1.6} />
          </h1>
          <div className="mt-8 flex items-end justify-between gap-8 md:mt-12">
            <p className="max-w-sm text-base text-foreground/70 md:text-lg">
              Inevita builds brands and digital experiences that people remember and come back to.
            </p>
            <span className="hidden font-sans text-xs uppercase tracking-widest text-foreground/50 md:block">
              Scroll to follow the line
            </span>
          </div>
        </section>

        {/* Manifesto */}
        <section className={`${wrap} relative z-10 py-32 md:py-64`}>
          <p className="max-w-5xl text-[clamp(1.75rem,4.5vw,4.5rem)] font-medium leading-[1.05] tracking-tight">
            <Words text="We don't chase attention. We design the moment where a stranger decides your brand was always meant to be theirs." />
          </p>
        </section>

        {/* Services */}
        <ServicesList />

        {/* Marquee */}
        <section className="relative z-10 overflow-hidden py-16 md:py-24">
          <div className="animate-marquee flex w-max gap-12 whitespace-nowrap text-[18vw] font-semibold md:text-[12vw] leading-none tracking-tighter">
            {[0, 1].map((k) => (
              <span key={k} className="flex gap-12" aria-hidden={k === 1}>
                <span>Strategy</span><span className="bg-lime px-[0.15em] -mx-[0.05em] rounded-[0.12em] text-[#121212]">Design</span>
                <span>Motion</span><span className="bg-lime px-[0.15em] -mx-[0.05em] rounded-[0.12em] text-[#121212]">Code</span>
                <span>Story</span><span className="bg-lime px-[0.15em] -mx-[0.05em] rounded-[0.12em] text-[#121212]">Growth</span>
              </span>
            ))}
          </div>
        </section>

        {/* Work */}
        <section id="work" className={`${wrap} relative z-10 py-20 md:py-32`}>
          <Fade>
            <h2 className="mb-10 font-sans md:mb-16 text-xs uppercase tracking-widest text-foreground/60">Selected work</h2>
          </Fade>
          <div className="grid gap-6 md:grid-cols-2">
            {work.map(([name, kind, year], i) => (
              <Fade key={name} delay={(i % 2) * 0.1} className={i % 2 ? "md:mt-24" : ""}>
                <a href="#contact" data-cursor className="group block">
                  <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-neutral-100">
                    <div className="absolute inset-0 bg-gradient-to-br from-neutral-100 to-neutral-200 transition-transform duration-700 group-hover:scale-110" />
                    <span className="absolute inset-0 grid place-items-center text-[9vw] font-semibold tracking-tighter text-foreground/10 transition-colors group-hover:text-foreground md:text-[5vw]">
                      {name}
                    </span>
                  </div>
                  <div className="mt-4 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                    <h3 className="text-2xl font-semibold tracking-tight">{name}</h3>
                    <span className="font-sans text-xs uppercase tracking-widest text-foreground/60">
                      {kind} / {year}
                    </span>
                  </div>
                </a>
              </Fade>
            ))}
          </div>
        </section>
        <ProcessStack />

        {/* Contact */}
        <section id="contact" className={`${wrap} relative z-10 flex min-h-svh flex-col justify-center py-24 md:py-32`}>
          <h2 className="text-[clamp(2.25rem,11vw,11rem)] font-semibold leading-[0.9] tracking-tighter">
            <Words text="Let's make" />
            <br />
            <Words text="it inevitable." className="bg-lime px-[0.15em] -mx-[0.05em] rounded-[0.12em] text-[#121212]" />
          </h2>
          <a
            href="mailto:hello@inevita.com"
            data-cursor
            className="mt-10 w-fit max-w-full break-all border-b-2 border-lime pb-1 text-xl font-medium sm:text-2xl md:mt-12 md:text-4xl"
          >
            hello@inevita.com
          </a>
        </section>
      </main>

      <footer className={`${wrap} flex justify-between py-6 font-sans text-xs uppercase tracking-widest text-foreground/50`}>
        <span>© 2026 Inevita</span>
      </footer>
    </>
  );
}
