// Alias so TS resolves types from observer.d.ts (avoids Observer.d.ts vs observer.d.ts casing error on Windows)
declare module 'gsap/Observer' {
  export { Observer } from 'gsap/observer'
}

declare module 'gsap/ScrollToPlugin' {
  export { ScrollToPlugin } from 'gsap/scrollToPlugin'
}
