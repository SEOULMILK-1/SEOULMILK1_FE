import ApproveHeader from './ApproveHeader';

const Approve = () => {
  return (
    <div>
      <div className="mt-12 flex flex-row gap-2">
        <span className="text-gray-800 font-2xl-bold"> 승인 </span>
        <span className="text-gray-500 font-2xl-medium"> 0 </span>
      </div>
      {/* // */}
      <div className="mt-4 flex h-[341px] flex-col border border-gray-300 bg-white rounded-3xl">
        <ApproveHeader />
      </div>
    </div>
  );
};

export default Approve;
