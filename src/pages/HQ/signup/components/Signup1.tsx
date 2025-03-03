import { useNavigate } from 'react-router-dom';
import CircleNumber from './CircleNumber';
import SignupInput from './SignupInput';
import SignupButton from './SignupButton';
import { useState } from 'react';

const Signup1 = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [businessNumber, setBusinessNumber] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');

  return (
    <div className="flex flex-col w-[480px] py-[42px] px-8 justify-center items-start gap-8 rounded-[32px] bg-white drop-shadow-elevation1">
      <div className="flex flex-col gap-4">
        <CircleNumber type="one" />
      </div>

      <div className="flex flex-col gap-2 w-full">
        <label className="text-gray-600 font-md-semibold"> 이름 </label>
        <SignupInput
          type="text"
          placeholder="이름을 알려주세요"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className="flex flex-col gap-2 w-full">
        <label className="text-gray-600 font-md-semibold"> 사번 </label>
        <div className="flex flex-row gap-2">
          <SignupInput
            type="text"
            placeholder="사번을 입력하세요"
            value={businessNumber}
            onChange={(e) => setBusinessNumber(e.target.value)}
          />
          <button className="flex w-[80px] whitespace-nowrap px-7 h-14 justify-center items-center gap-[10px] rounded-xl bg-gray-200 text-gray-400 text-center font-md-medium">
            확인
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-2 w-full">
        <label className="text-gray-600 font-md-semibold"> 비밀번호 </label>
        <SignupInput
          type="password"
          placeholder="영문, 숫자, 특수문자 조합 8~16자"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <SignupInput
          type="password"
          placeholder="비밀번호 재입력"
          value={passwordCheck}
          onChange={(e) => setPasswordCheck(e.target.value)}
        />
      </div>

      <SignupButton
        text="다음"
        prevonClick={() => navigate('/signup')}
        onClick={() => navigate('/head/signup2')}
      />
    </div>
  );
};

export default Signup1;
