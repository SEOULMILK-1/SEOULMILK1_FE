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

type MenuItem = {
  name: string;
  icon: React.ReactNode;
  selectedIcon: React.ReactNode;
};

const menuItems: MenuItem[] = [
  { name: '홈', icon: <HomeGrayIcon />, selectedIcon: <HomeIcon /> },
  { name: '게시판 관리', icon: <SpeakerGray />, selectedIcon: <SpeakerGray /> },
  { name: '메뉴이름', icon: <ErrorGray />, selectedIcon: <Error /> },
  {
    name: '세금계산서 조회',
    icon: <TaxIconGray />,
    selectedIcon: <TaxIcon />
  },
  { name: '지급 결의서 조회', icon: <ErrorGray />, selectedIcon: <Error /> }
];

const Sidebar = () => {
  const [selectedMenu, setSelectedMenu] = useState<string>('홈');

  return (
    <div className="w-60 flex flex-col gap-4">
      <aside className="h-[685px] bg-white flex flex-col gap-4 py-2 rounded-3xl">
        <div className="flex justify-between items-center px-5 py-4">
          <div className="flex flex-row gap-2">
            <div className="text-gray-800 font-xl-bold">
              김구름 <span className="text-gray-800 font-xl-regular">님</span>
            </div>
            <span className="flex px-2 py-[2px] justify-center items-center gap-[10px] rounded-3xl bg-primary-50 text-primary-600 font-xs-semibold">
              관리자
            </span>
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
