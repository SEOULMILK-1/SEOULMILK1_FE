import Button from '../../../common/Button';
import CompleteCheck from '../../../../public/Icon/CompleteCheck';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

function Complete() {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="flex flex-col items-center justify-center min-h-screen bg-white px-4 py-6"
    >
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

        <div className="w-full flex mt-auto rounded-[12px] text-center justify-center">
          <Button
            className="w-[160px] h-[56px] font-xl-semibold bg-white border border-primary-700 text-primary-600"
            onClick={() => navigate('/cs')}
          >
            추가 업로드
          </Button>
        </div>
      </div>
    </motion.div>
  );
}

export default Complete;
