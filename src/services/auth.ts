import { AuthSession, JwtPayload } from "../types/auth";

const AUTH_STORAGE_KEY = "savepoint3d:auth-session";
let refreshPromise: Promise<AuthSession | null> | null = null;

async function readError(response: Response): Promise<string> {
  try {
    const data = (await response.json()) as { message?: string | string[] };
    return Array.isArray(data.message)
      ? data.message.join(" ")
      : (data.message ?? "Não foi possível concluir a operação.");
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
    return null;
  }
}

function sessionFromAccessToken(accessToken: string): AuthSession | null {
  const payload = decodeToken(accessToken);
  if (!payload) return null;

  return {
    accessToken,
    user: payload.user,
    role: payload.role,
  };
}

function saveAuthSession(session: AuthSession): AuthSession {
  window.localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(session));
  return session;
}

function clearAuthSession(): void {
  window.localStorage.removeItem(AUTH_STORAGE_KEY);
}

async function performTokenRefresh(): Promise<AuthSession | null> {
  try {
    const response = await fetch("/api/auth/refresh", {
      method: "POST",
      credentials: "include",
    });

    if (!response.ok) {
      clearAuthSession();
      return null;
    }

    const data = (await response.json()) as { accessToken: string };
    const session = sessionFromAccessToken(data.accessToken);
    if (!session) {
      clearAuthSession();
      return null;
    }

    return saveAuthSession(session);
  } catch {
    clearAuthSession();
    return null;
  }
}

export function refreshAuthSession(): Promise<AuthSession | null> {
  if (!refreshPromise) {
    refreshPromise = performTokenRefresh().finally(() => {
      refreshPromise = null;
    });
  }

  return refreshPromise;
}

export async function authenticatedFetch(
  path: string,
  init: RequestInit = {},
): Promise<Response> {
  let session = getAuthSession();
  if (!session) session = await refreshAuthSession();
  if (!session) throw new Error("Faça login para continuar.");

  const send = (accessToken: string) => {
    const headers = new Headers(init.headers);
    headers.set("Authorization", `Bearer ${accessToken}`);

    return fetch(path, {
      ...init,
      headers,
      credentials: "include",
    });
  };

  const response = await send(session.accessToken);
  if (response.status !== 401) return response;

  const renewedSession = await refreshAuthSession();
  if (!renewedSession) return response;

  return send(renewedSession.accessToken);
}

export async function registerAccount(
  user: string,
  password: string,
): Promise<void> {
  const response = await fetch("/api/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ user, password }),
  });

  if (!response.ok) throw new Error(await readError(response));
}

export async function loginAccount(
  user: string,
  password: string,
): Promise<AuthSession> {
  const response = await fetch("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ user, password }),
  });

  if (!response.ok) throw new Error(await readError(response));

  const data = (await response.json()) as { accessToken: string };
  const session = sessionFromAccessToken(data.accessToken) ?? {
    accessToken: data.accessToken,
    user,
    role: "USER",
  };

  return saveAuthSession(session);
}

export function getAuthSession(): AuthSession | null {
  try {
    const stored = window.localStorage.getItem(AUTH_STORAGE_KEY);
    if (!stored) return null;

    const session = JSON.parse(stored) as AuthSession;
    const payload = decodeToken(session.accessToken);
    if (!payload || (payload.exp && payload.exp * 1000 <= Date.now())) {
      clearAuthSession();
      return null;
    }

    return session;
  } catch {
    clearAuthSession();
    return null;
  }
}

export async function validateAuthSession(): Promise<AuthSession | null> {
  try {
    const response = await authenticatedFetch("/api/auth/me");
    if (!response.ok) {
      clearAuthSession();
      return null;
    }

    const payload = (await response.json()) as JwtPayload;
    const currentSession = getAuthSession();
    if (!currentSession) return null;

    return saveAuthSession({
      accessToken: currentSession.accessToken,
      user: payload.user,
      role: payload.role,
    });
  } catch {
    clearAuthSession();
    return null;
  }
}

export function logout(): void {
  clearAuthSession();
  void fetch("/api/auth/logout", {
    method: "POST",
    credentials: "include",
  }).catch(() => undefined);
}
