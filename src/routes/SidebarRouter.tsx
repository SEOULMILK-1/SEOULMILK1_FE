import HomeGrayIcon from '../../public/Icon/HomeGrayIcon';
import HomeIcon from '../../public/Icon/HomeIcon';
import SpeakerGray from '../../public/Icon/SpeakerGray';
import TaxIconGray from '../../public/Icon/TaxIconGray';
import TaxIcon from '../../public/Icon/TaxIcon';
import ErrorGray from '../../public/Icon/ErrorGray';
import Error from '../../public/Icon/Error';
import HQIcon from '../../public/Icon/CustomerIcon';
import UserIcon from '../../public/Icon/UserIcon';

export interface MenuItem {
  name: string;
  path: string;
  icon: React.ReactNode;
  selectedIcon: React.ReactNode;
}

// 관리자 메뉴
export const adminMenuItems: MenuItem[] = [
  { name: '홈', path: '/', icon: <HomeGrayIcon />, selectedIcon: <HomeIcon /> },
  {
    name: '게시판 관리',
    path: '',
    icon: <SpeakerGray />,
    selectedIcon: <SpeakerGray color="#009856" />
  },
  {
    name: '유저 관리',
    path: '/user-manage',
    icon: <UserIcon />,
    selectedIcon: <UserIcon primaryColor="#009856" secondaryColor="#4CC584" />
  },
  {
    name: '세금계산서 조회',
    path: '',
    icon: <TaxIconGray />,
    selectedIcon: <TaxIcon />
  },
  {
    name: '지급결의서 조회',
    path: '',
    icon: <ErrorGray />,
    selectedIcon: <Error />
  }
];

// 본사 메뉴
export const HQMenuItems: MenuItem[] = [
  { name: '홈', path: '', icon: <HomeGrayIcon />, selectedIcon: <HomeIcon /> },
  {
    name: '세금계산서 조회',
    path: '/tax',
    icon: <TaxIconGray />,
    selectedIcon: <TaxIcon />
  },
  {
    name: '지급결의서 조회',
    path: '',
    icon: <ErrorGray />,
    selectedIcon: <Error />
  },
  {
    name: '고객센터',
    path: '/head-customer',
    icon: <HQIcon />,
    selectedIcon: <HQIcon primaryColor="#009856" secondaryColor="#4CC584" />
  }
];

// 대리점 메뉴
export const CSMenuItems: MenuItem[] = [
  { name: '홈', path: '', icon: <HomeGrayIcon />, selectedIcon: <HomeIcon /> },
  {
    name: '세금계산서 조회',
    path: '/cs-home',
    icon: <TaxIconGray />,
    selectedIcon: <TaxIcon />
  }
];
