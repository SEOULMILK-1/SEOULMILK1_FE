import ChartPagination from '../../../../common/ChartPagination';
import { UserDummy } from '../../../../utils/UserDummy';
import UserDataTableHeader from './UserDataTableHeader';
import PlusIcon from '../../../../../public/Icon/PlusIcon';

const UserDataTable = () => {
  const data = UserDummy;
  return (
    <div className="mt-4 flex h-[778px] w-[960px] flex-col items-start rounded-3xl border border-solid border-gray-300 bg-white">
      <UserDataTableHeader />

      <div className="flex-grow mx-2">
        {data.map((row, index) => (
          <div
            key={index}
            className={`flex w-[932px] h-[42px] items-center hover:bg-gray-100 rounded-xl cursor-pointer`}
          >
            <div
              className={`w-[92px] pl-5 font-sm-medium ${
                row.status === '미등록' ? 'text-warning-600' : 'text-gray-800'
              }`}
            >
              {row.status}
            </div>
            <div className="w-[120px] pl-5 gap-5 text-gray-800 font-sm-medium">
              {row.name}
            </div>
            <div className="w-[190px] pl-5 ml-1 text-gray-800 font-sm-medium">
              {row.center}
            </div>
            <div className="w-[200px] pl-5 text-gray-800 font-sm-medium">
              {row.phone}
            </div>
            <div className="w-[170px] pl-5 ml-1  text-gray-800 font-sm-medium">
              {row.date}
            </div>

            <div className="w-[140px] px-5 py-2 items-center">
              {row.status === '미등록' && (
                <button
                  className="flex w-[85px] h-[26px] gap-1 pl-2 pr-3 items-center justify-center rounded-lg bg-[#E6F1F7] text-[#2C72FF] font-xs-regular"
                  onClick={() => console.log('등록하기')}
                >
                  <PlusIcon />
                  등록하기
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
      <ChartPagination />
    </div>
  );
};

export default UserDataTable;
