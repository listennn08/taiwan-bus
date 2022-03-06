import { RefObject } from 'react'

export const useClickOutside = (ref: RefObject<HTMLElement>, cbFunc: () => void) => {
  const onClickOutside = useCallback(function(event: MouseEvent) {
    if (ref.current && !ref.current.contains(event.target as Node)) {
      cbFunc()
    }
  }, [cbFunc, ref])

  useEffect(() => {
    document.addEventListener('mousedown', onClickOutside)

    return () => {
      document.removeEventListener('mousedown', onClickOutside)
    }
  }, [onClickOutside])
}