interface WistiaPlayerElement extends HTMLElement {
  play(): Promise<void> | void;
  pause(): void;
  requestFullscreen(): Promise<void>;
  cancelFullscreen(): void;
  readonly state: "beforeplay" | "playing" | "paused" | "ended";
  readonly inFullscreen: boolean;
  readonly paused: boolean;
  readonly ended: boolean;
  currentTime: number;
  muted: boolean;
}

interface HTMLElementTagNameMap {
  "wistia-player": WistiaPlayerElement;
}
