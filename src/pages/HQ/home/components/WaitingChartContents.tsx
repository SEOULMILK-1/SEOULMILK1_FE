const data = Array.from({ length: 20 }, (_, index) => ({
  title: `○○월 세금계산서 ${index + 1}`,
  date: '2025.02.28',
  center: '서울우유태평고객센터'
}));

// const data: { center: string; title: string; date: string }[] = [];
// interface WaitingChartData {
//   center: string;
//   title: string;
//   date: string;
// }

// interface WaitingChartContentsProps {
//   data: WaitingChartData[];
// }

const WaitingChartContents = () => {
  return (
    <div className="h-[285px] w-[960px] overflow-y-auto overflow-x-hidden custom-scrollbar ">
      {data.length > 0 ? (
        data.map((item, index) => (
          <div
            key={index}
            className="mx-[8px] flex w-[932px] h-[42px] items-center rounded-[12px] hover:bg-gray-100 font-sm-medium"
          >
            <div className="w-[200px] pl-5 font-sm-medium text-gray-800">
              {item.center}
            </div>
            <div className="w-[350px] pl-5 font-sm-medium text-gray-800">
              {item.title}
            </div>
            <div className="w-[170px] pl-5 font-sm-medium text-gray-800">
              {item.date}
            </div>
            <div className="w-[120px] pl-5 font-sm-medium text-gray-800">
              {item.date}
            </div>
          </div>
        ))
      ) : (
        <div className="text-center font-xl-medium text-gray-400 mt-[129px]">
          지급 대기 중인 세금계산서가 없어요
        </div>
      )}
    </div>
  );
};

export default WaitingChartContents;
