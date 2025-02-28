import StatusBadge, { Status } from '../../../../common/StatusBagde';

const statuses: Status[] = ['승인됨', '지급완료', '반려됨'];

const data = Array.from({ length: 20 }, (_, index) => ({
  status: statuses[index % statuses.length],
  number: String(index + 1).padStart(2, '0'),
  title: `○○월 세금계산서 ${index + 1}`,
  date: '2025.02.28',
  center: '서울우유태평고객센터'
}));

const CustomerChartContent = () => {
  return (
    <div className="h-[532px] w-[960px] overflow-y-auto overflow-x-hidden custom-scrollbar ">
      {data.map((item, index) => (
        <div
          key={index}
          className="mx-[8px] flex w-[932px] h-[42px] items-center rounded-[12px] hover:bg-gray-100 font-sm-medium"
        >
          <div className="w-[92px] pl-5">
            <StatusBadge status={item.status} />
          </div>
          <div className="w-[92px] pl-5 text-sm font-medium text-gray-700">
            {item.number}
          </div>
          <div className="w-[358px] pl-5 text-sm font-medium text-gray-700">
            {item.title}
          </div>
          <div className="w-[170px] pl-5 text-sm font-medium text-gray-700">
            {item.date}
          </div>
          <div className="w-[200px] pl-5 text-sm font-medium text-gray-700">
            {item.center}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CustomerChartContent;
