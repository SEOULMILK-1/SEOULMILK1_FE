import ChartPagination from '../../../../common/ChartPagination';
import PaymentContent from '../PaymentContent';
import PaymentChartHeader from './PaymentChartHeader';

const PaymentChart = () => {
  return (
    <div className="mt-4 flex h-[714px] flex-col border border-gray-300 bg-white rounded-3xl">
      <PaymentChartHeader />

      <div className="flex-grow">
        <PaymentContent />
      </div>

      <ChartPagination />
    </div>
  );
};

export default PaymentChart;
