import { ReactNode, useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthSession } from "../../types/auth";
import { validateAuthSession } from "../../services/auth";

interface RequireAuthProps {
  children: ReactNode;
  roles?: string[];
}

export default function RequireAuth({ children, roles }: RequireAuthProps) {
  const location = useLocation();
  const [session, setSession] = useState<AuthSession | null>(null);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    let active = true;
    validateAuthSession().then((verifiedSession) => {
      if (!active) return;
      setSession(verifiedSession);
      setChecking(false);
    });
    return () => { active = false; };
  }, []);

  if (checking) {
    return <main aria-busy="true" aria-label="Validando sessão" style={{ minHeight: "100vh", display: "grid", placeItems: "center", background: "#111", color: "#b6ff1a" }}>VALIDANDO ACESSO…</main>;
  }

  if (!session) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  const normalizedRole = session.role.toLowerCase();
  const isAllowed = !roles || roles.some((role) => role.toLowerCase() === normalizedRole);
  if (!isAllowed) return <Navigate to="/minha-conta" replace />;

  return children;
}
