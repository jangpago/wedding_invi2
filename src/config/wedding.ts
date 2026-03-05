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
        bank: '기업은행',
        accountNumber: '396-033878-01-016',
        holder: '장복식',
      },
      {
        bank: '신한은행',
        accountNumber: '110-224-014260',
        holder: '이순희',
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
      accountNumber: '850-910106-44707',
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
        lat: 37.51828566776124,
        lng: 127.02922496237763,
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
    { src: '/images/QuickShare_2602221518/IMG_0027.jpg', alt: '웨딩 사진 1' },
    { src: '/images/QuickShare_2602221518/IMG_0177.jpg', alt: '웨딩 사진 2' },
    { src: '/images/QuickShare_2602221518/IMG_0197.jpg', alt: '웨딩 사진 3' },
    { src: '/images/QuickShare_2602221518/IMG_4190.jpg', alt: '웨딩 사진 4' },
    { src: '/images/QuickShare_2602221518/IMG_4853.jpg', alt: '웨딩 사진 5' },
    { src: '/images/QuickShare_2602221518/IMG_5149.jpg', alt: '웨딩 사진 6' },
    { src: '/images/QuickShare_2602221518/IMG_5374.jpg', alt: '웨딩 사진 7' },
    { src: '/images/QuickShare_2602221518/IMG_5601.jpg', alt: '웨딩 사진 8' },
    { src: '/images/QuickShare_2602221518/IMG_5664.jpg', alt: '웨딩 사진 9' },
    { src: '/images/QuickShare_2602221518/IMG_5819.jpg', alt: '웨딩 사진 10' },
    { src: '/images/QuickShare_2602221518/IMG_5876.jpg', alt: '웨딩 사진 11' },
    { src: '/images/QuickShare_2602221518/IMG_6217.jpg', alt: '웨딩 사진 12' },
    { src: '/images/QuickShare_2602221518/IMG_6622.jpg', alt: '웨딩 사진 13' },
    { src: '/images/QuickShare_2602221518/IMG_6758.jpg', alt: '웨딩 사진 14' },
    { src: '/images/QuickShare_2602221518/IMG_6827.jpg', alt: '웨딩 사진 15' },
    { src: '/images/QuickShare_2602221518/IMG_7035.jpg', alt: '웨딩 사진 16' },
    { src: '/images/QuickShare_2602221518/IMG_7153.jpg', alt: '웨딩 사진 17' },
    { src: '/images/QuickShare_2602221518/IMG_7328.jpg', alt: '웨딩 사진 18' },
    { src: '/images/QuickShare_2602221518/IMG_7343.jpg', alt: '웨딩 사진 19' },
    { src: '/images/QuickShare_2602221518/IMG_7660.jpg', alt: '웨딩 사진 20' },
  ],
  video: {
    url: '/videos/wedding-video.mp4',
    thumbnail: '/images/video-thumbnail.jpg',
  },
  meta: {
    title: '장준기 ♥ 김수빈 결혼합니다',
    description: '2026년 4월 5일 일요일 오후 12시 30분, 루클라비 더화이트',
    ogImage: '/images/QuickShare_2602221518/IMG_0027.jpg',
  },
};
