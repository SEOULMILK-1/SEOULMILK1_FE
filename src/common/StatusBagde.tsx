const statusStyles = {
  반영: 'bg-primary-50 text-primary-600 ',
  미반영: 'bg-gray-200 text-gray-500'
};

export type Status = '반영' | '미반영';

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
