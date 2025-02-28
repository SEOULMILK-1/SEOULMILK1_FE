import React, { useState } from 'react';
import SettingIcon from '../../public/Icon/SettingIcon';
import Error from '../../public/Icon/Error';
import ErrorGray from '../../public/Icon/ErrorGray';
import LogoGray from '../../public/Icon/LogoGray';
import HomeGrayIcon from '../../public/Icon/HomeGrayIcon';
import HomeIcon from '../../public/Icon/HomeIcon';
import SpeakerGray from '../../public/Icon/SpeakerGray';
import TaxIconGray from '../../public/Icon/TaxIconGray';
import TaxIcon from '../../public/Icon/TaxIcon';
import NoticeBoard from './NoticeBoard';
import CustomerIcon from '../../public/Icon/CustomerIcon';
import UserIcon from '../../public/Icon/UserIcon';

interface MenuItem {
  name: string;
  icon: React.ReactNode;
  selectedIcon: React.ReactNode;
}

interface RoleProps {
  type: 'admin' | 'customer';
}

//관리자
const adminMenuItems: MenuItem[] = [
  { name: '홈', icon: <HomeGrayIcon />, selectedIcon: <HomeIcon /> },
  {
    name: '게시판 관리',
    icon: <SpeakerGray />,
    selectedIcon: <SpeakerGray />
  },
  { name: '유저 관리', icon: <UserIcon />, selectedIcon: <UserIcon /> },
  {
    name: '세금계산서 조회',
    icon: <TaxIconGray />,
    selectedIcon: <TaxIcon />
  },
  { name: '지급결의서 조회', icon: <ErrorGray />, selectedIcon: <Error /> }
];

//본사-고객
const customerMenuItems: MenuItem[] = [
  { name: '홈', icon: <HomeGrayIcon />, selectedIcon: <HomeIcon /> },
  {
    name: '세금계산서 조회',
    icon: <TaxIconGray />,
    selectedIcon: <TaxIcon />
  },
  { name: '지급결의서 조회', icon: <ErrorGray />, selectedIcon: <Error /> },
  { name: '고객센터', icon: <CustomerIcon />, selectedIcon: <CustomerIcon /> }
];

const Sidebar = ({ type }: RoleProps) => {
  const [selectedMenu, setSelectedMenu] = useState<string>('홈');
  const menuItems = type === 'admin' ? adminMenuItems : customerMenuItems;

  return (
    <div className="w-60 flex flex-col gap-4">
      <aside className="h-[685px] bg-white flex flex-col gap-4 py-2 rounded-3xl">
        <div className="flex justify-between items-center px-5 py-4">
          <div className="flex flex-row gap-2">
            <div className="text-gray-800 font-xl-bold">
              김구름 <span className="text-gray-800 font-xl-regular">님</span>
            </div>
            {type === 'admin' && (
              <span className="flex px-2 py-[2px] justify-center items-center gap-[10px] rounded-3xl bg-primary-50 text-primary-600 font-xs-semibold">
                관리자
              </span>
            )}

            {type === 'customer' && (
              <span className="flex px-2 py-[2px] justify-center items-center gap-[10px] rounded-3xl bg-primary-50 text-primary-600 font-xs-semibold">
                직원
              </span>
            )}
          </div>
          <SettingIcon />
        </div>

        <nav className="flex flex-col mx-2 my-1 gap-1">
          {menuItems.map((item) => (
            <div
              key={item.name}
              className={`h-10 flex items-center gap-2 px-5 py-3 rounded-[13px] cursor-pointer transition ${
                selectedMenu === item.name
                  ? 'bg-primary-50 text-primary-700'
                  : 'text-gray-500 hover:bg-gray-100'
              }`}
              onClick={() => setSelectedMenu(item.name)}
            >
              {selectedMenu === item.name ? item.selectedIcon : item.icon}
              <span className="font-md-medium">{item.name}</span>
            </div>
          ))}
        </nav>

        <div className="flex px-5 py-4 items-center gap-2 mt-auto mb-2">
          <LogoGray />
        </div>
      </aside>

      {/* 공지사항 */}
      <NoticeBoard />
    </div>
  );
};

export default Sidebar;
