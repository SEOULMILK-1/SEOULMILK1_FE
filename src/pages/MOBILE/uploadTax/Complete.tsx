import Button from '../../../common/Button';
import CompleteCheck from '../../../../public/Icon/CompleteCheck';
import { useNavigate } from 'react-router-dom';

function Complete() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white px-4 py-6">
      <div className="w-full max-w-[360px] flex flex-col items-center px-5">
        <div className="w-[64px] h-[64px] rounded-full bg-primary-700 flex items-center justify-center mb-4">
          <CompleteCheck />
        </div>

        <div className="text-center mb-16">
          <h1 className="text-2xl font-3xl-bold text-gray-800 mb-3">
            업로드 완료
          </h1>
          <p className="text-gray-500 font-2xl-medium">
            세금계산서 업로드가 완료되었어요.
          </p>
        </div>

        <div className="w-full grid grid-cols-2 mt-auto rounded-[12px] gap-[16px]">
          <Button
            className="w-[152px] border border-gray-400 h-12 font-xl-semibold  text-gray-500"
            onClick={() => navigate('/home')}
          >
            목록
          </Button>
          <Button
            className="w-[152px] h-12 font-xl-semibold bg-primary-700 text-white "
            onClick={() => navigate('/home')}
          >
            추가 업로드
          </Button>
        </div>
      </div>
    </div>
  );
}
export default Complete;
