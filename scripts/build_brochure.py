from pathlib import Path
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import landscape, A4
from reportlab.lib.colors import HexColor
from reportlab.lib.utils import ImageReader
from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'public' / 'brochure' / 'ai-bunker-house-tacoma-brochure.pdf'
CACHE = ROOT / 'tmp' / 'pdfs' / 'image-cache'
CACHE.mkdir(parents=True, exist_ok=True)
W, H = landscape(A4)
NAVY = HexColor('#07111D')
NAVY2 = HexColor('#102431')
PAPER = HexColor('#EFF2EF')
INK = HexColor('#0C1721')
EMERALD = HexColor('#55D7B2')
GOLD = HexColor('#E8BB68')
MUTED = HexColor('#83939D')
LINE = HexColor('#2A3B47')

font_candidates = [
    ('Malgun', Path('C:/Windows/Fonts/malgun.ttf')),
    ('MalgunBold', Path('C:/Windows/Fonts/malgunbd.ttf')),
]
for name, path in font_candidates:
    if not path.exists():
        raise FileNotFoundError(f'Korean font not found: {path}')
    pdfmetrics.registerFont(TTFont(name, str(path)))

def pdf_image(path):
    cached = CACHE / f'{path.stem}.jpg'
    if not cached.exists() or cached.stat().st_mtime < path.stat().st_mtime:
        with Image.open(path) as source:
            image = source.convert('RGB')
            if image.width > 1600:
                image = image.resize((1600, round(image.height * 1600 / image.width)), Image.Resampling.LANCZOS)
            image.save(cached, 'JPEG', quality=82, optimize=True, progressive=True)
    return cached

def draw_image_cover(c, path, x, y, w, h, shade=0):
    source = pdf_image(path)
    with Image.open(source) as im:
        iw, ih = im.size
    scale = max(w / iw, h / ih)
    sw, sh = iw * scale, ih * scale
    c.drawImage(ImageReader(str(source)), x + (w - sw) / 2, y + (h - sh) / 2, sw, sh, mask='auto')
    if shade:
        c.setFillColor(NAVY)
        c.setFillAlpha(shade)
        c.rect(x, y, w, h, fill=1, stroke=0)
        c.setFillAlpha(1)

def text(c, value, x, y, size=12, color=INK, font='Malgun', leading=None):
    c.setFont(font, size)
    c.setFillColor(color)
    if '\n' not in value:
        c.drawString(x, y, value)
        return y
    lead = leading or size * 1.45
    for i, line in enumerate(value.splitlines()):
        c.drawString(x, y - i * lead, line)
    return y - (len(value.splitlines()) - 1) * lead

def wrap(c, value, x, y, max_width, size=10, leading=15, color=MUTED, font='Malgun'):
    words = value.split(' ')
    lines, current = [], ''
    for word in words:
        trial = f'{current} {word}'.strip()
        if pdfmetrics.stringWidth(trial, font, size) <= max_width:
            current = trial
        else:
            if current: lines.append(current)
            current = word
    if current: lines.append(current)
    c.setFont(font, size)
    c.setFillColor(color)
    for i, line in enumerate(lines):
        c.drawString(x, y - i * leading, line)
    return y - len(lines) * leading

def header(c, page, section):
    c.setStrokeColor(LINE)
    c.line(38, H - 34, W - 38, H - 34)
    text(c, 'AI BUNKER HOUSE NO.1 · TACOMA JANGSU CONCEPT', 38, H - 25, 6.5, MUTED, 'MalgunBold')
    text(c, f'{page:02d}', W - 54, H - 25, 7, EMERALD, 'MalgunBold')
    text(c, section.upper(), W - 175, H - 25, 6.5, MUTED, 'MalgunBold')

def footer(c):
    text(c, '비공식 건축 콘셉트 · 전문 설계 및 현장 실사 전 · NOT FOR CONSTRUCTION', 38, 20, 6, MUTED, 'MalgunBold')

c = canvas.Canvas(str(OUT), pagesize=(W, H), pageCompression=1)
c.setTitle('AI벙커하우스 1호 - 타코마 장수 리조트 콘셉트 브로슈어')
c.setAuthor('AI Bunker House No.1 Concept Team')

# Cover
hero = ROOT / 'public/images/site/night-arrival-1692.webp'
draw_image_cover(c, hero, 0, 0, W, H, .46)
c.setFillColor(EMERALD); c.rect(42, H - 64, 60, 2, fill=1, stroke=0)
text(c, 'AI BUNKER HOUSE NO.1', 42, H - 52, 8, EMERALD, 'MalgunBold')
text(c, '지상 리조트와 연결된,', 42, H - 150, 26, HexColor('#FFFFFF'), 'Malgun')
text(c, '지하 6층형 144인 레지던스', 42, H - 188, 30, HexColor('#FFFFFF'), 'MalgunBold')
wrap(c, '전북 장수 고원의 입지와 기존 리조트 부지 재생 가능성을 바탕으로 제안하는 5년 자립형 AI 재난대응 레지던스 콘셉트', 42, H - 225, 430, 10, 16, HexColor('#CBD4DA'))
for i, (n, label) in enumerate([('144','PERSONS'),('5','YEARS'),('B6','LEVELS'),('AI','ASSISTED')]):
    x = 42 + i * 105
    text(c, n, x, 58, 19, HexColor('#FFFFFF'), 'MalgunBold')
    text(c, label, x, 43, 5.5, MUTED, 'MalgunBold')
text(c, 'CONCEPT PRESENTATION · 2026.08', W - 190, 42, 6.5, GOLD, 'MalgunBold')
c.showPage()

# Premise
c.setFillColor(PAPER); c.rect(0, 0, W, H, fill=1, stroke=0); header(c, 2, 'Project premise')
text(c, '기존 장소의 기억 위에,', 42, H - 95, 23, INK, 'Malgun')
text(c, '재난 대응형 장기 거주를 설계합니다.', 42, H - 130, 25, INK, 'MalgunBold')
wrap(c, '기존 리조트를 지상 생활·환대 거점으로 재생하고 인접 부지 하부에 6개 기능층을 배치하는 제안입니다. 사람의 존엄, 운영 지속성, 검증 가능한 의사결정을 중심에 둡니다.', 42, H - 165, 470, 9, 15, HexColor('#5A6962'))
cards = [
    ('01','지상은 열린 일상','환대·교육·단기 체류·지역 연계를 담당하는 공개 생활 거점'),
    ('02','지하는 장기 회복력','거주·의료·식량·물·에너지·운영을 분리하고 연결'),
    ('03','검증이 설계의 시작','권리·지질·수문·피난·인허가 전 성능값은 미확정'),
]
for i,(n,title,body) in enumerate(cards):
    x = 42 + i * 252
    c.setFillColor(HexColor('#E1E6E1')); c.rect(x, 60, 230, 185, fill=1, stroke=0)
    text(c, n, x + 18, 220, 7, EMERALD, 'MalgunBold')
    text(c, title, x + 18, 170, 15, INK, 'MalgunBold')
    wrap(c, body, x + 18, 143, 190, 8, 13, HexColor('#66756D'))
c.setFillColor(HexColor('#F4E8CE')); c.rect(550, H - 180, 245, 90, fill=1, stroke=0)
text(c, 'CONCEPT STATUS', 568, H - 112, 6.5, HexColor('#8A6423'), 'MalgunBold')
wrap(c, '공식 사업·판매·예약 페이지가 아닙니다. 운영 상태, 소유·권리, 인허가, 안전성, 수용·자립 성능은 확인·승인되지 않았습니다.', 568, H - 134, 205, 7.5, 12, HexColor('#6C5838'))
footer(c); c.showPage()

# Actual site and landscape tour
c.setFillColor(NAVY); c.rect(0,0,W,H,fill=1,stroke=0); header(c,3,'Actual site & landscape tour')
text(c, '실제 본관에서 출발한 경관 투어', 42, H - 82, 23, HexColor('#FFFFFF'), 'MalgunBold')
text(c, '첫 장면은 제공된 현장 사진 · 나머지는 실제 본관 외관을 기준으로 생성한 AI 경관 재구성', 42, H - 105, 7.5, GOLD, 'MalgunBold')
tour_images = [
    (ROOT / 'docs/reference/tacoma-jangsu-site-photo-2026-08-12.jpeg', '실제 현장 전경 · 2026.08.12', True),
    (ROOT / 'public/images/site/landscape-arrival-1280.webp', '도착 정원 · AI 재구성', False),
    (ROOT / 'public/images/site/garden-walk-1280.webp', '보행 진입 · AI 재구성', False),
    (ROOT / 'public/images/site/healing-terrace-1280.webp', '치유 테라스 · AI 재구성', False),
    (ROOT / 'public/images/site/aerial-masterplan-1280.webp', '경관 조감 · AI 재구성', False),
    (ROOT / 'public/images/site/night-arrival-1280.webp', '야간 경관 · AI 재구성', False),
]
for i,(path,label,is_actual) in enumerate(tour_images):
    col=i%3; row=i//3; x=42+col*255; y=H-290-row*195
    draw_image_cover(c, path, x,y,235,154,.06)
    c.setFillColor(NAVY); c.setFillAlpha(.88); c.rect(x,y,235,26,fill=1,stroke=0); c.setFillAlpha(1)
    text(c,label,x+9,y+9,6.7,GOLD if is_actual else HexColor('#FFFFFF'),'MalgunBold')
text(c,'AI 장면은 현황·측량·설계도·시공 결과를 의미하지 않으며 위치·식재·조명은 전문 검토 전 가정입니다.',42,23,6.3,MUTED,'MalgunBold')
c.showPage()

# Location
c.setFillColor(NAVY); c.rect(0,0,W,H,fill=1,stroke=0); header(c,4,'Location & evidence')
text(c, '주소는 실제로, 판단은 근거와 조건으로.', 42, H - 92, 24, HexColor('#FFFFFF'), 'MalgunBold')
text(c, '전북특별자치도 장수군 계남면 장수로 2662-11', 42, H - 120, 9, EMERALD, 'MalgunBold')
facts = [
    ('확인','장수군 관광 숙박 목록','주소와 전화번호가 공개 목록에 수록. 페이지 자료의 상업적 변경 사용은 제한.'),
    ('확인','장수분지·산악 맥락','공개 문헌은 장수분지를 약 400~500m로 설명. 대상지 표고는 측량 필요.'),
    ('확인','장수 IC 권역 접근','장수군청이 권역별 자동차 접근 경로를 안내. 물류·동절기 운행성은 별도 검토.'),
    ('미확인','현재 운영·권리 상태','공개 목록과 장기 미운영 보도가 상충. 현장·등기·인허가 원문 확인 필요.'),
]
for i,(status,title,body) in enumerate(facts):
    y = H - 180 - i * 76
    c.setFillColor(NAVY2); c.rect(42,y-48,370,62,fill=1,stroke=0)
    text(c, status, 56, y - 4, 7, EMERALD if status=='확인' else GOLD, 'MalgunBold')
    text(c, title, 105, y - 4, 10, HexColor('#FFFFFF'), 'MalgunBold')
    wrap(c, body, 105, y - 21, 285, 6.8, 10, MUTED)
text(c, 'GO / NO-GO 선행조사', 465, H - 178, 8, GOLD, 'MalgunBold')
gates = ['소유·권리·경계','현황측량·시설진단','지질·암반·지하수','사면·배수·집중호우','피난·소방·구조','용도·환경·인허가']
for i,g in enumerate(gates):
    x=465+(i%2)*160; y=H-218-(i//2)*66
    c.setStrokeColor(LINE); c.rect(x,y,145,48,fill=0,stroke=1)
    text(c, f'0{i+1}', x+11,y+29,6,EMERALD,'MalgunBold'); text(c,g,x+11,y+13,8,HexColor('#DCE4E8'),'Malgun')
text(c, 'PUBLIC SOURCES', 465, 116, 7, EMERALD, 'MalgunBold')
sources = ['jangsu.go.kr/tour · 호텔/여관/리조트','jangsu.go.kr · 계남면 찾아오시는길','encykorea.aks.ac.kr · 장수군','korean.visitkorea.or.kr · 과거 시설 소개']
for i,s in enumerate(sources): text(c, s, 465, 96-i*15, 6.3, MUTED)
footer(c); c.showPage()

# Cutaway
c.setFillColor(NAVY); c.rect(0,0,W,H,fill=1,stroke=0); header(c,5,'Architecture')
cutaway = ROOT / 'public/images/renders/actual-site-cutaway-1672.webp'
draw_image_cover(c, cutaway, 0, 0, W, H - 36, .08)
c.setFillColor(NAVY); c.setFillAlpha(.88); c.rect(30,35,355,84,fill=1,stroke=0); c.setFillAlpha(1)
text(c, 'SURFACE × SUBTERRANEAN', 48, 96, 6.5, EMERALD, 'MalgunBold')
text(c, '본관 내부에서 6개 지하층까지', 48, 72, 17, HexColor('#FFFFFF'), 'MalgunBold')
wrap(c, '실제 본관 외관을 참조한 비공식 AI 개념 절개 조감. 지하 시설의 현황·확정 설계·시공 가능성을 나타내지 않습니다.', 48, 52, 315, 6.5, 10, HexColor('#A6B4BD'))
text(c, 'NOT FOR CONSTRUCTION', W-155, 45, 7, GOLD, 'MalgunBold')
c.showPage()

# Floors
c.setFillColor(PAPER); c.rect(0,0,W,H,fill=1,stroke=0); header(c,6,'Floor program')
text(c, '6개 층, 하나의 생활 생태계.', 42, H - 88, 25, INK, 'MalgunBold')
text(c, '총 프로그램 면적 가정 약 13,000㎡ · 실측·법규·설비 조건에 따라 변경', 42, H - 112, 8, HexColor('#65736C'))
floors = [
    ('B1','전환·물류','1,650㎡','보안 진입 · 위생 전환 · 물류 · 관리통제',GOLD),
    ('B2','커먼즈','2,250㎡','식당 · 주방 · 라운지 · 교육·회의',EMERALD),
    ('B3','리빙','2,850㎡','가족실 · 개인실 · 욕실 · 세탁·수납',HexColor('#7EB8FF')),
    ('B4','웰빙·의료','1,800㎡','의료 · 상담 · 피트니스 · 명상·커뮤니티',HexColor('#C7A7FF')),
    ('B5','푸드·워터','2,400㎡','스마트팜 · 종자 · 저온창고 · 정수·재이용',HexColor('#7ED27B')),
    ('B6','코어 시스템','2,050㎡','운영센터 · 전력·배터리 · 공조 · 비상운영',HexColor('#FF896F')),
]
for i,(code,name,area,func,color) in enumerate(floors):
    y=H-162-i*57
    c.setFillColor(HexColor('#E0E5E0')); c.rect(42,y-38,W-84,48,fill=1,stroke=0)
    c.setFillColor(color); c.rect(42,y-38,5,48,fill=1,stroke=0)
    text(c,code,60,y-12,13,color,'MalgunBold'); text(c,name,112,y-10,11,INK,'MalgunBold')
    text(c,area,270,y-10,9,HexColor('#53635B'),'MalgunBold'); text(c,func,360,y-10,8,HexColor('#5F6E66'))
c.setFillColor(HexColor('#F4E8CE')); c.rect(42,38,W-84,38,fill=1,stroke=0)
text(c, 'CONCEPT ASSUMPTION', 56, 54, 6.5, HexColor('#876221'), 'MalgunBold')
text(c, '면적·수용인원·피난·설비용량은 프로그램 검토용 가정이며 전문 설계값이 아닙니다.', 170, 54, 7, HexColor('#6D5935'))
footer(c); c.showPage()

# Systems
c.setFillColor(NAVY); c.rect(0,0,W,H,fill=1,stroke=0); header(c,7,'Five-year operations')
text(c, '5년은 숫자가 아니라 운영 규율입니다.', 42, H-88, 24, HexColor('#FFFFFF'), 'MalgunBold')
wrap(c, '저장·재배·외부 보급·예비 설비를 조합하고, 자원 재고와 품질을 사람이 검증하는 운영 모델입니다. 완전 자립을 보장하지 않습니다.',42,H-116,560,8.5,14,MUTED)
systems=[('주거','144석'),('식량','다중 조달'),('물','다중 수원'),('공기','구역 분리'),('에너지','N+1 개념'),('의료','1차 대응'),('자원순환','분리 처리'),('AI 운영','사람이 최종 결정')]
for i,(title,value) in enumerate(systems):
    x=42+(i%4)*190; y=H-205-(i//4)*105
    c.setStrokeColor(LINE); c.rect(x,y,174,86,fill=0,stroke=1)
    text(c,f'0{i+1}',x+13,y+64,6,MUTED,'MalgunBold'); text(c,title,x+13,y+38,8,MUTED)
    text(c,value,x+13,y+15,12,HexColor('#FFFFFF'),'MalgunBold')
c.setFillColor(NAVY2); c.rect(42,46,W-84,87,fill=1,stroke=0)
text(c,'AI GOVERNANCE',58,105,6.5,EMERALD,'MalgunBold')
text(c,'AI는 감지·예측·제안을 담당하고, 사람은 승인·기록·중단 권한을 가집니다.',58,78,13,HexColor('#FFFFFF'),'MalgunBold')
text(c,'권한 최소화  ·  수동 우회  ·  감사 기록  ·  오프라인 절차',58,58,7,MUTED)
footer(c); c.showPage()

# Visuals
c.setFillColor(PAPER); c.rect(0,0,W,H,fill=1,stroke=0); header(c,8,'Interior concepts')
imgs=[
    ('community-lounge.webp','B2 커먼즈'),('residential-suite.webp','B3 리빙'),('medical-wellbeing.webp','B4 웰빙·의료'),
    ('smart-farm.webp','B5 스마트팜'),('ai-operations.webp','B6 운영센터'),('resort-connection.webp','본관 연결 게이트')]
for i,(name,label) in enumerate(imgs):
    col=i%3; row=i//3; x=42+col*255; y=H-230-row*205
    draw_image_cover(c, ROOT / ('public/images/interiors/'+name) if 'connection' not in name else ROOT / ('public/images/renders/'+name), x,y,235,165,.1)
    c.setFillColor(NAVY); c.setFillAlpha(.84); c.rect(x,y,235,28,fill=1,stroke=0); c.setFillAlpha(1)
    text(c,label,x+10,y+10,7,HexColor('#FFFFFF'),'MalgunBold')
text(c,'모든 이미지는 독자 AI 재구성물이며 현재 시설·확정 설계·성능을 나타내지 않습니다.',42,26,6.5,HexColor('#6D7A73'))
c.showPage()

# Next steps
c.setFillColor(NAVY); c.rect(0,0,W,H,fill=1,stroke=0); header(c,9,'Next steps')
text(c,'다음 단계는 현장 확인에서 시작합니다.',42,H-92,25,HexColor('#FFFFFF'),'MalgunBold')
steps=[('01','권리·현황','소유·경계·영업·용도·시설 상태 원문 확인'),('02','기술 실사','구조·지질·수문·사면·배수·환경 기준선'),('03','사업 게이트','범위·CAPEX/OPEX·단계·운영주체·중단 조건'),('04','설계 착수','건축·구조·MEP·소방·의료·식량 전문팀 통합')]
for i,(n,title,body) in enumerate(steps):
    y=H-160-i*70
    text(c,n,42,y,8,EMERALD,'MalgunBold'); text(c,title,88,y,11,HexColor('#FFFFFF'),'MalgunBold')
    text(c,body,210,y,8,MUTED)
c.setFillColor(NAVY2); c.rect(42,48,W-84,92,fill=1,stroke=0)
text(c,'PROJECT ENQUIRY',60,112,6.5,EMERALD,'MalgunBold')
text(c,'웹사이트 문의 폼에서 사업·투자 검토, 건축·엔지니어링 협업, 부지·운영 협의를 접수합니다.',60,86,10,HexColor('#FFFFFF'),'MalgunBold')
text(c,'개인정보는 문의 응대를 위해 수집하며 최대 1년 보관 후 삭제하는 정책을 전제로 합니다.',60,63,7,MUTED)
text(c,'AI BUNKER HOUSE NO.1',W-220,112,8,GOLD,'MalgunBold')
text(c,'TACOMA JANGSU CONCEPT',W-220,93,6.5,MUTED,'MalgunBold')
footer(c); c.save()
print(OUT)
