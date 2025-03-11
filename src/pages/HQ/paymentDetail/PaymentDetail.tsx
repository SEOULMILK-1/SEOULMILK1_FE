import Header from '../../../common/Header';
import ArrowIcon from '../../../../public/Icon/ArrowIcon';
import Button from '../../../common/Button';
import ChatLine from '../../../../public/Icon/ChartLine';
import EditIcon from '../../../../public/Icon/EditIcon';
import { useEffect, useState } from 'react';
import api from '../../../hooks/api';
import AccountEditModal from './AccountEditModal';
import PaymentDetailModal from './PaymentDetailModal';
import { useParams, useSearchParams } from 'react-router-dom';
import { PaymentData } from '../../../types/paymentDetails';

const PaymentDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bankName, setBankName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [paymentData, setPaymentData] = useState<PaymentData>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedTaxItem, setSelectedTaxItem] = useState<any | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const fetchPaymentDetails = async () => {
      try {
        const response = await api.get(`/hq/payment-resolution/${id}`);
        if (response.data.isSuccess) {
          setPaymentData(response.data.result);
          setBankName(response.data.result.bank);
          setAccountNumber(response.data.result.account);
        } else {
          setError('데이터를 불러오는 중 오류가 발생했습니다.');
        }
      } catch (err) {
        setError('서버 요청 중 문제가 발생했습니다.');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchPaymentDetails();
    }
  }, [id]);

  useEffect(() => {
    const taxId = searchParams.get('ntsId');
    if (taxId && paymentData?.paymentDetails) {
      const itemToSelect = paymentData.paymentDetails.find(
        (item) => item.ntsTaxNum === taxId
      );
      if (itemToSelect) {
        setSelectedTaxItem(itemToSelect);
      }
    }
  }, [searchParams, paymentData]);

  const handleTaxItemClick = (item: any) => {
    setSelectedTaxItem(item);
    setSearchParams({ ntsId: item.ntsId.toString() });
  };

  const handleCloseModal = () => {
    setSelectedTaxItem(null);

    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.delete('ntsId');
    setSearchParams(newSearchParams);
  };

  const handleDownloadPaymentResolution = async () => {
    try {
      const response = await api.get(`/hq/payment-resolution/pdf/${id}`, {
        responseType: 'blob'
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `지급결의서_${id}.pdf`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      console.log(' 지급 결의서 다운로드 성공');
    } catch (error) {
      console.error(' 지급 결의서 다운로드 실패:', error);
    }
  };

  if (loading) {
    return <p className="text-center py-6 text-gray-500">로딩 중...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  return (
    <div className="mx-[94px] w-[960px]">
      <Header title={paymentData?.name || 'N/A'} Icon={ArrowIcon}>
        <div className="text-sm text-gray-500 flex gap-3">
          <p>작성일: {paymentData?.createdAt || 'N/A'}</p>{' '}
          <ChatLine className="mt-1" />
          {/* <p>문서번호: {paymentData?.paymentResolutionId || 'N/A'}</p> */}
        </div>
      </Header>

      <div className="rounded-[24px] w-[960px] border border-gray-200 overflow-hidden mb-8 mt-8">
        <div className="grid grid-cols-2 text-center py-3 bg-gray-50 border-b border-gray-200">
          <h2 className="text-gray-600 font-medium">지급 대상 정보</h2>
          <h2 className="text-gray-600 font-medium">지급 주체 정보</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-gray-200 ">
          <div>
            <div className="grid grid-cols-2 border-b border-gray-100 bg-gray-50">
              <div className="text-gray-700 font-sm-semibold bg-gray-100 pl-[28px] py-[13.5px]">
                지급 대상
              </div>
              <div className="text-gray-700 font-sm-medium pl-[28px] py-[13.5px]">
                {paymentData?.paymentRecipient || '-'}
              </div>
            </div>

            <div className="grid grid-cols-2 border-b border-gray-100">
              <div className="text-gray-700 font-sm-semibold bg-gray-100 pl-[28px] py-[13.5px]">
                지급 대상 사업자 등록번호
              </div>
              <div className="text-gray-700 font-sm-medium pl-[28px] py-[13.5px]">
                {paymentData?.recipientBusinessNumber || '-'}
              </div>
            </div>

            <div className="grid grid-cols-2 border-b border-gray-100 bg-gray-50">
              <div className="text-gray-700 font-sm-semibold bg-gray-100 pl-[28px] py-[13.5px]">
                정산 지급 총액
              </div>
              <div className="text-gray-700 font-sm-medium pl-[28px] py-[13.5px]">
                {paymentData?.totalPaymentAmount || '0'} 원
              </div>
            </div>

            <div className="grid grid-cols-2 border-b border-gray-100">
              <div className="text-gray-700 font-sm-semibold bg-gray-100 pl-[28px] py-[13.5px]">
                지급 방법
              </div>
              <div className="text-gray-700 font-sm-medium pl-[28px] py-[13.5px]">
                {paymentData?.paymentMethod}
              </div>
            </div>

            <div className="grid grid-cols-2 bg-gray-50">
              <div className="text-gray-700 font-sm-semibold bg-gray-100 pl-[28px] py-[13.5px]">
                지급 계좌
              </div>
              <div className="text-gray-700 font-sm-medium pl-[28px] py-[13.5px] flex items-center gap-3">
                <p>은행은? {paymentData?.paymentAccount}</p>
                <div
                  className="cursor-pointer"
                  onClick={() => setIsModalOpen(true)}
                >
                  <EditIcon />
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="grid grid-cols-2  border-b border-gray-100 bg-gray-50">
              <div className="text-gray-700 font-sm-semibold bg-gray-100 pl-[28px] py-[13.5px]">
                지급 주체
              </div>
              <div className="text-gray-700 font-sm-medium pl-[28px] py-[13.5px]">
                {paymentData?.paymentPrincipal}
              </div>
            </div>

            <div className="grid grid-cols-2 border-b border-gray-100">
              <div className="text-gray-700 font-sm-semibold bg-gray-100 pl-[28px] py-[13.5px]">
                지급 주체 사업자 등록번호
              </div>
              <div className="text-gray-700 font-sm-medium pl-[28px] py-[13.5px]">
                {paymentData?.principalBusinessNumber}
              </div>
            </div>

            <div className="grid grid-cols-2 border-b border-gray-100 bg-gray-50">
              <div className="text-gray-700 font-sm-semibold bg-gray-100 pl-[28px] py-[13.5px]">
                결제권자
              </div>
              <div className="text-gray-700 font-sm-medium pl-[28px] py-[13.5px]">
                -
              </div>
            </div>

            <div className="grid grid-cols-2 border-b border-gray-100">
              <div className="text-gray-700 font-sm-semibold bg-gray-100 pl-[28px] py-[13.5px]">
                지급결의서 작성일자
              </div>
              <div className="text-gray-700 font-sm-medium pl-[28px] py-[13.5px]">
                {paymentData?.createdAt}
              </div>
            </div>

            <div className="grid grid-cols-2 bg-gray-50">
              <div className="text-gray-700 font-sm-semibold bg-gray-100 pl-[28px] py-[13.5px]">
                지급 예정일
              </div>
              <div className="text-gray-700 font-sm-medium pl-[28px] py-[13.5px]">
                -
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 반영된 세금계산서 */}
      <div className="mb-8">
        <h2 className="font-2xl-bold text-gray-800 mb-6">반영된 세금계산서</h2>

        <div className="w-[960px] rounded-[24px] border border-gray-200 overflow-hidden">
          <div className="flex items-center h-[42px] bg-gray-50 border-b border-gray-300 mt-[14px]  pl-2 pr-5">
            <div className="pl-5 pr-5 text-gray-500 font-sm-medium w-[100px] ">
              번호
            </div>
            <ChatLine />
            <div className="pl-5 pr-5 text-gray-500 font-sm-medium w-[350px] ">
              세금계산서 번호
            </div>{' '}
            <ChatLine />
            <div className="pl-5 pr-5 text-gray-500 font-sm-medium w-[180px] ">
              발행일
            </div>{' '}
            <ChatLine />
            <div className="pl-5 pr-5 text-gray-500 font-sm-medium w-[200px] ">
              공급가액
            </div>
          </div>

          <div className="max-h-80 overflow-y-auto">
            {paymentData?.paymentDetails &&
            paymentData.paymentDetails.length > 0 ? (
              paymentData.paymentDetails.map((tax, index) => (
                <div
                  key={index}
                  className={`flex items-center py-3 border-b border-gray-100 px-5 ${
                    index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                  } hover:bg-gray-100 rounded-[12px]`}
                  onClick={() => handleTaxItemClick(tax)}
                >
                  <div className="w-[92px] px-5">{index + 1}</div>
                  <div className="px-5 w-[350px]  overflow-hidden text-ellipsis">
                    {tax.ntsTaxNum || '-'}
                  </div>
                  <div className="pl-5 pr-5 w-[180px] ">
                    {tax.issueDate ? tax.issueDate.split(' ')[0] : '-'}
                  </div>
                  <div className="pl-5 pr-5 w-[200px] ">
                    {tax.supplyAmount
                      ? tax.supplyAmount.toLocaleString() + '원'
                      : '-'}
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center py-6 text-gray-500">
                조회된 세금계산서가 없습니다.
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <Button
          size="sm"
          className="bg-primary-700 h-[48px] rounded-[12px] w-[180px] text-white px-6 py-3 font-md-medium whitespace-nowrap"
          onClick={handleDownloadPaymentResolution}
        >
          지급 결의서 다운로드
        </Button>
      </div>
      {selectedTaxItem && (
        <PaymentDetailModal
          isOpen={!!selectedTaxItem}
          onClose={handleCloseModal}
          selectedItem={selectedTaxItem}
        />
      )}
      <AccountEditModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialBank={bankName}
        initialAccount={accountNumber}
        onUpdate={(newBank, newAccount) => {
          setBankName(newBank);
          setAccountNumber(newAccount);
        }}
      />
    </div>
  );
};

export default PaymentDetail;
