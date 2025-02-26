import Button from '../common/Button';
import SearchIcon from '../../public/Icon/Search';
import Reset from '../../public/Icon/Reset';

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
        className="bg-white border border-primary-600 text-primary-600"
      >
        <Reset />
        초기화
      </Button>
      {/* 기간 컴포넌트 추가예정 */}
    </div>
  );
}
