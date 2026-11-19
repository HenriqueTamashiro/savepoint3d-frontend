import { PostType } from "../../types/post";
import { ProductImageInput, ItemLocation } from "../../types/product";
import { AdminUser } from "../../types/admin";
import { OrderStatus } from "../../types/order";

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
    defaultContent:
      "Action figures, estátuas e peças personalizadas produzidas em impressão 3D e finalizadas à mão.",
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
    defaultContent:
      "Transformamos fotos, personagens, referências e ideias em peças exclusivas produzidas especialmente para você.",
    defaultImageUrl: "/assets/img/personalizados-hero.png",
  },
  {
    key: "figuras",
    label: "Figuras estilizadas",
    description: "Bloco de toy art e figuras exclusivas",
    type: PostType.FIGURE,
    tag: "FIGURAS",
    defaultTitle: "Figuras com identidade só sua.",
    defaultContent:
      "Personagens, profissões, casais e presentes ganham vida em figuras estilizadas feitas sob medida.",
    defaultImageUrl: "/assets/img/3.png",
  },
  {
    key: "diorama",
    label: "Dioramas",
    description: "Chamada visual da coleção de dioramas",
    type: PostType.PROJECT,
    tag: "DIORAMA",
    defaultTitle: "Uma cena inteira na sua estante.",
    defaultContent:
      "Dioramas desenvolvidos para transformar momentos épicos em peças colecionáveis cheias de movimento e detalhes.",
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

export const EMPTY_PRODUCT = {
  galleryImages: [] as ProductImageInput[],
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

export type ProductForm = typeof EMPTY_PRODUCT;

export interface UserRowProps {
  value: AdminUser;
  onSaved: (user: AdminUser) => void;
  onDeleted: (id: string) => void;
}
