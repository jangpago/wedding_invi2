# 모바일 청첩장 템플릿

Next.js 기반 모바일 청첩장. Fork하고 설정만 바꾸면 나만의 청첩장 완성!

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/jangpago/wedding_invi2&env=NEXT_PUBLIC_FIREBASE_API_KEY,NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,NEXT_PUBLIC_FIREBASE_PROJECT_ID,NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,NEXT_PUBLIC_FIREBASE_APP_ID&envDescription=Firebase%20%EC%84%A4%EC%A0%95%20(%EB%B0%A9%EB%AA%85%EB%A1%9D%20%EA%B8%B0%EB%8A%A5%EC%9A%A9%20-%20%EC%84%A0%ED%83%9D%EC%82%AC%ED%95%AD)&envLink=https://console.firebase.google.com&project-name=my-wedding&repository-name=my-wedding-invitation)

---

## 기능

- 모바일 최적화 반응형 디자인
- 인트로 애니메이션 (Framer Motion)
- D-day 카운트다운 캘린더
- 갤러리 + 핀치투줌 사진 확대 (Swiper)
- 카카오맵 + 네이버맵 연동
- 축의금 계좌 정보 (양가 각각)
- 카카오톡 공유
- 방명록 (Firebase Firestore)

---

## 빠른 시작

### 방법 1: Vercel 원클릭 배포

위의 **Deploy with Vercel** 버튼을 클릭하세요. Fork + 배포가 자동으로 진행됩니다.

### 방법 2: 직접 설치

```bash
git clone https://github.com/YOUR_USERNAME/wedding-invitation.git
cd wedding-invitation
npm install
cp .env.example .env.local
npm run dev
```

[http://localhost:3000](http://localhost:3000) 에서 확인할 수 있습니다.

---

## 커스터마이징 체크리스트

아래 항목을 순서대로 따라하면 나만의 청첩장이 완성됩니다.

- [ ] **`src/config/wedding.ts`** 수정 — 이름, 날짜, 장소, 계좌, 인사말
- [ ] **`public/images/gallery/`** — 웨딩 사진 추가 (JPG/PNG)
- [ ] **`public/images/og-image.jpg`** — 카카오톡 공유 시 미리보기 이미지 (1200x630px 권장)
- [ ] **`.env.local`** — Firebase 키 설정 (방명록 사용 시)
- [ ] **`public/favicon.ico`** — 파비콘 교체 (선택)

> `WEDDING_INFO.md` 파일에 정보를 먼저 정리한 후 `wedding.ts`에 옮기면 편합니다.

---

## 설정 파일 가이드 (`src/config/wedding.ts`)

이 파일 하나만 수정하면 청첩장의 모든 내용이 바뀝니다.

### 신랑/신부 정보

| 필드 | 설명 | 예시 |
|------|------|------|
| `groom.name` | 신랑 이름 | `'김민준'` |
| `groom.phone` | 신랑 전화번호 | `'010-1234-5678'` |
| `groom.parents.father.name` | 신랑 아버지 이름 | `'김철수'` |
| `groom.parents.father.phone` | 신랑 아버지 전화번호 | `'010-1111-2222'` |
| `groom.parents.mother.name` | 신랑 어머니 이름 | `'박영희'` |
| `groom.parents.mother.phone` | 신랑 어머니 전화번호 | `'010-3333-4444'` |
| `groom.account.bank` | 신랑 계좌 은행 | `'카카오뱅크'` |
| `groom.account.accountNumber` | 신랑 계좌번호 | `'3333-01-1234567'` |
| `bride.name` | 신부 이름 | `'이서연'` |
| `bride.phone` | 신부 전화번호 | `'010-5678-1234'` |

> 신부 쪽도 동일한 구조입니다. `bride.parents`, `bride.account`, `bride.parentsAccounts` 항목을 채워주세요.

### 결혼식 정보

| 필드 | 설명 | 예시 |
|------|------|------|
| `wedding.date` | 결혼식 날짜/시간 | `new Date('2026-06-20T13:00:00')` |
| `wedding.time` | 표시용 시간 텍스트 | `'오후 1시'` |
| `wedding.venue.name` | 예식장 이름 | `'더 라움'` |
| `wedding.venue.hall` | 홀/층 | `'그랜드볼룸'` |
| `wedding.venue.address` | 예식장 주소 | `'서울 강남구 역삼로 219'` |
| `wedding.venue.coordinates.lat` | 예식장 위도 | `37.4967` |
| `wedding.venue.coordinates.lng` | 예식장 경도 | `127.0382` |
| `wedding.venue.transportation.subway` | 지하철 교통편 | `'2호선 역삼역 3번 출구...'` |

> 위도/경도는 [카카오맵](https://map.kakao.com)이나 [네이버맵](https://map.naver.com)에서 확인하세요.

### 갤러리

| 필드 | 설명 | 예시 |
|------|------|------|
| `gallery` | 사진 배열 | 아래 참고 |

```typescript
gallery: [
  { src: '/images/gallery/photo1.jpg', alt: '웨딩 사진 1' },
  { src: '/images/gallery/photo2.jpg', alt: '웨딩 사진 2' },
],
```

1. `public/images/gallery/` 폴더에 사진 파일을 넣습니다.
2. `wedding.ts`의 `gallery` 배열에 경로를 추가합니다.
3. 사진이 없으면 기본 플레이스홀더 이미지가 표시됩니다.

### 메타 정보 (카카오톡 공유)

| 필드 | 설명 | 예시 |
|------|------|------|
| `meta.title` | 페이지 제목 | `'김민준 ♥ 이서연 결혼합니다'` |
| `meta.description` | 페이지 설명 | `'2026년 6월 20일 토요일 오후 1시, 더 라움'` |
| `meta.ogImage` | 공유 이미지 경로 | `'/images/og-image.jpg'` |

---

## 환경 변수

`.env.example` 파일을 `.env.local`로 복사한 후 값을 채워주세요.

| 변수명 | 필수 | 설명 |
|--------|------|------|
| `NEXT_PUBLIC_FIREBASE_API_KEY` | 선택 | Firebase API 키 |
| `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN` | 선택 | Firebase 인증 도메인 |
| `NEXT_PUBLIC_FIREBASE_PROJECT_ID` | 선택 | Firebase 프로젝트 ID |
| `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET` | 선택 | Firebase 스토리지 버킷 |
| `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID` | 선택 | Firebase 메시징 발신자 ID |
| `NEXT_PUBLIC_FIREBASE_APP_ID` | 선택 | Firebase 앱 ID |

> 방명록 기능이 필요 없다면 환경 변수를 설정하지 않아도 됩니다.

### Firebase 설정 방법

1. [Firebase Console](https://console.firebase.google.com)에서 프로젝트 생성
2. **Firestore Database** 활성화
3. 프로젝트 설정 > 일반 > 내 앱 > **웹 앱 추가**
4. 표시되는 설정값을 `.env.local`에 복사

---

## 배포

### Vercel (권장)

1. 이 저장소를 Fork합니다.
2. [Vercel](https://vercel.com)에서 Fork한 저장소를 Import합니다.
3. 환경 변수를 설정합니다 (방명록 사용 시).
4. **Deploy** 클릭.

또는 위의 **Deploy with Vercel** 버튼을 사용하세요.

### 기타

Next.js를 지원하는 모든 플랫폼에서 배포할 수 있습니다 (Netlify, AWS Amplify 등).

```bash
npm run build
```

---

## 프로젝트 구조

```
├── src/
│   ├── app/
│   │   ├── layout.tsx          # 레이아웃 (메타태그, 폰트)
│   │   ├── page.tsx            # 메인 페이지 (섹션 조합)
│   │   └── globals.css         # 글로벌 스타일
│   ├── components/sections/
│   │   ├── IntroSection.tsx    # 인트로 애니메이션
│   │   ├── HeroSection.tsx     # 메인 히어로
│   │   ├── GreetingSection.tsx # 인사말
│   │   ├── CalendarSection.tsx # 캘린더 + D-day
│   │   ├── MapSection.tsx      # 오시는 길 (카카오맵)
│   │   ├── GallerySection.tsx  # 갤러리 (Swiper)
│   │   ├── AccountSection.tsx  # 축의금 계좌
│   │   ├── ContactSection.tsx  # 연락처
│   │   ├── GuestbookSection.tsx# 방명록 (Firebase)
│   │   ├── ShareSection.tsx    # 카카오톡 공유
│   │   └── FooterSection.tsx   # 푸터
│   ├── config/
│   │   └── wedding.ts          # ⭐ 설정 파일 (여기만 수정!)
│   ├── lib/
│   │   ├── firebase.ts         # Firebase 초기화
│   │   └── utils.ts            # 유틸리티 함수
│   └── types/
│       └── index.ts            # TypeScript 타입 정의
├── public/
│   └── images/
│       └── gallery/            # 📸 웨딩 사진을 여기에!
├── .env.example                # 환경 변수 템플릿
├── WEDDING_INFO.md             # 정보 정리용 템플릿
└── package.json
```

---

## 기술 스택

- **Next.js 15** — React 프레임워크
- **Tailwind CSS** — 스타일링
- **Framer Motion** — 애니메이션
- **Swiper** — 갤러리 슬라이더 + 핀치투줌
- **Firebase Firestore** — 방명록 데이터베이스
- **TypeScript** — 타입 안전성

---

## 라이선스

MIT License — 자유롭게 사용하세요.
