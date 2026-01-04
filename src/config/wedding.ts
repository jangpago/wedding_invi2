import { WeddingData } from '@/types';

export const weddingData: WeddingData = {
  groom: {
    name: '장준기',
    phone: '010-5641-5514',
    parents: {
      father: {
        name: '장복식',
        phone: '010-9405-5114',
        relation: '아버지',
      },
      mother: {
        name: '이순희',
        phone: '010-9495-5004',
        relation: '어머니',
      },
    },
    account: {
      bank: '신한은행',
      accountNumber: '110-313-810473',
      holder: '장준기',
    },
    parentsAccounts: [
      {
        bank: '신한은행',
        accountNumber: '110-313-810473',
        holder: '장준기',
      },
      {
        bank: '신한은행',
        accountNumber: '110-313-810473',
        holder: '장준기',
      },
    ],
  },
  bride: {
    name: '김수빈',
    phone: '010-4618-8975',
    parents: {
      father: {
        name: '김현민',
        phone: '010-4618-8975',
        relation: '아버지',
      },
      mother: {
        name: '신희정',
        phone: '',
        relation: '어머니',
      },
    },
    account: {
      bank: '하나은행',
      accountNumber: '110-313-810473',
      holder: '김수빈',
    },
    parentsAccounts: [
      {
        bank: '국민은행',
        accountNumber: '046802-04-276054',
        holder: '김현민',
      },
      {
        bank: '농협은행',
        accountNumber: '1222-02-009682',
        holder: '신희정',
      },
    ],
  },
  wedding: {
    date: new Date('2026-04-05T12:30:00'),
    time: '오후 12시 30분',
    venue: {
      name: '루클라비 더화이트',
      hall: '2층',
      address: '서울 강남구 논현로 742 2층 루클라비 더화이트',
      phone: '',
      coordinates: {
        lat: 37.5178,
        lng: 127.0345,
      },
      transportation: {
        subway: '7호선 학동역 8번 출구에서 도보로 5분 거리에 위치해 있습니다.',
        bus: '셔틀버스는 학동역 8번 출구, 신사역 1번 출구에서 상시 운행 됩니다.',
        car: '서울 강남구 논현로 742 2층 루클라비더화이트',
        etc: '',
      },
    },
  },
  greeting: {
    title: '소중한 분들을 초대합니다',
    message: `서로 다른 길을 걸어온 저희가
이제 같은 곳을 바라보며
한 길을 함께 걸어가려 합니다.

저희 두 사람이 사랑으로 만나
믿음으로 하나 되는 날,
귀한 걸음 하시어
축복해 주시면 감사하겠습니다.`,
  },
  gallery: [
    { src: '/images/IMG_4197.jpg', alt: '웨딩 사진 1' },
    { src: '/images/IMG_4758.jpg', alt: '웨딩 사진 2' },
    { src: '/images/IMG_4911.jpg', alt: '웨딩 사진 3' },
    { src: '/images/IMG_5239.jpg', alt: '웨딩 사진 4' },
    { src: '/images/IMG_5283.jpg', alt: '웨딩 사진 5' },
    { src: '/images/IMG_5601.jpg', alt: '웨딩 사진 6' },
    { src: '/images/IMG_5841.jpg', alt: '웨딩 사진 7' },
    { src: '/images/IMG_5968.jpg', alt: '웨딩 사진 8' },
    { src: '/images/IMG_6163.jpg', alt: '웨딩 사진 9' },
    { src: '/images/IMG_7328.jpg', alt: '웨딩 사진 10' },
    { src: '/images/IMG_7342.jpg', alt: '웨딩 사진 11' },
    { src: '/images/IMG_7493.jpg', alt: '웨딩 사진 12' },
    { src: '/images/IMG_7704.jpg', alt: '웨딩 사진 13' },
    { src: '/images/IMG_7853.jpg', alt: '웨딩 사진 14' },
  ],
  video: {
    url: '/videos/wedding-video.mp4',
    thumbnail: '/images/video-thumbnail.jpg',
  },
  meta: {
    title: '장준기 ♥ 김수빈 결혼합니다',
    description: '2026년 4월 5일 일요일 오후 12시 30분, 루클라비 더화이트',
    ogImage: '/images/og-image.jpg',
  },
};
