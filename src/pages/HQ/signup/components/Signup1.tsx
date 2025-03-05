import { useNavigate } from 'react-router-dom';
import CircleNumber from './CircleNumber';
import SignupInput from './SignupInput';
import SignupButton from './SignupButton';
import { useState } from 'react';

interface FormState {
  name: string;
  businessNumber: string;
  password: string;
  passwordCheck: string;
}

interface Errors {
  name: string;
  businessNumber: string;
  password: string;
  passwordCheck: string;
}

const Signup1 = () => {
  const navigate = useNavigate();
  const [formState, setFormState] = useState<FormState>({
    name: '',
    businessNumber: '',
    password: '',
    passwordCheck: ''
  });
  const [errors, setErrors] = useState<Errors>({
    name: '',
    businessNumber: '',
    password: '',
    passwordCheck: ''
  });

  const validate = (): boolean => {
    let newErrors: Errors = {
      name: '',
      businessNumber: '',
      password: '',
      passwordCheck: ''
    };
    let isValid = true;

    if (!formState.businessNumber.trim()) {
      newErrors.businessNumber = '사번을 입력해주세요.';
      isValid = false;
    }
    if (!formState.password.trim()) {
      newErrors.password = '비밀번호를 입력해주세요.';
      isValid = false;
    } else if (
      !/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/.test(
        formState.password
      )
    ) {
      newErrors.password = '비밀번호 규칙에 맞지 않습니다.';
      isValid = false;
    }

    if (formState.password !== formState.passwordCheck) {
      newErrors.passwordCheck = '동일한 비밀번호가 아닙니다.';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleSubmit = (): void => {
    if (validate()) {
      navigate('/head/signup2');
    }
  };

  return (
    <div className="flex flex-col w-[480px] py-[42px] px-8 justify-center items-start gap-8 rounded-[32px] bg-white drop-shadow-elevation1">
      <div className="flex flex-col gap-4">
        <CircleNumber type="one" />
      </div>

      <div className="flex flex-col gap-2 w-full">
        <label className="text-gray-600 font-md-semibold"> 이름 </label>
        <SignupInput
          type="text"
          placeholder="이름을 알려주세요"
          name="name"
          value={formState.name}
          onChange={handleChange}
        />
      </div>

      <div className="flex flex-col gap-2 w-full">
        <label className="text-gray-600 font-md-semibold"> 사번 </label>
        <div className="flex flex-row gap-2">
          <SignupInput
            type="text"
            name="businessNumber"
            placeholder="사번을 입력하세요"
            value={formState.businessNumber}
            onChange={handleChange}
          />
          <button className="flex w-[80px] whitespace-nowrap px-7 h-14 justify-center items-center gap-[10px] rounded-xl bg-gray-200 text-gray-400 text-center font-md-medium">
            확인
          </button>
        </div>
        {errors.businessNumber && (
          <p className="text-warning-700 font-sm-regular">
            {errors.businessNumber}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-2 w-full">
        <label className="text-gray-600 font-md-semibold"> 비밀번호 </label>
        <SignupInput
          type="password"
          name="password"
          placeholder="영문, 숫자, 특수문자 조합 8~16자"
          value={formState.password}
          onChange={handleChange}
        />
        {errors.password && (
          <p className="text-warning-700 font-sm-regular">{errors.password}</p>
        )}
        <SignupInput
          type="password"
          placeholder="비밀번호 재입력"
          name="passwordCheck"
          value={formState.passwordCheck}
          onChange={handleChange}
        />
        {errors.passwordCheck && (
          <p className="text-warning-700 font-sm-regular">
            {errors.passwordCheck}
          </p>
        )}
      </div>

      <SignupButton
        text="다음"
        prevonClick={() => navigate('/signup')}
        onClick={handleSubmit}
      />
    </div>
  );
};

export default Signup1;
