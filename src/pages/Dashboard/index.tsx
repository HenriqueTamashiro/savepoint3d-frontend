import { KeyboardEvent, ReactNode, useState } from "react";
import { Link } from "react-router-dom";
import { Post } from "../../types/post";
import { OrdersAdmin, ProductsAdmin, UsersAdmin } from "./AdminPanels";
import { EDITABLE_SECTIONS, EditableSection, useDashboard } from "./handler";
import * as S from "../../style/pages/Dashboard.styles";

type PreviewSize = "desktop" | "mobile";
type DashboardArea = "layout" | "products" | "users" | "orders";

interface DashboardProps {
  onBack: () => void;
}

const AREAS: { key: DashboardArea; label: string; description: string; icon: ReactNode }[] = [
  { key: "layout", label: "Layout e textos", description: "Conteúdo visual do site", icon: <path d="M4 4h16v16H4zM4 9h16M9 9v11" /> },
  { key: "products", label: "Produtos", description: "Catálogo, preço e estoque", icon: <><path d="m4 7 8-4 8 4-8 4z" /><path d="M4 7v10l8 4 8-4V7M12 11v10" /></> },
  { key: "users", label: "Usuários", description: "Cargos, bloqueio e contas", icon: <><circle cx="9" cy="8" r="4" /><path d="M3 21v-2a6 6 0 0 1 12 0v2M17 8h4M19 6v4" /></> },
  { key: "orders", label: "Pedidos", description: "Status e acompanhamento", icon: <><path d="M6 3h12l2 5-2 13H6L4 8z" /><path d="M4 8h16M9 12h6" /></> },
];

function AreaIcon({ children }: { children: ReactNode }) {
  return <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">{children}</svg>;
}

function Preview({ post, section }: { post: Post; section: EditableSection }) {
  const imageUrl = post.imageUrl || section.defaultImageUrl;
  if (section.key === "hero") {
    return <S.ComponentPreview $variant="hero"><img src={imageUrl} alt="" /><S.PreviewShade /><S.HeroCopy><span>Save Point3D — Coleção 2026</span><h1>{post.title}</h1><p>{post.content}</p><button type="button">Explorar coleção</button></S.HeroCopy></S.ComponentPreview>;
  }
  if (section.key === "diorama") {
    return <S.ComponentPreview $variant="diorama"><img src={imageUrl} alt="" /><S.PreviewShade /><S.OverlayCopy><span>08 —</span><h2>{post.title}</h2><p>{post.content}</p><button type="button">Explorar dioramas</button></S.OverlayCopy></S.ComponentPreview>;
  }
  return <S.ComponentPreview $variant="split"><S.SplitImage><img src={imageUrl} alt="" /></S.SplitImage><S.SplitCopy><span>{section.key === "processo" ? "09" : section.key === "figuras" ? "06" : "05"} —</span><h2>{post.title}</h2><p>{post.content}</p>{section.key !== "processo" && <button type="button">Saiba mais</button>}{section.key === "processo" && <S.MiniSteps>{["Preparação do modelo", "Impressão 3D", "Pintura e acabamento"].map((step, index) => <div key={step}><b>0{index + 1}</b><span>{step}</span></div>)}</S.MiniSteps>}</S.SplitCopy></S.ComponentPreview>;
}

export default function Dashboard({ onBack }: DashboardProps) {
  const { draft, loading, saving, uploadingImage, message, selectedKey, selectedSection, setSelectedKey, updateField, save, uploadImage, reset } = useDashboard();
  const [area, setArea] = useState<DashboardArea | null>(null);
  const [previewSize, setPreviewSize] = useState<PreviewSize>("desktop");
  const [menuCollapsed, setMenuCollapsed] = useState(false);
  const areaInfo = AREAS.find((item) => item.key === area);

  function createParagraph(field: "title" | "content", event: KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key !== "Enter" || !event.shiftKey) return;
    event.preventDefault();
    const textarea = event.currentTarget;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const value = field === "title" ? draft.title : draft.content ?? "";
    updateField(field, `${value.slice(0, start)}\n\n${value.slice(end)}`);
    requestAnimationFrame(() => textarea.setSelectionRange(start + 2, start + 2));
  }

  function preventEnterSubmit(event: KeyboardEvent<HTMLFormElement>) {
    if (event.key === "Enter" && (event.target as HTMLElement).tagName !== "TEXTAREA") event.preventDefault();
  }

  return (<S.StyleScope>{<S.Dashboard $collapsed={menuCollapsed}>
    <S.Sidebar>
      <S.MenuActions><S.BackButton type="button" onClick={onBack} title="Voltar para minha conta"><span>←</span><b>Voltar</b></S.BackButton><S.CollapseButton type="button" onClick={() => setMenuCollapsed((current) => !current)} aria-label={menuCollapsed ? "Expandir menu" : "Recolher menu"}>{menuCollapsed ? "›" : "‹"}</S.CollapseButton></S.MenuActions>
      <S.SidebarIntro><span>Administração</span><S.HubButton type="button" onClick={() => setArea(null)}><h2>Central de controle</h2></S.HubButton><p>Gerencie conteúdo, catálogo, usuários e pedidos.</p></S.SidebarIntro>
      <S.AdminNav aria-label="Áreas administrativas">{AREAS.map((item) => <S.AdminNavButton key={item.key} type="button" $active={area === item.key} onClick={() => setArea(item.key)} title={menuCollapsed ? item.label : undefined}><AreaIcon>{item.icon}</AreaIcon><div><b>{item.label}</b><small>{item.description}</small></div></S.AdminNavButton>)}</S.AdminNav>
      {area === "layout" && <S.SectionNav aria-label="Seções editáveis">{EDITABLE_SECTIONS.map((section, index) => <S.SectionNavButton key={section.key} type="button" $active={selectedKey === section.key} onClick={() => setSelectedKey(section.key)}><span>0{index + 1}</span><div><b>{section.label}</b><small>{section.description}</small></div></S.SectionNavButton>)}</S.SectionNav>}
    </S.Sidebar>

    {area === null ? <S.AdminHub>
      <S.AdminHubContent>
        <header><span>Área administrativa</span><h1>Central de opções</h1><p>Escolha o que deseja gerenciar.</p></header>
        <S.AdminHubGrid>{AREAS.map((item) => <button key={item.key} type="button" onClick={() => setArea(item.key)}><AreaIcon>{item.icon}</AreaIcon><div><b>{item.label}</b><small>{item.description}</small></div><span aria-hidden="true">→</span></button>)}</S.AdminHubGrid>
      </S.AdminHubContent>
    </S.AdminHub> : area === "layout" ? <>
      <S.EditorPanel>
        <S.PanelHeader><div><S.ReturnToHub type="button" onClick={() => setArea(null)}>← Central de opções</S.ReturnToHub><span>Seção selecionada</span><h2>{selectedSection.label}</h2></div><S.Status><i /> Conteúdo publicado</S.Status></S.PanelHeader>
        {loading ? <S.Loading>Carregando conteúdo…</S.Loading> : <S.Form onKeyDown={preventEnterSubmit} onSubmit={(event) => event.preventDefault()}>
          <label>Título<textarea rows={3} maxLength={120} value={draft.title} onKeyDown={(event) => createParagraph("title", event)} onChange={(event) => updateField("title", event.target.value)} /><small>Shift + Enter cria um novo parágrafo · {draft.title.length}/120 caracteres</small></label>
          <label>Texto de apoio<textarea rows={7} value={draft.content ?? ""} onKeyDown={(event) => createParagraph("content", event)} onChange={(event) => updateField("content", event.target.value)} /><small>Shift + Enter cria um novo parágrafo</small></label>
          <S.ImageField><label>Link da imagem<input value={draft.imageUrl ?? ""} onChange={(event) => updateField("imageUrl", event.target.value)} placeholder="https://… ou /assets/img/imagem.png" /></label><S.UploadButton>{uploadingImage ? "Enviando…" : "Enviar imagem"}<input type="file" accept="image/jpeg,image/png,image/webp,image/gif" disabled={uploadingImage} onChange={(event) => { const file = event.target.files?.[0]; if (file) void uploadImage(file); event.target.value = ""; }} /></S.UploadButton><small>JPG, PNG, WebP ou GIF de até 5 MB.</small></S.ImageField>
          {selectedSection.supportsVideo && <label>URL do vídeo<input value={draft.url ?? ""} onChange={(event) => updateField("url", event.target.value)} placeholder="/assets/video/hero-video.mp4" /></label>}
          <S.VisibilityField><span><b>Seção visível</b><small>Controla a exibição deste conteúdo na página.</small></span><input type="checkbox" checked={draft.show !== false} onChange={(event) => updateField("show", event.target.checked)} /></S.VisibilityField>
          <S.FormActions><S.ResetButton type="button" onClick={() => void reset()} disabled={saving}>Restaurar</S.ResetButton><S.SaveButton type="button" onClick={() => void save()} disabled={saving || uploadingImage}>{saving ? "Salvando…" : "Salvar alterações"}</S.SaveButton></S.FormActions>
          {message && <S.Message role="status">{message}</S.Message>}
        </S.Form>}
      </S.EditorPanel>
      <S.PreviewPanel><S.PreviewHeader><div><span>Preview ao vivo</span><strong>{selectedSection.label}</strong></div><S.ViewportControls><S.ViewportButton type="button" $active={previewSize === "desktop"} onClick={() => setPreviewSize("desktop")}>Desktop</S.ViewportButton><S.ViewportButton type="button" $active={previewSize === "mobile"} onClick={() => setPreviewSize("mobile")}>Mobile</S.ViewportButton></S.ViewportControls></S.PreviewHeader><S.PreviewStage><S.PreviewFrame $mobile={previewSize === "mobile"}>{draft.show === false ? <S.HiddenPreview><span>Seção oculta</span><p>Ative “Seção visível” para visualizar o componente.</p></S.HiddenPreview> : <Preview post={draft} section={selectedSection} />}</S.PreviewFrame></S.PreviewStage><S.PreviewFooter><span>As mudanças aparecem aqui antes de serem salvas.</span><Link to="/" target="_blank">Abrir loja ↗</Link></S.PreviewFooter></S.PreviewPanel>
    </> : <S.ManagementPanel><S.ManagementHeader><div><S.ReturnToHub type="button" onClick={() => setArea(null)}>← Central de opções</S.ReturnToHub><span>Área administrativa</span><h1>{areaInfo?.label}</h1><p>{areaInfo?.description}</p></div></S.ManagementHeader><S.ManagementBody>{area === "products" && <ProductsAdmin />}{area === "users" && <UsersAdmin />}{area === "orders" && <OrdersAdmin />}</S.ManagementBody></S.ManagementPanel>}
  </S.Dashboard>}</S.StyleScope>);
}
