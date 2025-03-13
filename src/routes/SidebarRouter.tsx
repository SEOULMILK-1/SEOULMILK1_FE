import HomeGrayIcon from '../../public/Icon/HomeGrayIcon';
import HomeIcon from '../../public/Icon/HomeIcon';
import TaxIconGray from '../../public/Icon/TaxIconGray';
import TaxIcon from '../../public/Icon/TaxIcon';
import HQIcon from '../../public/Icon/CustomerIcon';
import SelectHQIon from '../../public/Icon/SelectHQIon';
import UserIcon from '../../public/Icon/UserIcon';
import PaymentIcon from '../../public/Icon/PaymentIcon';

export interface MenuItem {
  name: string;
  path: string;
  icon: React.ReactNode;
  selectedIcon: React.ReactNode;
}

// 관리자 메뉴
export const adminMenuItems: MenuItem[] = [
  {
    name: '홈',
    path: '/admin/home',
    icon: <HomeGrayIcon />,
    selectedIcon: <HomeIcon />
  },
  // {
  //   name: '게시판 관리',
  //   path: '/admin/admin-board',
  //   icon: <SpeakerGray />,
  //   selectedIcon: <SpeakerGray color="#009856" />
  // },
  {
    name: '유저 관리',
    path: '/admin/user-manage',
    icon: <UserIcon />,
    selectedIcon: <UserIcon primaryColor="#009856" secondaryColor="#4CC584" />
  },
  {
    name: '세금계산서 조회',
    path: '/admin/admin-tax',
    icon: <TaxIconGray />,
    selectedIcon: <TaxIcon />
  },
  {
    name: '지급결의서 조회',
    path: '/admin/admin-payment',
    icon: <PaymentIcon />,
    selectedIcon: (
      <PaymentIcon
        primaryColor="#4CC584"
        secondaryColor="#009856"
        accentColor="#C3EAD2"
      />
    )
  }
];

// 본사 메뉴
export const HQMenuItems: MenuItem[] = [
  {
    name: '홈',
    path: '/hq/home',
    icon: <HomeGrayIcon />,
    selectedIcon: <HomeIcon />
  },
  {
    name: '세금계산서 조회',
    path: '/hq/tax',
    icon: <TaxIconGray />,
    selectedIcon: <TaxIcon />
  },
  {
    name: '지급결의서 조회',
    path: '/hq/payment',
    icon: <PaymentIcon />,
    selectedIcon: (
      <PaymentIcon
        primaryColor="#4CC584"
        secondaryColor="#009856"
        accentColor="#C3EAD2"
      />
    )
  },
  {
    name: '대리점 조회',
    path: '/hq/head-customer',
    icon: <HQIcon />,
    selectedIcon: <SelectHQIon />
  }
];

// 대리점 메뉴
export const CSMenuItems: MenuItem[] = [
  {
    name: '홈',
    path: '/cs/home',
    icon: <HomeGrayIcon />,
    selectedIcon: <HomeIcon />
  },
  {
    name: '세금계산서 조회',
    path: '/cs/tax',
    icon: <TaxIconGray />,
    selectedIcon: <TaxIcon />
  }
];
