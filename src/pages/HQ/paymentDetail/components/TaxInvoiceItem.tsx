interface TaxInvoiceItemProps {
  index: number;
  tax: {
    ntsId: number | null;
    ntsTaxNum: string;
    issueDate: string;
    supplyAmount: number;
  };
  onClick: (item: any) => void;
}
const TaxInvoiceItem = ({ index, tax, onClick }: TaxInvoiceItemProps) => {
  return (
    <div
      key={index}
      className={`flex items-center py-3 border-b border-gray-100 px-5 ${
        index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
      } hover:bg-gray-100 rounded-[12px]`}
      onClick={() => onClick(tax)}
    >
      <div className="w-[92px] px-5">{index + 1}</div>
      <div className="px-5 w-[350px]  overflow-hidden text-ellipsis">
        {tax.ntsTaxNum || '-'}
      </div>
      <div className="pl-5 pr-5 w-[180px]">
        {tax.issueDate ? tax.issueDate.split(' ')[0] : '-'}
      </div>
      <div className="pl-5 pr-5 w-[200px]">
        {tax.supplyAmount ? tax.supplyAmount.toLocaleString() + '원' : '-'}
      </div>
    </div>
  );
};

export default TaxInvoiceItem;
