import { Link, Navigate } from "react-router-dom";
import { getAuthSession } from "../../services/auth";
import { AuthMode, useAuthForm } from "./handler";
import styles from "../../style/pages/Auth.module.css";

interface AuthProps {
  mode: AuthMode;
}

export default function Auth({ mode }: AuthProps) {
  const activeSession = getAuthSession();
  const isRegister = mode === "register";
  const {
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
  } = useAuthForm(mode);
  const userHasSpace = isRegister && /\s/.test(user);

  if (activeSession) {
    const destination =
      activeSession.role.toLowerCase() === "admin"
        ? "/dashboard"
        : "/minha-conta";
    return <Navigate to={destination} replace />;
  }

  return (
    <main className={styles.page}>
      <section className={styles.visualPanel}>
        <Link to="/" className={styles.brand}>
          SAVE POINT<span>3D</span>
        </Link>
        <div className={styles.visualContent}>
          <span className={styles.eyebrow}>Bem-vindo à Save Point3D</span>
          <h1>
            Seu universo.
            <br />
            Sempre por perto.
          </h1>
          <p>
            Acompanhe sua experiência, seus pedidos e as novidades da sua
            coleção em um só lugar.
          </p>
        </div>
        <div className={styles.visualNumber}>SP—03D</div>
      </section>

      <section className={styles.formPanel}>
        <div className={styles.formWrap}>
          <div className={styles.formHeader}>
            <span>{isRegister ? "Primeiro acesso" : "Área do cliente"}</span>
            <h2>{isRegister ? "Criar sua conta" : "Entrar na sua conta"}</h2>
            <p>
              {isRegister
                ? "Cadastre-se para acompanhar seus pedidos e sua experiência com a Save Point3D."
                : "Acesse seus pedidos, preferências e recursos disponíveis para o seu perfil."}
            </p>
          </div>

          <form className={styles.form} onSubmit={handleSubmit}>
            <label>
              Usuário
              <input
                autoFocus
                required
                minLength={3}
                maxLength={30}
                pattern="(?:[A-Za-z0-9_]|-){3,30}"
                autoComplete="username"
                value={user}
                onChange={(event) => setUser(event.target.value)}
                aria-invalid={userHasSpace}
                aria-describedby={
                  isRegister
                    ? userHasSpace
                      ? "username-help username-error"
                      : "username-help"
                    : undefined
                }
                className={userHasSpace ? styles.invalidInput : undefined}
                placeholder="Seu login"
              />
              {isRegister && (
                <small id="username-help" className={styles.fieldHelp}>
                  Use de 3 a 30 caracteres, sem espaços. São aceitos letras,
                  números, _ e -.
                </small>
              )}
              {userHasSpace && (
                <small id="username-error" className={styles.fieldError} role="alert">
                  Espaços não são aceitos no nome de usuário.
                </small>
              )}
            </label>
            <label>
              Senha
              <div className={styles.passwordField}>
                <input
                  required
                  minLength={8}
                  type={showPassword ? "text" : "password"}
                  autoComplete={
                    isRegister ? "new-password" : "current-password"
                  }
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="Mínimo de 8 caracteres"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "Ocultar" : "Mostrar"}
                </button>
              </div>
            </label>
            {isRegister && (
              <label>
                Confirmar senha
                <input
                  required
                  minLength={8}
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  value={confirmPassword}
                  onChange={(event) => setConfirmPassword(event.target.value)}
                  placeholder="Digite a senha novamente"
                />
              </label>
            )}
            {error && (
              <p className={styles.error} role="alert">
                {error}
              </p>
            )}
            <button type="submit" className={styles.submit} disabled={loading || userHasSpace}>
              {loading
                ? "Aguarde…"
                : isRegister
                  ? "Criar conta e entrar"
                  : "Entrar"}
            </button>
          </form>

          <p className={styles.switchMode}>
            {isRegister
              ? "Já possui uma conta?"
              : "Ainda não possui uma conta?"}{" "}
            <Link to={isRegister ? "/login" : "/cadastro"}>
              {isRegister ? "Fazer login" : "Criar conta"}
            </Link>
          </p>
          <Link to="/" className={styles.backLink}>
            ← Voltar para a loja
          </Link>
        </div>
      </section>
    </main>
  );
}
