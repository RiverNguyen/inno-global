import { useEffect } from 'react'

export const useWpVideoPlayer = (rootId: string, trigger?: unknown) => {
  useEffect(() => {
    const container = document.getElementById(rootId)
    if (!container) return

    const wrappers = container.querySelectorAll<HTMLDivElement>('.wp-video')
    const cleanups: (() => void)[] = []

    wrappers.forEach((wrapper) => {
      const video = wrapper.querySelector('video')
      if (!video) return

      const handleClick = () => {
        if (video.paused && !wrapper.classList.contains('is-fullscreen')) {
          video.play()
        }
      }

      const onPlay = () => {
        wrapper.classList.add('is-playing')
        video.controls = true
        wrapper.removeEventListener('click', handleClick)
      }

      const onPause = () => {
        wrapper.classList.remove('is-playing')
        video.controls = false
        wrapper.addEventListener('click', handleClick)
      }

      const onFullscreenChange = () => {
        const isFullscreen =
          document.fullscreenElement === video ||
          document.fullscreenElement === wrapper

        if (isFullscreen) {
          wrapper.classList.add('is-fullscreen')
        } else {
          wrapper.classList.remove('is-fullscreen')
        }
      }

      video.controls = false
      wrapper.addEventListener('click', handleClick)

      video.addEventListener('play', onPlay)
      video.addEventListener('pause', onPause)
      video.addEventListener('ended', onPause)
      document.addEventListener('fullscreenchange', onFullscreenChange)

      cleanups.push(() => {
        video.removeEventListener('play', onPlay)
        video.removeEventListener('pause', onPause)
        video.removeEventListener('ended', onPause)
        document.removeEventListener('fullscreenchange', onFullscreenChange)
        wrapper.removeEventListener('click', handleClick)
      })
    })

    return () => {
      cleanups.forEach((fn) => fn())
    }
  }, [rootId, trigger])
}

