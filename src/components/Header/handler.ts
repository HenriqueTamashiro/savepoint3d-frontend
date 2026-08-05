import { useEffect, useState } from 'react';

export function useHeader() {
  const [isMobile, setIsMobile] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 900);
    const onScroll = () => setScrolled(window.scrollY > 40);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  const toggleMenu = () => setMenuOpen((v) => !v);

  return { isMobile, menuOpen, scrolled, toggleMenu };
}
