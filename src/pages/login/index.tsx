import { useNavigate } from 'react-router-dom';
import FloatingLabelInput from '../../common/LabelInput';
import Logo from './components/Logo';
import Button from './components/Button';
import { useState } from 'react';

export default function Login() {
  const navigate = useNavigate();

  const [id, setId] = useState('');
  const [password, setPassword] = useState('');

  const isButtonDisabled = !id || !password;
  return (
    <div className="flex min-h-screen items-center justify-center ">
      <div className="w-[456px] h-[446px] px-[32px] bg-white rounded-[32px] drop-shadow-elevation1">
        <div className="flex justify-center mt-[42px] mb-[40px]">
          <Logo />
        </div>

        <div className="space-y-[20px]">
          <FloatingLabelInput
            placeholder="사번 또는 아이디"
            value={id}
            onChange={(e) => setId(e.target.value)}
          />
          <FloatingLabelInput
            placeholder="비밀번호"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <Button
          size="lg"
          className={isButtonDisabled ? 'bg-gray-200 text-gray-400' : ''}
          disabled={isButtonDisabled}
        >
          로그인
        </Button>

        <div className="font-md-medium text-gray-500 flex justify-between items-center mt-[16px]">
          <div className="flex space-x-[6px]">
            <span
              className="cursor-pointer"
              onClick={() => navigate('/아이디찾기')}
            >
              아이디 찾기
            </span>
            <span>|</span>
            <span
              className="cursor-pointer"
              onClick={() => navigate('/비밀번호찾기')}
            >
              비밀번호 찾기
            </span>
          </div>

          <div className="cursor-pointer" onClick={() => navigate('/회원가입')}>
            회원가입
          </div>
        </div>
      </div>
    </div>
  );
}
