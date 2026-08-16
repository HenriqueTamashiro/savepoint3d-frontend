import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { formatPrice } from "../../components/ProductCard/handler";
import { getAuthSession, logout } from "../../services/auth";
import { fetchMyOrders } from "../../services/orders";
import { Order, OrderStatus } from "../../types/order";
import Dashboard from "../Dashboard";
import styles from "../../style/pages/Account.module.css";

type AccountTab = "overview" | "orders" | "favorites" | "addresses" | "admin";

const TABS: { key: AccountTab; label: string; number: string }[] = [
  { key: "overview", label: "Visão geral", number: "01" },
  { key: "orders", label: "Meus pedidos", number: "02" },
  { key: "favorites", label: "Favoritos", number: "03" },
  { key: "addresses", label: "Endereços", number: "04" },
];

const ADMIN_TAB: { key: AccountTab; label: string; number: string } = {
  key: "admin",
  label: "Administração",
  number: "05",
};

interface AccountProps {
  initialTab?: AccountTab;
}

function TabIcon({ tab }: { tab: AccountTab }) {
  const paths: Record<AccountTab, ReactNode> = {
    overview: <><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /></>,
    orders: <><path d="M4 7.5 12 3l8 4.5v9L12 21l-8-4.5z" /><path d="m4 7.5 8 4.5 8-4.5M12 12v9" /></>,
    favorites: <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z" />,
    addresses: <><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2.5" /></>,
    admin: <><path d="M12 3 4.5 6v5.2c0 4.6 3.2 8.1 7.5 9.8 4.3-1.7 7.5-5.2 7.5-9.8V6z" /><path d="M9 12h6M12 9v6" /></>,
  };

  return <svg className={styles.tabIcon} viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">{paths[tab]}</svg>;
}

const STATUS_LABELS: Record<OrderStatus, string> = {
  PENDING: "Aguardando confirmação",
  CONFIRMED: "Confirmado",
  PRODUCING: "Em produção",
  SHIPPED: "Enviado",
  DELIVERED: "Entregue",
  CANCELLED: "Cancelado",
};

function EmptyState({ title, description, action, href }: { title: string; description: string; action: string; href: string }) {
  return <div className={styles.emptyState}><span>SP—03D</span><h2>{title}</h2><p>{description}</p><Link to={href}>{action}</Link></div>;
}

export default function Account({ initialTab = "overview" }: AccountProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const session = getAuthSession();
  const isAdmin = session?.role.toLowerCase() === "admin";
  const availableTabs = isAdmin ? [...TABS, ADMIN_TAB] : TABS;
  const routeState = location.state as { tab?: AccountTab; orderCreated?: boolean } | null;
  const [activeTab, setActiveTab] = useState<AccountTab>(routeState?.tab ?? initialTab);
  const [menuCollapsed, setMenuCollapsed] = useState(false);
  const [orders, setOrders] = useState<Order[]>([]);
  const [ordersLoading, setOrdersLoading] = useState(true);
  const [ordersError, setOrdersError] = useState("");

  useEffect(() => {
    fetchMyOrders()
      .then(setOrders)
      .catch((reason) => setOrdersError(reason instanceof Error ? reason.message : "Não foi possível carregar os pedidos."))
      .finally(() => setOrdersLoading(false));
  }, []);

  function signOut() {
    logout();
    navigate("/login", { replace: true });
  }

  function leaveAdministration() {
    setActiveTab("overview");

    if (location.pathname.startsWith("/dashboard")) {
      navigate("/minha-conta", {
        replace: true,
        state: { tab: "overview" satisfies AccountTab },
      });
    }
  }

  if (activeTab === "admin" && isAdmin) {
    return <Dashboard onBack={leaveAdministration} />;
  }

  return (
    <main className={`${styles.accountPage} ${menuCollapsed ? styles.menuCollapsed : ""}`}>
      <aside className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          <Link to="/" className={styles.brand}>SAVE POINT<span>3D</span></Link>
          <button type="button" className={styles.collapseButton} onClick={() => setMenuCollapsed((current) => !current)} aria-label={menuCollapsed ? "Expandir menu" : "Recolher menu"} title={menuCollapsed ? "Expandir menu" : "Recolher menu"}>{menuCollapsed ? "›" : "‹"}</button>
        </div>
        <div className={styles.profile}>
          <div className={styles.avatar}>{session?.user.slice(0, 1).toUpperCase()}</div>
          <span>Minha conta</span><h1>{session?.user}</h1><p>Membro da comunidade Save Point3D</p>
        </div>
        <nav className={styles.navigation} aria-label="Minha conta">
          {availableTabs.map((tab) => <button key={tab.key} type="button" className={activeTab === tab.key ? styles.activeTab : ""} onClick={() => setActiveTab(tab.key)} title={menuCollapsed ? tab.label : undefined}><TabIcon tab={tab.key} /><span>{tab.number}</span><b>{tab.label}</b></button>)}
        </nav>
        <div className={styles.sidebarFooter}><Link to="/">← Voltar para a loja</Link><button type="button" onClick={signOut}>Sair da conta</button></div>
      </aside>

      <section className={styles.content}>
        <header className={styles.header}>
          <div><span>{activeTab === "admin" ? "Área administrativa" : "Área do cliente"}</span><strong>{availableTabs.find((tab) => tab.key === activeTab)?.label}</strong></div>
          <Link to="/colecao" className={styles.shopLink}>Explorar coleção</Link>
        </header>

        {activeTab === "overview" && (
          <div className={styles.overview}>
            <section className={styles.welcome}>
              <span>Olá, {session?.user}</span><h2>Seu próximo checkpoint começa aqui.</h2>
              <p>Acompanhe sua coleção e encontre novas peças produzidas especialmente para transformar seu universo favorito em algo real.</p>
              <div><Link to="/colecao">Ver lançamentos</Link><Link to="/personalizados">Criar peça personalizada</Link></div>
            </section>
            <section className={styles.summary} aria-label="Resumo da conta">
              <article><span>Pedidos</span><strong>{orders.length}</strong><small>{orders.length ? "Acompanhe seus pedidos" : "Nenhum pedido em andamento"}</small></article>
              <article><span>Favoritos</span><strong>0</strong><small>Sua lista está pronta para começar</small></article>
              <article><span>Status</span><strong>ON</strong><small>Conta ativa</small></article>
            </section>
            <section className={styles.discovery}><div><span>Descobrir</span><h3>Uma peça que só você poderia imaginar.</h3></div><Link to="/personalizados">Solicitar orçamento →</Link></section>
          </div>
        )}

        {activeTab === "orders" && (
          <div className={styles.ordersPanel}>
            {routeState?.orderCreated && <p className={styles.orderSuccess}>Pedido criado com sucesso. Acompanhe o andamento abaixo.</p>}
            {ordersLoading && <p className={styles.ordersFeedback}>Carregando pedidos…</p>}
            {ordersError && <p className={styles.ordersError}>{ordersError}</p>}
            {!ordersLoading && !ordersError && orders.length === 0 && <EmptyState title="Nenhum pedido por aqui." description="Quando você fizer uma compra, o andamento e os detalhes aparecerão nesta área." action="Explorar coleção" href="/colecao" />}
            {orders.length > 0 && (
              <div className={styles.orderList}>
                {orders.map((order) => (
                  <article key={order.id} className={styles.orderCard}>
                    <header>
                      <div><span>Pedido</span><strong>#{order.id.slice(0, 8).toUpperCase()}</strong></div>
                      <div><span>Realizado em</span><strong>{new Intl.DateTimeFormat("pt-BR").format(new Date(order.createdAt))}</strong></div>
                      <div><span>Total</span><strong>{formatPrice(order.total)}</strong></div>
                      <span className={styles.orderStatus}>{STATUS_LABELS[order.status]}</span>
                    </header>
                    <div className={styles.orderItems}>
                      {order.items.map((item) => (
                        <div key={item.id}>
                          <img src={item.imageUrl ?? "/assets/img/3.png"} alt="" />
                          <span><b>{item.name}</b><small>{item.quantity} × {formatPrice(item.unitPrice)}</small></span>
                          <strong>{formatPrice(item.lineTotal)}</strong>
                        </div>
                      ))}
                    </div>
                    {order.discount > 0 && <footer>Desconto aplicado: <strong>− {formatPrice(order.discount)}</strong></footer>}
                  </article>
                ))}
              </div>
            )}
          </div>
        )}
        {activeTab === "favorites" && <EmptyState title="Sua lista está vazia." description="Favorite as peças que mais combinam com sua coleção para encontrá-las rapidamente." action="Descobrir peças" href="/colecao" />}
        {activeTab === "addresses" && <EmptyState title="Nenhum endereço cadastrado." description="Os endereços utilizados em seus próximos pedidos serão exibidos aqui." action="Voltar para a loja" href="/" />}
      </section>
    </main>
  );
}
