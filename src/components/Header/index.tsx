import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useHeader } from "./handler";
import { getAuthSession, logout } from "../../services/auth";
import styles from "../../style/components/Header";

interface HeaderProps {
  cartCount: number;
  onOpenCart: () => void;
}

const NAV_LINKS = [
  { href: "/#destaques", label: "Loja" },
  { href: "/#lancamentos", label: "Lançamentos" },
  { href: "/#categorias", label: "Action Figures" },
  { href: "/#dioramas", label: "Dioramas" },
  { href: "/#personalizados", label: "Personalizados" },
  { href: "/#processo", label: "Sobre nós" },
];

function SearchIcon() {
  return (
    <svg
      width="19"
      height="19"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden="true"
    >
      <circle cx="11" cy="11" r="7" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}

function AccountIcon() {
  return (
    <svg
      width="19"
      height="19"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden="true"
    >
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21c0-4.4 3.6-7 8-7s8 2.6 8 7" />
    </svg>
  );
}

function CartIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden="true"
    >
      <path d="M6 6h15l-1.5 9h-12z" />
      <path d="M6 6 4 3H2" />
      <circle cx="9" cy="20" r="1" />
      <circle cx="18" cy="20" r="1" />
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden="true"
    >
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  );
}

export default function Header({ cartCount, onOpenCart }: HeaderProps) {
  const navigate = useNavigate();
  const {
    isMobile,
    menuOpen,
    accountMenuOpen,
    scrolled,
    accountMenuRef,
    toggleMenu,
    closeMenu,
    toggleAccountMenu,
    closeAccountMenu,
  } = useHeader();
  const [session, setSession] = useState(() => getAuthSession());

  function signOut() {
    logout();
    setSession(null);
    closeAccountMenu();
    navigate("/", { replace: true });
  }

  return (
    <>
      <header
        className={`${styles.header} ${scrolled ? styles.headerScrolled : ""}`}
      >
      <div className={styles.inner}>
        <Link
          to="/"
          aria-label="Save Point3D — início"
          className={styles.logoLink}
        >
          <img
            src="/assets/img/logo-header.png"
            alt="Logo Save Point3D"
            className={styles.logo}
          />
        </Link>

        {!isMobile && (
          <nav aria-label="Navegação principal" className={styles.nav}>
            {NAV_LINKS.map((link) => (
              <a key={link.label} href={link.href} className={styles.navLink}>
                {link.label}
              </a>
            ))}
          </nav>
        )}

        <div className={styles.actions}>
          {!isMobile && (
            <button
              type="button"
              aria-label="Buscar"
              className={styles.iconButton}
            >
              <SearchIcon />
            </button>
          )}
          <button
            type="button"
            onClick={onOpenCart}
            aria-label="Abrir carrinho"
            className={styles.iconButton}
          >
            <CartIcon />
            {cartCount > 0 && (
              <span className={styles.cartBadge}>{cartCount}</span>
            )}
          </button>
          {!isMobile && (session ? (
            <div className={styles.accountMenuWrap} ref={accountMenuRef}>
              <button
                type="button"
                aria-label={`Abrir menu da conta de ${session.user}`}
                aria-haspopup="menu"
                aria-expanded={accountMenuOpen}
                title={`Conta de ${session.user}`}
                className={`${styles.iconButton} ${styles.loggedAccount}`}
                onClick={toggleAccountMenu}
              >
                <span className={styles.accountAvatar}>{session.user.slice(0, 1).toUpperCase()}</span>
                <span className={styles.accountName}>{session.user}</span>
                <span className={`${styles.accountChevron} ${accountMenuOpen ? styles.accountChevronOpen : ""}`} aria-hidden="true">⌄</span>
              </button>
              {accountMenuOpen && (
                <div className={styles.accountDropdown} role="menu">
                  <div className={styles.accountDropdownHeader}>
                    <span>{session.user.slice(0, 1).toUpperCase()}</span>
                    <div><b>{session.user}</b><small>{session.role}</small></div>
                  </div>
                  <Link to="/minha-conta" state={{ tab: "overview" }} onClick={closeAccountMenu} role="menuitem">Perfil</Link>
                  <Link to="/minha-conta" state={{ tab: "orders" }} onClick={closeAccountMenu} role="menuitem">Meus pedidos</Link>
                  {session.role.toLowerCase() === "admin" && <Link to="/dashboard" onClick={closeAccountMenu} role="menuitem">Administração</Link>}
                  <button type="button" onClick={signOut} role="menuitem">Sair da conta</button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" aria-label="Entrar" title="Entrar" className={styles.iconButton}><AccountIcon /></Link>
          ))}
          {isMobile && (
            <button
              type="button"
              onClick={toggleMenu}
              aria-label="Abrir menu"
              aria-controls="mobile-navigation"
              aria-expanded={menuOpen}
              className={styles.iconButton}
            >
              <MenuIcon />
            </button>
          )}
        </div>
      </div>
      </header>

      {isMobile && <div className={styles.mobileHeaderSpacer} aria-hidden="true" />}

      {menuOpen && (
        <div id="mobile-navigation" className={styles.mobileMenu} role="dialog" aria-modal="true" aria-label="Menu principal">
          <button
            type="button"
            onClick={closeMenu}
            aria-label="Fechar menu"
            className={styles.closeButton}
          >
            ✕
          </button>
          <nav className={styles.mobileNav}>
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={closeMenu}
                className={styles.mobileNavLink}
              >
                {link.label}
              </a>
            ))}
            {!session ? <Link to="/login" onClick={closeMenu} className={styles.mobileNavLink}>Entrar</Link> : <>
              <Link to="/minha-conta" state={{ tab: "overview" }} onClick={closeMenu} className={styles.mobileNavLink}>Perfil — {session.user}</Link>
              <Link to="/minha-conta" state={{ tab: "orders" }} onClick={closeMenu} className={styles.mobileNavLink}>Meus pedidos</Link>
              {session.role.toLowerCase() === "admin" && <Link to="/dashboard" onClick={closeMenu} className={styles.mobileNavLink}>Administração</Link>}
              <button type="button" onClick={signOut} className={`${styles.mobileNavLink} ${styles.mobileLogout}`}>Sair da conta</button>
            </>}
          </nav>
        </div>
      )}
    </>
  );
}
