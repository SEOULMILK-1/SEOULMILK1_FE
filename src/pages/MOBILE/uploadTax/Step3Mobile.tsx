import step3Icon from '../../../../public/Icon/홈택스.svg';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const Step3Mobile = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate(`/complete`);
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="mx-[94px]">
      <div className="flex flex-col items-center justify-center gap-[21px] mt-[200px]">
        <img
          src={step3Icon}
          alt="세금계산서 검증"
          className="w-[250px] h-[250px]"
        />
        <div className="text-gray-600 font-md-medium whitespace-nowrap">
          홈택스를 통해서 검증하고 있어요
        </div>
      </div>
    </div>
  );
};

export default Step3Mobile;
