import { useEffect, useState } from 'react'

const MOBILE_BREAKPOINT = 768

export const useIsMobile = () => {
  const getIsMobile = (): boolean => {
    if (typeof window !== 'undefined') {
      return window.innerWidth < MOBILE_BREAKPOINT
    }
    return false
  }

  const [isMobile, setIsMobile] = useState(() => getIsMobile())

  useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)

    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }

    mql.addEventListener('change', onChange)

    return () => mql.removeEventListener('change', onChange)
  }, [])

  return isMobile
}
