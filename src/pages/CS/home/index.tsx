import Header from '../../../common/Header';
import HQHome from '../../../../public/Icon/HQHome';
import Refuse from './components/Refuse';
import Approve from './components/Approve';

export const CSHome = () => {
  return (
    <div className="mx-[94px]">
      <Header title="이번 달 세금계산서" Icon={HQHome} />
      <Refuse />
      <Approve />
    </div>
  );
};
