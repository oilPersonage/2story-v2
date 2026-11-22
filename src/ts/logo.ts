const COLS = 12;
const ROWS = 30;
const RADIUS = 140; // радиус влияния курсора, px
const MIN_SCALE = 0.4; // насколько уменьшается блок прямо под курсором
const BASE_SCALE = 1.1;
const MOUSE_SPEED = 12; // скорость, с которой «точка влияния» догоняет курсор
const SCALE_SPEED = 3; // скорость появления/возврата scale
const EPSILON = 0.001; // порог, ниже которого считаем, что анимация закончилась

const grid = document.querySelector(
	"#logotype .logotype-wrapper",
) as HTMLDivElement;
grid.style.setProperty("--cols", String(COLS));

// lerp, не зависящий от частоты кадров (60 Гц / 120 Гц ведут себя одинаково)
const lerp = (a: number, b: number, speed: number, dt: number) =>
	a + (b - a) * (1 - Math.exp(-speed * dt));

// 1. Создаём ячейки
type Cell = { el: HTMLDivElement; x: number; y: number; scale: number };
const cells: Cell[] = [];
for (let i = 0; i < COLS * ROWS; i++) {
	const el = document.createElement("div");
	el.className = "cell";
	grid.appendChild(el);
	cells.push({ el, x: 0, y: 0, scale: BASE_SCALE });
}

// 2. Запоминаем центры ячеек относительно сетки
function measure() {
	for (const c of cells) {
		c.x = c.el.offsetLeft + c.el.offsetWidth / 2;
		c.y = c.el.offsetTop + c.el.offsetHeight / 2;
	}
}
measure();
window.addEventListener("resize", measure);

// 3. Курсор: target — реальная позиция, smooth — сглаженная
let target: { x: number; y: number } | null = null;
const smooth = { x: 0, y: 0 };
let rafId: number | null = null;
let lastTime = 0;

function start() {
	if (rafId === null) {
		lastTime = performance.now();
		rafId = requestAnimationFrame(update);
	}
}

grid.addEventListener("mouseenter", (e) => {
	const { left, top } = grid.getBoundingClientRect();
	// при входе ставим сглаженную точку сразу в позицию курсора,
	// иначе она «проедет» через всю сетку от прошлого места
	smooth.x = e.clientX - left;
	smooth.y = e.clientY - top;
});

grid.addEventListener("mousemove", (e) => {
	const { left, top } = grid.getBoundingClientRect();
	target = { x: e.clientX - left, y: e.clientY - top };
	start();
});

grid.addEventListener("mouseleave", () => {
	target = null; // все цели станут BASE_SCALE
	start();
});

function update(time: number) {
	const dt = Math.min((time - lastTime) / 1000, 0.05); // секунды, с защитой от скачков
	lastTime = time;
	const s = time / 1000;
	const w = s * 0.1 * Math.PI * 2 * 0.6;
	const sin = Math.abs(Math.sin(w));
	const organic =
		Math.sin(sin * 1.0) * 0.5 +
		Math.sin(s * 2.3 + 1.7) * 0.3 +
		Math.sin(w * 4.1 + 0.5) * 0.2;

	if (target) {
		smooth.x = lerp(smooth.x, target.x, MOUSE_SPEED, dt);
		smooth.y = lerp(smooth.y, target.y, MOUSE_SPEED, dt);
	}

	let active = target !== null;

	for (const c of cells) {
		let goal = BASE_SCALE;
		if (target) {
			const d = Math.hypot(c.x - smooth.x, c.y - smooth.y);
			if (d < RADIUS) {
				let t = 1 - d / RADIUS; // 1 в центре, 0 на краю радиуса
				t = t * t * (12 - 6 + 2 * organic * t); // smoothstep
				goal = BASE_SCALE - (BASE_SCALE - MIN_SCALE) * t;
			}
		}

		c.scale = lerp(c.scale, goal, SCALE_SPEED, dt);
		if (Math.abs(c.scale - goal) < EPSILON) c.scale = goal;
		else active = true;

		const k = (BASE_SCALE - c.scale) / (BASE_SCALE - MIN_SCALE); // 0..1
		c.el.style.transform = `scale(${c.scale + 0.1}) rotate(${k * 70}deg)`;
	}

	// продолжаем, пока курсор внутри или ячейки ещё не вернулись
	rafId = active ? requestAnimationFrame(update) : null;
}
