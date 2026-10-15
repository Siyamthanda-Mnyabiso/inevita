import { Fade } from "@/components/Reveal";

// To use a client's real logo, drop the file in public/clients and set `logo`,
// e.g. { name: "HomeChoice", logo: "/clients/homechoice.svg" }.
// Logos are rendered flat black so the row looks consistent; `h` sets each logo's height.
const clients = [
  { name: "Sneaker Factory", logo: "/clients/sneaker-factory.png", h: "h-11 md:h-14" },
  { name: "HomeChoice", logo: "/clients/homechoice.png", h: "h-6 md:h-8" },
  { name: "Payjustnow", logo: "/clients/PJN-Black.svg", h: "h-6 md:h-8" },
];

export default function TrustedBy() {
  return (
    <section className="relative z-10 mx-auto w-full max-w-7xl px-6 py-16 md:px-10 md:py-24">
      <Fade>
        <div className="grid gap-8 border-y border-foreground/15 bg-background/80 py-10 backdrop-blur-sm md:grid-cols-12 md:items-center md:py-14">
          <h2 className="text-sm font-medium md:col-span-3">Trusted by</h2>
          <ul className="flex flex-wrap items-center gap-x-12 gap-y-8 md:col-span-9 md:justify-between">
            {clients.map((c) => (
              <li key={c.name} className="flex h-14 items-center">
                {c.logo ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={c.logo} alt={c.name} className={`${c.h} w-auto object-contain brightness-0`} />
                ) : (
                  <span className="text-2xl font-semibold tracking-tighter md:text-3xl">{c.name}</span>
                )}
              </li>
            ))}
          </ul>
        </div>
      </Fade>
    </section>
  );
}
