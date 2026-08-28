import styled from "styled-components";
import { Link } from "react-router-dom";

export const StyleScope = styled.div`
  display: contents;

.auth__page { min-height: 100vh; display: grid; grid-template-columns: minmax(380px, 1.05fr) minmax(420px, .95fr); background: #f2f2f0; color: #111; }
.auth__visualPanel { min-height: 100vh; position: relative; overflow: hidden; padding: 38px 48px; background: #111; color: #fff; display: flex; flex-direction: column; }
.auth__visualPanel::before { content: ""; position: absolute; width: 620px; height: 620px; right: -180px; top: 50%; transform: translateY(-50%); border: 1px solid #333; border-radius: 50%; box-shadow: 0 0 0 90px #171715, 0 0 0 91px #2a2a27, 0 0 0 180px #141412; }
.auth__visualPanel::after { content: ""; position: absolute; width: 270px; height: 270px; right: 20px; top: 50%; transform: translateY(-50%); border-radius: 50%; background: #b6ff1a; filter: blur(1px); box-shadow: 0 0 90px rgba(182,255,26,.25); }
.auth__brand { position: relative; z-index: 1; color: #fff; font-size: 21px; font-weight: 900; letter-spacing: -.05em; }
.auth__brand span { color: #b6ff1a; }
.auth__visualContent { position: relative; z-index: 1; margin: auto 0; max-width: 570px; }
.auth__eyebrow { color: #b6ff1a; font-size: 11px; font-weight: 800; letter-spacing: .13em; text-transform: uppercase; }
.auth__visualContent h1 { margin: 20px 0 24px; font-size: clamp(54px, 6vw, 94px); line-height: .86; letter-spacing: -.06em; text-transform: uppercase; }
.auth__visualContent p { max-width: 430px; color: #a3a39d; font-size: 15px; line-height: 1.65; }
.auth__visualNumber { position: relative; z-index: 1; color: #555550; font-size: 11px; font-weight: 800; letter-spacing: .16em; }
.auth__formPanel { min-height: 100vh; display: grid; place-items: center; padding: 48px; }
.auth__formWrap { width: min(100%, 440px); }
.auth__formHeader > span { color: #777771; font-size: 10px; font-weight: 800; letter-spacing: .12em; text-transform: uppercase; }
.auth__formHeader h2 { margin: 10px 0 12px; font-size: clamp(34px, 4vw, 52px); line-height: .95; letter-spacing: -.04em; text-transform: uppercase; }
.auth__formHeader p { color: #70706a; font-size: 14px; line-height: 1.55; }
.auth__form { display: grid; gap: 20px; margin-top: 34px; }
.auth__form label { display: grid; gap: 8px; font-size: 10px; font-weight: 800; letter-spacing: .08em; text-transform: uppercase; }
.auth__form input { width: 100%; height: 51px; border: 1px solid #cccac4; background: #fff; padding: 0 14px; color: #111; font: inherit; font-size: 14px; outline: none; }
.auth__form input:focus { border-color: #111; box-shadow: 0 0 0 3px rgba(182,255,26,.42); }
.auth__form .auth__invalidInput { border-color: #b83227; box-shadow: 0 0 0 2px rgba(184,50,39,.12); }
.auth__fieldHelp, .auth__fieldError { font-size: 10px; font-weight: 500; letter-spacing: 0; line-height: 1.4; text-transform: none; }
.auth__fieldHelp { color: #74746e; }
.auth__fieldError { color: #a1281e; }
.auth__passwordField { position: relative; }
.auth__passwordField input { padding-right: 78px; }
.auth__passwordField button { position: absolute; right: 12px; top: 50%; transform: translateY(-50%); border: 0; background: none; color: #686862; font-size: 10px; font-weight: 800; cursor: pointer; }
.auth__error { margin: 0; border-left: 3px solid #d33; background: #fbe5e2; color: #8c2118; padding: 11px 13px; font-size: 12px; line-height: 1.4; }
.auth__submit { height: 54px; border: 0; background: #111; color: #fff; font-size: 11px; font-weight: 900; letter-spacing: .06em; text-transform: uppercase; cursor: pointer; transition: background .2s, color .2s; }
.auth__submit:hover:not(:disabled) { background: #b6ff1a; color: #111; }
.auth__submit:disabled { opacity: .55; cursor: wait; }
.auth__switchMode { margin: 25px 0 0; color: #74746e; font-size: 12px; text-align: center; }
.auth__switchMode a { color: #111; font-weight: 800; text-decoration: underline; text-underline-offset: 3px; }
.auth__backLink { display: block; margin-top: 55px; color: #777771; font-size: 11px; text-align: center; }
@media (max-width: 820px) { .auth__page { grid-template-columns: 1fr; } .auth__visualPanel { min-height: 310px; padding: 28px; } .auth__visualContent { margin: auto 0 25px; } .auth__visualContent h1 { font-size: 47px; margin-block: 13px; } .auth__visualContent p { display: none; } .auth__visualPanel::before { width: 350px; height: 350px; right: -130px; } .auth__visualPanel::after { width: 145px; height: 145px; right: -5px; } .auth__formPanel { min-height: auto; padding: 50px 24px; } }

`;

export const BackLink = styled(Link).attrs({ className: "auth__backLink" })``;
export const Brand = styled(Link).attrs({ className: "auth__brand" })``;
export const Error = styled.p.attrs({ className: "auth__error" })``;
export const Eyebrow = styled.span.attrs({ className: "auth__eyebrow" })``;
export const FieldError = styled.small.attrs({ className: "auth__fieldError" })``;
export const FieldHelp = styled.small.attrs({ className: "auth__fieldHelp" })``;
export const Form = styled.form.attrs({ className: "auth__form" })``;
export const FormHeader = styled.div.attrs({ className: "auth__formHeader" })``;
export const FormPanel = styled.section.attrs({ className: "auth__formPanel" })``;
export const FormWrap = styled.div.attrs({ className: "auth__formWrap" })``;
export const Page = styled.main.attrs({ className: "auth__page" })``;
export const PasswordField = styled.div.attrs({ className: "auth__passwordField" })``;
export const Submit = styled.button.attrs({ className: "auth__submit" })``;
export const SwitchMode = styled.p.attrs({ className: "auth__switchMode" })``;
export const VisualContent = styled.div.attrs({ className: "auth__visualContent" })``;
export const VisualNumber = styled.div.attrs({ className: "auth__visualNumber" })``;
export const VisualPanel = styled.section.attrs({ className: "auth__visualPanel" })``;

export const UsernameInput = styled.input.attrs<{ $invalid: boolean }>(({ $invalid }) => ({
  className: $invalid ? "auth__invalidInput" : undefined,
}))``;

