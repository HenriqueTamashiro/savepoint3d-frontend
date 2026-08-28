import styled from "styled-components";

export const StyleScope = styled.div`
  display: contents;

.dashboard__dashboard { min-height: 100vh; display: grid; grid-template-columns: 240px minmax(330px, 410px) minmax(430px, 1fr); background: #ecece8; color: #111; transition: grid-template-columns .25s ease; }
.dashboard__dashboard.dashboard__menuCollapsed { grid-template-columns: 64px minmax(330px, 410px) minmax(430px, 1fr); }
.dashboard__sidebar { background: #111; color: #f5f5f1; padding: 22px 18px; display: flex; flex-direction: column; min-height: 100vh; overflow: hidden; }
.dashboard__menuActions { display: flex; align-items: center; justify-content: space-between; gap: 8px; }
.dashboard__menuActions button { height: 36px; border: 1px solid #343430; background: #1b1b19; color: #fff; cursor: pointer; }
.dashboard__menuActions button:hover { border-color: #b6ff1a; color: #b6ff1a; }
.dashboard__backButton { display: flex; align-items: center; gap: 9px; padding: 0 12px; font-size: 10px; text-transform: uppercase; }
.dashboard__backButton b { font-size: inherit; }
.dashboard__collapseButton { width: 36px; flex: none; font-size: 20px; }
.dashboard__menuCollapsed .dashboard__sidebar { padding-inline: 13px; }
.dashboard__menuCollapsed .dashboard__sidebarIntro, .dashboard__menuCollapsed .dashboard__sectionNav, .dashboard__menuCollapsed .dashboard__backButton { display: none; }
.dashboard__menuCollapsed .dashboard__menuActions { justify-content: center; }
.dashboard__adminNav { display: grid; gap: 5px; margin-bottom: 22px; }
.dashboard__adminNav button { width: 100%; min-width: 0; display: grid; grid-template-columns: 21px 1fr; gap: 11px; align-items: center; padding: 12px; border: 1px solid transparent; background: transparent; color: #8d8d87; text-align: left; cursor: pointer; }
.dashboard__adminNav svg { width: 19px; height: 19px; }
.dashboard__adminNav button > div { min-width: 0; display: grid; gap: 2px; }
.dashboard__adminNav b { overflow: hidden; color: inherit; font-size: 12px; text-overflow: ellipsis; white-space: nowrap; }
.dashboard__adminNav small { overflow: hidden; color: #5f5f5a; font-size: 9px; text-overflow: ellipsis; white-space: nowrap; }
.dashboard__adminNav button:hover, .dashboard__adminNav .dashboard__activeArea { border-color: #343430; background: #1b1b19; color: #fff; }
.dashboard__adminNav .dashboard__activeArea svg { color: #b6ff1a; }
.dashboard__menuCollapsed .dashboard__adminNav button { grid-template-columns: 1fr; justify-items: center; padding-inline: 8px; }
.dashboard__menuCollapsed .dashboard__adminNav button > div { display: none; }
.dashboard__brand { color: #fff; font-size: 19px; font-weight: 900; letter-spacing: -.04em; }
.dashboard__brand span { color: #b6ff1a; }
.dashboard__sidebarIntro { margin: 8px 8px 30px; }
.dashboard__hubButton { display: block; padding: 0; border: 0; background: transparent; color: inherit; text-align: left; cursor: pointer; }
.dashboard__hubButton:hover { color: #b6ff1a; }
.dashboard__hubButton h2 { margin-bottom: 0; }
.dashboard__sidebarIntro > span, .dashboard__panelHeader span, .dashboard__previewHeader span { color: #85857f; font-size: 10px; font-weight: 800; letter-spacing: .12em; text-transform: uppercase; }
.dashboard__sidebarIntro h1, .dashboard__sidebarIntro h2 { font-size: 24px; line-height: 1; margin: 9px 0 12px; text-transform: uppercase; }
.dashboard__sidebarIntro p { color: #999994; font-size: 13px; line-height: 1.55; }
.dashboard__sectionNav { display: grid; gap: 5px; }
.dashboard__sectionNav button { width: 100%; display: flex; gap: 13px; text-align: left; color: #aaa; background: transparent; border: 1px solid transparent; padding: 13px 12px; cursor: pointer; }
.dashboard__sectionNav button > span { color: #64645f; font-size: 10px; padding-top: 3px; }
.dashboard__sectionNav button div { display: grid; gap: 3px; }
.dashboard__sectionNav b { color: inherit; font-size: 13px; }
.dashboard__sectionNav small { color: #666661; font-size: 10px; line-height: 1.3; }
.dashboard__sectionNav button:hover, .dashboard__sectionNav .dashboard__activeSection { border-color: #343430; background: #1b1b19; color: #fff; }
.dashboard__sectionNav .dashboard__activeSection > span { color: #b6ff1a; }
.dashboard__sidebarFooter { margin: auto 8px 0; display: grid; gap: 13px; }
.dashboard__account { display: flex; align-items: center; gap: 10px; border-top: 1px solid #30302d; padding-top: 17px; }
.dashboard__account > span { width: 31px; height: 31px; display: grid; place-items: center; border-radius: 50%; background: #b6ff1a; color: #111; font-size: 12px; font-weight: 900; }
.dashboard__account div { display: grid; gap: 2px; min-width: 0; }
.dashboard__account b { overflow: hidden; color: #fff; font-size: 11px; text-overflow: ellipsis; }
.dashboard__account small { color: #686863; font-size: 9px; text-transform: uppercase; }
.dashboard__storeLink { color: #aaa; font-size: 11px; }
.dashboard__logoutButton { padding: 0; border: 0; background: transparent; color: #777; font-size: 10px; text-align: left; text-transform: uppercase; cursor: pointer; }
.dashboard__logoutButton:hover { color: #b6ff1a; }
.dashboard__editorPanel { background: #f6f6f3; border-right: 1px solid #d5d5d0; min-height: 100vh; }
.dashboard__panelHeader, .dashboard__previewHeader { height: 90px; border-bottom: 1px solid #d5d5d0; padding: 20px 28px; display: flex; align-items: center; justify-content: space-between; }
.dashboard__panelHeader h2 { margin: 4px 0 0; font-size: 20px; }
.dashboard__status { display: flex; align-items: center; gap: 7px; color: #6c6c67 !important; letter-spacing: .04em !important; }
.dashboard__status i { width: 7px; height: 7px; border-radius: 50%; background: #b6ff1a; box-shadow: 0 0 0 3px #dfffa0; }
.dashboard__form { padding: 30px 28px; display: grid; gap: 23px; }
.dashboard__form label { display: grid; gap: 8px; font-size: 11px; font-weight: 800; letter-spacing: .05em; text-transform: uppercase; }
.dashboard__form input:not([type="checkbox"]), .dashboard__form textarea { width: 100%; border: 1px solid #cecec8; background: #fff; padding: 13px 14px; font: inherit; font-size: 14px; line-height: 1.5; resize: vertical; outline: none; }
.dashboard__form input:focus, .dashboard__form textarea:focus { border-color: #111; box-shadow: 0 0 0 2px rgba(182,255,26,.35); }
.dashboard__form label > small { color: #999992; font-size: 9px; text-align: right; font-weight: 500; }
.dashboard__imageField { display: grid; gap: 9px; }
.dashboard__imageField > small { color: #85857f; font-size: 9px; }
.dashboard__uploadButton { width: max-content; padding: 11px 14px; border: 1px solid #111; background: #fff; color: #111; cursor: pointer; }
.dashboard__uploadButton:hover { background: #111; color: #fff; }
.dashboard__uploadButton input { position: absolute; width: 1px !important; height: 1px; overflow: hidden; opacity: 0; pointer-events: none; }
.dashboard__visibilityField { display: flex !important; align-items: center; justify-content: space-between; border-top: 1px solid #deded9; border-bottom: 1px solid #deded9; padding: 18px 0; }
.dashboard__visibilityField span { display: grid; gap: 5px; }
.dashboard__visibilityField small { color: #85857f; font-size: 10px; font-weight: 400; letter-spacing: 0; text-transform: none; }
.dashboard__visibilityField input { appearance: none; width: 42px; height: 23px; border-radius: 20px; background: #c4c4bf; padding: 3px; cursor: pointer; }
.dashboard__visibilityField input::before { content: ""; display: block; width: 17px; height: 17px; border-radius: 50%; background: #fff; transition: transform .2s; }
.dashboard__visibilityField input:checked { background: #111; }
.dashboard__visibilityField input:checked::before { transform: translateX(19px); background: #b6ff1a; }
.dashboard__formActions { display: flex; justify-content: flex-end; gap: 9px; }
.dashboard__formActions button { border: 0; padding: 13px 17px; font-size: 11px; font-weight: 800; text-transform: uppercase; cursor: pointer; }
.dashboard__resetButton { background: transparent; color: #666; }
.dashboard__saveButton { background: #111; color: #fff; }
.dashboard__saveButton:hover { background: #b6ff1a; color: #111; }
.dashboard__message { margin: -10px 0 0; padding: 11px; background: #e7fbc0; font-size: 11px; }
.dashboard__loading { padding: 30px; color: #777; }
.dashboard__previewPanel { min-width: 0; min-height: 100vh; display: grid; grid-template-rows: 90px 1fr 54px; }
.dashboard__previewHeader strong { display: block; margin-top: 4px; font-size: 14px; }
.dashboard__viewportControls { background: #deded9; padding: 3px; display: flex; }
.dashboard__viewportControls button { border: 0; background: transparent; color: #777; padding: 7px 10px; font-size: 10px; font-weight: 700; cursor: pointer; }
.dashboard__viewportControls .dashboard__activeViewport { background: #fff; color: #111; box-shadow: 0 1px 4px #bbb; }
.dashboard__previewStage { min-height: 0; padding: 34px; display: flex; align-items: center; justify-content: center; background-image: radial-gradient(#c7c7c1 1px, transparent 1px); background-size: 18px 18px; overflow: auto; }
.dashboard__previewFrame { width: min(100%, 960px); aspect-ratio: 16 / 10; background: #f2f2f0; box-shadow: 0 18px 60px rgba(0,0,0,.16); overflow: hidden; transition: width .25s, aspect-ratio .25s; }
.dashboard__previewFrame.dashboard__mobileFrame { width: min(360px, 100%); aspect-ratio: 9 / 16; }
.dashboard__componentPreview { height: 100%; position: relative; overflow: hidden; }
.dashboard__componentPreview img { width: 100%; height: 100%; object-fit: cover; }
.dashboard__previewShade { position: absolute; inset: 0; background: linear-gradient(90deg, rgba(0,0,0,.9), rgba(0,0,0,.15)); }
.dashboard__heroCopy, .dashboard__overlayCopy { position: absolute; inset: 0; padding: clamp(28px, 6vw, 72px); color: #fff; display: flex; flex-direction: column; justify-content: center; align-items: flex-start; }
.dashboard__heroCopy span, .dashboard__overlayCopy > span, .dashboard__splitCopy > span { color: #b6ff1a; font-size: 9px; font-weight: 800; }
.dashboard__heroCopy h1, .dashboard__overlayCopy h2, .dashboard__splitCopy h2 { max-width: 620px; font-size: clamp(30px, 5vw, 68px); line-height: .92; text-transform: uppercase; margin: 12px 0 18px; letter-spacing: -.04em; white-space: pre-wrap; }
.dashboard__heroCopy p, .dashboard__overlayCopy p, .dashboard__splitCopy p { max-width: 430px; color: #d0d0ca; font-size: clamp(10px, 1.5vw, 15px); line-height: 1.55; white-space: pre-wrap; }
.dashboard__componentPreview button { margin-top: 16px; border: 0; background: #b6ff1a; color: #111; padding: 11px 15px; font-size: 9px; font-weight: 900; text-transform: uppercase; }
.dashboard__dioramaPreview .dashboard__previewShade { background: linear-gradient(90deg, rgba(0,0,0,.88), rgba(0,0,0,.1)); }
.dashboard__splitPreview { display: grid; grid-template-columns: 1fr 1fr; }
.dashboard__splitImage { min-width: 0; overflow: hidden; background: #181818; }
.dashboard__splitImage img { object-fit: contain; }
.dashboard__splitCopy { padding: clamp(22px, 4vw, 52px); display: flex; flex-direction: column; justify-content: center; background: #f2f2f0; }
.dashboard__splitCopy h2 { font-size: clamp(24px, 4vw, 50px); }
.dashboard__splitCopy p { color: #676762; }
.dashboard__miniSteps { margin-top: 18px; border-top: 1px solid #d2d2cd; }
.dashboard__miniSteps div { display: flex; gap: 14px; border-bottom: 1px solid #d2d2cd; padding: 8px 0; font-size: 9px; }
.dashboard__miniSteps b { color: #777; }
.dashboard__hiddenPreview { height: 100%; display: grid; place-content: center; text-align: center; color: #888; }
.dashboard__hiddenPreview span { color: #111; font-size: 20px; font-weight: 900; text-transform: uppercase; }
.dashboard__hiddenPreview p { font-size: 12px; }
.dashboard__previewFooter { border-top: 1px solid #d5d5d0; display: flex; align-items: center; justify-content: space-between; padding: 0 28px; color: #777; font-size: 10px; }
.dashboard__previewFooter a { color: #111; font-weight: 800; }
.dashboard__mobileFrame .dashboard__splitPreview { grid-template-columns: 1fr; grid-template-rows: 42% 58%; }
.dashboard__mobileFrame .dashboard__heroCopy, .dashboard__mobileFrame .dashboard__overlayCopy { padding: 28px 22px; justify-content: flex-end; }
.dashboard__mobileFrame .dashboard__heroCopy h1, .dashboard__mobileFrame .dashboard__overlayCopy h2 { font-size: 34px; }
.dashboard__mobileFrame .dashboard__previewShade { background: linear-gradient(0deg, rgba(0,0,0,.92), rgba(0,0,0,.05)); }
.dashboard__adminHub { grid-column: 2 / -1; min-height: 100vh; display: grid; place-items: center; padding: 48px; background: #111; color: #f5f5f1; }
.dashboard__adminHubContent { width: min(100%, 760px); }
.dashboard__adminHubContent header { margin-bottom: 36px; }
.dashboard__adminHubContent header > span { color: #b6ff1a; font-size: 9px; font-weight: 800; letter-spacing: .12em; text-transform: uppercase; }
.dashboard__adminHubContent h1 { margin: 9px 0 8px; font-size: clamp(34px, 5vw, 62px); line-height: .95; text-transform: uppercase; }
.dashboard__adminHubContent header p { margin: 0; color: #85857f; font-size: 13px; }
.dashboard__adminHubGrid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
.dashboard__adminHubGrid button { min-height: 92px; display: grid; grid-template-columns: 24px 1fr auto; gap: 15px; align-items: center; padding: 19px 20px; border: 1px solid #30302d; background: #171715; color: #8d8d87; text-align: left; cursor: pointer; transition: border-color .18s, color .18s, transform .18s; }
.dashboard__adminHubGrid button:hover, .dashboard__adminHubGrid button:focus-visible { border-color: #b6ff1a; color: #fff; transform: translateY(-2px); outline: none; }
.dashboard__adminHubGrid svg { width: 21px; height: 21px; }
.dashboard__adminHubGrid button:hover svg, .dashboard__adminHubGrid button:focus-visible svg { color: #b6ff1a; }
.dashboard__adminHubGrid button > div { min-width: 0; display: grid; gap: 5px; }
.dashboard__adminHubGrid b { color: #f5f5f1; font-size: 13px; }
.dashboard__adminHubGrid small { color: #686863; font-size: 10px; }
.dashboard__adminHubGrid button > span { color: #555550; font-size: 18px; }
.dashboard__returnToHub { display: block; margin: 0 0 15px; padding: 0; border: 0; background: transparent; color: #74746f; font-size: 9px; font-weight: 800; letter-spacing: .06em; text-transform: uppercase; cursor: pointer; }
.dashboard__returnToHub:hover { color: #111; }
.dashboard__panelHeader .dashboard__returnToHub { margin-bottom: 5px; }
.dashboard__managementPanel { grid-column: 2 / -1; min-width: 0; min-height: 100vh; background: #f2f2ef; }
.dashboard__managementHeader { min-height: 150px; padding: 32px 42px; border-bottom: 1px solid #d5d5d0; display: flex; align-items: end; }
.dashboard__managementHeader span, .dashboard__listHeader span, .dashboard__adminFormTitle span, .dashboard__adminOrder header span { color: #7d7d77; font-size: 9px; font-weight: 800; letter-spacing: .11em; text-transform: uppercase; }
.dashboard__managementHeader h1 { margin: 7px 0 4px; font-size: clamp(30px, 4vw, 52px); line-height: .95; text-transform: uppercase; }
.dashboard__managementHeader p { margin: 0; color: #72726d; font-size: 12px; }
.dashboard__managementBody { padding: 32px 42px 60px; }
.dashboard__adminSplit { display: grid; grid-template-columns: minmax(330px, 430px) minmax(420px, 1fr); gap: 28px; align-items: start; }
.dashboard__adminForm { padding: 24px; border: 1px solid #d1d1cb; background: #fafaf7; display: grid; gap: 16px; }
.dashboard__adminFormTitle { display: flex; justify-content: space-between; align-items: start; gap: 16px; padding-bottom: 16px; border-bottom: 1px solid #deded8; }
.dashboard__adminFormTitle h3 { margin: 5px 0 0; font-size: 20px; text-transform: uppercase; }
.dashboard__adminFormTitle button { border: 0; background: none; color: #777; font-size: 9px; text-transform: uppercase; cursor: pointer; }
.dashboard__adminForm label, .dashboard__userFields label, .dashboard__adminOrder label { display: grid; gap: 6px; color: #333; font-size: 9px; font-weight: 800; letter-spacing: .06em; text-transform: uppercase; }
.dashboard__adminForm input, .dashboard__adminForm select, .dashboard__userFields input, .dashboard__userFields select, .dashboard__adminOrder select { width: 100%; min-width: 0; padding: 11px 12px; border: 1px solid #cecec8; background: #fff; color: #111; font-size: 12px; outline: none; }
.dashboard__adminForm input:focus, .dashboard__adminForm select:focus, .dashboard__userFields input:focus, .dashboard__userFields select:focus, .dashboard__adminOrder select:focus { border-color: #111; box-shadow: 0 0 0 2px rgba(182,255,26,.35); }
.dashboard__fieldGrid { display: grid; grid-template-columns: 1fr 1fr; gap: 13px; }
.dashboard__fileButton { width: max-content; padding: 11px 14px; border: 1px solid #111; cursor: pointer; }
.dashboard__fileButton input { position: absolute; width: 1px; height: 1px; opacity: 0; pointer-events: none; }
.dashboard__inlineCheck { display: flex !important; align-items: center; gap: 8px !important; text-transform: none !important; }
.dashboard__inlineCheck input { width: 16px !important; height: 16px; accent-color: #9ddd16; }
.dashboard__primaryAction { padding: 13px 16px; border: 0; background: #111; color: #fff; font-size: 10px; font-weight: 900; text-transform: uppercase; cursor: pointer; }
.dashboard__primaryAction:hover { background: #b6ff1a; color: #111; }
.dashboard__primaryAction:disabled { opacity: .55; cursor: wait; }
.dashboard__adminMessage { margin: 0; padding: 10px; background: #e5f8bc; font-size: 10px; }
.dashboard__adminList, .dashboard__userList, .dashboard__adminOrders { display: grid; gap: 12px; }
.dashboard__listHeader { display: flex; align-items: center; justify-content: space-between; min-height: 38px; }
.dashboard__listHeader strong { font-size: 11px; }
.dashboard__productRow { display: grid; grid-template-columns: 70px 1fr auto; gap: 14px; align-items: center; padding: 12px; border: 1px solid #d1d1cb; background: #fafaf7; }
.dashboard__productRow > img { width: 70px; height: 82px; background: #171715; object-fit: cover; }
.dashboard__productRow > div:nth-child(2) { min-width: 0; }
.dashboard__productRow span { color: #7d7d77; font-size: 8px; font-weight: 800; text-transform: uppercase; }
.dashboard__productRow h4 { margin: 4px 0; overflow: hidden; font-size: 13px; text-overflow: ellipsis; text-transform: uppercase; white-space: nowrap; }
.dashboard__productRow p { margin: 0; color: #686863; font-size: 10px; }
.dashboard__inactiveRow { opacity: .48; }
.dashboard__rowActions { display: grid; gap: 6px; }
.dashboard__rowActions button, .dashboard__rowFooter button { padding: 8px 10px; border: 1px solid #c7c7c1; background: transparent; color: #111; font-size: 8px; font-weight: 800; text-transform: uppercase; cursor: pointer; }
.dashboard__dangerAction { color: #a22e24 !important; }
.dashboard__userRow { padding: 20px; border: 1px solid #d1d1cb; background: #fafaf7; display: grid; gap: 17px; }
.dashboard__userIdentity { display: flex; align-items: center; gap: 12px; }
.dashboard__userIdentity > span { width: 38px; height: 38px; display: grid; place-items: center; border-radius: 50%; background: #111; color: #b6ff1a; font-weight: 900; }
.dashboard__userIdentity div { display: grid; gap: 3px; }
.dashboard__userIdentity b { font-size: 13px; text-transform: uppercase; }
.dashboard__userIdentity small { color: #777; font-size: 9px; }
.dashboard__userFields { display: grid; grid-template-columns: 1.1fr .8fr 1fr auto; gap: 12px; align-items: end; }
.dashboard__rowFooter { min-height: 30px; display: flex; align-items: center; justify-content: space-between; gap: 15px; }
.dashboard__rowFooter > span { color: #666; font-size: 10px; }
.dashboard__rowFooter > div { display: flex; gap: 7px; }
.dashboard__adminOrder { border: 1px solid #d1d1cb; background: #fafaf7; }
.dashboard__adminOrder header { display: grid; grid-template-columns: .8fr 1fr .8fr .8fr 180px; gap: 18px; align-items: end; padding: 17px 20px; }
.dashboard__adminOrder header > div { display: grid; gap: 4px; }
.dashboard__adminOrder header b { overflow: hidden; font-size: 11px; text-overflow: ellipsis; }
.dashboard__compactItems { padding: 12px 20px; border-top: 1px solid #dfdfd9; display: flex; flex-wrap: wrap; gap: 7px; }
.dashboard__compactItems span { padding: 5px 8px; background: #ecece7; color: #62625e; font-size: 9px; }
.dashboard__managementFeedback, .dashboard__managementError { padding: 30px; text-align: center; }
.dashboard__managementError { color: #a22e24; }
@media (max-width: 1350px) { .dashboard__dashboard { grid-template-columns: 210px minmax(320px, 390px); } .dashboard__dashboard.dashboard__menuCollapsed { grid-template-columns: 64px minmax(320px, 390px); } .dashboard__previewPanel { grid-column: 1 / -1; min-height: 720px; } .dashboard__sidebar { padding-inline: 12px; } .dashboard__previewStage { padding: 20px; } }
@media (max-width: 900px) { .dashboard__dashboard { grid-template-columns: 190px 1fr; } .dashboard__dashboard.dashboard__menuCollapsed { grid-template-columns: 64px 1fr; } }
@media (max-width: 1100px) { .dashboard__adminSplit { grid-template-columns: 1fr; } .dashboard__userFields { grid-template-columns: 1fr 1fr; } .dashboard__adminOrder header { grid-template-columns: 1fr 1fr 1fr; } }
@media (max-width: 650px) { .dashboard__dashboard, .dashboard__dashboard.dashboard__menuCollapsed { display: block; } .dashboard__sidebar, .dashboard__menuCollapsed .dashboard__sidebar { min-height: auto; padding: 14px 16px; } .dashboard__menuCollapsed .dashboard__sidebarIntro, .dashboard__menuCollapsed .dashboard__sectionNav, .dashboard__menuCollapsed .dashboard__backButton { display: initial; } .dashboard__menuCollapsed .dashboard__sectionNav, .dashboard__menuCollapsed .dashboard__adminNav { display: grid; } .dashboard__menuCollapsed .dashboard__adminNav button { grid-template-columns: 21px 1fr; justify-items: initial; } .dashboard__menuCollapsed .dashboard__adminNav button > div { display: grid; } .dashboard__menuCollapsed .dashboard__backButton { display: flex; } .dashboard__menuActions { justify-content: space-between !important; } .dashboard__sidebarIntro { margin-top: 28px; } .dashboard__editorPanel { min-height: auto; } .dashboard__previewPanel { min-height: 650px; } .dashboard__previewStage { padding: 16px; } .dashboard__adminHub { min-height: 70vh; padding: 36px 18px; } .dashboard__adminHubGrid { grid-template-columns: 1fr; } .dashboard__managementPanel { min-height: auto; } .dashboard__managementHeader, .dashboard__managementBody { padding: 24px 18px; } .dashboard__fieldGrid, .dashboard__userFields, .dashboard__adminOrder header { grid-template-columns: 1fr; } .dashboard__productRow { grid-template-columns: 58px 1fr; } .dashboard__productRow > img { width: 58px; height: 68px; } .dashboard__rowActions { grid-column: 1 / -1; grid-template-columns: 1fr 1fr; } }

`;

export const AdminForm = styled.form.attrs({ className: "dashboard__adminForm" })``;
export const AdminFormTitle = styled.div.attrs({ className: "dashboard__adminFormTitle" })``;
export const AdminHub = styled.section.attrs({ className: "dashboard__adminHub" })``;
export const AdminHubContent = styled.div.attrs({ className: "dashboard__adminHubContent" })``;
export const AdminHubGrid = styled.div.attrs({ className: "dashboard__adminHubGrid" })``;
export const AdminList = styled.div.attrs({ className: "dashboard__adminList" })``;
export const AdminMessage = styled.p.attrs({ className: "dashboard__adminMessage" })``;
export const AdminNav = styled.nav.attrs({ className: "dashboard__adminNav" })``;
export const AdminOrder = styled.article.attrs({ className: "dashboard__adminOrder" })``;
export const AdminOrders = styled.div.attrs({ className: "dashboard__adminOrders" })``;
export const AdminSplit = styled.div.attrs({ className: "dashboard__adminSplit" })``;
export const BackButton = styled.button.attrs({ className: "dashboard__backButton" })``;
export const CollapseButton = styled.button.attrs({ className: "dashboard__collapseButton" })``;
export const CompactItems = styled.div.attrs({ className: "dashboard__compactItems" })``;
export const DangerAction = styled.button.attrs({ className: "dashboard__dangerAction" })``;
export const EditorPanel = styled.section.attrs({ className: "dashboard__editorPanel" })``;
export const FieldGrid = styled.div.attrs({ className: "dashboard__fieldGrid" })``;
export const FileButton = styled.label.attrs({ className: "dashboard__fileButton" })``;
export const Form = styled.form.attrs({ className: "dashboard__form" })``;
export const FormActions = styled.div.attrs({ className: "dashboard__formActions" })``;
export const HeroCopy = styled.div.attrs({ className: "dashboard__heroCopy" })``;
export const HiddenPreview = styled.div.attrs({ className: "dashboard__hiddenPreview" })``;
export const HubButton = styled.button.attrs({ className: "dashboard__hubButton" })``;
export const ImageField = styled.div.attrs({ className: "dashboard__imageField" })``;
export const InlineCheck = styled.label.attrs({ className: "dashboard__inlineCheck" })``;
export const ListHeader = styled.div.attrs({ className: "dashboard__listHeader" })``;
export const Loading = styled.p.attrs({ className: "dashboard__loading" })``;
export const ManagementBody = styled.div.attrs({ className: "dashboard__managementBody" })``;
export const ManagementError = styled.p.attrs({ className: "dashboard__managementError" })``;
export const ManagementFeedback = styled.p.attrs({ className: "dashboard__managementFeedback" })``;
export const ManagementHeader = styled.header.attrs({ className: "dashboard__managementHeader" })``;
export const ManagementPanel = styled.section.attrs({ className: "dashboard__managementPanel" })``;
export const MenuActions = styled.div.attrs({ className: "dashboard__menuActions" })``;
export const Message = styled.p.attrs({ className: "dashboard__message" })``;
export const MiniSteps = styled.div.attrs({ className: "dashboard__miniSteps" })``;
export const OverlayCopy = styled.div.attrs({ className: "dashboard__overlayCopy" })``;
export const PanelHeader = styled.header.attrs({ className: "dashboard__panelHeader" })``;
export const PreviewFooter = styled.footer.attrs({ className: "dashboard__previewFooter" })``;
export const PreviewHeader = styled.header.attrs({ className: "dashboard__previewHeader" })``;
export const PreviewPanel = styled.section.attrs({ className: "dashboard__previewPanel" })``;
export const PreviewShade = styled.div.attrs({ className: "dashboard__previewShade" })``;
export const PreviewStage = styled.div.attrs({ className: "dashboard__previewStage" })``;
export const PrimaryAction = styled.button.attrs({ className: "dashboard__primaryAction" })``;
export const ResetButton = styled.button.attrs({ className: "dashboard__resetButton" })``;
export const ReturnToHub = styled.button.attrs({ className: "dashboard__returnToHub" })``;
export const RowActions = styled.div.attrs({ className: "dashboard__rowActions" })``;
export const RowFooter = styled.div.attrs({ className: "dashboard__rowFooter" })``;
export const SaveButton = styled.button.attrs({ className: "dashboard__saveButton" })``;
export const SectionNav = styled.nav.attrs({ className: "dashboard__sectionNav" })``;
export const Sidebar = styled.aside.attrs({ className: "dashboard__sidebar" })``;
export const SidebarIntro = styled.div.attrs({ className: "dashboard__sidebarIntro" })``;
export const SplitCopy = styled.div.attrs({ className: "dashboard__splitCopy" })``;
export const SplitImage = styled.div.attrs({ className: "dashboard__splitImage" })``;
export const Status = styled.span.attrs({ className: "dashboard__status" })``;
export const UploadButton = styled.label.attrs({ className: "dashboard__uploadButton" })``;
export const UserFields = styled.div.attrs({ className: "dashboard__userFields" })``;
export const UserIdentity = styled.div.attrs({ className: "dashboard__userIdentity" })``;
export const UserList = styled.div.attrs({ className: "dashboard__userList" })``;
export const UserRow = styled.article.attrs({ className: "dashboard__userRow" })``;
export const ViewportControls = styled.div.attrs({ className: "dashboard__viewportControls" })``;
export const VisibilityField = styled.label.attrs({ className: "dashboard__visibilityField" })``;

type PreviewVariant = "hero" | "diorama" | "split";

export const ComponentPreview = styled.section.attrs<{ $variant: PreviewVariant }>(({ $variant }) => ({
  className: `dashboard__componentPreview dashboard__${$variant}Preview`,
}))``;

export const Dashboard = styled.main.attrs<{ $collapsed: boolean }>(({ $collapsed }) => ({
  className: `dashboard__dashboard${$collapsed ? " dashboard__menuCollapsed" : ""}`,
}))``;

export const AdminNavButton = styled.button.attrs<{ $active: boolean }>(({ $active }) => ({
  className: $active ? "dashboard__activeArea" : undefined,
}))``;

export const SectionNavButton = styled.button.attrs<{ $active: boolean }>(({ $active }) => ({
  className: $active ? "dashboard__activeSection" : undefined,
}))``;

export const ViewportButton = styled.button.attrs<{ $active: boolean }>(({ $active }) => ({
  className: $active ? "dashboard__activeViewport" : undefined,
}))``;

export const PreviewFrame = styled.div.attrs<{ $mobile: boolean }>(({ $mobile }) => ({
  className: `dashboard__previewFrame${$mobile ? " dashboard__mobileFrame" : ""}`,
}))``;

export const ProductRow = styled.article.attrs<{ $inactive: boolean }>(({ $inactive }) => ({
  className: `dashboard__productRow${$inactive ? " dashboard__inactiveRow" : ""}`,
}))``;
