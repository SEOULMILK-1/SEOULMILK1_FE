import Button from '../common/Button';
import SearchIcon from '../../public/Icon/SearchIcon';
import Reset from '../../public/Icon/ResetIcon';
import StateDropdown from '../common/StateDropdown';
import SelectMonth from '../common/SelectMonth';
import AdminSideModal from '../common/AdminSideModal';
import UserSideModal from '../common/UserSideModal';
import SelectCalendar from '../common/SelectCalendar';

export function CompoExample() {
  return (
    <div>
      <br />
      <SelectCalendar />
      <br />
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
        className="bg-transparent border border-primary-600 text-primary-400"
      >
        <Reset />
        초기화
      </Button>
      <br />
      <SelectMonth />
      <br />
      <StateDropdown />
      <AdminSideModal />
      <UserSideModal />
    </div>
  );
}
