import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SettingIcon from '../../public/Icon/SettingIcon';
import LogoGray from '../../public/Icon/LogoGray';
import NoticeBoard from './NoticeBoard';
import AdminSideModal from './SideModal/AdminSideModal';
import HQSideModal from './SideModal/HQSideModal';
import CSSideModal from './SideModal/CSSideModal';
import SidebarUploadIcon from '../../public/Icon/SidebarUploadIcon';
import {
  adminMenuItems,
  CSMenuItems,
  HQMenuItems
} from '../routes/SidebarRouter';

interface RoleProps {
  type: 'admin' | 'HQ' | 'CS';
}

const Sidebar = ({ type }: RoleProps) => {
  const navigate = useNavigate();
  const [selectedMenu, setSelectedMenu] = useState<string>('홈');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const menuItems =
    type === 'admin'
      ? adminMenuItems
      : type === 'HQ'
      ? HQMenuItems
      : CSMenuItems;

  const getModalComponent = () => {
    switch (type) {
      case 'admin':
        return (
          <AdminSideModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
          />
        );
      case 'HQ':
        return (
          <HQSideModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
          />
        );
      case 'CS':
        return (
          <CSSideModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
          />
        );
      default:
        return null;
    }
  };
  return (
    <div className="w-60 flex flex-col gap-4">
      <aside className="h-[685px] bg-white flex flex-col gap-4 py-2 rounded-3xl">
        <div className="flex justify-between items-center px-5 py-4">
          <div
            className={`flex gap-1 ${type === 'CS' ? 'flex-col' : 'flex-row'}`}
          >
            <div className="text-gray-800 font-xl-bold">
              김구름 <span className="text-gray-800 font-xl-regular">님</span>
            </div>

            {type === 'admin' && (
              <span className="flex px-2 py-[2px] justify-center items-center gap-[10px] rounded-3xl bg-primary-50 text-primary-600 font-xs-semibold">
                관리자
              </span>
            )}
            {type === 'HQ' && (
              <span className="flex px-2 py-[2px] justify-center items-center gap-[10px] rounded-3xl bg-primary-50 text-primary-600 font-xs-semibold">
                직원
              </span>
            )}
            {type === 'CS' && (
              <div className="text-gray-500 font-md-regular mt-[4px]">
                서울우유태평고객센터
              </div>
            )}
          </div>

          <button
            className={`${type === 'CS' ? 'mb-8' : ''}`}
            onClick={() => setIsModalOpen(true)}
          >
            <SettingIcon />
          </button>
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
              onClick={() => {
                setSelectedMenu(item.name);
                navigate(item.path);
              }}
            >
              {selectedMenu === item.name ? item.selectedIcon : item.icon}
              <span className="font-md-medium">{item.name}</span>
            </div>
          ))}
        </nav>
        {type === 'CS' && (
          <div className="px-[8px] mt-[32px]">
            <button
              className="w-full relative flex items-center bg-primary-700 text-white px-[8px] py-[12px] rounded-[12px] font-md-semibold"
              onClick={() => navigate('/upload-tax/step1')}
            >
              <span className="pl-[8px]">세금계산서 업로드</span>
              <SidebarUploadIcon className="absolute right-[12px] bottom-0 w-[55px] h-auto" />
            </button>
          </div>
        )}

        <div className="flex px-5 py-4 items-center gap-2 mt-auto mb-2">
          <LogoGray />
        </div>
      </aside>

      {/* 공지사항 */}
      <NoticeBoard />
      {isModalOpen && getModalComponent()}
    </div>
  );
};

export default Sidebar;
