import {
  animate,
  createScope,
  createTimeline,
  createTimer,
  onScroll,
  utils,
} from "animejs";

import "./ts/button";

import "./ts/logo";
import { placment } from "./ts/select.ts";

const groups = document.querySelectorAll<HTMLElement>(".h1-animate-inner");
const count = groups[0].querySelectorAll("span").length;
let current = 0;

window.addEventListener("load", () => {
  history.scrollRestoration = "manual";
  document.querySelector("header")?.scrollIntoView({ block: "start" });

  function change() {
    let nextIdx = current;
    while (nextIdx === current) nextIdx = Math.floor(Math.random() * count);
    current = nextIdx;

    animate(groups, {
      y: {
        to: current * (groups[0].querySelector("span")?.clientHeight ?? 0) * -1,
      },
      duration: 1000,
      ease: "inOutExpo",
    });
  }

  createTimer({
    duration: 5000,
    loop: true,
    onLoop: change,
  });

  const btns = utils.$(".header-buttons");
  const headerContent = utils.$(".header-texts");
  createScope({
    mediaQueries: {
      isSmall: "(max-width: 460px)",
    },
  }).add(() => {
    // const { isSmall } = self?.matches || {};

    const headerContentAnim = createTimeline({
      defaults: { ease: "linear" },
      autoplay: false,
    })
      .add(btns, { translateY: (_, idx) => (idx ? -64 : 62) }, 0)
      .add("header video", { scale: 1.5 }, 0)
      .add(".logotype", { scaleY: 0.5 }, 0);

    createTimeline({
      defaults: { ease: "linear" },
      autoplay: onScroll({
        target: "header",
        enter: "bottom top+=120px",
        leave: "top bottom-=120px",
        // debug: true,
        sync: true,
        onLeaveBackward: () => {
          placment.set("before");
        },
        onLeaveForward: () => {
          placment.set("after");
        },
        onUpdate: (self) => {
          headerContent[0]?.classList.toggle(
            "compact",
            self.progress === 0 || self.progress === 1,
          );
          const pr = Math.max(0, Math.abs(self.progress - 0.5) - 0.2) / 0.3;
          headerContentAnim.seek(pr * headerContentAnim.duration);
        },
      }),
    }).add(headerContent, { y: "calc(100svh - 64px)", reversed: true });
    // .add($button2, { translateY: isSmall ? -50 : -70 }, 0); // 0 — обе стартуют одновременно
  });
  const buttons = document.querySelectorAll<HTMLElement>(
    ".header-buttons .button",
  );
  for (const button of buttons) {
    button.addEventListener("click", () => {
      const { link, anchor } = button.dataset as {
        link: string;
        anchor: ScrollLogicalPosition;
      };
      document.getElementById(link)?.scrollIntoView({
        behavior: "smooth",
        block: anchor || "start",
      });
    });
  }

  const videoBtn = document.querySelectorAll<HTMLElement>(
    ".video-poster .watch-button",
  );
  const videoPlayers =
    document.querySelectorAll<WistiaPlayerElement>("wistia-player");
  for (const btn of videoBtn) {
    btn.addEventListener("click", (e) => {
      const wrapper = btn.closest(".video-poster") as HTMLElement;
      const player = wrapper?.querySelector("wistia-player");
      const target = e.target as HTMLElement;
      if (!target || !player) return;
      for (const pl of videoPlayers) {
        pl.pause();
        player?.play();
      }
      if (target?.classList.contains("resize")) {
        player.requestFullscreen();
        player.play();
        return;
      }

      if (player.state === "playing") {
        player.pause();
      } else {
        player.play();
      }
      wrapper.classList.toggle("hide");
    });
  }

  utils.$(".photo-poster").forEach((el) => {
    animate(el, {
      y: 0,
      opacity: 1,
      autoplay: onScroll({
        target: el,
        sync: "play",
        repeat: false,
        enter: "top+=300 bottom",
        leave: "top+=100 bottom",
      }),
    });
  });
  utils.$(".video-poster").forEach((el) => {
    animate(el, {
      y: 0,
      opacity: 1,
      autoplay: onScroll({
        target: el,
        sync: "play",
        repeat: false,
        enter: "bottom+=300 bottom",
        leave: "bottom+=100 bottom",
        // debug: true, // с debug на каждом элементе будет много линий — включайте точечно
      }),
    });
  });
});
