import { useState, useEffect } from 'react';
import DeleteXIcon from '../../../../../public/Icon/DeleteXIcon';
import TagIcon from '../../../../../public/Icon/TagIcon';
import api from '../../../../hooks/api';

interface AgencyProps {
  csId: number;
  csName: string;
}

const HQAgencyModal = ({ onClose }: { onClose: () => void }) => {
  const [tags, setTags] = useState<AgencyProps[]>([]);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const token = localStorage.getItem('accesstoken');
        const response = await api.get('/hq/manage/cs', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        console.log('태그데이터', response.data);

        setTags(response.data.result.responseList || []);
      } catch (error) {
        console.error('태그데이터 불러오기 에러', error);
        setTags([]);
      }
    };

    fetchTags();
  }, []);

  const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputValue.trim()) {
      e.preventDefault();
      const newTag = inputValue.trim();

      try {
        const requestData = { teamIds: [newTag] };
        console.log('보낼 데이터:', requestData);

        const token = localStorage.getItem('accesstoken');
        const response = await api.post('/hq/manage/cs', requestData, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        console.log('응답 데이터:', response.data);

        setTags(response.data.teamIds || []);
        setInputValue('');
      } catch (error: any) {
        console.error('태그 추가 에러', error.response?.data || error.message);
      }
    }
  };

  const removeTag = async (csId: number) => {
    try {
      const token = localStorage.getItem('accesstoken');
      await api.delete(`/hq/manage/cs/${csId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log('삭제완료');
      setTags((prevTags) => prevTags.filter((t) => t.csId !== csId));
    } catch (error) {
      console.error('삭제에러', error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
      <div className="flex w-[480px] px-8 py-[42px] flex-col justify-center items-start gap-2 rounded-[32px] bg-white drop-shadow-elevation1">
        <div className="flex flex-row items-center justify-between w-full">
          <div className="flex flex-row gap-2">
            <p className="text-gray-800 font-2xl-semibold">담당 대리점</p>
            <p className="text-center font-2xl-semibold text-primary-700">
              {tags.length}
            </p>
          </div>

          <button onClick={onClose} className="p-[7px] flex items-center">
            <DeleteXIcon stroke="#949BA7" />
          </button>
        </div>

        <input
          className="w-full flex mt-4 h-14 p-4 justify-center items-center gap-[10px] rounded-xl border border-solid border-gray-300 bg-white placeholder:text-gray-500 placeholder:font-md-medium"
          placeholder="입력 후 엔터를 눌러 추가하세요"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
        />

        {tags.length > 0 && (
          <div className="flex flex-wrap items-start gap-3 mt-4">
            {tags.map((tag) => (
              <div
                key={tag.csId}
                className="flex h-8 items-center pl-3 pr-2 py-1 rounded-lg bg-primary-50 text-primary-700 font-md-medium"
              >
                {tag.csName}
                <button onClick={() => removeTag(tag.csId)} className="ml-2">
                  <TagIcon />
                </button>
              </div>
            ))}
          </div>
        )}

        <button
          className={`mt-10 w-full flex h-14 px-7 justify-center items-center gap-[10px] rounded-xl ${
            tags.length > 0 ? 'bg-green-600' : 'bg-gray-300'
          } text-white font-xl-semibold`}
        >
          확인
        </button>
      </div>
    </div>
  );
};

export default HQAgencyModal;
