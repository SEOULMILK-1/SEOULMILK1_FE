import FloatingLabelInput from '../../common/LabelInput';
import MyIcon from './components/Logo';

export default function Login() {
  return (
    <div className="flex min-h-screen items-center justify-center ">
      <div className="w-[456px] h-[446px] px-[32px] p-4 bg-white rounded-lg drop-shadow-elevation1">
        {/* 로고 */}
        <div className="flex justify-center mb-6">
          <MyIcon />
        </div>

        <div className="space-y-4 ">
          <FloatingLabelInput placeholder="사번 또는 아이디" />
          <FloatingLabelInput placeholder="비밀번호" />
        </div>

        {/* 로그인 버튼 */}
        <button className="font-xl-semibold w-full h-[56px] py-2 mt-4 text-white bg-primary-700 rounded-lg">
          로그인
        </button>

        {/* 추가 링크 */}
        <div className="mt-4 text-sm text-center text-gray-600">
          <a href="#" className="hover:underline">
            아이디 찾기
          </a>{' '}
          |
          <a href="#" className="ml-2 hover:underline">
            비밀번호 찾기
          </a>{' '}
          |
          <a href="#" className="ml-2 hover:underline">
            회원가입
          </a>
        </div>
      </div>
    </div>
  );
}
