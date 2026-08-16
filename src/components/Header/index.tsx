import { Link } from "react-router-dom";
import { useHeader } from "./handler";
import { getAuthSession } from "../../services/auth";
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
  const { isMobile, menuOpen, scrolled, toggleMenu } = useHeader();
  const session = getAuthSession();
  const accountPath = !session
    ? "/login"
    : session.role.toLowerCase() === "admin"
      ? "/dashboard"
      : "/minha-conta";

  return (
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
          {!isMobile && (
            <Link
              to={accountPath}
              aria-label={session ? `Conta de ${session.user}` : "Entrar"}
              title={session ? `Acessar conta de ${session.user}` : "Entrar"}
              className={`${styles.iconButton} ${session ? styles.loggedAccount : ""}`}
            >
              {session ? (
                <>
                  <span className={styles.accountAvatar}>
                    {session.user.slice(0, 1).toUpperCase()}
                  </span>
                  <span className={styles.accountName}>{session.user}</span>
                </>
              ) : (
                <AccountIcon />
              )}
            </Link>
          )}
          {isMobile && (
            <button
              type="button"
              onClick={toggleMenu}
              aria-label="Abrir menu"
              className={styles.iconButton}
            >
              <MenuIcon />
            </button>
          )}
        </div>
      </div>

      {menuOpen && (
        <div className={styles.mobileMenu}>
          <button
            type="button"
            onClick={toggleMenu}
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
                onClick={toggleMenu}
                className={styles.mobileNavLink}
              >
                {link.label}
              </a>
            ))}
            <Link
              to={accountPath}
              onClick={toggleMenu}
              className={styles.mobileNavLink}
            >
              {!session ? "Entrar" : session.user}
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
