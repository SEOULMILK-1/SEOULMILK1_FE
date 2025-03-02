import UserIcon from '../../../../public/Icon/UserIcon';
import Header from '../../../common/Header';
import Search from '../../../common/Search';
import UserDataTable from './components/UserDataTable';

const UserManage = () => {
  return (
    <div className="mx-[94px]">
      <Header title="유저 관리" Icon={UserIcon} />
      <Search placeholderName={'지점, 성명을 검색하세요'} />
      <UserDataTable />
    </div>
  );
};

export default UserManage;
