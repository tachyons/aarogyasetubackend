import {useEffect} from 'preact/hooks';

export default function useDisableBodyOverflow(lock = true) {
  useEffect(() => {
    if (lock) {
      document.body.style.overflowY = 'hidden';
    }
    return () => {
      if (lock) {
        document.body.style.overflowY = 'scroll';
      }
    };
  }, [lock]);
}
