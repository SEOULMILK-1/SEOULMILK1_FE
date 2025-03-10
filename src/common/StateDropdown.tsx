import { useState, useRef } from 'react';
import StateDropdownIcon from '../../public/Icon/StateDropdownIcon';

interface DropdownProps {
  selected?: string;
  onChange?: (state: string) => void;
}

const StateDropdown = ({ selected = '선택', onChange }: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const options = ['반영', '미반영'];
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };
  useState(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  });

  const handleSelect = (option: string) => {
    if (selected !== option) {
      setIsOpen(false);
      if (onChange) {
        onChange(option);
      }
    }
  };

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center justify-between w-[104px] px-3 py-2 border rounded-lg bg-white drop-shadow-elevation2 transition-all ${
          selected === '선택'
            ? 'border-gray-400 text-gray-500'
            : 'border-primary-700 text-primary-700'
        } ${isOpen ? 'border-primary-700' : ''}`}
      >
        {selected}
        <StateDropdownIcon selected={selected} />
      </button>
      {isOpen && (
        <div className="absolute mt-[16px] w-[114px] px-[8px] py-[12px] font-md-medium bg-white border border-gray-100 rounded-[12px] drop-shadow-elevation2">
          {options.map((option) => (
            <button
              key={option}
              className={`block w-full px-[8px] py-2 text-center text-gray-500 rounded-[8px] hover:bg-gray-100 ${
                selected === option
                  ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
                  : ''
              }`}
              onClick={() => handleSelect(option)}
              disabled={selected === option}
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default StateDropdown;
