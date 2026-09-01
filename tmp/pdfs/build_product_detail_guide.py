from __future__ import annotations

import html
import os
from pathlib import Path

from PIL import Image as PILImage, ImageDraw, ImageFont
from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER, TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import mm
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import (
    BaseDocTemplate,
    Frame,
    Image,
    KeepTogether,
    PageBreak,
    PageTemplate,
    Paragraph,
    Preformatted,
    Spacer,
    Table,
    TableStyle,
)


ROOT = Path(__file__).resolve().parents[2]
TMP = ROOT / "tmp" / "pdfs"
OUT = ROOT / "output" / "pdf"
OUT.mkdir(parents=True, exist_ok=True)
TMP.mkdir(parents=True, exist_ok=True)

PDF_PATH = OUT / "guia-didatico-product-detail-savepoint3d.pdf"
PRODUCT_IMAGE = ROOT / "public" / "assets" / "img" / "1.png"

INK = colors.HexColor("#111111")
INK_SOFT = colors.HexColor("#1a1a1a")
ACCENT = colors.HexColor("#a7e918")
PAPER = colors.HexColor("#f2f2f0")
MUTED = colors.HexColor("#686868")
MUTED_DARK = colors.HexColor("#8a8a86")
BORDER = colors.HexColor("#d8d8d5")
RED = colors.HexColor("#dd4b39")
BLUE = colors.HexColor("#3c82f6")


def register_fonts() -> tuple[str, str, str]:
    candidates = [
        (
            Path("C:/Windows/Fonts/arial.ttf"),
            Path("C:/Windows/Fonts/arialbd.ttf"),
            Path("C:/Windows/Fonts/consola.ttf"),
        ),
        (
            Path("/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf"),
            Path("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"),
            Path("/usr/share/fonts/truetype/dejavu/DejaVuSansMono.ttf"),
        ),
    ]
    for regular, bold, mono in candidates:
        if regular.exists() and bold.exists() and mono.exists():
            pdfmetrics.registerFont(TTFont("GuideSans", str(regular)))
            pdfmetrics.registerFont(TTFont("GuideSansBold", str(bold)))
            pdfmetrics.registerFont(TTFont("GuideMono", str(mono)))
            return "GuideSans", "GuideSansBold", "GuideMono"
    return "Helvetica", "Helvetica-Bold", "Courier"


FONT, FONT_BOLD, FONT_MONO = register_fonts()


def pil_font(size: int, bold: bool = False, mono: bool = False):
    paths = []
    if mono:
        paths = ["C:/Windows/Fonts/consola.ttf", "/usr/share/fonts/truetype/dejavu/DejaVuSansMono.ttf"]
    elif bold:
        paths = ["C:/Windows/Fonts/arialbd.ttf", "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"]
    else:
        paths = ["C:/Windows/Fonts/arial.ttf", "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf"]
    for path in paths:
        if Path(path).exists():
            return ImageFont.truetype(path, size)
    return ImageFont.load_default()


def fit_cover(image: PILImage.Image, size: tuple[int, int], focus_x: float = 0.5) -> PILImage.Image:
    tw, th = size
    ratio = max(tw / image.width, th / image.height)
    resized = image.resize((round(image.width * ratio), round(image.height * ratio)), PILImage.Resampling.LANCZOS)
    left = max(0, round((resized.width - tw) * focus_x))
    top = max(0, round((resized.height - th) * 0.5))
    return resized.crop((left, top, left + tw, top + th))


def label(draw: ImageDraw.ImageDraw, xy: tuple[int, int], text: str, fill=(167, 233, 24), dark=True):
    font = pil_font(25, bold=True)
    x, y = xy
    bbox = draw.textbbox((0, 0), text, font=font)
    w = bbox[2] - bbox[0]
    h = bbox[3] - bbox[1]
    draw.rounded_rectangle((x, y, x + w + 28, y + h + 18), radius=8, fill=fill)
    draw.text((x + 14, y + 7), text, font=font, fill=(17, 17, 17) if dark else (255, 255, 255))


def make_reference_mockup() -> Path:
    path = TMP / "01_reference_anatomy.png"
    canvas = PILImage.new("RGB", (1400, 800), (17, 17, 17))
    draw = ImageDraw.Draw(canvas)
    source = PILImage.open(PRODUCT_IMAGE).convert("RGB")

    # Gallery side.
    draw.rectangle((0, 0, 670, 800), fill=(8, 8, 8))
    draw.rectangle((0, 0, 135, 800), fill=(43, 43, 43))
    for y in (10, 208, 406):
        thumb = fit_cover(source, (112, 180), 0.55)
        canvas.paste(thumb, (11, y))
        draw.rectangle((11, y, 123, y + 180), outline=(98, 137, 17), width=2)
    hero = fit_cover(source, (535, 800), 0.56)
    canvas.paste(hero, (135, 0))
    label(draw, (160, 18), "Cavaleiro Negro")

    # Information side.
    draw.rectangle((670, 0, 1400, 800), fill=(26, 26, 26))
    draw.text((725, 60), "Fantasia · Escala 1/6", font=pil_font(20), fill=(122, 122, 122))
    draw.text((725, 110), "CRIMSON RONIN", font=pil_font(54, bold=True), fill=(250, 250, 250))
    label(draw, (1265, 60), "5 UNI.")
    draw.text((725, 185), "Avaliação: ★ ★ ★ ★", font=pil_font(20), fill=(167, 233, 24))
    draw.line((725, 220, 1335, 220), fill=(71, 96, 18), width=2)
    body = [
        "Uma página de produto é uma composição de regiões.",
        "A imagem cria desejo; os dados reduzem dúvida;",
        "as ações transformam intenção em carrinho.",
    ]
    for i, line in enumerate(body):
        draw.text((725, 250 + i * 30), line, font=pil_font(21), fill=(230, 230, 230))
    label(draw, (725, 375), "OFERTA")
    draw.text((725, 420), "R$ 899,00", font=pil_font(56, bold=True), fill=(250, 250, 250))
    draw.text((725, 485), "10x de 89,90 sem juros", font=pil_font(20), fill=(167, 233, 24))
    draw.rectangle((725, 555, 860, 620), outline=(92, 128, 15), width=2)
    draw.text((746, 570), "−  1  +", font=pil_font(28, bold=True), fill=(245, 245, 245))
    draw.rectangle((875, 555, 1335, 620), outline=(92, 128, 15), width=2)
    draw.text((988, 570), "Adicionar ao carrinho", font=pil_font(24), fill=(245, 245, 245))
    draw.rectangle((725, 635, 1335, 705), fill=(167, 233, 24))
    draw.text((966, 650), "COMPRAR", font=pil_font(30, bold=True), fill=(17, 17, 17))

    # Numbered overlays.
    circles = [(44, 740, "1"), (495, 740, "2"), (700, 740, "3"), (1050, 740, "4")]
    for x, y, n in circles:
        draw.ellipse((x, y, x + 42, y + 42), fill=(167, 233, 24))
        draw.text((x + 13, y + 6), n, font=pil_font(24, bold=True), fill=(17, 17, 17))
    canvas.save(path, quality=95)
    return path


def make_flow_diagram() -> Path:
    path = TMP / "02_data_flow.png"
    canvas = PILImage.new("RGB", (1400, 500), (242, 242, 240))
    draw = ImageDraw.Draw(canvas)
    items = [
        ("URL", "/products/53457...", (17, 17, 17)),
        ("useParams", "productId", (26, 26, 26)),
        ("find", "products.find(...) ", (45, 45, 45)),
        ("Product", "name · price · stock", (65, 65, 65)),
        ("JSX", "estrutura semântica", (85, 85, 85)),
        ("CSS", "grade · escala · ritmo", (105, 105, 105)),
        ("Pixels", "tela final", (17, 17, 17)),
    ]
    x = 30
    for i, (title, subtitle, bg) in enumerate(items):
        w = 170
        y = 150
        draw.rounded_rectangle((x, y, x + w, y + 150), radius=18, fill=bg, outline=(167, 233, 24), width=3)
        draw.text((x + 18, y + 25), title, font=pil_font(27, bold=True), fill=(167, 233, 24))
        draw.multiline_text((x + 18, y + 72), subtitle, font=pil_font(18), fill=(245, 245, 245), spacing=6)
        if i < len(items) - 1:
            draw.line((x + w + 8, y + 75, x + w + 28, y + 75), fill=(17, 17, 17), width=5)
            draw.polygon([(x + w + 28, y + 75), (x + w + 16, y + 67), (x + w + 16, y + 83)], fill=(17, 17, 17))
        x += 198
    draw.text((35, 45), "O mapa de raciocínio: cada camada responde a uma pergunta", font=pil_font(34, bold=True), fill=(17, 17, 17))
    draw.text((35, 92), "Não comece pela margem. Comece pelo caminho do dado e pela hierarquia visual.", font=pil_font(23), fill=(104, 104, 104))
    canvas.save(path)
    return path


def make_current_diagnosis() -> Path:
    path = TMP / "03_current_diagnosis.png"
    canvas = PILImage.new("RGB", (1400, 760), (17, 17, 17))
    draw = ImageDraw.Draw(canvas)
    draw.text((42, 35), "Quatro pontos que impedem o layout atual de chegar à referência", font=pil_font(34, bold=True), fill=(245, 245, 245))
    panels = [
        ("1", "className={ProductStyle}", "ProductStyle é um componente React,\nnão o nome de uma classe CSS."),
        ("2", "1fr, 1fr", "A vírgula torna o valor inválido.\nCSS Grid separa colunas por espaço."),
        ("3", "height: 20%", "A porcentagem depende da altura do pai.\nSem altura definida, o resultado é instável."),
        ("4", "styles do ProductCard", "A tela detalhada fica acoplada a outro\ncomponente e perde vocabulário próprio."),
    ]
    positions = [(45, 130), (720, 130), (45, 440), (720, 440)]
    for (num, code, explanation), (x, y) in zip(panels, positions):
        draw.rounded_rectangle((x, y, x + 630, y + 250), radius=18, fill=(28, 28, 28), outline=(76, 76, 76), width=2)
        draw.ellipse((x + 24, y + 24, x + 70, y + 70), fill=(221, 75, 57))
        draw.text((x + 39, y + 31), num, font=pil_font(23, bold=True), fill=(255, 255, 255))
        draw.text((x + 90, y + 25), code, font=pil_font(26, mono=True), fill=(167, 233, 24))
        draw.multiline_text((x + 32, y + 100), explanation, font=pil_font(23), fill=(235, 235, 235), spacing=13)
    canvas.save(path)
    return path


def make_dom_tree() -> Path:
    path = TMP / "04_dom_tree.png"
    canvas = PILImage.new("RGB", (1400, 720), (242, 242, 240))
    draw = ImageDraw.Draw(canvas)
    draw.text((40, 35), "A árvore visual antes do CSS", font=pil_font(36, bold=True), fill=(17, 17, 17))
    tree = [
        (0, "main.productPage", "limite e fundo"),
        (1, "section.gallery", "miniaturas + imagem principal"),
        (2, "nav.thumbnails", "botões de troca"),
        (2, "figure.hero", "foto selecionada"),
        (1, "article.info", "conteúdo comercial"),
        (2, "header", "meta + estoque + título"),
        (2, "section.priceBlock", "oferta + preço + parcelas"),
        (2, "section.actions", "quantidade + carrinho + compra"),
    ]
    y = 110
    for depth, title, desc in tree:
        x = 60 + depth * 170
        if depth:
            draw.line((x - 120, y + 23, x - 20, y + 23), fill=(104, 104, 104), width=3)
        draw.rounded_rectangle((x, y, x + 430, y + 58), radius=10, fill=(17, 17, 17) if depth == 0 else (35, 35, 35))
        draw.text((x + 18, y + 12), title, font=pil_font(23, mono=True), fill=(167, 233, 24))
        draw.text((x + 455, y + 14), desc, font=pil_font(21), fill=(104, 104, 104))
        y += 72
    canvas.save(path)
    return path


def make_grid_diagram() -> Path:
    path = TMP / "05_grid_math.png"
    canvas = PILImage.new("RGB", (1400, 700), (17, 17, 17))
    draw = ImageDraw.Draw(canvas)
    draw.text((40, 35), "Grid é distribuição de espaço, não decoração", font=pil_font(36, bold=True), fill=(245, 245, 245))
    draw.rectangle((60, 125, 1340, 570), outline=(167, 233, 24), width=4)
    draw.rectangle((60, 125, 650, 570), fill=(35, 35, 35))
    draw.rectangle((650, 125, 1340, 570), fill=(26, 26, 26))
    draw.text((185, 285), "minmax(0, 1fr)", font=pil_font(32, mono=True), fill=(167, 233, 24))
    draw.text((792, 285), "minmax(420px, 1.1fr)", font=pil_font(32, mono=True), fill=(167, 233, 24))
    draw.line((650, 110, 650, 590), fill=(221, 75, 57), width=5)
    draw.text((60, 610), "0 permite encolher sem overflow", font=pil_font(22), fill=(220, 220, 220))
    draw.text((650, 610), "420px protege a leitura; 1.1fr dá ligeira prioridade ao painel", font=pil_font(22), fill=(220, 220, 220))
    canvas.save(path)
    return path


def make_gallery_steps() -> Path:
    path = TMP / "06_gallery_steps.png"
    source = PILImage.open(PRODUCT_IMAGE).convert("RGB")
    canvas = PILImage.new("RGB", (1400, 760), (242, 242, 240))
    draw = ImageDraw.Draw(canvas)
    draw.text((40, 28), "Galeria em três decisões independentes", font=pil_font(35, bold=True), fill=(17, 17, 17))
    stages = [
        ("A. Lista", "map() cria um botão por imagem"),
        ("B. Seleção", "activeImage guarda a URL escolhida"),
        ("C. Enquadramento", "object-fit: cover ocupa o quadro"),
    ]
    for i, (title, subtitle) in enumerate(stages):
        x = 40 + i * 455
        draw.rounded_rectangle((x, 100, x + 415, 690), radius=20, fill=(24, 24, 24))
        draw.text((x + 24, 125), title, font=pil_font(28, bold=True), fill=(167, 233, 24))
        draw.text((x + 24, 170), subtitle, font=pil_font(19), fill=(210, 210, 210))
        if i == 0:
            for y in (230, 365, 500):
                thumb = fit_cover(source, (102, 120), 0.55)
                canvas.paste(thumb, (x + 25, y))
                draw.rectangle((x + 25, y, x + 127, y + 120), outline=(167, 233, 24), width=2)
            draw.text((x + 160, 350), "button\n  > img", font=pil_font(24, mono=True), fill=(245, 245, 245))
        elif i == 1:
            hero = fit_cover(source, (210, 380), 0.56)
            canvas.paste(hero, (x + 100, 240))
            label(draw, (x + 40, 225), "active")
        else:
            hero = fit_cover(source, (350, 380), 0.56)
            canvas.paste(hero, (x + 32, 240))
            draw.rectangle((x + 32, 240, x + 382, 620), outline=(167, 233, 24), width=3)
            draw.text((x + 55, 635), "width: 100%; height: 100%", font=pil_font(17, mono=True), fill=(200, 200, 200))
    canvas.save(path)
    return path


def make_commercial_panel() -> Path:
    path = TMP / "07_commercial_hierarchy.png"
    canvas = PILImage.new("RGB", (1400, 760), (26, 26, 26))
    draw = ImageDraw.Draw(canvas)
    draw.text((45, 35), "Hierarquia comercial: responder na ordem em que a pessoa decide", font=pil_font(34, bold=True), fill=(245, 245, 245))
    rows = [
        ("1", "O que é?", "CRIMSON RONIN", 50),
        ("2", "Está disponível?", "5 UNI.", 34),
        ("3", "Por que confiar?", "Avaliação ★★★★", 34),
        ("4", "Quanto custa?", "R$ 899,00", 52),
        ("5", "O que faço agora?", "ADICIONAR / COMPRAR", 38),
    ]
    y = 120
    for num, question, answer, size in rows:
        draw.ellipse((55, y, 105, y + 50), fill=(167, 233, 24))
        draw.text((72, y + 7), num, font=pil_font(25, bold=True), fill=(17, 17, 17))
        draw.text((135, y + 3), question, font=pil_font(23), fill=(135, 135, 135))
        draw.text((470, y - 5), answer, font=pil_font(size, bold=True), fill=(245, 245, 245) if num != "5" else (167, 233, 24))
        draw.line((135, y + 70, 1335, y + 70), fill=(65, 65, 65), width=2)
        y += 120
    canvas.save(path)
    return path


def make_interaction_diagram() -> Path:
    path = TMP / "08_interaction.png"
    canvas = PILImage.new("RGB", (1400, 600), (242, 242, 240))
    draw = ImageDraw.Draw(canvas)
    draw.text((40, 32), "Quantidade: do clique até o carrinho", font=pil_font(36, bold=True), fill=(17, 17, 17))
    boxes = [
        ("Clique +", "setQuantity(q => q + 1)"),
        ("Estado", "quantity = 2"),
        ("Limite", "Math.min(stock, ...)"),
        ("Submit", "onAddToCart(id, 2)"),
        ("App", "cart: [{ id, qty: 2 }]"),
        ("Persistência", "localStorage"),
    ]
    x = 30
    for i, (title, code) in enumerate(boxes):
        y = 190 if i % 2 == 0 else 320
        draw.rounded_rectangle((x, y, x + 205, y + 125), radius=16, fill=(17, 17, 17), outline=(167, 233, 24), width=3)
        draw.text((x + 16, y + 18), title, font=pil_font(23, bold=True), fill=(167, 233, 24))
        draw.multiline_text((x + 16, y + 62), code, font=pil_font(15, mono=True), fill=(235, 235, 235), spacing=4)
        if i < len(boxes) - 1:
            nx = x + 230
            ny = 190 if (i + 1) % 2 == 0 else 320
            draw.line((x + 205, y + 62, nx, ny + 62), fill=(104, 104, 104), width=4)
        x += 230
    canvas.save(path)
    return path


def make_responsive_diagram() -> Path:
    path = TMP / "09_responsive.png"
    source = PILImage.open(PRODUCT_IMAGE).convert("RGB")
    canvas = PILImage.new("RGB", (1400, 720), (17, 17, 17))
    draw = ImageDraw.Draw(canvas)
    draw.text((40, 25), "A mesma hierarquia em três larguras", font=pil_font(35, bold=True), fill=(245, 245, 245))

    devices = [
        (40, 110, 650, 520, "Desktop ≥ 1000px", "duas colunas"),
        (750, 110, 360, 520, "Tablet", "empilha e preserva respiro"),
        (1160, 110, 200, 520, "Mobile", "uma coluna; ações largas"),
    ]
    for x, y, w, h, title, subtitle in devices:
        draw.rounded_rectangle((x, y, x + w, y + h), radius=20, fill=(242, 242, 240), outline=(167, 233, 24), width=3)
        if w > 500:
            photo = fit_cover(source, (round(w * 0.47), h - 90), 0.56)
            canvas.paste(photo, (x + 10, y + 50))
            draw.rectangle((x + round(w * 0.49), y + 50, x + w - 10, y + h - 10), fill=(26, 26, 26))
        else:
            photo_h = round((h - 90) * 0.5)
            photo = fit_cover(source, (w - 20, photo_h), 0.56)
            canvas.paste(photo, (x + 10, y + 50))
            draw.rectangle((x + 10, y + 60 + photo_h, x + w - 10, y + h - 10), fill=(26, 26, 26))
        draw.text((x + 15, y + 12), title, font=pil_font(19, bold=True), fill=(17, 17, 17))
        draw.text((x + 15, y + h + 12), subtitle, font=pil_font(18), fill=(210, 210, 210))
    canvas.save(path)
    return path


FIGURES = [
    make_reference_mockup(),
    make_flow_diagram(),
    make_current_diagnosis(),
    make_dom_tree(),
    make_grid_diagram(),
    make_gallery_steps(),
    make_commercial_panel(),
    make_interaction_diagram(),
    make_responsive_diagram(),
]


styles = getSampleStyleSheet()
styles.add(ParagraphStyle(name="CoverKicker", fontName=FONT_BOLD, fontSize=11, leading=14, textColor=ACCENT, spaceAfter=5, uppercase=True))
styles.add(ParagraphStyle(name="CoverTitle", fontName=FONT_BOLD, fontSize=29, leading=31, textColor=colors.white, spaceAfter=12))
styles.add(ParagraphStyle(name="CoverSub", fontName=FONT, fontSize=12, leading=18, textColor=colors.HexColor("#d0d0d0"), spaceAfter=12))
styles.add(ParagraphStyle(name="H1Guide", fontName=FONT_BOLD, fontSize=22, leading=25, textColor=INK, spaceBefore=4, spaceAfter=9))
styles.add(ParagraphStyle(name="H2Guide", fontName=FONT_BOLD, fontSize=14, leading=18, textColor=INK, spaceBefore=10, spaceAfter=6))
styles.add(ParagraphStyle(name="BodyGuide", fontName=FONT, fontSize=9.3, leading=14.2, textColor=INK, alignment=TA_LEFT, spaceAfter=8))
styles.add(ParagraphStyle(name="SmallGuide", fontName=FONT, fontSize=7.7, leading=10.5, textColor=MUTED, spaceAfter=5))
styles.add(ParagraphStyle(name="FigureCaption", fontName=FONT, fontSize=7.4, leading=10, textColor=MUTED, alignment=TA_CENTER, spaceBefore=4, spaceAfter=8))
styles.add(ParagraphStyle(name="Callout", fontName=FONT, fontSize=9, leading=13.5, textColor=INK, leftIndent=10, rightIndent=8, borderColor=ACCENT, borderWidth=0, borderPadding=8, backColor=colors.HexColor("#e9f7c9"), spaceBefore=5, spaceAfter=8))
styles.add(ParagraphStyle(name="Warning", fontName=FONT, fontSize=9, leading=13.5, textColor=INK, leftIndent=10, rightIndent=8, borderPadding=8, backColor=colors.HexColor("#fde7e3"), spaceBefore=5, spaceAfter=8))
styles.add(ParagraphStyle(name="GuideCode", fontName=FONT_MONO, fontSize=6.7, leading=9.1, textColor=colors.HexColor("#243023"), leftIndent=8, rightIndent=8, borderPadding=8, borderColor=colors.HexColor("#b7c69b"), borderWidth=0.5, backColor=colors.HexColor("#eef3e7"), spaceBefore=4, spaceAfter=8))
styles.add(ParagraphStyle(name="TOC", fontName=FONT, fontSize=9.2, leading=14, textColor=INK, leftIndent=6, spaceAfter=3))


def P(text: str, style: str = "BodyGuide") -> Paragraph:
    return Paragraph(text, styles[style])


def code(text: str) -> Preformatted:
    return Preformatted(text.strip("\n"), styles["GuideCode"])


def figure(path: Path, caption: str, width: float = 174 * mm) -> list:
    with PILImage.open(path) as im:
        ratio = im.height / im.width
    return [Image(str(path), width=width, height=width * ratio), P(caption, "FigureCaption")]


def callout(title: str, body: str, warning: bool = False) -> Paragraph:
    style = "Warning" if warning else "Callout"
    return P(f"<b>{title}</b><br/>{body}", style)


class GuideDoc(BaseDocTemplate):
    def __init__(self, filename: str):
        super().__init__(
            filename,
            pagesize=A4,
            leftMargin=18 * mm,
            rightMargin=18 * mm,
            topMargin=18 * mm,
            bottomMargin=17 * mm,
            title="Guia didático para reconstruir o ProductDetail",
            author="Codex para Save Point3D",
        )
        frame = Frame(self.leftMargin, self.bottomMargin, self.width, self.height, id="normal")
        self.addPageTemplates(PageTemplate(id="content", frames=[frame], onPage=self.draw_page))

    def draw_page(self, canvas, doc):
        page = canvas.getPageNumber()
        if page == 1:
            canvas.saveState()
            canvas.setFillColor(INK)
            canvas.rect(0, 0, A4[0], A4[1], fill=1, stroke=0)
            canvas.restoreState()
            return
        canvas.saveState()
        canvas.setStrokeColor(BORDER)
        canvas.line(18 * mm, 13 * mm, A4[0] - 18 * mm, 13 * mm)
        canvas.setFont(FONT, 7)
        canvas.setFillColor(MUTED)
        canvas.drawString(18 * mm, 8.5 * mm, "Save Point3D · ProductDetail · guia didático")
        canvas.drawRightString(A4[0] - 18 * mm, 8.5 * mm, f"{page:02d}")
        canvas.restoreState()


story = []

# Cover
story += [Spacer(1, 12 * mm)]
story.append(P("REACT · TYPESCRIPT · STYLED-COMPONENTS", "CoverKicker"))
story.append(P("Como pensar e construir o ProductDetail", "CoverTitle"))
story.append(P("Um percurso visual da URL aos pixels, usando o Crimson Ronin como exemplo concreto.", "CoverSub"))
story += figure(FIGURES[0], "Mapa visual da referência: 1) miniaturas, 2) foto principal, 3) conteúdo, 4) ações.", 174 * mm)
story.append(Spacer(1, 6 * mm))
story.append(P("Material criado a partir do código real do frontend Save Point3D. O objetivo não é entregar uma receita cega, e sim ensinar a decompor a tela, escolher a estrutura, entender a sintaxe e depurar o resultado.", "CoverSub"))
story.append(PageBreak())

# How to use / TOC
story.append(P("Como usar este guia", "H1Guide"))
story.append(P("A referência visual parece uma única imagem, mas o navegador não a enxerga assim. Ele recebe uma árvore de elementos, calcula a dimensão de cada caixa, escolhe quais pixels da fotografia ficam visíveis e só depois pinta textos, bordas e botões. Por isso, a maneira mais segura de recriar o resultado é percorrer as camadas na ordem em que os dados e o navegador trabalham: primeiro descobrir qual produto a URL escolheu; depois construir uma árvore semântica; em seguida distribuir as regiões com Grid; por fim adicionar estados e detalhes visuais. Sempre que você se sentir perdido em uma margem ou tamanho, volte a esse encadeamento.", "BodyGuide"))
story += figure(FIGURES[1], "Figura 1. O caminho completo do valor productId até a tela pintada.")
story.append(P("Roteiro", "H2Guide"))
toc = [
    "1. Ler a referência como regiões e responsabilidades",
    "2. Diagnosticar o componente atual sem apagar o que ele já ensina",
    "3. Entender rota, parâmetro e seleção do produto",
    "4. Definir o contrato de dados que a interface realmente exige",
    "5. Desenhar a árvore JSX antes de estilizar",
    "6. Construir a grade principal e compreender fr, minmax e vírgulas",
    "7. Implementar a galeria e o recorte da fotografia",
    "8. Montar o painel comercial e formatar preço",
    "9. Fazer quantidade e carrinho compartilharem o mesmo significado",
    "10. Adaptar desktop, tablet e celular",
    "11. Acessibilidade, estados de carregamento e validação",
    "12. Sequência prática de implementação e checklist final",
]
for item in toc:
    story.append(P(item, "TOC"))
story.append(PageBreak())

# 1 Reference decomposition
story.append(P("1. Leia a referência antes de escrever CSS", "H1Guide"))
story.append(P("Comece fazendo uma pergunta simples: quais decisões visuais esta tela precisa comunicar? A grande foto à esquerda vende a peça pela presença; a coluna de miniaturas comunica que existem outras vistas; o painel direito organiza nome, categoria, escala, disponibilidade, avaliação, explicação, preço e ações. Essa leitura transforma uma imagem aparentemente complexa em dois grandes domínios: <b>galeria</b> e <b>informação comercial</b>. Dentro deles existem sub-regiões menores. A primeira decisão de implementação, portanto, não é escolher `padding: 24px`; é dar nomes a essas responsabilidades.", "BodyGuide"))
story.append(P("Na referência, o lado esquerdo ocupa aproximadamente 46% da largura e o painel direito aproximadamente 54%. A miniatura é uma coluna fixa dentro da galeria. Essa relação sugere uma grade externa com duas colunas flexíveis e uma grade interna com uma coluna estreita para miniaturas. A diferença é importante: tentar resolver tudo em uma única grade cria linhas e colunas que não representam a árvore de conteúdo; separar as grades permite que a galeria mude internamente sem afetar preço e ações.", "BodyGuide"))
story += figure(FIGURES[0], "Figura 2. A referência reconstruída como quatro regiões numeradas, usando o asset real public/assets/img/1.png.")
story.append(callout("Mapa mental", "Se você consegue apontar uma região e explicar sua responsabilidade com uma frase, ela provavelmente merece um elemento próprio no JSX. Se não consegue explicar a responsabilidade, talvez seja apenas decoração CSS."))
story.append(PageBreak())

# 2 Diagnosis
story.append(P("2. O que o código atual está tentando fazer - e por que ainda não encaixa", "H1Guide"))
story.append(P("Seu componente já encontrou o produto pela URL, já renderiza a imagem e já chama `onAddToCart`. Isso significa que a conexão principal existe. O obstáculo não é falta de capacidade; é que estrutura e estilo ainda estão misturados com conceitos de outro componente. O `ProductDetail` importa `styles` do `ProductCard`, então nomes como `imageWrap`, `tag` e `addButton` pertencem a uma superfície visual que tem proporções e comportamento diferentes. Reutilizar lógica é desejável; reutilizar classes apenas porque parecem convenientes costuma criar acoplamento invisível.", "BodyGuide"))
story += figure(FIGURES[2], "Figura 3. Diagnóstico visual dos quatro pontos que devem ser corrigidos antes do refinamento.")
story.append(P("O trecho `<section className={ProductStyle}>` mistura dois mecanismos. `ProductStyle` foi criado por `styled.div`; portanto, ele é um componente React que deve aparecer como tag: `<ProductStyle>...</ProductStyle>`. Já `className` exige uma string, como `&quot;productPage&quot;`. O objeto `stylesProduct` resolve justamente essa tradução ao guardar strings. Em linguagem natural: a tag styled-component cria o escopo; as strings do objeto identificam elementos internos desse escopo.", "BodyGuide"))
story.append(code("""
// Incorreto: ProductStyle não é uma string de classe.
<section className={ProductStyle}>...</section>

// Correto: ProductStyle é a própria tag; page é uma string.
<ProductStyle>
  <main className={stylesProduct.page}>...</main>
</ProductStyle>
"""))
story.append(P("A segunda falha é sintática: `grid-template-columns: 1fr, 1fr` contém uma vírgula. Em CSS Grid, as trilhas são separadas por espaço: `1fr 1fr`. `fr` significa uma fração do espaço livre; duas vezes `1fr` dividem igualmente. Como o valor com vírgula não pertence à gramática da propriedade, o navegador o ignora. Quando uma regra parece não surtir efeito, inspecione se ela foi riscada no DevTools; isso costuma indicar valor inválido ou sobrescrito.", "BodyGuide"))
story.append(PageBreak())

# 3 Route and data
story.append(P("3. Da URL ao produto: seguindo um valor concreto", "H1Guide"))
story.append(P("Considere a URL concreta `/products/53457ac5-f790-406a-9e56-ed30255086bf`. Na declaração da rota, `:productId` possui dois sinais importantes. Os dois pontos, `:`, dizem ao React Router que aquele segmento não é texto fixo; ele é variável. `productId` é o nome escolhido para recuperar esse valor. Por isso o nome usado em `useParams<{ productId: string }>()` deve coincidir exatamente com o nome escrito depois dos dois pontos. Se a rota declarasse `:id` e o hook procurasse `productId`, o resultado seria `undefined`.", "BodyGuide"))
story.append(code("""
// routes/index.tsx
<Route
  path="/products/:productId"
  element={<ProductDetail products={products} onAddToCart={onAddToCart} />}
/>

// hooks/useUrlParser.tsx
const { productId } = useParams<{ productId: string }>();
const selectedProduct = products.find(
  (product) => product.id === productId,
);
"""))
story.append(P("`useParams` devolve um objeto porque uma rota pode ter vários parâmetros. A desestruturação `{ productId }` retira apenas a propriedade de interesse. O trecho `<{ productId: string }>` é um argumento genérico de TypeScript: ele descreve o formato esperado, mas não cria o valor em execução. Em seguida, `find` percorre o array `products`; para cada objeto, a função seta compara `product.id` com o texto recebido da URL. O operador `===` exige igualdade de valor e tipo. Quando encontra a primeira correspondência, `find` devolve o objeto; se não encontra, devolve `undefined`.", "BodyGuide"))
story += figure(FIGURES[1], "Figura 4. productId nasce na URL, é capturado pelo hook, comparado aos IDs e termina nos elementos visuais.")
story.append(callout("Estado de carregamento", "No App, products começa como `[]` e só é preenchido depois do fetch. Portanto, `undefined` pode significar “a API ainda não respondeu” ou “o produto realmente não existe”. Um ProductDetail robusto recebe `loading` ou usa um estado de consulta que distingue loading, success e error; não deve mostrar “Produto não encontrado” durante os primeiros milissegundos."))
story.append(PageBreak())

# 4 Contract
story.append(P("4. O contrato de dados deve nascer da interface", "H1Guide"))
story.append(P("A interface atual `Product` possui nome, categoria, escala, material, preço, estoque e uma única `imageUrl`. A referência, porém, mostra descrição, avaliação, preço anterior, parcelamento e várias imagens. CSS não consegue inventar esses valores. Antes de desenhar estrelas ou miniaturas, você precisa decidir de onde cada dado virá. Em produção, o caminho correto é ampliar o contrato do backend e normalizá-lo no frontend. Durante uma fase exclusivamente visual, é aceitável usar fallbacks explícitos, desde que eles sejam identificados como provisórios e não pareçam dados reais.", "BodyGuide"))
story.append(code("""
export interface Product {
  id: string;
  name: string;
  price: number;
  stock: number | null;
  imageUrl: string;
  images?: string[];
  description?: string | null;
  rating?: number | null;
  originalPrice?: number | null;
  installments?: number | null;
  // ...campos existentes
}

const gallery = product.images?.length
  ? product.images
  : [product.imageUrl];
"""))
story.append(P("O símbolo `?` depois do nome de uma propriedade significa que ela é opcional: objetos antigos podem não tê-la. Já `string | null` significa que a propriedade existe, mas pode declarar ausência de conteúdo. Em `product.images?.length`, `?.` é o encadeamento opcional: se `images` for `undefined`, a expressão para sem lançar erro. O operador ternário possui a forma `condição ? valorSeVerdadeiro : valorSeFalso`. Aqui ele escolhe a galeria do backend quando há itens e recua para a imagem principal quando ainda não há galeria.", "BodyGuide"))
story.append(callout("Origem e destino", "`items.price` chega como string da API; `fetchProducts` o converte com `Number`; o `ProductDetail` recebe um number; `Intl.NumberFormat` transforma esse número em texto localizado; o texto termina no elemento visual do preço. Cada transformação tem um motivo e uma camada responsável."))
story.append(PageBreak())

# 5 DOM
story.append(P("5. Escreva a árvore JSX antes das regras visuais", "H1Guide"))
story.append(P("JSX não é uma imagem do resultado: é uma descrição hierárquica. A tag `main` identifica o conteúdo principal da rota; `section` agrupa a galeria; `nav` informa que as miniaturas são controles de navegação entre imagens; `figure` contém a mídia principal; `article` reúne informação autossuficiente sobre o produto; `button` representa uma ação real e recebe foco de teclado. Essa semântica ajuda leitores de tela, testes e manutenção, mas também melhora seu pensamento: cada tag passa a ter uma responsabilidade verificável.", "BodyGuide"))
story += figure(FIGURES[3], "Figura 5. Árvore DOM sugerida. A indentação mostra quem contém quem.")
story.append(code("""
<ProductStyle>
  <main className={styles.page}>
    <section className={styles.gallery} aria-label="Galeria do produto">
      <nav className={styles.thumbnails} aria-label="Imagens do produto">
        {gallery.map((image, index) => (/* botão + miniatura */))}
      </nav>
      <figure className={styles.hero}>
        <img src={activeImage} alt={product.alt || product.name} />
      </figure>
    </section>

    <article className={styles.info}>
      <header>{/* meta, estoque, título e avaliação */}</header>
      <section className={styles.priceBlock}>{/* preço */}</section>
      <section className={styles.actions}>{/* quantidade e CTAs */}</section>
    </article>
  </main>
</ProductStyle>
"""))
story.append(P("As chaves `{}` dentro do JSX mudam do modo marcação para o modo JavaScript. Por isso `{product.name}` lê uma variável, enquanto `product.name` escrito sem chaves seria texto literal. Comentários em JSX usam `{/* ... */}` porque também precisam entrar no modo JavaScript. O fechamento `/>` indica um elemento sem filhos; o fechamento `</article>` encerra um elemento que contém outros nós.", "BodyGuide"))
story.append(PageBreak())

# 6 Grid
story.append(P("6. Faça o Grid resolver a macroestrutura", "H1Guide"))
story.append(P("Use Grid para relações bidimensionais estáveis: galeria ao lado de informação, miniaturas ao lado da foto. Use Flexbox quando a relação principal for uma linha ou coluna de conteúdo: meta com estoque, seletor com botões, texto do preço. Essa distinção evita usar uma ferramenta por hábito. A grade externa precisa permitir que o lado da fotografia encolha sem criar overflow e, ao mesmo tempo, proteger uma largura mínima confortável para o painel de leitura.", "BodyGuide"))
story += figure(FIGURES[4], "Figura 6. O significado de cada trilha na grade principal.")
story.append(code("""
.page {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(420px, 1.1fr);
  min-height: min(820px, calc(100vh - 80px));
  background: var(--color-ink-soft);
}

.gallery {
  display: grid;
  grid-template-columns: 132px minmax(0, 1fr);
  min-width: 0;
}
"""))
story.append(P("`minmax(mínimo, máximo)` cria uma trilha com limites. `minmax(0, 1fr)` diz: esta coluna pode encolher até zero na matemática do Grid e recebe uma fração do espaço livre. O zero evita que o tamanho mínimo implícito do conteúdo empurre a página para fora da viewport. Na segunda coluna, `420px` protege a legibilidade do painel e `1.1fr` lhe dá uma fração ligeiramente maior. Não existe vírgula entre colunas; o espaço separa as duas trilhas. Já dentro de `minmax`, a vírgula separa os dois argumentos da função CSS.", "BodyGuide"))
story.append(callout("Regra de depuração", "Primeiro pinte cada região com uma cor temporária. Se as caixas não ocupam o lugar certo, não ajuste fonte, sombra ou borda. Resolva macroestrutura, depois espaçamento, depois tipografia e somente no fim os detalhes decorativos."))
story.append(PageBreak())

# 7 Gallery
story.append(P("7. Construa a galeria como estado + lista + enquadramento", "H1Guide"))
story.append(P("A galeria possui dois tipos de estado: as imagens disponíveis, que vêm do produto, e a imagem ativa, que muda com a interação. `useState(gallery[0])` cria uma memória local para a URL escolhida. A função `setActiveImage` é a única maneira de pedir ao React uma nova renderização com outro valor. Quando a pessoa clica numa miniatura, o evento `onClick` chama uma função seta que guarda aquela URL; na renderização seguinte, o `src` da imagem principal usa o novo estado.", "BodyGuide"))
story += figure(FIGURES[5], "Figura 7. Três decisões separadas: criar controles, guardar seleção e recortar a foto.")
story.append(code("""
const [activeImage, setActiveImage] = useState(gallery[0]);

{gallery.map((image, index) => (
  <button
    key={`${image}-${index}`}
    type="button"
    className={image === activeImage ? styles.thumbnailActive : styles.thumbnail}
    onClick={() => setActiveImage(image)}
    aria-label={`Mostrar imagem ${index + 1} de ${product.name}`}
    aria-pressed={image === activeImage}
  >
    <img src={image} alt="" />
  </button>
))}
"""))
story.append(P("`map` transforma cada item do array em um elemento React. A propriedade `key` dá identidade estável ao item para que o React compare listas; ela não é exibida no HTML. O template literal usa crases e `${...}` para inserir valores. `aria-pressed` comunica o estado selecionado às tecnologias assistivas. A miniatura recebe `alt=&quot;&quot;` porque o botão já possui um nome acessível completo; repetir a descrição da imagem faria o leitor de tela anunciar informação duplicada.", "BodyGuide"))
story.append(code("""
.hero { min-height: 680px; overflow: hidden; background: #070707; }
.hero img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  display: block;
}
"""))
story.append(P("`object-fit: cover` preserva a proporção da fotografia e corta a sobra necessária para preencher o quadro. `contain` preservaria a imagem inteira, mas poderia criar faixas vazias. `display: block` remove a pequena lacuna de linha-base que imagens inline deixam abaixo de si. A escolha entre cover e contain não é puramente técnica: cover reproduz a referência mais imersiva; contain é mais apropriado quando nenhum detalhe do produto pode ser cortado.", "BodyGuide"))

# 8 Panel
story.append(P("8. Monte o painel comercial na ordem da decisão", "H1Guide"))
story.append(P("O painel não deve ser uma coleção aleatória de textos. Ele guia uma sequência cognitiva: identificar, verificar disponibilidade, construir confiança, entender valor e agir. Tamanho, peso e contraste expressam essa ordem. O título é o maior texto; a categoria é menor e cinza; o estoque usa a cor de destaque; a descrição usa largura limitada para não criar linhas longas; o preço volta a ganhar escala; os botões ocupam a largura disponível para sinalizar ação.", "BodyGuide"))
story += figure(FIGURES[6], "Figura 8. Hierarquia de perguntas que o painel deve responder.")
story.append(code("""
const money = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

<span className={styles.meta}>
  {product.categoryLabel} · Escala {product.scale}
</span>
<h1 className={styles.title}>{product.name}</h1>
<p className={styles.description}>{product.description}</p>
<strong className={styles.price}>{money.format(product.price)}</strong>
"""))
story.append(P("`new Intl.NumberFormat` cria um formatador consciente de localidade. `pt-BR` seleciona convenções brasileiras; `style: &quot;currency&quot;` pede formato monetário; `currency: &quot;BRL&quot;` define real brasileiro. O objeto entre chaves reúne opções nomeadas. Diferentemente de `toFixed(2).replace('.', ',')`, essa API também resolve símbolo, separador de milhar, casas decimais e espaços segundo a localidade.", "BodyGuide"))
story.append(code("""
.info { padding: clamp(36px, 5vw, 76px); color: #f2f2f0; }
.title {
  margin: 22px 0 14px;
  font-size: clamp(42px, 5vw, 76px);
  line-height: .94;
  text-transform: uppercase;
}
.description { max-width: 64ch; color: #dddddd; line-height: 1.45; }
.price { display: block; font-size: clamp(46px, 5vw, 72px); }
"""))
story.append(P("`clamp(mínimo, preferido, máximo)` cria tipografia fluida sem permitir extremos. `64ch` limita a linha a aproximadamente 64 caracteres com base na largura do caractere zero da fonte, oferecendo uma medida mais ligada à leitura do que pixels fixos. `line-height: .94` aproxima linhas de um título grande; na descrição, `1.45` abre espaço para leitura contínua.", "BodyGuide"))

# 9 Quantity
story.append(P("9. Quantidade só está pronta quando chega ao carrinho", "H1Guide"))
story.append(P("Um seletor visual que mostra `2` mas chama `onAddToCart(id)` apenas uma vez cria duas verdades diferentes: a tela afirma uma quantidade, o estado global recebe outra. O contrato da função precisa carregar o mesmo significado que a interface mostra. A opção recomendada é evoluir `onAddToCart` para receber `quantity`; o componente detalhado decide a quantidade desejada e o `App` continua responsável por validar estoque e atualizar o carrinho.", "BodyGuide"))
story += figure(FIGURES[7], "Figura 9. O valor quantity precisa atravessar todas as camadas até CartLine.qty.")
story.append(code("""
interface ItemProps {
  products: Product[];
  onAddToCart: (id: string, quantity: number) => void;
}

const [quantity, setQuantity] = useState(1);
const maxQuantity = product.stock ?? Number.POSITIVE_INFINITY;

function increment() {
  setQuantity((current) => Math.min(maxQuantity, current + 1));
}

function decrement() {
  setQuantity((current) => Math.max(1, current - 1));
}

function addSelectedQuantity() {
  onAddToCart(product.id, quantity);
}
"""))
story.append(P("A forma `setQuantity((current) => ...)` é uma atualização funcional. React entrega o valor mais recente a `current`, evitando depender de uma captura antiga quando vários cliques são processados próximos. `Math.min` impede ultrapassar o estoque; `Math.max` impede cair abaixo de um. O operador `??` usa o valor da direita apenas quando o da esquerda é `null` ou `undefined`; aqui, estoque nulo representa disponibilidade sem limite numérico.", "BodyGuide"))
story.append(code("""
function addToCart(id: string, amount = 1) {
  const product = products.find((item) => item.id === id);
  if (!product || product.stock === 0) return;

  setCart((current) => {
    const existing = current.find((line) => line.id === id);
    const desired = (existing?.qty ?? 0) + amount;
    const nextQty = product.stock === null
      ? desired
      : Math.min(desired, product.stock);

    return existing
      ? current.map((line) => line.id === id ? { ...line, qty: nextQty } : line)
      : [...current, { id, qty: nextQty }];
  });
}
"""))
story.append(P("`...line` é o operador spread: copia as propriedades do objeto existente antes de substituir `qty`. `...current` copia os elementos do array antes de anexar uma nova linha. Esse padrão mantém imutabilidade: em vez de alterar o objeto anterior, cria um novo valor, permitindo que React detecte a mudança. A regra de estoque continua no `App`, porque todo ponto de entrada no carrinho deve obedecer à mesma restrição.", "BodyGuide"))

# 10 Responsive
story.append(P("10. Responsividade é reorganizar prioridades", "H1Guide"))
story.append(P("Reduzir tudo proporcionalmente não produz uma boa tela móvel. Em largura estreita, fotografia e informação não cabem lado a lado; a decisão correta é mudar a ordem espacial sem mudar a ordem semântica. A galeria vem primeiro para manter contexto, o painel vem depois, as miniaturas passam de coluna vertical para faixa horizontal e os botões ocupam largura total. O título usa `clamp`; o padding diminui; a altura da foto passa a ser controlada por `aspect-ratio`.", "BodyGuide"))
story += figure(FIGURES[8], "Figura 10. Três composições para o mesmo conteúdo, sem duplicar JSX.")
story.append(code("""
@media (max-width: 1000px) {
  .page { grid-template-columns: 1fr; }
  .gallery { min-height: auto; }
  .hero { aspect-ratio: 4 / 5; min-height: 0; }
}

@media (max-width: 700px) {
  .gallery { grid-template-columns: 1fr; }
  .thumbnails {
    grid-row: 2;
    display: flex;
    overflow-x: auto;
    padding: 10px;
  }
  .thumbnail { flex: 0 0 82px; aspect-ratio: 4 / 5; }
  .info { padding: 32px 22px 48px; }
  .actionRow { grid-template-columns: 1fr; }
}
"""))
story.append(P("`@media (max-width: 700px)` ativa as regras apenas quando a viewport tem no máximo 700 pixels. `grid-row: 2` move as miniaturas para a segunda linha da grade. `overflow-x: auto` cria rolagem horizontal somente quando necessária. `flex: 0 0 82px` significa: não crescer, não encolher e usar base de 82 pixels. O ponto de quebra deve ser escolhido quando o conteúdo deixa de caber, não apenas por um modelo específico de aparelho; neste projeto, 700px coincide com o token de mobile já existente.", "BodyGuide"))

# 11 loading/accessibility/debug
story.append(P("11. Estados, acessibilidade e depuração", "H1Guide"))
story.append(P("Uma página detalhada não possui apenas o estado “produto encontrado”. Ela pode estar carregando, falhar na API, receber um ID inexistente, ter estoque zero ou imagem quebrada. Esses estados precisam ser modelados antes do acabamento. Enquanto carrega, mantenha uma estrutura de altura semelhante para evitar salto de layout. Em erro, ofereça uma mensagem e caminho de volta. Em estoque zero, desabilite ações e explique o motivo. Para imagens, use `alt` significativo na foto principal e `alt=&quot;&quot;` nas miniaturas cujo botão já possui nome acessível.", "BodyGuide"))
story.append(code("""
if (loading) {
  return <ProductDetailSkeleton aria-label="Carregando produto" />;
}

if (error) {
  return <StatusPage title="Não foi possível carregar o produto" />;
}

if (!product) {
  return <StatusPage title="Produto não encontrado" />;
}
"""))
story.append(P("Botões de `−` e `+` precisam de `aria-label`, porque o caractere isolado pode não explicar a ação. A miniatura ativa recebe `aria-pressed`. O foco visível não deve ser removido; use `:focus-visible` para desenhar contorno verde quando a navegação ocorre por teclado. A preferência global `prefers-reduced-motion` já desativa transições no projeto, então qualquer animação nova deve continuar sob esse escopo, em vez de ignorá-lo.", "BodyGuide"))
story.append(code("""
.button:focus-visible,
.thumbnail:focus-visible {
  outline: 3px solid var(--color-accent);
  outline-offset: 3px;
}

.button:disabled {
  cursor: not-allowed;
  opacity: .45;
}
"""))
story.append(callout("Como depurar sem adivinhar", "1) confirme a URL e productId; 2) inspecione product no React DevTools; 3) confirme que o elemento existe no DOM; 4) pinte as caixas; 5) verifique regras CSS riscadas; 6) teste 1440px, 900px, 700px e 390px; 7) navegue apenas com Tab; 8) só então refine microespaçamentos."))

# 12 Implementation sequence
story.append(P("12. Sequência prática para chegar ao resultado", "H1Guide"))
steps = [
    ("Passo 1 — preserve o fluxo que funciona", "Mantenha a rota `/products/:productId`, o hook de seleção e o callback do carrinho. Remova apenas o uso indevido de ProductCard styles e o className que recebe ProductStyle."),
    ("Passo 2 — crie vocabulário próprio", "No estilo de ProductDetail, defina classes page, gallery, thumbnails, thumbnail, thumbnailActive, hero, info, metaRow, title, description, priceBlock, actions, quantity e buyButton. Nomes devem expressar responsabilidade, não aparência acidental."),
    ("Passo 3 — monte a árvore sem acabamento", "Renderize todas as regiões com textos e botões. Use backgrounds temporários. Confirme que o produto correto aparece e que cada botão executa a ação esperada."),
    ("Passo 4 — resolva a grade externa", "Aplique duas colunas no desktop e uma no breakpoint. Não ajuste tipografia antes de as regiões ocuparem a geometria correta."),
    ("Passo 5 — resolva a galeria", "Crie gallery e activeImage, transforme imagens em botões e escolha cover ou contain conscientemente. Teste pelo menos uma imagem vertical e uma horizontal."),
    ("Passo 6 — componha a hierarquia comercial", "Formate meta, título, estoque, avaliação, descrição, oferta, preço e parcelas. Use dados reais ou fallbacks explicitamente provisórios."),
    ("Passo 7 — conecte quantidade ao App", "Mude o contrato do callback para transportar quantity. Centralize a validação de estoque no App e mantenha CartLine como a fonte global."),
    ("Passo 8 — valide estados e acessibilidade", "Teste loading, 404, erro, sem estoque, teclado e foco. Adicione labels e desabilite ações impossíveis."),
    ("Passo 9 — valide o projeto", "Execute lint e build. Depois compare desktop e mobile lado a lado com a referência, corrigindo primeiro proporção, depois ritmo e por último detalhes."),
]
for title, body in steps:
    story.append(KeepTogether([P(title, "H2Guide"), P(body, "BodyGuide")]))
story.append(PageBreak())

# Final code skeleton
story.append(P("13. Esqueleto final do componente", "H1Guide"))
story.append(P("O trecho abaixo reúne as decisões centrais sem fingir que os campos ainda inexistentes já chegam da API. Ele usa `imageUrl` como fallback, preserva os campos atuais e deixa pontos claros para evolução. Adapte o callback do carrinho em conjunto com o `App`; não mude apenas a assinatura local.", "BodyGuide"))
story.append(code("""
import { useState } from "react";
import { Product } from "../../types/product";
import useGetProduct from "../../hooks/useUrlParser";
import styles, { ProductStyle } from "../../style/components/Product";

interface ItemProps {
  products: Product[];
  onAddToCart: (id: string, quantity: number) => void;
}

const money = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

export default function ProductDetail({ products, onAddToCart }: ItemProps) {
  const product = useGetProduct(products);
  const gallery = product ? [product.imageUrl] : [];
  const [activeImage, setActiveImage] = useState(gallery[0] ?? "");
  const [quantity, setQuantity] = useState(1);

  if (!product) return <p>Produto não encontrado</p>;

  const stockLabel = product.stock === null
    ? "Sob encomenda"
    : `${product.stock} uni.`;

  return (
    <ProductStyle>
      <main className={styles.page}>
        <section className={styles.gallery} aria-label="Galeria do produto">
          <nav className={styles.thumbnails} aria-label="Imagens do produto">
            {gallery.map((image, index) => (
              <button
                key={image}
                type="button"
                className={styles.thumbnail}
                onClick={() => setActiveImage(image)}
                aria-label={`Mostrar imagem ${index + 1}`}
                aria-pressed={image === activeImage}
              >
                <img src={image} alt="" />
              </button>
            ))}
          </nav>
          <figure className={styles.hero}>
            <img src={activeImage || product.imageUrl} alt={product.alt || product.name} />
          </figure>
        </section>

        <article className={styles.info}>
          <div className={styles.metaRow}>
            <span>{product.categoryLabel} · Escala {product.scale}</span>
            <span className={styles.stock}>{stockLabel}</span>
          </div>
          <h1 className={styles.title}>{product.name}</h1>
          <p className={styles.material}>{product.material}</p>
          <strong className={styles.price}>{money.format(product.price)}</strong>

          <div className={styles.actionRow}>
            <div className={styles.quantity}>
              <button type="button" onClick={() => setQuantity(q => Math.max(1, q - 1))} aria-label="Diminuir quantidade">−</button>
              <output aria-live="polite">{quantity}</output>
              <button type="button" onClick={() => setQuantity(q => q + 1)} aria-label="Aumentar quantidade">+</button>
            </div>
            <button type="button" onClick={() => onAddToCart(product.id, quantity)} disabled={product.stock === 0}>
              {product.stock === 0 ? "Esgotado" : "Adicionar ao carrinho"}
            </button>
          </div>
        </article>
      </main>
    </ProductStyle>
  );
}
"""))
story.append(callout("Atenção sobre useState", "Se gallery depender de dados que chegam depois, o estado inicial não é recalculado automaticamente. Em uma implementação completa, sincronize activeImage quando o product.id mudar ou remonte o componente com key. Esse detalhe é mais um motivo para distinguir loading de not found."))

# Checklist
story.append(P("14. Checklist de conclusão", "H1Guide"))
check_rows = [
    ["Camada", "Pergunta de verificação"],
    ["Rota", "productId tem o mesmo nome na rota e em useParams?"],
    ["Dados", "A API fornece todos os textos e imagens ou os fallbacks estão explícitos?"],
    ["Estrutura", "Galeria e painel são irmãos; miniaturas e hero são filhos da galeria?"],
    ["Grid", "As colunas usam espaços, minmax e min-width: 0 sem overflow?"],
    ["Imagem", "O recorte foi escolhido conscientemente entre cover e contain?"],
    ["Ações", "A quantidade visível é a mesma enviada ao estado global?"],
    ["Estoque", "Zero desabilita; null representa sob encomenda; limite numérico é respeitado?"],
    ["Responsivo", "A hierarquia funciona em 1440, 900, 700 e 390px?"],
    ["Acessibilidade", "Há alt, aria-label, aria-pressed e foco visível?"],
    ["Qualidade", "npm run lint e npm run build terminam sem erro?"],
]
table = Table(check_rows, colWidths=[34 * mm, 136 * mm], repeatRows=1)
table.setStyle(TableStyle([
    ("BACKGROUND", (0, 0), (-1, 0), INK),
    ("TEXTCOLOR", (0, 0), (-1, 0), ACCENT),
    ("FONTNAME", (0, 0), (-1, 0), FONT_BOLD),
    ("FONTNAME", (0, 1), (0, -1), FONT_BOLD),
    ("FONTNAME", (1, 1), (-1, -1), FONT),
    ("FONTSIZE", (0, 0), (-1, -1), 8),
    ("LEADING", (0, 0), (-1, -1), 11),
    ("GRID", (0, 0), (-1, -1), 0.5, BORDER),
    ("BACKGROUND", (0, 1), (-1, -1), colors.white),
    ("VALIGN", (0, 0), (-1, -1), "TOP"),
    ("LEFTPADDING", (0, 0), (-1, -1), 6),
    ("RIGHTPADDING", (0, 0), (-1, -1), 6),
    ("TOPPADDING", (0, 0), (-1, -1), 6),
    ("BOTTOMPADDING", (0, 0), (-1, -1), 6),
]))
story.append(table)
story.append(Spacer(1, 8 * mm))
story.append(callout("Definição de pronto", "O resultado não está pronto apenas porque se parece com a referência em uma largura. Ele está pronto quando o produto correto vem da URL, os dados têm origem clara, o carrinho recebe a quantidade certa, a página continua utilizável sem mouse e o layout se reorganiza sem perder hierarquia."))
story.append(P("Arquivos estudados", "H2Guide"))
story.append(P("`src/components/ProductDetail/index.tsx`; `src/style/components/Product/index.ts`; `src/hooks/useUrlParser.tsx`; `src/routes/index.tsx`; `src/App.tsx`; `src/services/api.ts`; `src/types/product.ts`; `src/style/theme.ts`; `src/style/GlobalStyles.ts`; `src/components/ProductCard/index.tsx`.", "SmallGuide"))
story.append(P("Observação de escopo", "H2Guide"))
story.append(P("Este PDF é um guia de implementação e raciocínio. Ele não altera os arquivos em edição do ProductDetail. Os mockups são ilustrações explicativas construídas com o asset real do projeto; não são capturas de um build validado no navegador.", "SmallGuide"))


doc = GuideDoc(str(PDF_PATH))
doc.build(story)
print(PDF_PATH)
