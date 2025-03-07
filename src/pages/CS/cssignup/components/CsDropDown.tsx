import { useState } from 'react';
import ToggleIcon from '../../../../../public/Icon/ToggleIcon';

interface Agency {
  id: number;
  name: string;
}

interface Props {
  selectedId: number | null;
  options: Agency[];
  onSelect: (id: number) => void;
}

const CsDropDown = ({ selectedId, options, onSelect }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState(
    options.find((opt) => opt.id === selectedId)?.name || ''
  );

  const filteredOptions = options.filter((opt) =>
    opt.name.includes(inputValue)
  );

  const handleSelect = (id: number, name: string) => {
    setInputValue(name);
    onSelect(id);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <div className="flex items-center w-full border border-gray-300 rounded-xl p-4 bg-white">
        <input
          type="text"
          placeholder="선택"
          className="w-full outline-none text-gray-700"
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
        />
        <button type="button" onClick={() => setIsOpen(!isOpen)}>
          <div
            className={`transform transition-transform ${
              isOpen ? 'rotate-180' : ''
            }`}
          >
            <ToggleIcon fill={isOpen ? '#009856' : '#DADFE7'} />
          </div>
        </button>
      </div>
      {isOpen && filteredOptions.length > 0 && (
        <ul className="absolute w-full bg-white border rounded-lg mt-1 z-10">
          {filteredOptions.map((agency) => (
            <li
              key={agency.id}
              className="p-3 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleSelect(agency.id, agency.name)}
            >
              {agency.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CsDropDown;
