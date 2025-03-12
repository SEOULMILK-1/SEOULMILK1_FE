import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import MobileUpload from '../../../public/Icon/MobileUpload';
import MobileCamera from '../../../public/Icon/MobileCamera';
import SettingIcon from '../../../public/Icon/SettingIcon';
import LogoGray from '../../../public/Icon/LogoGray';
import TaxIconGray from '../../../public/Icon/TaxIconGray';
import SpeakerGray from '../../../public/Icon/SpeakerGray';
import ArrowIcon from '../../../public/Icon/ArrowIcon';
import { useAuthStore } from '../../store/useAuthStore';

const Home = () => {
  const { user } = useAuthStore();
  console.log('Zustand 상태:', { user });
  const navigate = useNavigate();
  const [_, setSelectedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const cameraInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
        navigate('/uploadtax/step1', {
          state: { selectedImage: reader.result }
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCameraCapture = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
        navigate('/uploadtax/step1', {
          state: { selectedImage: reader.result }
        });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col px-5 py-10">
      <header className="flex items-center justify-between py-4 mb-[18px]">
        <LogoGray />
        <button className="p-1 text-gray-400">
          <SettingIcon />
        </button>
      </header>

      <section className="mt-6 mb-4 ">
        <h1 className="font-md-bold text-gray-800 pb-1">{user?.name}님</h1>
        <p className="font-sm-regular text-gray-500">{user?.teamName}</p>
      </section>

      <div className="flex gap-3 mb-6 justify-center">
        <label className="w-[169px] h-[138px] py-3 pl-4 bg-primary-700 rounded-xl flex flex-col justify-between aspect-square cursor-pointer">
          <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={fileInputRef}
            onChange={handleFileChange}
          />
          <div className="text-white font-md-semibold">
            세금계산서 <br />
            업로드
          </div>
          <div className="self-end mb-4 right-0">
            <MobileUpload />
          </div>
        </label>

        <label className="w-[169px] h-[138px] py-3 pl-4 bg-primary-50 text-primary-600 rounded-xl flex flex-col justify-between aspect-square cursor-pointer">
          <input
            type="file"
            accept="image/*"
            capture="environment"
            className="hidden"
            ref={cameraInputRef}
            onChange={handleCameraCapture}
          />
          <div className="text-left font-md-semibold">
            세금계산서 <br />
            촬영
          </div>
          <div className="self-end pb-4">
            <MobileCamera />
          </div>
        </label>
      </div>

      <div className="space-y-4">
        <button
          className="w-[353px] flex font-md-medium items-center justify-between p-4 bg-gray-100 rounded-[12px] text-gray-600"
          onClick={() => navigate('/tax')}
        >
          <div className="flex items-center gap-2">
            <TaxIconGray />
            <span className="font-md-medium">세금계산서 조회</span>
          </div>
          <ArrowIcon strokeColor="#6C727E" className="rotate-180" />
        </button>

        <button
          className="w-[353px] flex font-md-medium items-center justify-between p-4 bg-gray-100 rounded-[12px] text-gray-600"
          disabled
        >
          <div className="flex items-center gap-2">
            <SpeakerGray />
            <span className="font-md-medium">공지사항</span>
          </div>
          <ArrowIcon strokeColor="#6C727E" className="rotate-180" />
        </button>
      </div>
    </div>
  );
};

export default Home;
