const statusStyles = {
  승인됨: 'bg-primary-50 text-primary-600 ',
  반려됨: 'bg-warning-50 text-warning-700',
  지급완료: 'bg-gray-200 text-gray-500'
};

export type Status = '승인됨' | '반려됨';

interface StatusBadgeProps {
  status: Status;
}

const StatusBadge = ({ status }: StatusBadgeProps) => {
  return (
    <span
      className={`whitespace-nowrap w-[57px] h-[22px] text-center px-[6px] py-1 rounded-full font-xs-bold ${statusStyles[status]}`}
    >
      {status}
    </span>
  );
};

export default StatusBadge;
