import { KeyboardEvent, useState } from "react";
import { Link } from "react-router-dom";
import { Post } from "../../types/post";
import { EDITABLE_SECTIONS, EditableSection, useDashboard } from "./handler";
import styles from "../../style/pages/Dashboard.module.css";

type PreviewSize = "desktop" | "mobile";

interface DashboardProps {
  onBack: () => void;
}

function Preview({ post, section }: { post: Post; section: EditableSection }) {
  const imageUrl = post.imageUrl || section.defaultImageUrl;

  if (section.key === "hero") {
    return <section className={`${styles.componentPreview} ${styles.heroPreview}`}><img src={imageUrl} alt="" /><div className={styles.previewShade} /><div className={styles.heroCopy}><span>Save Point3D — Coleção 2026</span><h1>{post.title}</h1><p>{post.content}</p><button type="button">Explorar coleção</button></div></section>;
  }
  if (section.key === "diorama") {
    return <section className={`${styles.componentPreview} ${styles.dioramaPreview}`}><img src={imageUrl} alt="" /><div className={styles.previewShade} /><div className={styles.overlayCopy}><span>08 —</span><h2>{post.title}</h2><p>{post.content}</p><button type="button">Explorar dioramas</button></div></section>;
  }

  return <section className={`${styles.componentPreview} ${styles.splitPreview}`}><div className={styles.splitImage}><img src={imageUrl} alt="" /></div><div className={styles.splitCopy}><span>{section.key === "processo" ? "09" : section.key === "figuras" ? "06" : "05"} —</span><h2>{post.title}</h2><p>{post.content}</p>{section.key !== "processo" && <button type="button">Saiba mais</button>}{section.key === "processo" && <div className={styles.miniSteps}>{["Preparação do modelo", "Impressão 3D", "Pintura e acabamento"].map((step, index) => <div key={step}><b>0{index + 1}</b><span>{step}</span></div>)}</div>}</div></section>;
}

export default function Dashboard({ onBack }: DashboardProps) {
  const { draft, loading, saving, uploadingImage, message, selectedKey, selectedSection, setSelectedKey, updateField, save, uploadImage, reset } = useDashboard();
  const [previewSize, setPreviewSize] = useState<PreviewSize>("desktop");
  const [menuCollapsed, setMenuCollapsed] = useState(false);

  function createParagraph(event: KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key !== "Enter" || !event.shiftKey) return;
    event.preventDefault();
    const textarea = event.currentTarget;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const content = draft.content ?? "";
    updateField("content", `${content.slice(0, start)}\n\n${content.slice(end)}`);
    requestAnimationFrame(() => textarea.setSelectionRange(start + 2, start + 2));
  }

  function preventEnterSubmit(event: KeyboardEvent<HTMLFormElement>) {
    if (event.key !== "Enter") return;
    const target = event.target as HTMLElement;
    if (target.tagName !== "TEXTAREA") event.preventDefault();
  }

  return (
    <main className={`${styles.dashboard} ${menuCollapsed ? styles.menuCollapsed : ""}`}>
      <aside className={styles.sidebar}>
        <div className={styles.menuActions}>
          <button type="button" className={styles.backButton} onClick={onBack} title="Voltar para minha conta"><span>←</span><b>Voltar</b></button>
          <button type="button" className={styles.collapseButton} onClick={() => setMenuCollapsed((current) => !current)} aria-label={menuCollapsed ? "Expandir menu" : "Recolher menu"} title={menuCollapsed ? "Expandir menu" : "Recolher menu"}>{menuCollapsed ? "›" : "‹"}</button>
        </div>
        <div className={styles.sidebarIntro}><span>CMS visual</span><h2>Editor de conteúdo</h2><p>Escolha uma seção, altere os campos e acompanhe o resultado ao lado.</p></div>
        <nav aria-label="Seções editáveis" className={styles.sectionNav}>{EDITABLE_SECTIONS.map((section, index) => <button key={section.key} type="button" className={selectedKey === section.key ? styles.activeSection : ""} onClick={() => setSelectedKey(section.key)}><span>0{index + 1}</span><div><b>{section.label}</b><small>{section.description}</small></div></button>)}</nav>
      </aside>

      <section className={styles.editorPanel}>
        <header className={styles.panelHeader}><div><span>Seção selecionada</span><h2>{selectedSection.label}</h2></div><span className={styles.status}><i /> Conteúdo publicado</span></header>
        {loading ? <p className={styles.loading}>Carregando conteúdo…</p> : <form className={styles.form} onKeyDown={preventEnterSubmit} onSubmit={(event) => event.preventDefault()}>
          <label>Título<textarea rows={3} maxLength={120} value={draft.title} onKeyDown={createParagraph} onChange={(event) => updateField("title", event.target.value)} /><small>Shift + Enter cria um novo parágrafo · {draft.title.length}/120 caracteres</small></label>
          <label>Texto de apoio<textarea rows={7} value={draft.content ?? ""} onKeyDown={createParagraph} onChange={(event) => updateField("content", event.target.value)} /><small>Shift + Enter cria um novo parágrafo</small></label>
          <div className={styles.imageField}><label>Link da imagem<input value={draft.imageUrl ?? ""} onChange={(event) => updateField("imageUrl", event.target.value)} placeholder="https://… ou /assets/img/imagem.png" /></label><label className={styles.uploadButton}>{uploadingImage ? "Enviando…" : "Enviar imagem"}<input type="file" accept="image/jpeg,image/png,image/webp,image/gif" disabled={uploadingImage} onChange={(event) => { const file = event.target.files?.[0]; if (file) void uploadImage(file); event.target.value = ""; }} /></label><small>JPG, PNG, WebP ou GIF de até 5 MB.</small></div>
          {selectedSection.supportsVideo && <label>URL do vídeo<input value={draft.url ?? ""} onChange={(event) => updateField("url", event.target.value)} placeholder="/assets/video/video.mp4" /></label>}
          <label className={styles.visibilityField}><span><b>Seção visível</b><small>Controla a exibição deste conteúdo na página.</small></span><input type="checkbox" checked={draft.show !== false} onChange={(event) => updateField("show", event.target.checked)} /></label>
          <div className={styles.formActions}><button type="button" className={styles.resetButton} onClick={() => void reset()} disabled={saving}>Restaurar</button><button type="button" className={styles.saveButton} onClick={() => void save()} disabled={saving || uploadingImage}>{saving ? "Salvando…" : "Salvar alterações"}</button></div>
          {message && <p className={styles.message} role="status">{message}</p>}
        </form>}
      </section>

      <section className={styles.previewPanel}>
        <header className={styles.previewHeader}><div><span>Preview ao vivo</span><strong>{selectedSection.label}</strong></div><div className={styles.viewportControls} aria-label="Tamanho do preview"><button type="button" className={previewSize === "desktop" ? styles.activeViewport : ""} onClick={() => setPreviewSize("desktop")}>Desktop</button><button type="button" className={previewSize === "mobile" ? styles.activeViewport : ""} onClick={() => setPreviewSize("mobile")}>Mobile</button></div></header>
        <div className={styles.previewStage}><div className={`${styles.previewFrame} ${previewSize === "mobile" ? styles.mobileFrame : ""}`}>{draft.show === false ? <div className={styles.hiddenPreview}><span>Seção oculta</span><p>Ative “Seção visível” para visualizar o componente.</p></div> : <Preview post={draft} section={selectedSection} />}</div></div>
        <footer className={styles.previewFooter}><span>As mudanças aparecem aqui antes de serem salvas.</span><Link to="/" target="_blank">Abrir loja ↗</Link></footer>
      </section>
    </main>
  );
}
