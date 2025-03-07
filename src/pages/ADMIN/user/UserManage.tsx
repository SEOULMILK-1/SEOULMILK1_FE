import { useState } from 'react';
import UserIcon from '../../../../public/Icon/UserIcon';
import Header from '../../../common/Header';
import Search from '../../../common/Search';
import UserDataTable from './components/UserDataTable';

const UserManage = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (value: string) => {
    setSearchTerm(value);
  };

  return (
    <div className="mx-[94px]">
      <Header title="유저 관리" Icon={UserIcon} />
      <Search
        placeholderName={'지점, 성명을 검색하세요'}
        onSearch={handleSearch}
      />
      <UserDataTable searchTerm={searchTerm} />
    </div>
  );
};

export default UserManage;
