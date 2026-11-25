import { createTimeline, spring, waapi, stagger } from "animejs";
const ease = spring({
  bounce: 0.5,
  duration: 628,
});

window.addEventListener("load", () => {
  document.body.style.maxHeight = "100svh";
  document.body.style.overflow = "hidden";
  const loader = document.querySelector(".loader") as HTMLElement;
  const classList = loader.classList;
  const h1 = document.querySelector("h1");
  const buttons = document.querySelectorAll(
    ".header-buttons .button:not(.menu-btn)",
  );
  const logotype = document.querySelector(".logotype") as HTMLElement;
  const links = document.querySelectorAll(".header-buttons .link");
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
      document.body.style.maxHeight = "auto";
      document.body.style.overflow = "auto";
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
