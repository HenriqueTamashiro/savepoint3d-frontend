import { useEffect, useRef, useState } from "react";

const MOBILE_BREAKPOINT = 1100;

export function useHeader() {
  const [isMobile, setIsMobile] = useState(
    () => window.innerWidth < MOBILE_BREAKPOINT,
  );
  const [menuOpen, setMenuOpen] = useState(false);
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const accountMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
      setAccountMenuOpen(false);
    };
    const onScroll = () => setScrolled(window.scrollY > 40);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  useEffect(() => {
    function closeOnOutsideClick(event: PointerEvent) {
      if (
        accountMenuOpen &&
        event.target instanceof Node &&
        !accountMenuRef.current?.contains(event.target)
      ) {
        setAccountMenuOpen(false);
      }
    }

    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setAccountMenuOpen(false);
    }

    document.addEventListener("pointerdown", closeOnOutsideClick);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("pointerdown", closeOnOutsideClick);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [accountMenuOpen]);

  const toggleMenu = () => setMenuOpen((v) => !v);
  const toggleAccountMenu = () => setAccountMenuOpen((current) => !current);
  const closeAccountMenu = () => setAccountMenuOpen(false);

  return {
    isMobile,
    menuOpen,
    accountMenuOpen,
    scrolled,
    accountMenuRef,
    toggleMenu,
    toggleAccountMenu,
    closeAccountMenu,
  };
}
