import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import api from '../hooks/api';

interface User {
  name: string;
  teamName: string;
}

interface AuthState {
  accessToken: string | null;
  user: User | null;
  setAuthData: (token: string) => void;
  fetchUserInfo: () => Promise<void>;
  clearAuthData: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      accessToken: null,
      user: null,

      setAuthData: (token) => {
        console.log('✅ 액세스 토큰 저장:', token);
        set({ accessToken: token });
      },

      fetchUserInfo: async () => {
        try {
          console.log('✅ 유저 정보 조회 시작...');
          const response = await api.get('/user/detail');
          console.log('📩 응답 데이터:', response.data);

          if (response.data.isSuccess && response.data.result) {
            const { name, teamName } = response.data.result;
            set({ user: { name, teamName } });
            console.log('✅ Zustand 상태 업데이트 완료:', { name, teamName });

          } else {
            console.error('❌ 유저 정보 가져오기 실패:', response.data.message);
          }
        } catch (error) {
          console.error('❌ 유저 정보 가져오기 실패', error);
        }
      },

      clearAuthData: () => {
        set({ accessToken: null, user: null });
        console.log('🚫 상태 초기화 완료');
      }
    }),
    {
      name: 'auth-storage', // ✅ localStorage에 저장되는 키 이름
      storage: createJSONStorage(() => localStorage) // ✅ localStorage 저장
    }
  )
);
