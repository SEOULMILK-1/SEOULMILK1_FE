import { useNavigate } from 'react-router-dom';
import CircleNumber from './CircleNumber';
import SignupButton from './SignupButton';
import SignupInput from './SignupInput';
import { useState } from 'react';
import SignupModal from './SignupModal';

const Signup2 = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="flex flex-col w-[480px] py-[42px] px-8 justify-center items-start gap-8 rounded-[32px] bg-white drop-shadow-elevation1">
        <div className="flex flex-col gap-4">
          <CircleNumber type="two" />
        </div>

        {/* 여기서부터 input */}

        <div className="flex flex-col gap-2 w-full">
          <label className="text-gray-600 font-md-semibold"> 전화번호 </label>
          <SignupInput placeholder="- 없이 숫자만 입력" />
        </div>

        <div className="flex flex-col gap-2 w-full">
          <label className="text-gray-600 font-md-semibold"> 이메일 </label>
          <SignupInput placeholder="example@email.com" />
        </div>

        {/* <div className="flex justify-between items-center">
          <div className="relative items-center mt-1 ">
            <input
              type="checkbox"
              className="appearance-none w-6 h-6 rounded-lg border border-solid border-gray-300 checked:bg-primary-700 checked:border-primary-700 
      relative peer checked:cursor-pointer cursor-pointer"
            />
            <span className="absolute inset-0 bottom-[6px] left-1 right-1 items-center justify-center pointer-events-none hidden peer-checked:flex ">
              <Check stroke="#fff" />
            </span>
          </div>
          <span className="ml-2 text-center text-gray-800 font-md-medium">
            개인 정보 수집 및 이용 동의
          </span>
        </div> */}

        <SignupButton
          text="회원가입"
          prevonClick={() => navigate('/head/signup')}
        />

        {isModalOpen && <SignupModal />}
      </div>
    </div>
  );
};

export default Signup2;
