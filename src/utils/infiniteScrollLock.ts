'use client'

type InfiniteScrollLockState = {
  lockedSectionId: string | null
}

let state: InfiniteScrollLockState = {
  lockedSectionId: null,
}

const listeners = new Set<() => void>()

function emitChange() {
  for (const l of listeners) l()
}

export function lockInfiniteScroll(sectionId: string | null) {
  state = { lockedSectionId: sectionId }
  emitChange()
}

export function unlockInfiniteScroll() {
  if (state.lockedSectionId === null) return
  state = { lockedSectionId: null }
  emitChange()
}

export function getInfiniteScrollLockState(): InfiniteScrollLockState {
  return state
}

export function subscribeInfiniteScrollLock(listener: () => void) {
  listeners.add(listener)
  return () => {
    listeners.delete(listener)
  }
}

export function shouldUnlockInfiniteScroll(activeSectionId: string) {
  return state.lockedSectionId !== null && state.lockedSectionId === activeSectionId
}
