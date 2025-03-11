import { useEffect, useState } from 'react';
import UnderIcon from '../../public/Icon/UnderIcon';
import TwoArrowIcon from '../../public/Icon/TwoArrowIcon';
import ArrowIcon from '../../public/Icon/ArrowIcon';

interface ChartPaginationProps {
  totalItems: number;
  pageSize: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
}

const ChartPagination = ({
  totalItems,
  pageSize,
  currentPage,
  onPageChange,
  onPageSizeChange
}: ChartPaginationProps) => {
  const [selectedPageSize, setSelectedPageSize] = useState(pageSize);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    if (totalItems > 0 && pageSize > 0) {
      setTotalPages(Math.ceil(totalItems / pageSize));
    } else {
      setTotalPages(1);
    }
  }, [totalItems, pageSize]);

  const handlePageSizeChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const newSize = Number(event.target.value);
    setSelectedPageSize(newSize);
    onPageSizeChange(newSize);

    onPageChange(1);
  };

  const handlePageChange = (page: number) => {
    if (page < 1) return;
    if (page > totalPages) return;
    onPageChange(page);
  };

  return (
    <div className="flex w-[960px] h-[56px] px-5 justify-end items-center border-t border-gray-300">
      <div className="flex items-center gap-9">
        <span className="text-gray-500 font-sm-medium">페이지 당 행</span>
        <div className="relative py-[6px]">
          <select
            className="flex w-[84px] h-[34px] px-4 text-left rounded-xl border border-gray-300 text-gray-500 font-sm-medium appearance-none cursor-pointer"
            value={selectedPageSize}
            onChange={handlePageSizeChange}
          >
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="30">30</option>
            <option value="40">40</option>
          </select>
          <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
            <UnderIcon />
          </div>
        </div>

        <div className="flex items-center gap-[29px]">
          <div
            onClick={() => handlePageChange(1)}
            className={`cursor-pointer ${
              currentPage === 1 ? 'opacity-50' : ''
            }`}
          >
            <TwoArrowIcon />
          </div>

          <div
            onClick={() => handlePageChange(currentPage - 1)}
            className={`cursor-pointer ${
              currentPage === 1 ? 'opacity-50' : ''
            }`}
          >
            <ArrowIcon />
          </div>

          <div className="text-gray-500 text-center font-sm-medium">
            {currentPage} / {totalPages} 페이지
          </div>

          <div
            className={`rotate-180 cursor-pointer ${
              currentPage === totalPages ? 'opacity-50' : ''
            }`}
            onClick={() => handlePageChange(currentPage + 1)}
          >
            <ArrowIcon />
          </div>

          <div
            className={`rotate-180 cursor-pointer ${
              currentPage === totalPages ? 'opacity-50' : ''
            }`}
            onClick={() => handlePageChange(totalPages)}
          >
            <TwoArrowIcon />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChartPagination;
