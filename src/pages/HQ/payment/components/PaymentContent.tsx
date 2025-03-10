interface PaymentData {
  paymentResolutionId: number;
  paymentResolutionName: string;
  createdAt: string;
  paymentRecipient: string;
}

interface Props {
  data: PaymentData[];
}

const PaymentChartContent = ({ data }: Props) => {
  return (
    <div className="w-full h-[584px] overflow-y-scroll custom-scrollbar">
      {data.map((item) => (
        <div
          key={item.paymentResolutionId}
          className="mx-[8px] flex w-[932px] h-[42px] items-center rounded-[12px] hover:bg-gray-100 font-sm-medium"
        >
          <div className="w-[350px] pl-5 text-sm font-medium text-gray-700 truncate">
            {item.paymentResolutionName}
          </div>
          <div className="w-[170px] pl-5 text-sm font-medium text-gray-700">
            {new Date(item.createdAt).toLocaleDateString()}
          </div>
          <div className="w-[200px] pl-5 text-sm font-medium text-gray-700 truncate">
            {item.paymentRecipient}
          </div>
        </div>
      ))}
    </div>
  );
};

export default PaymentChartContent;
