import CircleNumber from '../../../HQ/signup/components/CircleNumber';
import SignupInput from '../../../HQ/signup/components/SignupInput';
import SignupButton from '../../../HQ/signup/components/SignupButton';
import { useNavigate } from 'react-router-dom';
import SignupModal from '../../../HQ/signup/components/SignupModal';
import { useState } from 'react';
import Check from '../../../../../public/Icon/Check';
import AgreeModal from '../../../../common/AgreeModal';

interface FormState {
  agency: string;
  bank: string;
  account: string;
  phone: string;
  email: string;
}

interface Errors {
  agency: string;
  bank: string;
  account: string;
  phone: string;
  email: string;
  [agree: string]: string;
}

const CsSignup2 = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAgreeModal, setIsAgreeModal] = useState(false);
  const [formState, setFormState] = useState<FormState>({
    agency: '',
    bank: '',
    account: '',
    phone: '',
    email: ''
  });
  const [errors, setErrors] = useState<Errors>({
    agency: '',
    bank: '',
    account: '',
    phone: '',
    email: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const validate = (): boolean => {
    let newErrors: Errors = {
      agency: '',
      bank: '',
      account: '',
      phone: '',
      email: ''
    };
    let isValid = true;

    if (!formState.bank.trim()) {
      newErrors.bank = '지급 요청 계좌를 입력해주세요.';
      isValid = false;
    }

    if (!formState.account.trim()) {
      newErrors.account = '계좌번호를 입력해주세요.';
      isValid = false;
    }

    if (!formState.phone.trim()) {
      newErrors.phone = '전화번호를 입력해주세요';
      isValid = false;
    }

    if (!formState.email.trim()) {
      newErrors.email = '이메일을 입력해주세요';
      isValid = false;
    }

    const isAgreeChecked = document.querySelector(
      'input[type="checkbox"]:checked'
    );
    if (!isAgreeChecked) {
      newErrors['agree'] = '개인정보 수집 및 이용 동의를 해주세요.';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  return (
    <div className="flex min-h-screen h-[1024px] items-center justify-center bg-gray-50">
      <div className="flex flex-col w-[480px] py-[42px] px-8 justify-center items-start gap-8 rounded-[32px] bg-white drop-shadow-elevation1">
        <div className="flex flex-col">
          <CircleNumber type="two" />
        </div>

        {/* <div className="flex flex-col w-full gap-7 justify-center items-start "> */}
        <div className="flex flex-col gap-2 w-full">
          <label className="text-gray-600 font-md-semibold"> 대리점 </label>
          <SignupInput
            name="agency"
            placeholder="선택"
            type="text"
            value={formState.agency}
            onChange={handleChange}
          />
        </div>

        <div className="flex flex-col gap-2 w-full">
          <label className="text-gray-600 font-md-semibold">
            사업자 계좌 (지급 요청 계좌)
          </label>
          <SignupInput
            name="bank"
            placeholder="은행명 입력"
            type="text"
            value={formState.bank}
            onChange={handleChange}
          />

          <SignupInput
            name="account"
            placeholder="계좌번호 입력"
            type="text"
            value={formState.account}
            onChange={handleChange}
          />
        </div>

        <div className="flex flex-col gap-2 w-full">
          <label className="text-gray-600 font-md-semibold"> 전화번호 </label>
          <SignupInput
            name="phone"
            placeholder="-없이 숫자만 입력"
            type="text"
            value={formState.phone}
            onChange={handleChange}
          />
        </div>

        <div className="flex flex-col gap-2 w-full">
          <label className="text-gray-600 font-md-semibold"> 이메일 </label>
          <SignupInput
            name="email"
            placeholder="example@email.com"
            type="email"
            value={formState.email}
            onChange={handleChange}
          />
        </div>

        <div className="flex w-full flex-col">
          <div className="flex w-full items-center">
            <div className="relative items-center mt-1">
              <input
                type="checkbox"
                className="appearance-none w-6 h-6 rounded-lg border border-solid border-gray-300 checked:bg-primary-700 checked:border-primary-700 
    relative peer checked:cursor-pointer cursor-pointer"
              />
              <span className="absolute inset-0 bottom-[6px] left-1 right-1 items-center justify-center pointer-events-none hidden peer-checked:flex">
                <Check stroke="#fff" />
              </span>
            </div>

            <div className="flex w-full items-center">
              <span className="ml-2 text-center text-gray-800 font-md-medium">
                개인 정보 수집 및 이용 동의
              </span>
              <div
                className="text-gray-500 font-sm-medium underline ml-auto cursor-pointer"
                onClick={() => setIsAgreeModal(true)}
              >
                전문 보기
              </div>
            </div>
          </div>
          {/* 임시위치 */}
          {errors['agree'] && (
            <p className="text-warning-700 font-sm-regular mt-2">
              {errors['agree']}
            </p>
          )}
        </div>

        <SignupButton
          text="회원가입"
          prevonClick={() => navigate('/cs/signup')}
          onClick={() => {
            if (validate()) {
              setIsModalOpen(true);
            }
          }}
        />
      </div>
      {isModalOpen && <SignupModal />}
      {isAgreeModal && <AgreeModal onClose={() => setIsAgreeModal(false)} />}
    </div>
  );
};

export default CsSignup2;
