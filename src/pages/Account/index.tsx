import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { formatPrice } from "../../components/ProductCard/handler";
import { getAuthSession, logout } from "../../services/auth";
import { fetchMyOrders } from "../../services/orders";
import { Order, OrderStatus } from "../../types/order";
import Dashboard from "../Dashboard";
import * as S from "../../style/pages/Account.styles";

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

  return <S.TabIcon viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">{paths[tab]}</S.TabIcon>;
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
  return <S.EmptyState><span>SP—03D</span><h2>{title}</h2><p>{description}</p><Link to={href}>{action}</Link></S.EmptyState>;
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

  return (<S.StyleScope>{(
    <S.AccountPage $collapsed={menuCollapsed}>
      <S.Sidebar>
        <S.SidebarHeader>
          <S.Brand to="/">SAVE POINT<span>3D</span></S.Brand>
          <S.CollapseButton type="button" onClick={() => setMenuCollapsed((current) => !current)} aria-label={menuCollapsed ? "Expandir menu" : "Recolher menu"} title={menuCollapsed ? "Expandir menu" : "Recolher menu"}>{menuCollapsed ? "›" : "‹"}</S.CollapseButton>
        </S.SidebarHeader>
        <S.Profile>
          <S.Avatar>{session?.user.slice(0, 1).toUpperCase()}</S.Avatar>
          <span>Minha conta</span><h1>{session?.user}</h1><p>Membro da comunidade Save Point3D</p>
        </S.Profile>
        <S.Navigation aria-label="Minha conta">
          {availableTabs.map((tab) => <S.NavigationButton key={tab.key} type="button" $active={activeTab === tab.key} onClick={() => setActiveTab(tab.key)} title={menuCollapsed ? tab.label : undefined}><TabIcon tab={tab.key} /><span>{tab.number}</span><b>{tab.label}</b></S.NavigationButton>)}
        </S.Navigation>
        <S.SidebarFooter><Link to="/">← Voltar para a loja</Link><button type="button" onClick={signOut}>Sair da conta</button></S.SidebarFooter>
      </S.Sidebar>

      <S.Content>
        <S.Header>
          <div><span>{activeTab === "admin" ? "Área administrativa" : "Área do cliente"}</span><strong>{availableTabs.find((tab) => tab.key === activeTab)?.label}</strong></div>
          <S.ShopLink to="/colecao">Explorar coleção</S.ShopLink>
        </S.Header>

        {activeTab === "overview" && (
          <S.Overview>
            <S.Welcome>
              <span>Olá, {session?.user}</span><h2>Seu próximo checkpoint começa aqui.</h2>
              <p>Acompanhe sua coleção e encontre novas peças produzidas especialmente para transformar seu universo favorito em algo real.</p>
              <div><Link to="/colecao">Ver lançamentos</Link><Link to="/personalizados">Criar peça personalizada</Link></div>
            </S.Welcome>
            <S.Summary aria-label="Resumo da conta">
              <article><span>Pedidos</span><strong>{orders.length}</strong><small>{orders.length ? "Acompanhe seus pedidos" : "Nenhum pedido em andamento"}</small></article>
              <article><span>Favoritos</span><strong>0</strong><small>Sua lista está pronta para começar</small></article>
              <article><span>Status</span><strong>ON</strong><small>Conta ativa</small></article>
            </S.Summary>
            <S.Discovery><div><span>Descobrir</span><h3>Uma peça que só você poderia imaginar.</h3></div><Link to="/personalizados">Solicitar orçamento →</Link></S.Discovery>
          </S.Overview>
        )}

        {activeTab === "orders" && (
          <S.OrdersPanel>
            {routeState?.orderCreated && <S.OrderSuccess>Pedido criado com sucesso. Acompanhe o andamento abaixo.</S.OrderSuccess>}
            {ordersLoading && <S.OrdersFeedback>Carregando pedidos…</S.OrdersFeedback>}
            {ordersError && <S.OrdersError>{ordersError}</S.OrdersError>}
            {!ordersLoading && !ordersError && orders.length === 0 && <EmptyState title="Nenhum pedido por aqui." description="Quando você fizer uma compra, o andamento e os detalhes aparecerão nesta área." action="Explorar coleção" href="/colecao" />}
            {orders.length > 0 && (
              <S.OrderList>
                {orders.map((order) => (
                  <S.OrderCard key={order.id}>
                    <header>
                      <div><span>Pedido</span><strong>#{order.id.slice(0, 8).toUpperCase()}</strong></div>
                      <div><span>Realizado em</span><strong>{new Intl.DateTimeFormat("pt-BR").format(new Date(order.createdAt))}</strong></div>
                      <div><span>Total</span><strong>{formatPrice(order.total)}</strong></div>
                      <S.OrderStatus>{STATUS_LABELS[order.status]}</S.OrderStatus>
                    </header>
                    <S.OrderItems>
                      {order.items.map((item) => (
                        <div key={item.id}>
                          <img src={item.imageUrl ?? "/assets/img/3.png"} alt="" />
                          <span><b>{item.name}</b><small>{item.quantity} × {formatPrice(item.unitPrice)}</small></span>
                          <strong>{formatPrice(item.lineTotal)}</strong>
                        </div>
                      ))}
                    </S.OrderItems>
                    {order.discount > 0 && <footer>Desconto aplicado: <strong>− {formatPrice(order.discount)}</strong></footer>}
                  </S.OrderCard>
                ))}
              </S.OrderList>
            )}
          </S.OrdersPanel>
        )}
        {activeTab === "favorites" && <EmptyState title="Sua lista está vazia." description="Favorite as peças que mais combinam com sua coleção para encontrá-las rapidamente." action="Descobrir peças" href="/colecao" />}
        {activeTab === "addresses" && <EmptyState title="Nenhum endereço cadastrado." description="Os endereços utilizados em seus próximos pedidos serão exibidos aqui." action="Voltar para a loja" href="/" />}
      </S.Content>
    </S.AccountPage>
  )}</S.StyleScope>);
}
