import WaitingChartContents from './WaitingChartContents';
import WaitingChartHeader from './WaitingChartHeader';

const WaitingTax = () => {
  return (
    <div className="mt-4 flex h-[341px] flex-col border border-gray-300 bg-white rounded-3xl">
      <WaitingChartHeader />
      <div className="flex-grow">
        <WaitingChartContents />
      </div>
    </div>
  );
};

export default WaitingTax;
