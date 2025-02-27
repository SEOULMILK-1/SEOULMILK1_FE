import React from 'react';

const StateDropdown = ({ selected }: any) => {
  return (
    <svg
      className={selected === '선택' ? 'text-gray-500' : 'text-primary-700'}
      width="10"
      height="8"
      viewBox="0 0 10 8"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5.86603 7.5C5.48113 8.16667 4.51887 8.16667 4.13397 7.5L0.669874 1.5C0.284974 0.833333 0.7661 -8.94676e-07 1.5359 -8.27378e-07L8.4641 -2.21695e-07C9.2339 -1.54397e-07 9.71503 0.833333 9.33013 1.5L5.86603 7.5Z"
        fill={selected === '선택' ? '#9E9E9E' : '#009856'} 
      />
    </svg>
  );
};

export default StateDropdown;
