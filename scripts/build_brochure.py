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
    cached = CACHE / f'{path.stem}-visitor-v2.jpg'
    if not cached.exists() or cached.stat().st_mtime < path.stat().st_mtime:
        with Image.open(path) as source:
            image = source.convert('RGB')
            if image.width > 1300:
                image = image.resize((1300, round(image.height * 1300 / image.width)), Image.Resampling.LANCZOS)
            image.save(cached, 'JPEG', quality=76, optimize=True, progressive=True)
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
    text(c, '비공식 AI 건축 콘셉트 · 실제와 AI 재구성 구분 · 전문 설계 및 현장 실사 전', 38, 20, 6, MUTED, 'MalgunBold')

c = canvas.Canvas(str(OUT), pagesize=(W, H), pageCompression=1)
c.setTitle('AI벙커하우스 1호 - 타코마 장수 리조트 콘셉트 브로슈어')
c.setAuthor('AI Bunker House No.1 Concept Team')

# Cover
hero = ROOT / 'public/images/site/defense-front-day-1511.webp'
draw_image_cover(c, hero, 0, 0, W, H, .46)
c.setFillColor(EMERALD); c.rect(42, H - 64, 60, 2, fill=1, stroke=0)
text(c, 'AI BUNKER HOUSE NO.1', 42, H - 52, 8, EMERALD, 'MalgunBold')
text(c, '장수의 산자락 아래,', 42, H - 145, 24, HexColor('#FFFFFF'), 'Malgun')
text(c, '144명이 5년을 살아가는', 42, H - 180, 29, HexColor('#FFFFFF'), 'MalgunBold')
text(c, '방어형 생활기지', 42, H - 215, 29, EMERALD, 'MalgunBold')
wrap(c, '실제 본관을 바탕으로 태양광·보안 로봇·지하 6개 생활층을 결합해 본 비공식 AI 재구성입니다.', 42, H - 245, 430, 9, 15, HexColor('#CBD4DA'))
for i, (n, label) in enumerate([('144','계획 인원'),('5년','운영 목표'),('B6','지하 공간'),('사람','최종 판단')]):
    x = 42 + i * 105
    text(c, n, x, 58, 19, HexColor('#FFFFFF'), 'MalgunBold')
    text(c, label, x, 43, 5.5, MUTED, 'MalgunBold')
text(c, 'CONCEPT PRESENTATION · 2026.08', W - 190, 42, 6.5, GOLD, 'MalgunBold')
c.showPage()

# Project direction
c.setFillColor(PAPER); c.rect(0, 0, W, H, fill=1, stroke=0); header(c, 2, 'Project premise')
text(c, '처음 방문하셨다면,', 42, H - 95, 23, INK, 'Malgun')
text(c, '사람이 머무는 하루부터 상상해 보세요.', 42, H - 130, 23, INK, 'MalgunBold')
wrap(c, '벙커의 두꺼운 벽보다 그 안에서 이어질 식사, 휴식, 건강관리와 일상에 먼저 주목합니다. 기존 본관은 지상 생활 거점으로 활용하고 지하 공간은 조사와 승인을 거쳐 단계적으로 검토합니다.', 42, H - 165, 470, 8.5, 14, HexColor('#5A6962'))
cards = [
    ('01','본관부터 현실적으로 활용','기존 공간은 안전점검 후 숙박·교육·진료·지역 협력에 우선 활용'),
    ('02','지하는 조사 후 단계적으로','지질·지하수·배수·피난 조건을 확인한 뒤 가능한 범위부터 검토'),
    ('03','확인된 내용만 사업에 반영','소유권·안전·인허가·공사비·운영인력 확인 전 성능값은 미확정'),
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
draw_image_cover(c, ROOT / 'public/images/site/visitor-arrival-v1-1280.webp', 550, 260, 245, 140, .04)
c.setFillColor(NAVY); c.setFillAlpha(.82); c.rect(550, 260, 245, 25, fill=1, stroke=0); c.setFillAlpha(1)
text(c, '방문객 시점 AI 재구성 · 실제 본관 사진 참고', 560, 269, 6.5, HexColor('#FFFFFF'), 'MalgunBold')
footer(c); c.showPage()

# Actual site and landscape tour
c.setFillColor(NAVY); c.rect(0,0,W,H,fill=1,stroke=0); header(c,3,'Actual site & landscape tour')
text(c, '실제 본관이 근미래 방어 거점으로 바뀐다면?', 42, H - 82, 23, HexColor('#FFFFFF'), 'MalgunBold')
text(c, '전면 방어부터 외곽 순찰, 옥상 에너지와 야간 경계까지 모두 AI 재구성으로 둘러봅니다.', 42, H - 105, 7.5, GOLD, 'MalgunBold')
tour_images = [
    (ROOT / 'public/images/site/visitor-arrival-v1-1280.webp', '방문객 도착 · AI 재구성', False),
    (ROOT / 'public/images/site/defense-front-day-1280.webp', '전면 방어 · AI 재구성', False),
    (ROOT / 'public/images/site/defense-patrol-walk-1280.webp', '로봇 순찰 · AI 재구성', False),
    (ROOT / 'public/images/site/defense-terrace-1280.webp', '보호 커먼즈 · AI 재구성', False),
    (ROOT / 'public/images/site/defense-aerial-1280.webp', '외곽 방어 · AI 재구성', False),
    (ROOT / 'public/images/site/defense-night-1280.webp', '야간 경계 · AI 재구성', False),
]
for i,(path,label,is_actual) in enumerate(tour_images):
    col=i%3; row=i//3; x=42+col*255; y=H-290-row*195
    draw_image_cover(c, path, x,y,235,154,.06)
    c.setFillColor(NAVY); c.setFillAlpha(.88); c.rect(x,y,235,26,fill=1,stroke=0); c.setFillAlpha(1)
    text(c,label,x+9,y+9,6.7,GOLD if is_actual else HexColor('#FFFFFF'),'MalgunBold')
text(c,'AI 장면은 현황·측량·설계도·시공 결과가 아닙니다. 휴머노이드 경비·봉 소지는 콘셉트 가정이며 공급사·법규·안전 검토 전 미확정입니다.',42,23,6.3,MUTED,'MalgunBold')
c.showPage()

# Location
c.setFillColor(NAVY); c.rect(0,0,W,H,fill=1,stroke=0); header(c,4,'Location & evidence')
text(c, '어디에 있고, 무엇이 확인됐는지 먼저 봅니다.', 42, H - 92, 24, HexColor('#FFFFFF'), 'MalgunBold')
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
text(c, '다음 단계로 가기 전 필수 확인', 465, H - 178, 8, GOLD, 'MalgunBold')
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
cutaway = ROOT / 'public/images/renders/defense-cutaway-1672.webp'
draw_image_cover(c, cutaway, 0, 0, W, H - 36, .08)
c.setFillColor(NAVY); c.setFillAlpha(.88); c.rect(30,35,355,84,fill=1,stroke=0); c.setFillAlpha(1)
text(c, 'SURFACE × SUBTERRANEAN', 48, 96, 6.5, EMERALD, 'MalgunBold')
text(c, '다층 방어선에서 6개 지하층까지', 48, 72, 17, HexColor('#FFFFFF'), 'MalgunBold')
wrap(c, '태양광·풍력·CCTV·철조망·로봇 순찰과 실제 본관 외관을 결합한 비공식 AI 개념 절개 조감입니다.', 48, 52, 315, 6.5, 10, HexColor('#A6B4BD'))
text(c, 'NOT FOR CONSTRUCTION', W-155, 45, 7, GOLD, 'MalgunBold')
c.showPage()

# Floors
c.setFillColor(PAPER); c.rect(0,0,W,H,fill=1,stroke=0); header(c,6,'Floor program')
text(c, '지하 6개 층을 한 층씩 살펴보세요.', 42, H - 88, 25, INK, 'MalgunBold')
text(c, '총 프로그램 면적 가정 약 13,000㎡ · 실측·법규·설비 조건에 따라 변경', 42, H - 112, 8, HexColor('#65736C'))
floors = [
    ('B1','출입·물류층','1,650㎡','출입 확인 · 위생 전환 · 물류 · 안내·관리',GOLD),
    ('B2','식당·커뮤니티층','2,250㎡','공용식당 · 열린 주방 · 라운지 · 교육·회의',EMERALD),
    ('B3','생활·숙소층','2,850㎡','가족실 · 개인실 · 무장애 객실 · 세탁·수납',HexColor('#7EB8FF')),
    ('B4','건강관리층','1,800㎡','건강관리 · 상담 · 운동·재활 · 회복실',HexColor('#C7A7FF')),
    ('B5','식량·물 관리층','2,400㎡','실내 재배 · 종자 · 저온창고 · 정수·재이용',HexColor('#7ED27B')),
    ('B6','에너지·운영층','2,050㎡','통합 관제 · 전력·배터리 · 공조 · 비상운영',HexColor('#FF896F')),
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
text(c, '144명이 오래 머물려면 무엇이 필요할까요?', 42, H-88, 24, HexColor('#FFFFFF'), 'MalgunBold')
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
    ('community-commons-v1-1280.webp','B2 함께 식사하고 쉬는 공간'),('residential-suite.webp','B3 가족과 개인을 위한 숙소'),('medical-wellbeing.webp','B4 건강관리와 회복 공간'),
    ('smart-farm.webp','B5 식량 생산과 물 관리'),('defense-operations-1280.webp','B6 에너지·보안 관제실'),('resort-connection.webp','본관에서 지하로 내려가는 길')]
for i,(name,label) in enumerate(imgs):
    col=i%3; row=i//3; x=42+col*255; y=H-230-row*205
    draw_image_cover(c, ROOT / ('public/images/interiors/'+name) if 'connection' not in name else ROOT / ('public/images/renders/'+name), x,y,235,165,.1)
    c.setFillColor(NAVY); c.setFillAlpha(.84); c.rect(x,y,235,28,fill=1,stroke=0); c.setFillAlpha(1)
    text(c,label,x+10,y+10,7,HexColor('#FFFFFF'),'MalgunBold')
text(c,'모든 이미지는 독자 AI 재구성물이며 현재 시설·확정 설계·성능을 나타내지 않습니다.',42,26,6.5,HexColor('#6D7A73'))
c.showPage()

# Next steps
c.setFillColor(NAVY); c.rect(0,0,W,H,fill=1,stroke=0); header(c,9,'Next steps')
text(c,'아이디어를 실제 사업으로 옮기는 순서',42,H-92,25,HexColor('#FFFFFF'),'MalgunBold')
steps=[('01','권리·현황','소유·경계·영업·용도·시설 상태 원문 확인'),('02','기술 실사','구조·지질·수문·사면·배수·환경 기준선'),('03','사업 게이트','범위·CAPEX/OPEX·단계·운영주체·중단 조건'),('04','설계 착수','건축·구조·MEP·소방·의료·식량 전문팀 통합')]
for i,(n,title,body) in enumerate(steps):
    y=H-160-i*70
    text(c,n,42,y,8,EMERALD,'MalgunBold'); text(c,title,88,y,11,HexColor('#FFFFFF'),'MalgunBold')
    text(c,body,210,y,8,MUTED)
c.setFillColor(NAVY2); c.rect(42,48,W-84,92,fill=1,stroke=0)
text(c,'PROJECT ENQUIRY',60,112,6.5,EMERALD,'MalgunBold')
text(c,'웹사이트에서 방문·현장 확인, 사업 검토, 건축·기술 협업과 지역·운영 협력 문의를 남길 수 있습니다.',60,86,10,HexColor('#FFFFFF'),'MalgunBold')
text(c,'개인정보는 문의 응대를 위해 수집하며 최대 1년 보관 후 삭제하는 정책을 전제로 합니다.',60,63,7,MUTED)
text(c,'AI BUNKER HOUSE NO.1',W-220,112,8,GOLD,'MalgunBold')
text(c,'TACOMA JANGSU CONCEPT',W-220,93,6.5,MUTED,'MalgunBold')
footer(c); c.save()
print(OUT)
