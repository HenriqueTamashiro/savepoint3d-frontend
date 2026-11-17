import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import ts from 'typescript';

// Execute the actual adapter without introducing another test framework.
const source = readFileSync(new URL('../src/services/product-adapter.ts', import.meta.url), 'utf8');
const { outputText } = ts.transpileModule(source, {
  compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 },
});
const { normalizeProduct, productDisplayImages } = await import(
  `data:text/javascript;base64,${Buffer.from(outputText).toString('base64')}`
);

const product = {
  id: 'product-1', postId: 'post-1', category: 'figures', categoryLabel: null,
  name: 'Ronin', price: '199.90', imageUrl: '/cover.webp', alt: 'Cover',
  stock: null, material: null, scale: null, tag: null, location: null,
};

test('normalizes legacy products with nullable fields and no gallery', () => {
  const result = normalizeProduct(product);
  assert.equal(result.price, 199.9);
  assert.equal(result.material, '');
  assert.equal(result.categoryLabel, 'figures');
  assert.deepEqual(result.galleryImages, []);
  assert.deepEqual(productDisplayImages(result), [{ imageUrl: '/cover.webp', alt: 'Cover' }]);
});

test('sorts the gallery without mutating the response and uses each image description', () => {
  const galleryImages = [
    { id: 'b', position: 1, imageUrl: '/back.webp', alt: 'Back' },
    { id: 'a', position: 0, imageUrl: '/cover.webp', alt: null },
  ];
  const result = normalizeProduct({ ...product, galleryImages });
  assert.deepEqual(result.galleryImages.map((image) => image.id), ['a', 'b']);
  assert.equal(galleryImages[0].id, 'b');
  assert.deepEqual(productDisplayImages(result), [
    { imageUrl: '/cover.webp', alt: 'Cover' },
    { imageUrl: '/back.webp', alt: 'Back' },
  ]);
});

test('supports products with only gallery images or no images', () => {
  assert.deepEqual(productDisplayImages(normalizeProduct({ ...product, imageUrl: null })), []);
  const result = normalizeProduct({ ...product, imageUrl: null, alt: null,
    galleryImages: [{ id: 'a', position: 0, imageUrl: '/front.webp', alt: null }],
  });
  assert.deepEqual(productDisplayImages(result), [{ imageUrl: '/front.webp', alt: 'Ronin' }]);
});

test('rejects invalid prices', () => {
  assert.throws(() => normalizeProduct({ ...product, price: 'invalid' }));
});
