import { createTimeline, spring, waapi, stagger } from "animejs";

// HTML разобран
const domReady = new Promise<void>((resolve) => {
  if (document.readyState !== "loading") resolve();
  else
    document.addEventListener("DOMContentLoaded", () => resolve(), {
      once: true,
    });
});
// все <link rel="stylesheet"> загружены
const cssReady = Promise.all(
  // @ts-ignore-next-line
  [...document.querySelectorAll<HTMLLinkElement>('link[rel="stylesheet"]')].map(
    (link) =>
      link.sheet
        ? Promise.resolve()
        : new Promise<void>((resolve) => {
            link.addEventListener("load", () => resolve(), { once: true });
            link.addEventListener("error", () => resolve(), { once: true }); // не зависаем при ошибке
          }),
  ),
);
// шрифты, которые уже используются на странице, загружены
const fontsReady = document.fonts.ready;

export const pageReady = Promise.all([domReady, cssReady]).then(
  () => fontsReady,
);

const ease = spring({
  bounce: 0.5,
  duration: 628,
});

const loader = document.querySelector(".loader") as HTMLElement;
const classList = loader.classList;
const h1 = document.querySelector("h1") as HTMLElement;
const buttons = document.querySelectorAll<HTMLElement>(
  ".header-buttons .button:not(.menu-btn)",
);
const logotype = document.querySelector(".logotype") as HTMLElement;
const links = document.querySelectorAll<HTMLElement>(".header-buttons .link");

pageReady.then(() => {
  classList.add("wait");
  const h1A = waapi.animate(h1, {
    opacity: [0, 1],
    ease: "ease-in",
    autoplay: false,
  });

  const buttonsA = waapi.animate([logotype, buttons, links], {
    opacity: [0, 1],
    y: {
      from: (_, idx) => (idx > 1 ? -68 : 68),
      to: 0,
    },
    delay: stagger(100),
    ease,
    duration: 600,
    autoplay: false,
  });
  const tl = createTimeline({
    onComplete() {
      classList.add("hide");
    },
  })
    .sync(h1A, 0)
    .sync(buttonsA, 900)
    .add(
      loader,
      {
        opacity: 0,
        duration: 600,
        ease: "ease-in",
      },
      1500,
    );
  tl.play();
});
