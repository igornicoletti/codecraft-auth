import { useEffect, useState } from 'react'

export const useMediaQuery = (query: string) => {
  const getMatches = (query: string): boolean => {
    if (typeof window !== 'undefined') {
      return window.matchMedia(query).matches
    }
    return false
  }

  const [value, setValue] = useState(() => getMatches(query))

  useEffect(() => {
    const mediaQuery = window.matchMedia(query)

    const onChange = (event: MediaQueryListEvent) => {
      setValue(event.matches)
    }

    mediaQuery.addEventListener('change', onChange)

    return () => mediaQuery.removeEventListener('change', onChange)
  }, [query])

  return value
}
