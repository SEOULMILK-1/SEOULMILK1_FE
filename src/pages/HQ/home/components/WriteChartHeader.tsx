import ChartLine from '../../../../../public/Icon/ChartLine';

const WriteChartHeader = () => {
  return (
    <div className="flex w-[960px] h-14 pl-2 pr-5 items-center border-b border-gray-300">
      <div className="w-[350px] h-[42px] pl-5 mt-6 text-gray-500 font-sm-medium">
        제목
      </div>
      <div className="mt-1">
        <ChartLine />
      </div>
      <div className="w-[170px] h-[42px] pl-5 mt-6 text-gray-500 font-sm-medium">
        세금계산서등록일
      </div>
      <div className="mt-1">
        <ChartLine />
      </div>
      <div className="w-[200px] h-[42px] pl-5 mt-6 text-gray-500 font-sm-medium">
        대리점
      </div>
      <div className="mt-1">
        <ChartLine />
      </div>
      <div className="w-[120x] h-[42px] pl-5 mt-6 text-gray-500 font-sm-medium">
        성명
      </div>
    </div>
  );
};

export default WriteChartHeader;
