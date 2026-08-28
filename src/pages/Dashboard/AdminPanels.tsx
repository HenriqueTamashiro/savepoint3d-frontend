import { FormEvent, useEffect, useState } from "react";
import { formatPrice } from "../../components/ProductCard/handler";
import {
  createAdminProduct,
  deleteAdminUser,
  fetchAdminOrders,
  fetchAdminProducts,
  fetchAdminUsers,
  removeAdminProduct,
  updateAdminOrder,
  updateAdminProduct,
  updateAdminUser,
} from "../../services/admin";
import { uploadPostImage } from "../../services/api";
import { AdminOrder, AdminProduct, AdminRole, AdminUser } from "../../types/admin";
import { OrderStatus } from "../../types/order";
import { ItemLocation } from "../../types/product";
import * as S from "../../style/pages/Dashboard.styles";

const EMPTY_PRODUCT = {
  category: "",
  categoryLabel: "",
  name: "",
  scale: "",
  material: "",
  price: "",
  tag: "",
  stock: "",
  imageUrl: "",
  alt: "",
  location: "" as ItemLocation | "",
  active: true,
};

type ProductForm = typeof EMPTY_PRODUCT;

function panelError(reason: unknown) {
  return reason instanceof Error ? reason.message : "Não foi possível concluir a operação.";
}

export function ProductsAdmin() {
  const [products, setProducts] = useState<AdminProduct[]>([]);
  const [form, setForm] = useState<ProductForm>(EMPTY_PRODUCT);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchAdminProducts().then(setProducts).catch((reason) => setMessage(panelError(reason))).finally(() => setLoading(false));
  }, []);

  function setField<K extends keyof ProductForm>(field: K, value: ProductForm[K]) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  function edit(product: AdminProduct) {
    setEditingId(product.id);
    setForm({
      category: product.category,
      categoryLabel: product.categoryLabel,
      name: product.name,
      scale: product.scale,
      material: product.material,
      price: String(product.price),
      tag: product.tag,
      stock: product.stock === null ? "" : String(product.stock),
      imageUrl: product.imageUrl,
      alt: product.alt,
      location: product.location ?? "",
      active: product.active,
    });
    setMessage("");
  }

  function reset() {
    setEditingId(null);
    setForm(EMPTY_PRODUCT);
    setMessage("");
  }

  async function submit(event: FormEvent) {
    event.preventDefault();
    setSaving(true);
    setMessage("");
    const input = {
      category: form.category,
      categoryLabel: form.categoryLabel,
      name: form.name,
      scale: form.scale || undefined,
      material: form.material || undefined,
      price: form.price,
      tag: form.tag || undefined,
      stock: form.stock === "" ? null : Number(form.stock),
      imageUrl: form.imageUrl || undefined,
      alt: form.alt || undefined,
      location: form.location || undefined,
      ...(editingId ? { active: form.active } : {}),
    };

    try {
      if (editingId) {
        const updated = await updateAdminProduct(editingId, input);
        setProducts((current) => current.map((product) => product.id === editingId ? { ...product, ...updated } : product));
        setMessage("Produto atualizado.");
      } else {
        await createAdminProduct(input);
        setProducts(await fetchAdminProducts());
        setMessage("Produto incluído no catálogo.");
        setForm(EMPTY_PRODUCT);
      }
    } catch (reason) {
      setMessage(panelError(reason));
    } finally {
      setSaving(false);
    }
  }

  async function remove(product: AdminProduct) {
    if (!window.confirm(`Remover “${product.name}” do catálogo público?`)) return;
    try {
      await removeAdminProduct(product.id);
      setProducts((current) => current.map((item) => item.id === product.id ? { ...item, active: false } : item));
      if (editingId === product.id) reset();
    } catch (reason) {
      setMessage(panelError(reason));
    }
  }

  async function upload(file: File) {
    setUploading(true);
    try {
      setField("imageUrl", await uploadPostImage(file));
      setMessage("Imagem enviada e vinculada ao formulário.");
    } catch (reason) {
      setMessage(panelError(reason));
    } finally {
      setUploading(false);
    }
  }

  return <S.AdminSplit>
    <S.AdminForm onSubmit={(event) => void submit(event)}>
      <S.AdminFormTitle><div><span>{editingId ? "Editando produto" : "Novo produto"}</span><h3>{editingId ? form.name : "Incluir no catálogo"}</h3></div>{editingId && <button type="button" onClick={reset}>Cancelar</button>}</S.AdminFormTitle>
      <S.FieldGrid>
        <label>Nome<input required maxLength={150} value={form.name} onChange={(event) => setField("name", event.target.value)} /></label>
        <label>Preço<input required min="0" step="0.01" type="number" value={form.price} onChange={(event) => setField("price", event.target.value)} /></label>
        <label>Categoria<input required value={form.category} onChange={(event) => setField("category", event.target.value)} placeholder="fantasia" /></label>
        <label>Nome da categoria<input required value={form.categoryLabel} onChange={(event) => setField("categoryLabel", event.target.value)} placeholder="Fantasia" /></label>
        <label>Escala<input value={form.scale} onChange={(event) => setField("scale", event.target.value)} placeholder="1:6" /></label>
        <label>Material<input value={form.material} onChange={(event) => setField("material", event.target.value)} placeholder="Resina" /></label>
        <label>Estoque<input min="0" type="number" value={form.stock} onChange={(event) => setField("stock", event.target.value)} placeholder="Vazio = sob encomenda" /></label>
        <label>Localização<select value={form.location} onChange={(event) => setField("location", event.target.value as ItemLocation | "")}><option value="">Padrão</option><option value="FEATURED">Destaques</option><option value="CATEGORIES">Categorias</option><option value="CUSTOM">Personalizado</option></select></label>
        <label>Tag<input value={form.tag} onChange={(event) => setField("tag", event.target.value)} /></label>
        <label>Texto alternativo<input value={form.alt} onChange={(event) => setField("alt", event.target.value)} /></label>
      </S.FieldGrid>
      <label>Link da imagem<input value={form.imageUrl} onChange={(event) => setField("imageUrl", event.target.value)} /></label>
      <S.FileButton>{uploading ? "Enviando…" : "Enviar imagem"}<input type="file" accept="image/jpeg,image/png,image/webp,image/gif" disabled={uploading} onChange={(event) => { const file = event.target.files?.[0]; if (file) void upload(file); event.target.value = ""; }} /></S.FileButton>
      {editingId && <S.InlineCheck><input type="checkbox" checked={form.active} onChange={(event) => setField("active", event.target.checked)} /> Produto ativo no catálogo</S.InlineCheck>}
      <S.PrimaryAction disabled={saving || uploading}>{saving ? "Salvando…" : editingId ? "Salvar produto" : "Incluir produto"}</S.PrimaryAction>
      {message && <S.AdminMessage role="status">{message}</S.AdminMessage>}
    </S.AdminForm>

    <S.AdminList>
      <S.ListHeader><span>Catálogo</span><strong>{products.filter((product) => product.active).length} ativos</strong></S.ListHeader>
      {loading ? <p>Carregando produtos…</p> : products.map((product) => <S.ProductRow key={product.id} $inactive={!product.active}><img src={product.imageUrl || "/assets/img/3.png"} alt="" /><div><span>{product.categoryLabel}</span><h4>{product.name}</h4><p>{formatPrice(product.price)} · {product.stock === null ? "Sob encomenda" : `${product.stock} em estoque`}</p></div><S.RowActions><button type="button" onClick={() => edit(product)}>Editar</button>{product.active && <S.DangerAction type="button" onClick={() => void remove(product)}>Remover</S.DangerAction>}</S.RowActions></S.ProductRow>)}
    </S.AdminList>
  </S.AdminSplit>;
}

function UserRow({ value, onSaved, onDeleted }: { value: AdminUser; onSaved: (user: AdminUser) => void; onDeleted: (id: string) => void }) {
  const [user, setUser] = useState(value.user);
  const [role, setRole] = useState<AdminRole>(value.role);
  const [blocked, setBlocked] = useState(value.blocked);
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);

  async function save() {
    setSaving(true);
    setMessage("");
    try {
      const updated = await updateAdminUser(value.id, { user, role, blocked, password: password || undefined });
      onSaved({ ...value, ...updated });
      setPassword("");
      setMessage("Usuário atualizado.");
    } catch (reason) {
      setMessage(panelError(reason));
    } finally {
      setSaving(false);
    }
  }

  async function remove() {
    if (!window.confirm(`Excluir a conta “${value.user}”? Os pedidos serão preservados.`)) return;
    try {
      await deleteAdminUser(value.id);
      onDeleted(value.id);
    } catch (reason) {
      setMessage(panelError(reason));
    }
  }

  return <S.UserRow>
    <S.UserIdentity><span>{value.user.slice(0, 1).toUpperCase()}</span><div><b>{value.user}</b><small>{value._count.orders} pedidos · {value._count.posts} posts</small></div></S.UserIdentity>
    <S.UserFields><label>Usuário<input value={user} onChange={(event) => setUser(event.target.value)} /></label><label>Cargo<select value={role} onChange={(event) => setRole(event.target.value as AdminRole)}><option value="USER">Usuário</option><option value="MOD">Moderador</option><option value="ADMIN">Administrador</option></select></label><label>Nova senha<input type="password" minLength={8} value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Manter atual" /></label><S.InlineCheck><input type="checkbox" checked={blocked} onChange={(event) => setBlocked(event.target.checked)} /> Bloqueado</S.InlineCheck></S.UserFields>
    <S.RowFooter><span>{message}</span><div><button type="button" onClick={() => void save()} disabled={saving}>{saving ? "Salvando…" : "Salvar"}</button><S.DangerAction type="button" onClick={() => void remove()}>Excluir</S.DangerAction></div></S.RowFooter>
  </S.UserRow>;
}

export function UsersAdmin() {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  useEffect(() => { fetchAdminUsers().then(setUsers).catch((reason) => setError(panelError(reason))).finally(() => setLoading(false)); }, []);
  if (loading) return <S.ManagementFeedback>Carregando usuários…</S.ManagementFeedback>;
  if (error) return <S.ManagementError>{error}</S.ManagementError>;
  return <S.UserList>{users.map((user) => <UserRow key={user.id} value={user} onSaved={(updated) => setUsers((current) => current.map((item) => item.id === updated.id ? updated : item))} onDeleted={(id) => setUsers((current) => current.filter((item) => item.id !== id))} />)}</S.UserList>;
}

const ORDER_LABELS: Record<OrderStatus, string> = { PENDING: "Pendente", CONFIRMED: "Confirmado", PRODUCING: "Em produção", SHIPPED: "Enviado", DELIVERED: "Entregue", CANCELLED: "Cancelado" };

export function OrdersAdmin() {
  const [orders, setOrders] = useState<AdminOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [savingId, setSavingId] = useState<string | null>(null);
  useEffect(() => { fetchAdminOrders().then(setOrders).catch((reason) => setError(panelError(reason))).finally(() => setLoading(false)); }, []);

  async function changeStatus(order: AdminOrder, status: OrderStatus) {
    setSavingId(order.id);
    setError("");
    try {
      await updateAdminOrder(order.id, { status });
      setOrders((current) => current.map((item) => item.id === order.id ? { ...item, status } : item));
    } catch (reason) {
      setError(panelError(reason));
    } finally {
      setSavingId(null);
    }
  }

  if (loading) return <S.ManagementFeedback>Carregando pedidos…</S.ManagementFeedback>;
  return <S.AdminOrders>{error && <S.ManagementError>{error}</S.ManagementError>}{orders.map((order) => <S.AdminOrder key={order.id}><header><div><span>Pedido</span><b>#{order.id.slice(0, 8).toUpperCase()}</b></div><div><span>Cliente</span><b>{order.user.user}</b></div><div><span>Data</span><b>{new Intl.DateTimeFormat("pt-BR").format(new Date(order.createdAt))}</b></div><div><span>Total</span><b>{formatPrice(order.total)}</b></div><label>Status<select value={order.status} disabled={savingId === order.id} onChange={(event) => void changeStatus(order, event.target.value as OrderStatus)}>{Object.entries(ORDER_LABELS).map(([status, label]) => <option key={status} value={status}>{label}</option>)}</select></label></header><S.CompactItems>{order.items.map((item) => <span key={item.id}>{item.quantity}× {item.name}</span>)}</S.CompactItems></S.AdminOrder>)}</S.AdminOrders>;
}
