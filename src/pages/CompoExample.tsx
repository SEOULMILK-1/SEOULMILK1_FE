import Button from '../common/Button';
import SearchIcon from '../../public/Icon/SearchIcon';
import Reset from '../../public/Icon/ResetIcon';
import SubscriptionToggle from '../common/SelectMonth';
import StateDropdown from '../common/StateDropdown';
export function CompoExample() {
  return (
    <div>
      <br />
      세금 계산서 버튼 컴포넌트
      <br />
      <Button size="sm">
        <SearchIcon />
        조회
      </Button>
      <br />
      <Button
        size="sm"
        className="bg-transparent border border-primary-600 text-primary-500"
      >
        <Reset />
        초기화
      </Button>
      <br />
      {/* 기간 컴포넌트 추가예정 */}
      <SubscriptionToggle />
      <br />
      <StateDropdown />
    </div>
  );
}
