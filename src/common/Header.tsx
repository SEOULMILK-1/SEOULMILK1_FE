import MainLine from '../../public/Icon/MainLine';
import StepProgress from '../pages/CS/UploadTax/StepProgress';

interface HeaderProps {
  title: string;
  Icon?: React.ComponentType;
  showStepProgress?: boolean; // ✅ StepProgress 표시 여부 추가
}

const Header = ({ title, Icon, showStepProgress = false }: HeaderProps) => {
  return (
    <>
      <div className="mt-8 flex items-center justify-between mb-4">
        {/* 왼쪽: 아이콘 & 타이틀 */}
        <div className="flex items-center gap-2">
          {Icon && <Icon />}
          <div className="text-gray-800 font-2xl-bold">{title}</div>
        </div>

        {/* 오른쪽: StepProgress 표시 여부 확인 후 렌더링 */}
        {showStepProgress && <StepProgress />}
      </div>
      <MainLine />
    </>
  );
};

export default Header;
