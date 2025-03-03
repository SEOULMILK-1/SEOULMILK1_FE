import { useNavigate } from 'react-router-dom';
import CircleNumber from './CircleNumber';
import SignupInput from './SignupInput';
import SignupButton from './SignupButton';

const Signup1 = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col w-[480px] py-[42px] px-8 justify-center items-start gap-8 rounded-[32px] bg-white drop-shadow-elevation1">
      <div className="flex flex-col gap-4">
        <CircleNumber type="one" />
      </div>

      {/* 여기서부터 input */}
      <div className="flex flex-col gap-2 w-full">
        <label className="text-gray-600 font-md-semibold"> 이름 </label>
        <SignupInput placeholder="이름을 알려주세요" />
      </div>

      <div className="flex flex-col gap-2 w-full">
        <label className="text-gray-600 font-md-semibold"> 사번 </label>
        <div className="flex flex-row gap-2">
          <SignupInput placeholder="사번을 입력하세요" />
          <button className="flex w-[80px] whitespace-nowrap px-7 h-14 justify-center items-center gap-[10px] rounded-xl bg-gray-200 text-gray-400 text-center font-md-medium">
            확인
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-2 w-full">
        <label className="text-gray-600 font-md-semibold"> 비밀번호 </label>
        <SignupInput placeholder="영문, 숫자, 특수문자 조합 8~16자" />
        <SignupInput placeholder="비밀번호 재입력" />
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
