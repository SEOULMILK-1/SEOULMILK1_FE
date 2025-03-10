const PaymentChartHeader = () => {
  return (
    <div className="flex w-full h-14 pl-5 pr-5 items-center border-b border-gray-300 bg-gray-100">
      <div className="w-[350px] text-gray-500 font-sm-medium flex items-center">
        제목
      </div>
      <div className="w-[170px] text-gray-500 font-sm-medium flex items-center">
        작성일
      </div>
      <div className="w-[200px] text-gray-500 font-sm-medium flex items-center">
        대리점
      </div>
    </div>
  );
};

export default PaymentChartHeader;
