import { FormEvent, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { loginAccount, registerAccount } from "../../services/auth";

export type AuthMode = "login" | "register";

interface RedirectState {
  from?: { pathname?: string };
}

export function useAuthForm(mode: AuthMode) {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (/\s/.test(user)) {
      setError("O nome de usuário não aceita espaços.");
      return;
    }
    if (!/^[a-zA-Z0-9_-]{3,30}$/.test(user)) {
      setError("Use de 3 a 30 caracteres: letras, números, _ ou -.");
      return;
    }
    if (password.length < 8) {
      setError("A senha precisa ter pelo menos 8 caracteres.");
      return;
    }
    if (mode === "register" && password !== confirmPassword) {
      setError("As senhas não coincidem.");
      return;
    }

    setLoading(true);
    try {
      if (mode === "register") await registerAccount(user, password);
      const session = await loginAccount(user, password);
      const state = location.state as RedirectState | null;
      const isAdmin = session.role.toLowerCase() === "admin";
      const requestedPath = state?.from?.pathname;
      const destination = requestedPath === "/dashboard" && !isAdmin
        ? "/minha-conta"
        : requestedPath ?? (isAdmin ? "/dashboard" : "/minha-conta");
      navigate(destination, { replace: true });
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "Não foi possível autenticar.");
    } finally {
      setLoading(false);
    }
  }

  return {
    user,
    password,
    confirmPassword,
    showPassword,
    loading,
    error,
    setUser,
    setPassword,
    setConfirmPassword,
    setShowPassword,
    handleSubmit,
  };
}
