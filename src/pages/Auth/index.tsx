import { Link, Navigate } from "react-router-dom";
import { getAuthSession } from "../../services/auth";
import { AuthMode, useAuthForm } from "./handler";
import * as S from "../../style/pages/Auth.styles";

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

  return (<S.StyleScope>{(
    <S.Page>
      <S.VisualPanel>
        <S.Brand to="/">
          SAVE POINT<span>3D</span>
        </S.Brand>
        <S.VisualContent>
          <S.Eyebrow>Bem-vindo à Save Point3D</S.Eyebrow>
          <h1>
            Seu universo.
            <br />
            Sempre por perto.
          </h1>
          <p>
            Acompanhe sua experiência, seus pedidos e as novidades da sua
            coleção em um só lugar.
          </p>
        </S.VisualContent>
        <S.VisualNumber>SP—03D</S.VisualNumber>
      </S.VisualPanel>

      <S.FormPanel>
        <S.FormWrap>
          <S.FormHeader>
            <span>{isRegister ? "Primeiro acesso" : "Área do cliente"}</span>
            <h2>{isRegister ? "Criar sua conta" : "Entrar na sua conta"}</h2>
            <p>
              {isRegister
                ? "Cadastre-se para acompanhar seus pedidos e sua experiência com a Save Point3D."
                : "Acesse seus pedidos, preferências e recursos disponíveis para o seu perfil."}
            </p>
          </S.FormHeader>

          <S.Form onSubmit={handleSubmit}>
            <label>
              Usuário
              <S.UsernameInput
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
                $invalid={userHasSpace}
                placeholder="Seu login"
              />
              {isRegister && (
                <S.FieldHelp id="username-help">
                  Use de 3 a 30 caracteres, sem espaços. São aceitos letras,
                  números, _ e -.
                </S.FieldHelp>
              )}
              {userHasSpace && (
                <S.FieldError id="username-error" role="alert">
                  Espaços não são aceitos no nome de usuário.
                </S.FieldError>
              )}
            </label>
            <label>
              Senha
              <S.PasswordField>
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
              </S.PasswordField>
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
              <S.Error role="alert">
                {error}
              </S.Error>
            )}
            <S.Submit type="submit" disabled={loading || userHasSpace}>
              {loading
                ? "Aguarde…"
                : isRegister
                  ? "Criar conta e entrar"
                  : "Entrar"}
            </S.Submit>
          </S.Form>

          <S.SwitchMode>
            {isRegister
              ? "Já possui uma conta?"
              : "Ainda não possui uma conta?"}{" "}
            <Link to={isRegister ? "/login" : "/cadastro"}>
              {isRegister ? "Fazer login" : "Criar conta"}
            </Link>
          </S.SwitchMode>
          <S.BackLink to="/">
            ← Voltar para a loja
          </S.BackLink>
        </S.FormWrap>
      </S.FormPanel>
    </S.Page>
  )}</S.StyleScope>);
}
