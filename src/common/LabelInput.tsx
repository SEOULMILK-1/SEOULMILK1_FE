import React, { useState, useId } from 'react';

interface LabelInputProps {
  placeholder: string;
  type?: string;
  className?: string;
  [key: string]: any;
}

const LabelInput = ({
  placeholder,
  type = 'text',
  className = '',
  ...props
}: LabelInputProps) => {
  const [value, setValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const id = useId(); // 고유 ID 생성

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => {
    if (!value) {
      // 값이 없을 때만 포커스 상태 해제
      setIsFocused(false);
    }
  };
  const handleChange = (e) => setValue(e.target.value);

  return (
    <div className="relative w-full">
      {/* 입력 필드 */}
      <input
        id={id}
        type={type}
        value={value}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        className={`
          font-xl-medium w-full h-[59px] px-[18px] py-[16px] border rounded-lg 
          focus:ring-1 focus:ring-primary-500 focus:outline-none transition-all
          ${isFocused || value ? 'pt-[22px] pb-[10px]' : ''}
          ${className}
        `}
        placeholder=""
        {...props}
      />
      {/* 라벨 (Floating Label) */}
      <label
        htmlFor={id} // 입력 필드와 라벨 연결
        className={`
          absolute left-[18px] cursor-text top-[50%] transform -translate-y-1/2 text-gray-500 transition-all 
          ${
            isFocused || value
              ? 'mt-[8px] top-[6px] font-xs-medium text-gray-500'
              : 'font-xl-medium'
          }
        `}
      >
        {placeholder}
      </label>
    </div>
  );
};

export default LabelInput;
