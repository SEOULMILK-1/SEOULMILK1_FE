import { useState, ChangeEvent } from 'react';
import GraySearchIcon from '../../public/Icon/GraySearchIcon';
import { LoginDeleteIcon } from '../../public/Icon/LoginDeleteIcon';
import SearchButton from './SearchButton';

interface SearchBarProps {
  // onSearch: (value: string) => void;
  placeholderName: string;
}

const Search = ({ placeholderName }: SearchBarProps) => {
  const [inputValue, setInputValue] = useState<string>('');

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleClearText = () => {
    setInputValue('');
  };

  return (
    <div className="mt-8 flex flex-row gap-4">
      <div className="relative w-[360px]">
        <div className="absolute left-4 top-1/2 transform -translate-y-1/2 cursor-pointer">
          {inputValue.length > 0 ? (
            <GraySearchIcon fillColor="#1aba6e" />
          ) : (
            <GraySearchIcon />
          )}
        </div>
        <input
          placeholder={placeholderName}
          value={inputValue}
          onChange={handleInputChange}
          className={`w-full h-12 pl-[44px] pr-4 py-4 rounded-xl border border-solid focus:border-primary-500 ${
            inputValue ? 'border-primary-500' : 'border-gray-300'
          } placeholder:text-gray-500 placeholder:font-md-medium focus:outline-none`}
        />

        {inputValue.length > 0 && (
          <div
            className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer"
            onClick={handleClearText}
          >
            <LoginDeleteIcon />
          </div>
        )}
      </div>

      <SearchButton isActive={inputValue.length > 0} />
    </div>
  );
};

export default Search;
