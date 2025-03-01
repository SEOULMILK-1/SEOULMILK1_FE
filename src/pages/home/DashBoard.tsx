import { useState } from 'react';
import Header from '../../common/Header';
import HomeGrayIcon from '../../../public/Icon/HomeGrayIcon';
import DashDataTable from './components/DashDataTable';
import Check from '../../../public/Icon/Check';

const data = Array(14).fill({
  status: '미등록',
  name: '김구름',
  center: '서울우유태평고객센터',
  phone: '010-1234-5678',
  date: '2025.02.28'
});

const DashBoard = () => {
  const [selected, setSelected] = useState<number[]>([]);

  const toggleSelect = (index: number) => {
    setSelected((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const toggleSelectAll = () => {
    setSelected((prev) =>
      prev.length === data.length ? [] : data.map((_, i) => i)
    );
  };

  return (
    <div className="mx-[94px]">
      <Header title="홈" Icon={HomeGrayIcon} />

      <div className="flex flex-row justify-between mt-[37px] h-[40px]">
        <div className="flex flex-row gap-2">
          <div className="text-gray-800 font-2xl-bold">등록되지 않은 유저</div>
          <span className="text-gray-500 font-2xl-medium"> {data.length} </span>
        </div>

        {selected.length > 0 && (
          <div className="flex flex-row justify-center items-center gap-4">
            <div className="flex flex-row justify-center items-center gap-1">
              <Check />
              <span className="text-primary-700 text-center font-md-medium">
                {selected.length} {selected.length === 1 ? '건 선택' : ''}
              </span>
            </div>
            <button className="flex px-4 py-2 justify-center items-center gap-1 rounded-xl bg-primary-700 text-white font-md-medium">
              등록하기
            </button>
          </div>
        )}
      </div>

      <DashDataTable
        selected={selected}
        toggleSelect={toggleSelect}
        toggleSelectAll={toggleSelectAll}
      />
    </div>
  );
};

export default DashBoard;
