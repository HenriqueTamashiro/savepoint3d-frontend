import { useEffect, useMemo, useState } from "react";
import { fetchPost, persistPost, uploadPostImage } from "../../services/api";
import { Post } from "../../types/post";
import { EditableSection, EDITABLE_SECTIONS } from "./interface";

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

function findSectionPost(
  posts: Post[],
  section: EditableSection,
): Post | undefined {
  const exact = posts.find(
    (post) =>
      post.type === section.type && post.tag?.toUpperCase() === section.tag,
  );
  if (exact) return exact;

  const sameType = posts.filter((post) => post.type === section.type);
  return sameType.length === 1 ? sameType[0] : undefined;
}

export function useDashboard() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedKey, setSelectedKey] = useState(EDITABLE_SECTIONS[0].key);
  const [draft, setDraft] = useState<Post>(() =>
    createSectionPost(EDITABLE_SECTIONS[0]),
  );
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [message, setMessage] = useState("");

  const selectedSection = useMemo(
    () =>
      EDITABLE_SECTIONS.find((section) => section.key === selectedKey) ??
      EDITABLE_SECTIONS[0],
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
    const section =
      EDITABLE_SECTIONS.find((item) => item.key === key) ??
      EDITABLE_SECTIONS[0];
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
          ? current.map((post) =>
              post.id === normalizedDraft.id ? savedPost : post,
            )
          : [...current, savedPost];
      });
      setMessage("Alterações publicadas com segurança.");
    } catch (reason) {
      setMessage(
        reason instanceof Error
          ? reason.message
          : "Não foi possível salvar as alterações.",
      );
    } finally {
      setSaving(false);
    }
  }

  async function reset() {
    try {
      const fetchedPosts = await fetchPost();
      setPosts(fetchedPosts);
      setDraft(
        findSectionPost(fetchedPosts, selectedSection) ??
          createSectionPost(selectedSection),
      );
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
      setMessage(
        reason instanceof Error
          ? reason.message
          : "Não foi possível enviar a imagem.",
      );
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

//AdminPanel
