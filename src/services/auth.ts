import { AuthSession, JwtPayload } from "../types/auth";

const AUTH_STORAGE_KEY = "savepoint3d:auth-session";

async function readError(response: Response): Promise<string> {
  try {
    const data = (await response.json()) as { message?: string | string[] };
    return Array.isArray(data.message) ? data.message.join(" ") : data.message ?? "Não foi possível concluir a operação.";
  } catch {
    return "Não foi possível concluir a operação.";
  }
}

function decodeToken(token: string): JwtPayload | null {
  try {
    const encodedPayload = token.split(".")[1];
    if (!encodedPayload) return null;
    const normalized = encodedPayload.replace(/-/g, "+").replace(/_/g, "/");
    const padded = normalized.padEnd(Math.ceil(normalized.length / 4) * 4, "=");
    return JSON.parse(window.atob(padded)) as JwtPayload;
  } catch {
    logout();
    return null;
  }
}

export async function registerAccount(user: string, password: string): Promise<void> {
  const response = await fetch("/api/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ user, password }),
  });

  if (!response.ok) throw new Error(await readError(response));
}

export async function loginAccount(user: string, password: string): Promise<AuthSession> {
  const response = await fetch("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ user, password }),
  });

  if (!response.ok) throw new Error(await readError(response));

  const data = (await response.json()) as { accessToken: string };
  const payload = decodeToken(data.accessToken);
  const session: AuthSession = {
    accessToken: data.accessToken,
    user: payload?.user ?? user,
    role: payload?.role ?? "User",
  };
  window.localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(session));
  return session;
}

export function getAuthSession(): AuthSession | null {
  try {
    const stored = window.localStorage.getItem(AUTH_STORAGE_KEY);
    if (!stored) return null;
    const session = JSON.parse(stored) as AuthSession;
    const payload = decodeToken(session.accessToken);
    if (!payload || (payload.exp && payload.exp * 1000 <= Date.now())) {
      logout();
      return null;
    }
    return session;
  } catch {
    logout();
    return null;
  }
}

export async function validateAuthSession(): Promise<AuthSession | null> {
  const session = getAuthSession();
  if (!session) return null;

  try {
    const response = await fetch("/api/auth/me", {
      headers: { Authorization: `Bearer ${session.accessToken}` },
    });

    if (!response.ok) {
      logout();
      return null;
    }

    const payload = (await response.json()) as JwtPayload;
    const verifiedSession = {
      accessToken: session.accessToken,
      user: payload.user,
      role: payload.role,
    };
    window.localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(verifiedSession));
    return verifiedSession;
  } catch {
    logout();
    return null;
  }
}

export function logout(): void {
  window.localStorage.removeItem(AUTH_STORAGE_KEY);
}
