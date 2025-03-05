const data = Array.from({ length: 20 }, (_, index) => ({
  title: `○○월 세금계산서 ${index + 1}`,
  date: '2025.02.28',
  center: '서울우유태평고객센터',
  name: '김구름'
}));

const PaymentChartContent = () => {
  return (
    <div className="w-[960px] h-[584px] overflow-x-hidden custom-scrollbar overflow-y-scroll ">
      {data.map((item, index) => (
        <div
          key={index}
          className="mx-[8px] flex w-[932px] h-[42px] items-center rounded-[12px] hover:bg-gray-100 font-sm-medium"
        >
          <div className="w-[350px] pl-5 text-sm font-medium text-gray-700">
            {item.title}
          </div>
          <div className="w-[170px] pl-5 text-sm font-medium text-gray-700">
            {item.date}
          </div>
          <div className="w-[200px] pl-5 text-sm font-medium text-gray-700">
            {item.center}
          </div>
          <div className="w-[120px] pl-5 text-sm font-medium text-gray-700">
            {item.name}
          </div>
        </div>
      ))}
    </div>
  );
};

export default PaymentChartContent;
