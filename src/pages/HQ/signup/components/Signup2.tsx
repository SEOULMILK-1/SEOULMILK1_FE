import { useNavigate } from 'react-router-dom';
import CircleNumber from './CircleNumber';
import SignupButton from './SignupButton';
import SignupInput from './SignupInput';
import { useState } from 'react';
import SignupModal from './SignupModal';
import Check from '../../../../../public/Icon/Check';

const Signup2 = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="flex flex-col w-[480px] py-[42px] px-8 justify-center items-start gap-8 rounded-[32px] bg-white drop-shadow-elevation1">
        <div className="flex flex-col gap-4">
          <CircleNumber type="two" />
        </div>

        <div className="flex flex-col gap-2 w-full">
          <label className="text-gray-600 font-md-semibold"> 전화번호 </label>
          <SignupInput
            placeholder="- 없이 숫자만 입력"
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-2 w-full">
          <label className="text-gray-600 font-md-semibold"> 이메일 </label>
          <SignupInput
            placeholder="example@email.com"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="flex w-full items-center">
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

          <div className="flex w-full items-center">
            <span className="ml-2 text-center text-gray-800 font-md-medium">
              개인 정보 수집 및 이용 동의
            </span>
            <span className="text-gray-500 font-sm-medium underline ml-auto">
              전문 보기
            </span>
          </div>
        </div>

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
