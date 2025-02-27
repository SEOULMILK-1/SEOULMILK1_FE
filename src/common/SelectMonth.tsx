import { useState } from 'react';

export default function SubscriptionToggle() {
  const [selected, setSelected] = useState('1개월');
  const options = ['1개월', '3개월', '6개월'];

  return (
    <div className="flex w-[280px] h-[48px] p-[6px] bg-white border border-gray-300 rounded-[12px]">
      {options.map((option) => (
        <button
          key={option}
          className={`flex-1 px-[12px] py-[6px] rounded-[8px] text-gray-400  font-md-medium transition-all ${
            selected === option ? 'bg-green-100 text-green-600' : ''
          }`}
          onClick={() => setSelected(option)}
        >
          {option}
        </button>
      ))}
    </div>
  );
}
