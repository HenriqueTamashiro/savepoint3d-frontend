import styles, {
  DeveloperCredit,
  DeveloperIcon,
  DeveloperLink,
  StyleScope,
} from "../../style/components/Footer";

const PAYMENT_METHODS = ["Pix", "Cartão", "Boleto", "Parcelado"];

export default function Footer() {
  return (
    <StyleScope>
      {
        <footer className={styles.footer}>
          <div className={styles.inner}>
            <img
              src="/assets/img/logo-footer.png"
              alt="Logo Save Point3D"
              className={styles.logo}
            />
            <h2 className={styles.headline}>
              Continue jogando.
              <br />
              Continue colecionando.
            </h2>

            <div className={styles.columns}>
              <div className={styles.column}>
                <span className={styles.columnTitle}>Loja</span>
                <a href="/#destaques">Destaques</a>
                <a href="/colecao">Lançamentos</a>
                <a href="/#categorias">Categorias</a>
              </div>
              <div className={styles.column}>
                <span className={styles.columnTitle}>Personalizados</span>
                <a href="/personalizados">Peças sob encomenda</a>
                <a href="/contato">Solicitar orçamento</a>
              </div>
              <div className={styles.column}>
                <span className={styles.columnTitle}>Atendimento</span>
                <a href="/trocas">Trocas e devoluções</a>
                <a href="/privacidade">Política de privacidade</a>
                <a href="/termos">Termos de uso</a>
              </div>
              <div className={styles.column}>
                <span className={styles.columnTitle}>Contato</span>
                <a
                  href="https://instagram.com/savepoint3d"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  @savepoint3d
                </a>
                <a
                  href="https://wa.me/5511900000000"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  WhatsApp
                </a>
                <a href="mailto:contato@savepoint3d.com.br">
                  contato@savepoint3d.com.br
                </a>
              </div>
            </div>

            <div className={styles.bottomBar}>
              <span>© 2026 Save Point3D. Todos os direitos reservados.</span>
              <DeveloperCredit>
                Desenvolvido por{" "}
                <DeveloperLink
                  href="https://tamashiro.dev"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <DeveloperIcon
                    src="/assets/img/tamashiroIcon.png"
                    alt=""
                    aria-hidden="true"
                  />
                  <span>TamashiroDEV</span>
                </DeveloperLink>
              </DeveloperCredit>
              <div className={styles.paymentMethods}>
                {PAYMENT_METHODS.map((pm) => (
                  <span key={pm} className={styles.paymentBadge}>
                    {pm}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </footer>
      }
    </StyleScope>
  );
}
