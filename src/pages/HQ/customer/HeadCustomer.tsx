import CustomerIcon from '../../../../public/Icon/CustomerIcon';
import CustomerChart from './components/CustomerChart';
import Header from '../../../common/Header';
import Search from '../../../common/Search';

const HeadCustomer = () => {
  return (
    <div className="mx-[94px] w-[960px]">
      <Header title="대리점 조회" Icon={CustomerIcon} />
      <Search placeholderName={'지점을 검색하세요'} />
      <CustomerChart />
    </div>
  );
};

export default HeadCustomer;
