import { animate, createTimeline, spring, stagger, utils } from "animejs";

const buttons = utils.$(".button");
const ease = spring({
	bounce: 0.5,
	duration: 628,
});

for (const [idx, button] of buttons.entries()) {
	const label = button.querySelector(".button-label") as HTMLElement;
	const bg = button.querySelector(".button-bg") as HTMLElement;
	if (!label || !bg) break;

	const catSvg = `<svg class="button-cat" width="60" height="60" viewBox="0 0 1555 1435" fill="var(--color-dark)" xmlns="http://www.w3.org/2000/svg">
        <path d="M1532.61 868.283C1532.61 1165.9 1388.4 1336.74 772.073 1336.74C173.916 1336.74 21.5029 1165.9 21.5029 868.283C21.5029 570.663 359.776 329.395 777.058 329.395C1194.34 329.395 1532.61 570.663 1532.61 868.283Z" fill="var(--color-white)"/>
        <path class='earR' d="M1491.42 4.22131C1375.45 -49.7095 940.42 430.932 940.42 430.932L1529.27 877.605C1529.27 877.605 1607.38 58.1521 1491.42 4.22131Z" fill="var(--color-white)"/>
        <path class='earL' d="M63.585 4.22131C179.549 -49.7095 614.581 430.932 614.581 430.932L25.7305 877.605C25.7305 877.605 -52.3789 58.1521 63.585 4.22131Z" fill="var(--color-white)"/>
        <path d="M436.734 956.316L410.372 1056.8L505.295 1057.81C505.295 1057.81 488.295 1165.54 629.744 1171.73C771.192 1177.91 782.782 1060.76 782.782 1060.76C782.782 1060.76 772.737 1171.73 910.321 1171.73C1047.9 1171.73 1053.33 1063.63 1053.33 1063.63L1144.61 1064.61L1124.1 956.316H436.734Z" fill="var(--color-white)"/>
        <g class="nouse">
            <path d="M1039.26 1052.51C1045.96 1077.95 1037.86 1099.97 1020.05 1117.84C1001.89 1136.06 973.748 1149.61 942.331 1155.81C878.413 1168.44 810.131 1149.79 788.266 1092.66L765.851 1101.24C793.992 1174.77 878.539 1192.88 946.984 1179.36C981.75 1172.49 1014.67 1157.23 1037.05 1134.78C1055.35 1116.42 1066.64 1093.07 1065.53 1066.37C1073.3 1068.45 1082.16 1070.56 1091.42 1072.33C1109.25 1075.75 1129.59 1078.14 1146.68 1076.24L1144.03 1052.39C1130.54 1053.89 1113.01 1052.03 1095.93 1048.76C1079.05 1045.53 1063.61 1041.11 1054.73 1038.09L1033.58 1030.91L1039.26 1052.51Z" fill="var(--color-dark)"/>
            <path d="M514.854 1052.51C508.16 1077.95 516.256 1099.97 534.063 1117.84C552.227 1136.06 580.369 1149.61 611.785 1155.81C675.704 1168.44 743.985 1149.79 765.851 1092.66L788.266 1101.24C760.124 1174.77 675.578 1192.88 607.132 1179.36C572.366 1172.49 539.442 1157.23 517.066 1134.78C498.765 1116.42 487.475 1093.07 488.584 1066.37C480.818 1068.45 471.959 1070.56 462.698 1072.33C444.862 1075.75 424.526 1078.14 407.44 1076.24L410.091 1052.39C423.58 1053.89 441.109 1052.03 458.183 1048.76C475.064 1045.53 490.506 1041.11 499.391 1038.09L520.538 1030.91L514.854 1052.51Z" fill="var(--color-dark)"/>
            <path d="M713.467 1053.47L762.535 1100.5L792.794 1101.72L842.271 1053.47H713.467Z" fill="var(--color-dark)"/>
        </g>
        <ellipse class="eyeTop" cx="936.577" cy="608.561" rx="40.5625" ry="54.084" transform="rotate(26.0216 936.577 608.561)" fill="var(--color-dark)"/>
        <ellipse class="eyeTop" cx="638.5625" cy="608.084" rx="40.5625" ry="54.084" transform="rotate(26.0216 936.577 608.561)" fill="var(--color-dark)"/>
        
        <mask class="eyeRMask" id="mask1_732_67${idx}"} style="mask-type:alpha" maskUnits="userSpaceOnUse" x="45" y="551" width="781" height="728">
        <ellipse cx="302.187" cy="925.522" rx="399.187" ry="195.522" transform="rotate(14.406 1180.26 964.954)" fill="var(--color-white)"/>
        </mask>
        <g class="eyeR" mask="url(#mask1_732_67${idx})">
        <ellipse cx="463.098" cy="948.285" rx="263.098" ry="175.285" transform="rotate(14.406 1155.93 818.235)" fill="var(--color-black)"/>
        </g>
        
        <mask class="eyeLMask" id="mask1_732_672${idx}" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="790" y="551" width="780" height="780">
        <ellipse cx="1380.26" cy="924.954" rx="499.187" ry="195.522" transform="rotate(-14.406 1180.26 964.954)" fill="var(--color-white)"></ellipse>
        </mask>
        
        <g class="eyeL" mask="url(#mask1_732_672${idx})">
        <ellipse cx="1155.93" cy="768.235" rx="263.098" ry="175.285" transform="rotate(-14.406 1155.93 818.235)" fill="var(--color-dark)"/>
        </g>
        </svg>
        
       <svg class="muscate muscateR" viewBox="0 0 1830 1184" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M824.416 561.624L799.807 484.453L1103.84 387.5L1128.45 464.671L824.416 561.624Z" fill="var(--color-white)"/>
        <path d="M779.877 754.185L795.108 674.63L1108.53 734.637L1093.3 814.192L779.877 754.185Z" fill="var(--color-white)"/>
       </svg>
       <svg class="muscate muscateL -scale-x-100" viewBox="0 0 1830 1184" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M824.416 561.624L799.807 484.453L1103.84 387.5L1128.45 464.671L824.416 561.624Z" fill="var(--color-white)"/>
        <path d="M779.877 754.185L795.108 674.63L1108.53 734.637L1093.3 814.192L779.877 754.185Z" fill="var(--color-white)"/>
       </svg>
    `;

	button.insertAdjacentHTML("beforeend", catSvg);

	for (let i = 0; i < 4; i++) {
		button.insertAdjacentHTML(
			"afterbegin",
			`<div class="button-decor-wrapper"><div class="button-decor"></div></div>`,
		);
	}

	const catLink = button.querySelector(".button-cat") as HTMLElement;
	const tl = createTimeline({ duration: 500, autoplay: false });

	const muscate = button.querySelectorAll(
		".muscate",
	) as NodeListOf<HTMLElement>;
	const earR = button.querySelector(".earR") as HTMLElement;
	const earL = button.querySelector(".earL") as HTMLElement;
	const eyeR = button.querySelector(".eyeR") as HTMLElement;
	const eyeL = button.querySelector(".eyeL") as HTMLElement;
	const eyeTop = button.querySelectorAll(".eyeTop");
	const eyeLMaskEllipse = button.querySelector(
		".eyeLMask ellipse",
	) as HTMLElement;
	const muscateLpath = button.querySelectorAll(".muscateL path");
	const muscateRpath = button.querySelectorAll(".muscateR path");
	const eyeRMaskEllipse = button.querySelector(
		".eyeRMask ellipse",
	) as HTMLElement;
	const nouse = button.querySelector(".nouse") as HTMLElement;
	const arrows = button.querySelectorAll(".button-decor-wrapper");

	animate(muscate, {
		translateX: [{ to: -5, ease }],
		loop: true,
		alternate: true,
		composition: "blend",
	});

	tl.add(
		bg,
		{
			y: "100%",
			duration: 300,
			rotate: [0, utils.randomPick([9, -13]), 0],
		},
		0,
	);
	tl.add(
		label,
		{
			rotate: [
				{ from: 0, to: 10, duration: 100 },
				{ from: 3, to: -10, duration: 200 },
			],
			y: { from: 0, to: "-200%", duration: 500, ease },
			ease: "easeOut",
		},
		0,
	);
	tl.add(
		catLink,
		{
			keyframes: {
				"0%": { translateY: 0, ease },
				"40%": { rotate: -10, ease },
				"80%": { scale: 1.2, ease },
				"100%": { translateY: -40, rotate: 0, scale: 0.6 },
			},
			duration: 500,
			ease: "easeOut",
		},
		0,
	);
	tl.add(
		earR,
		{
			translateY: [0, 100, 0],
			translateX: [0, -50, 0],
			rotate: [0, -30, 0],
			duration: 400,
		},
		0,
	);

	tl.add(
		earL,
		{
			translateY: [0, 100, 0],
			translateX: [0, 50, 0],
			rotate: [0, 30, 0],
			duration: 400,
		},
		0,
	);
	tl.add(
		eyeTop,
		{
			y: [0, -200, 50],
			duration: 400,
		},
		200,
	);
	tl.add(
		eyeLMaskEllipse,
		{
			translateY: [0, -150, 0],
			translateX: [0, -100, 0],
			delay: 200,
			duration: 500,
		},
		0,
	);
	tl.add(
		eyeL,
		{
			translateY: [0, -100, 0],
			delay: 200,
			duration: 500,
		},
		0,
	);

	tl.add(
		eyeRMaskEllipse,
		{
			y: [0, -150, 0],
			translateX: [0, 100, 0],
			delay: 200,
			duration: 500,
		},
		0,
	);
	tl.add(
		eyeR,
		{
			y: [0, -100, 0],
			delay: 200,
			duration: 500,
		},
		0,
	);
	tl.add(
		nouse,
		{
			translateY: [0, -200, 0],
			duration: 500,
		},
		200,
	);
	tl.add(
		muscateLpath,
		{
			translateX: 300,
			opacity: 1,
			delay: stagger(90),
			duration: 300,
			ease,
		},
		400,
	);
	tl.add(
		muscateRpath,
		{
			translateX: 300,
			opacity: 1,
			delay: stagger(90),
			duration: 300,
			ease,
		},
		400,
	);
	tl.add(
		arrows,
		{
			scale: [1, 2],
			delay: stagger(100),
		},
		0,
	);
	button.addEventListener("mouseenter", () => {
		tl.play();
	});
	button.addEventListener("mouseleave", () => {
		tl.reverse();
	});
}

const resizeBtn = document.querySelectorAll<HTMLButtonElement>("button.resize");

for (const btn of resizeBtn) {
	const svg = `<svg
    aria-label="full-screen-icon"
    viewBox="0 0 24 24"
    stroke="var(--color-dark)"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M21 9V3H15"
      stroke-width="1"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke="inherit"
    />
    <path
      d="M3 15V21H9"
      stroke-width="1"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke="inherit"
    />
    <path
      d="M21 3L13.5 10.5"
      stroke-width="1"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke="inherit"
    />
    <path
      d="M10.5 13.5L3 21"
      stroke-width="1"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke="inherit"
    />
  </svg>`;
	btn.insertAdjacentHTML("afterbegin", svg);
}
