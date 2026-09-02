import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { ViteImageOptimizer } from "vite-plugin-image-optimizer";

export async function findRoute(
  firstPort: number,
  maxAttempts: number,
): Promise<string> {
  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    const port = Number(firstPort + attempt);
    const url = `http://localhost:${port}`;

    try {
      const response = await fetch(`${url}/api`, {
        signal: AbortSignal.timeout(1000),
      });

      if (!response.ok) {
        continue;
      }

      const body = (await response.json()) as { service: string };

      if (body.service === "savepoint3d-backend") {
        console.log(`Backend localizado: ${url}`);
        return url;
      }
    } catch (e) {
      console.log(e);
    }
  }
  throw new Error(`Backend não encontrado na porta ${firstPort}`);
}

export default defineConfig(async ({ command }) => {
  const config = {
    plugins: [
      react(),
      ViteImageOptimizer({
        test: /\.(png|jpe?g|webp)$/i,
        includePublic: true,
        logStats: true,
        png: {
          quality: 85,
          compressionLevel: 9,
          adaptiveFiltering: true,
          palette: true,
        },
        jpeg: {
          quality: 82,
          progressive: true,
          mozjpeg: true,
        },
        jpg: {
          quality: 82,
          progressive: true,
          mozjpeg: true,
        },
        webp: {
          quality: 82,
          effort: 5,
        },
      }),
    ],
  };

  if (command === "build") return config;
  const backendUrl = await findRoute(3000, 10);

  return {
    ...config,
    server: {
      proxy: {
        "/api": {
          target: backendUrl,
          changeOrigin: true,
        },
        "/uploads": {
          target: backendUrl,
          changeOrigin: true,
        },
      },
    },
  };
});
