import Check from '../../../../../public/Icon/Check';
import ChartPagination from '../../../../common/ChartPagination';
import DashTableHeader from './DashTableHeader';

const data = Array(18).fill({
  status: '미등록',
  name: '김구름',
  center: '서울우유태평고객센터',
  phone: '010-1234-5678',
  date: '2025.02.28'
});

interface DataTableProps {
  selected: number[];
  toggleSelect: (index: number) => void;
  toggleSelectAll: () => void;
}

const DashDataTable = ({
  selected,
  toggleSelect,
  toggleSelectAll
}: DataTableProps) => {
  return (
    <div className="mt-4 flex h-[786px] w-[960px] flex-col items-start rounded-3xl border border-solid border-gray-300 bg-white">
      <div className="flex w-[960px] h-14 pl-2 pr-5 items-center border-b border-gray-300">
        <div className="relative w-[52px] h-[42px] pl-5 mt-6">
          <input
            type="checkbox"
            className="appearance-none w-5 h-5 rounded-md border border-solid border-gray-300 checked:bg-primary-700 checked:border-primary-700 
      relative peer checked:cursor-pointer cursor-pointer"
            checked={selected.length === data.length}
            onChange={toggleSelectAll}
          />
          <span className="absolute inset-0 bottom-5 left-2 items-center justify-center pointer-events-none hidden peer-checked:flex ">
            <Check stroke="#fff" />
          </span>
        </div>
        <div className="w-[92px] h-[42px] pl-5 mt-6 text-gray-500 font-sm-medium">
          분류
        </div>
        <DashTableHeader />
      </div>

      <div className="flex-grow overflow-x-scroll">
        {data.map((row, index) => (
          <div
            key={index}
            className={`flex w-[932px] h-[42px] items-center mx-2 hover:bg-gray-100 rounded-xl cursor-pointer 
          ${selected.includes(index) ? 'bg-primary-50' : ''}`}
          >
            <div className="w-[52px] pl-5 mt-1 relative">
              <input
                type="checkbox"
                className="appearance-none w-5 h-5 rounded-md border border-solid border-gray-300 checked:bg-primary-700 checked:border-primary-700 
      relative peer checked:cursor-pointer cursor-pointer"
                checked={selected.includes(index)}
                onChange={() => toggleSelect(index)}
              />
              <span className="absolute inset-0 bottom-1 left-2 items-center justify-center pointer-events-none hidden peer-checked:flex ">
                <Check stroke="#fff" />
              </span>
            </div>

            <div className="w-[92px] pl-5 text-warning-600 font-sm-medium">
              {row.status}
            </div>
            <div className="w-[120px] pl-5 text-gray-800 font-sm-medium">
              {row.name}
            </div>
            <div className="w-[298px] pl-5 text-gray-800 font-sm-medium">
              {row.center}
            </div>
            <div className="w-[200px] pl-5 text-gray-800 font-sm-medium">
              {row.phone}
            </div>
            <div className="w-[170px] pl-5 text-gray-800 font-sm-medium">
              {row.date}
            </div>
          </div>
        ))}
      </div>
      <ChartPagination />
    </div>
  );
};
export default DashDataTable;
