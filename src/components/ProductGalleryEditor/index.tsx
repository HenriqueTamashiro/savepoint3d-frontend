import type { ProductImageInput } from "../../types/product";

interface Props {
  images: ProductImageInput[];
  onChange: (images: ProductImageInput[]) => void;
  disabled?: boolean;
}

export default function ProductGalleryEditor({
  images,
  onChange,
  disabled,
}: Props) {
  function move(index: number, direction: number) {
    const next = [...images];
    const destination = index + direction;
    if (destination < 0 || destination >= next.length) return;
    [next[index], next[destination]] = [next[destination], next[index]];
    onChange(next);
  }

  return (
    <fieldset disabled={disabled}>
      <legend>Galeria do produto</legend>
      <p>Até 20 imagens. A ordem abaixo define a sequência da galeria.</p>
      {images.map((image, index) => (
        <div key={index}>
          <label>
            Imagem {index + 1}
            <input
              required
              maxLength={2048}
              value={image.imageUrl}
              placeholder="https://… ou /uploads/imagem.webp"
              onChange={(event) =>
                onChange(
                  images.map((entry, i) =>
                    i === index
                      ? { ...entry, imageUrl: event.target.value }
                      : entry,
                  ),
                )
              }
            />
          </label>
          <label>
            Descrição da imagem {index + 1}
            <input
              maxLength={300}
              value={image.alt ?? ""}
              onChange={(event) =>
                onChange(
                  images.map((entry, i) =>
                    i === index ? { ...entry, alt: event.target.value } : entry,
                  ),
                )
              }
            />
          </label>
          <button
            type="button"
            disabled={index === 0}
            onClick={() => move(index, -1)}
            aria-label={`Mover imagem ${index + 1} para antes`}
          >
            Subir
          </button>
          <button
            type="button"
            disabled={index === images.length - 1}
            onClick={() => move(index, 1)}
            aria-label={`Mover imagem ${index + 1} para depois`}
          >
            Descer
          </button>
          <button
            type="button"
            onClick={() => onChange(images.filter((_, i) => i !== index))}
            aria-label={`Remover imagem ${index + 1}`}
          >
            Remover
          </button>
        </div>
      ))}
      <button
        type="button"
        disabled={images.length >= 20}
        onClick={() => onChange([...images, { imageUrl: "", alt: "" }])}
      >
        Adicionar imagem
      </button>
    </fieldset>
  );
}
