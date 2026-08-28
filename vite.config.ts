import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export async function findRoute(
  firstPort: number,
  maxAttempts: number,
): Promise<string> {
  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    const port = Number(firstPort + attempt);
    const url = `http://localhost:${port}`;

    try {
      const response = await fetch(`${url}/api`, {
        signal: AbortSignal.timeout(500),
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

export default defineConfig(async () => {
  const backendUrl = await findRoute(3000, 10);

  return {
    plugins: [react()],
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
