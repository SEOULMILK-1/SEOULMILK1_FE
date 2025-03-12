const statusStyles = {
  반영: 'bg-primary-50 text-primary-600 ',
  미반영: 'bg-gray-200 text-gray-500',
  승인: 'bg-primary-50 text-primary-600 ',
  반려: 'bg-warning-50 text-warning-700'
};

export type Status = '승인' | '반려' | '반영' | '미반영';

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
