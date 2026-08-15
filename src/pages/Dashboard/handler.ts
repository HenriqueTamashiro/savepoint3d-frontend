import { useEffect, useMemo, useState } from "react";
import { fetchPost, persistPost, uploadPostImage } from "../../services/api";
import { Post, PostType } from "../../types/post";

export interface EditableSection {
  key: string;
  label: string;
  description: string;
  type: PostType;
  tag: string;
  defaultTitle: string;
  defaultContent: string;
  defaultImageUrl: string;
  supportsVideo?: boolean;
}

export const EDITABLE_SECTIONS: EditableSection[] = [
  {
    key: "hero",
    label: "Hero principal",
    description: "Título, texto, vídeo e imagem de capa",
    type: PostType.VIDEO,
    tag: "HERO",
    defaultTitle: "Seu Universo Favorito Fora da Tela.",
    defaultContent: "Action figures, estátuas e peças personalizadas produzidas em impressão 3D e finalizadas à mão.",
    defaultImageUrl: "/assets/img/4.png",
    supportsVideo: true,
  },
  {
    key: "personalizados",
    label: "Personalizados",
    description: "Apresentação do serviço sob medida",
    type: PostType.ARTICLE,
    tag: "PERSONALIZADOS",
    defaultTitle: "Sua ideia. Seu personagem. Sua peça.",
    defaultContent: "Transformamos fotos, personagens, referências e ideias em peças exclusivas produzidas especialmente para você.",
    defaultImageUrl: "/assets/img/personalizados-hero.png",
  },
  {
    key: "figuras",
    label: "Figuras estilizadas",
    description: "Bloco de toy art e figuras exclusivas",
    type: PostType.FIGURE,
    tag: "FIGURAS",
    defaultTitle: "Figuras com identidade só sua.",
    defaultContent: "Personagens, profissões, casais e presentes ganham vida em figuras estilizadas feitas sob medida.",
    defaultImageUrl: "/assets/img/3.png",
  },
  {
    key: "diorama",
    label: "Dioramas",
    description: "Chamada visual da coleção de dioramas",
    type: PostType.PROJECT,
    tag: "DIORAMA",
    defaultTitle: "Uma cena inteira na sua estante.",
    defaultContent: "Dioramas desenvolvidos para transformar momentos épicos em peças colecionáveis cheias de movimento e detalhes.",
    defaultImageUrl: "/assets/img/7.png",
  },
  {
    key: "processo",
    label: "Processo",
    description: "Título e imagem das etapas de produção",
    type: PostType.PROJECT,
    tag: "PROCESSO",
    defaultTitle: "Do arquivo digital até a sua estante.",
    defaultContent: "Conheça cada etapa de produção e acabamento da sua peça.",
    defaultImageUrl: "/assets/img/processo-artesao.png",
  },
];

function createSectionPost(section: EditableSection): Post {
  return {
    id: `local-${section.key}`,
    authorId: "local-dashboard",
    title: section.defaultTitle,
    content: section.defaultContent,
    type: section.type,
    tag: section.tag,
    imageUrl: section.defaultImageUrl,
    url: section.supportsVideo ? "/assets/video/hero-video.mp4" : null,
    show: true,
  };
}

function findSectionPost(posts: Post[], section: EditableSection): Post | undefined {
  const exact = posts.find(
    (post) => post.type === section.type && post.tag?.toUpperCase() === section.tag,
  );
  if (exact) return exact;

  const sameType = posts.filter((post) => post.type === section.type);
  return sameType.length === 1 ? sameType[0] : undefined;
}

export function useDashboard() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedKey, setSelectedKey] = useState(EDITABLE_SECTIONS[0].key);
  const [draft, setDraft] = useState<Post>(() => createSectionPost(EDITABLE_SECTIONS[0]));
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [message, setMessage] = useState("");

  const selectedSection = useMemo(
    () => EDITABLE_SECTIONS.find((section) => section.key === selectedKey) ?? EDITABLE_SECTIONS[0],
    [selectedKey],
  );

  useEffect(() => {
    fetchPost()
      .then((fetchedPosts) => {
        setPosts(fetchedPosts);
        setDraft(
          findSectionPost(fetchedPosts, EDITABLE_SECTIONS[0]) ??
            createSectionPost(EDITABLE_SECTIONS[0]),
        );
      })
      .catch(() => setMessage("Não foi possível carregar o conteúdo da API."))
      .finally(() => setLoading(false));
  }, []);

  function selectSection(key: string) {
    const section = EDITABLE_SECTIONS.find((item) => item.key === key) ?? EDITABLE_SECTIONS[0];
    setSelectedKey(section.key);
    setDraft(findSectionPost(posts, section) ?? createSectionPost(section));
    setMessage("");
  }

  function updateField<K extends keyof Post>(field: K, value: Post[K]) {
    setDraft((current) => ({ ...current, [field]: value }));
    setMessage("");
  }

  async function save() {
    const normalizedDraft = {
      ...draft,
      type: selectedSection.type,
      tag: selectedSection.tag,
    };
    setSaving(true);
    setMessage("");
    try {
      const savedPost = await persistPost(normalizedDraft);
      setDraft(savedPost);
      setPosts((current) => {
        const exists = current.some((post) => post.id === normalizedDraft.id);
        return exists
          ? current.map((post) => (post.id === normalizedDraft.id ? savedPost : post))
          : [...current, savedPost];
      });
      setMessage("Alterações publicadas com segurança.");
    } catch (reason) {
      setMessage(reason instanceof Error ? reason.message : "Não foi possível salvar as alterações.");
    } finally {
      setSaving(false);
    }
  }

  async function reset() {
    try {
      const fetchedPosts = await fetchPost();
      setPosts(fetchedPosts);
      setDraft(findSectionPost(fetchedPosts, selectedSection) ?? createSectionPost(selectedSection));
      setMessage("Exibindo o conteúdo publicado.");
    } catch {
      setDraft(createSectionPost(selectedSection));
      setMessage("Exibindo o conteúdo padrão.");
    }
  }

  async function uploadImage(file: File) {
    setUploadingImage(true);
    setMessage("");
    try {
      const imageUrl = await uploadPostImage(file);
      updateField("imageUrl", imageUrl);
      setMessage("Imagem enviada. Salve as alterações para publicar.");
    } catch (reason) {
      setMessage(reason instanceof Error ? reason.message : "Não foi possível enviar a imagem.");
    } finally {
      setUploadingImage(false);
    }
  }

  return {
    draft,
    loading,
    saving,
    uploadingImage,
    message,
    selectedKey,
    selectedSection,
    setSelectedKey: selectSection,
    updateField,
    save,
    uploadImage,
    reset,
  };
}
