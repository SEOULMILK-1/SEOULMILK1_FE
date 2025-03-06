import WriteChartContents from './WriteChartContents';
import WriteChartHeader from './WriteChartHeader';

const WritePayment = () => {
  return (
    <div className="mt-4 flex h-[341px] flex-col border border-gray-300 bg-white rounded-3xl">
      <WriteChartHeader />
      <div className="flex-grow">
        <WriteChartContents />
      </div>
    </div>
  );
};
export default WritePayment;
