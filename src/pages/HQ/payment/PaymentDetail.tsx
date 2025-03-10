import React from 'react';
import Header from '../../../common/Header';
import ArrowIcon from '../../../../public/Icon/ArrowIcon';
import Button from '../../../common/Button';

export const PaymentDetail = () => {
  return (
    <div className="mx-[94px] w-[960px]">
      <div >
        <Header title="전달받은 제목" Icon={ArrowIcon} />
        <div className="text-sm text-gray-500">
          작성일: 2025.02.26 | 문서번호: 1234567890
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-4 font-sans bg-gray-50">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="rounded-xl border border-gray-200 overflow-hidden mb-8">
            {/* Section Headers */}
            <div className="grid grid-cols-2 text-center py-3 bg-gray-50 border-b border-gray-200">
              <h2 className="text-gray-600 font-medium">지급 대상 정보</h2>
              <h2 className="text-gray-600 font-medium">지급 주체 정보</h2>
            </div>

            {/* Content */}
            <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-gray-200">
              {/* Left Column - Payment Recipient */}
              <div>
                <div className="grid grid-cols-2 py-4 px-6 border-b border-gray-100 bg-gray-50">
                  <div className="text-gray-600">지급 대상</div>
                  <div className="font-medium">서울유유태평고객센터</div>
                </div>

                <div className="grid grid-cols-2 py-4 px-6 border-b border-gray-100">
                  <div className="text-gray-600">지급 대상 사업자 등록번호</div>
                  <div className="font-medium">번호</div>
                </div>

                <div className="grid grid-cols-2 py-4 px-6 border-b border-gray-100 bg-gray-50">
                  <div className="text-gray-600">정산 지급 총액</div>
                  <div className="font-medium">000,000,000원</div>
                </div>

                <div className="grid grid-cols-2 py-4 px-6 border-b border-gray-100">
                  <div className="text-gray-600">지급 방법</div>
                  <div className="font-medium">계좌이체</div>
                </div>

                <div className="grid grid-cols-2 py-4 px-6 bg-gray-50">
                  <div className="text-gray-600">지급 계좌</div>
                  <div className="font-medium flex items-center">
                    은행 0000000000000000
                    <button className="ml-2 text-gray-400">
                      {/* <Edit className="h-4 w-4" /> */}
                    </button>
                  </div>
                </div>
              </div>

              {/* Right Column - Payment Sender */}
              <div>
                <div className="grid grid-cols-2 py-4 px-6 border-b border-gray-100 bg-gray-50">
                  <div className="text-gray-600">지급 주체</div>
                  <div className="font-medium">서울유유태평고객센터</div>
                </div>

                <div className="grid grid-cols-2 py-4 px-6 border-b border-gray-100">
                  <div className="text-gray-600">
                    지급 주체 사업자 등록 번호
                  </div>
                  <div className="font-medium">1029301924</div>
                </div>

                <div className="grid grid-cols-2 py-4 px-6 border-b border-gray-100 bg-gray-50">
                  <div className="text-gray-600">결제권자</div>
                  <div className="font-medium">-</div>
                </div>

                <div className="grid grid-cols-2 py-4 px-6 border-b border-gray-100">
                  <div className="text-gray-600">지급결의서 작성일자</div>
                  <div className="font-medium">2025.02.26</div>
                </div>

                <div className="grid grid-cols-2 py-4 px-6 bg-gray-50">
                  <div className="text-gray-600">지급 예정일</div>
                  <div className="font-medium">-</div>
                </div>
              </div>
            </div>
          </div>

          {/* Tax Invoice Section */}
          <div className="mb-8">
            <h2 className="text-lg font-medium mb-4">반영된 세금계산서</h2>

            <div className="rounded-xl border border-gray-200 overflow-hidden">
              {/* Table Header */}
              <div className="grid grid-cols-4 text-center py-3 bg-gray-50 border-b border-gray-200 px-4">
                <div className="text-gray-600 font-medium">번호</div>
                <div className="text-gray-600 font-medium">세금계산서 번호</div>
                <div className="text-gray-600 font-medium">발행일</div>
                <div className="text-gray-600 font-medium">공급가액</div>
              </div>

              {/* Table Rows */}
              <div className="max-h-80 overflow-y-auto">
                {[...Array(7)].map((_, index) => (
                  <div
                    key={index}
                    className={`grid grid-cols-4 text-center py-3 px-4 border-b border-gray-100 ${
                      index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                    }`}
                  >
                    <div>01</div>
                    <div>1234567890</div>
                    <div>2025.02.28</div>
                    <div>000000</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Download Button */}
          <div className="flex justify-end">
            <Button className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-md">
              지급 결의서 다운로드
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
