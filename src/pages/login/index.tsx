import { useState } from 'react';
import FloatingLabelInput from './components/LabelInput';
import RedLogo from '../../../public/Icon/RedLogoIcon';
import Button from '../../common/Button';
import ErrorMessage from './components/ErrorMessage';
import LoginFooter from './components/LoginFooter';
import ApprovalModal from './components/ApprovalModal';

function LoginPage() {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isApprovalModalOpen, setIsApprovalModalOpen] = useState(false);

  const isButtonDisabled = !id || !password;

  const handleLogin = () => {
    // 가짜 로그인 응답 (API 연결 전 테스트용)
    const mockResponse = {
      status: 'pending' // 승인대기
    };

    if (mockResponse.status === 'pending') {
      setIsApprovalModalOpen(true);
    } else if (mockResponse.status === 'approved') {
      console.log('로그인 성공');
    } else {
      setError(
        '아이디(로그인 전화번호, 로그인 전용 아이디) 또는 비밀번호가 잘못되었습니다. 아이디와 비밀번호를 정확히 입력해 주세요.'
      );
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-[456px] mx-auto px-6 py-[40px]  bg-white rounded-[32px] drop-shadow-elevation1 max-sm:min-h-screen flex flex-col justify-center">
        <div className="flex justify-center mb-[32px]">
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
          className={`w-full mt-6 ${
            isButtonDisabled
              ? 'bg-gray-200 text-gray-400'
              : 'bg-primary-700 text-white'
          }`}
          disabled={isButtonDisabled}
          onClick={handleLogin}
        >
          로그인
        </Button>
        <LoginFooter />
      </div>
      <ApprovalModal
        isOpen={isApprovalModalOpen}
        onClose={() => setIsApprovalModalOpen(false)}
      />
    </div>
  );
}

export default LoginPage;
