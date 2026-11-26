import { animate, spring, stagger, utils } from "animejs";
import { createStore } from "./store.ts";

const menuBtn = document.querySelector(".menu-btn") as HTMLElement;
const list = menuBtn.querySelector(".btn-menu-list") as HTMLElement;
const overlay = menuBtn.querySelector(".menu-btn-overlay") as HTMLElement;

const isMobile = window.matchMedia("(max-width: 480px)").matches;

export const placment = createStore<"before" | "after">("before");
const ease = spring({
	bounce: 0.5,
	duration: 628,
});
const MENU_LIST_PHOTO = [
	{
		target: "Four Seasons",
		title: "Four Seasons Resort The Nam Hai",
		city: "Hoi An, Vietnam",
	},
	{
		target: "Radisson Red",
		title: "Radisson Red",
		city: "Da Nang, Vietnam",
	},
];
const MENU_LIST_VIDEO = [
	{
		target: "Four Seasons",
		title: "Four Seasons Resort The Nam Hai",
		city: "Hoi An, Vietnam",
	},
	{
		target: "InterContinental",
		title: "InterContinental Da Nang Sun Peninsula Resort",
		city: "Da Nang, Vietnam",
	},
	{
		target: "Radisson Red",
		title: "Radisson Red",
		city: "Da Nang, Vietnam",
	},
	{ target: "UGC", title: "UGC", city: "Insta360, 7artisans, Suniast" },
	{ target: "Lifestyle", title: "Lifestyle", city: "THE WORLD" },
];

function onShow() {
	const options = utils.$(".menu-btn-option");
	const dir = placment.get() === "before" ? -1 : 1;
	const gap = dir === -1 ? 68 : 49;

	animate(options, {
		y: {
			from: (_, idx) => (idx || 0) * 68 * dir,
			to: (_, idx) => (gap + (idx || 0) * 68) * dir,
		},
		rotate: {
			from: () => utils.randomPick([3, -3, 10, -6, 5]),
			to: 0,
		},
		ease,
		opacity: 1,
		duration: 300,
		delay: stagger(50),
		onBegan: () => {
			list.classList.add("opened");
			const h = options.length * 68;
			overlay.style.height = h + 32 + "px";
			if (dir === -1) {
				overlay.style.translate = `0 ${h * dir}px`;
			}
		},
	});
}

async function onHide() {
	const options = utils.$(".menu-btn-option");
	const dir = placment.get() === "before" ? -1 : 1;
	animate(options, {
		y: (_, idx) => (idx || 0) * 68 * dir,
		opacity: 0,
		duration: 300,
		delay: stagger(70, { reversed: true }),
		onBegan: () => {
			overlay.style.height = 0 + "px";
			list.classList.remove("opened");
		},
	});
}

menuBtn.addEventListener(isMobile ? "click" : "mouseenter", onShow);

menuBtn.addEventListener("mouseleave", onHide);

function makeSelect(value?: "before" | "after") {
	const label = menuBtn.querySelector(".button-label") as HTMLElement;
	const menu =
		value === "before"
			? MENU_LIST_PHOTO
			: value === "after"
				? MENU_LIST_VIDEO
				: [];

	const options = menu.map(({ target: key, title, city }) => {
		const el = document.createElement("div");
		const desc = document.createElement("div");
		el.className = "menu-btn-option";
		desc.className = "menu-btn-option-city";
		el.textContent = title;
		desc.textContent = city;
		el.addEventListener("click", (e) => {
			e.stopPropagation();
			document
				.getElementById(key + value)
				?.scrollIntoView({ behavior: "smooth", block: "start" });
			label.textContent = title;
			onHide();
		});
		el.appendChild(desc);
		return el;
	});

	menuBtn.classList.toggle("menu-btn--before", value === "before");
	list.replaceChildren(...options);
}
makeSelect("before");
placment.sub((value) => makeSelect(value));
