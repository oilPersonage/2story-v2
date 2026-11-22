import {
	animate,
	createScope,
	createTimeline,
	createTimer,
	onScroll,
	stagger,
	utils,
	waapi,
} from "animejs";

import "./ts/button";

import "./ts/logo";

const groups = document.querySelectorAll<HTMLElement>(".h1-animate-inner");
const count = groups[0].querySelectorAll("span").length;
let current = 0;

document.addEventListener("DOMContentLoaded", () => {
	console.log(document.querySelector("header"));
	history.scrollRestoration = "manual";
	document.querySelector("header")?.scrollIntoView({ block: "start" });
});

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

const animateOnTop = waapi.animate(["h1 > span"], {
	y: [0, -30, 0],
	delay: stagger(50),
	autoplay: false,
});
animate("header video", {
	scale: 1.5,
	autoplay: onScroll({
		enter: "top top",
		leave: "top bottom",
		target: "header",
		sync: true,
	}),
});
const [$button, $button2] = utils.$(".header-buttons");
createScope({
	mediaQueries: {
		isSmall: "(max-width: 460px)",
	},
}).add((self) => {
	const { isSmall } = self?.matches || {};

	createTimeline({
		autoplay: onScroll({
			target: "header",
			enter: "80% 50%",
			leave: "50% 80%",
			sync: true,
		}),
	})
		.add([$button, ".logotype"], { translateY: 60 }, 0)
		.add($button2, { translateY: isSmall ? -50 : -70 }, 0); // 0 — обе стартуют одновременно
});
animate(".header-texts", {
	y: { to: "calc(100svh - 215px)" },
	autoplay: onScroll({
		target: "header",
		enter: "top top",
		leave: "bottom bottom",
		debug: true,
		onUpdate: (self) => {
			if (self.progress === 0) {
				animateOnTop.restart();
			}
		},
		sync: true,
	}),
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

const videoBtn = document.querySelectorAll(".video-poster .link");
const videoPlayers = document.querySelectorAll<HTMLElement>("wistia-player");
for (const btn of videoBtn) {
	btn.addEventListener("click", () => {
		const wrapper = btn.closest(".video-poster") as HTMLElement;
		const player = wrapper?.querySelector("wistia-player") as HTMLElement;
		if (player.state === "playing") {
			player.pause();
		} else {
			for (const pl of videoPlayers) {
				pl.pause();
			}
			player.requestFullscreen();
			player?.play();
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
