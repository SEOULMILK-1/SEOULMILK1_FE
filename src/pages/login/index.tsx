import { useState } from 'react';
import FloatingLabelInput from '../../common/LabelInput';
import RedLogo from './components/RedLogo';
import Button from '../../common/Button';
import ErrorMessage from './components/ErrorMessage';
import LoginFooter from './components/LoginFooter';

export function LoginPage() {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const isButtonDisabled = !id || !password;

  const handleLogin = () => {
    // api연결 전 임시 오류 메시지
    setError(
      '아이디(로그인 전화번호, 로그인 전용 아이디) 또는 비밀번호가 잘못 되었습니다. 아이디와 비밀번호를 정확히 입력해 주세요.'
    );
  };

  return (
    <div className="flex min-h-screen items-center justify-center ">
      <div className="w-[456px] px-[32px] py-[42px] bg-white rounded-[32px] drop-shadow-elevation1">
        <div className="flex justify-center mb-[40px]">
          <RedLogo />
        </div>
        <div className="space-y-[20px]">
          <FloatingLabelInput
            placeholder="사번 또는 아이디"
            value={id}
            onChange={(e) => setId(e.target.value)}
          />
          <FloatingLabelInput
            placeholder="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {error ? (
          <ErrorMessage message={error} />
        ) : (
          <div className="mt-[32px]" />
        )}
        <Button
          size="lg"
          className={isButtonDisabled ? 'bg-gray-200 text-gray-400' : ''}
          disabled={isButtonDisabled}
          onClick={handleLogin}
        >
          로그인
        </Button>

        <LoginFooter />
      </div>
    </div>
  );
}
