import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { KAKAO_REDIRECT_URI } from '../../config';

const KAKAO_REST_API_KEY = import.meta.env.VITE_KAKAO_REST_API_KEY;

export const getKakaoLogin = createAsyncThunk(
    'auth/getKakaoLogin',
    async (code, { rejectWithValue }) => {
        try {
            const params = new URLSearchParams();
            params.append('grant_type', 'authorization_code');
            params.append('client_id', KAKAO_REST_API_KEY);
            params.append('redirect_uri', KAKAO_REDIRECT_URI);
            params.append('code', code);


            const tokenResponse = await axios.post(
                'https://kauth.kakao.com/oauth/token',
                params, // Use URLSearchParams object directly
                {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
                    },
                }
            );

            const { access_token } = tokenResponse.data;

            //   access token
            const userResponse = await axios.get('https://kapi.kakao.com/v2/user/me', {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
                },
            });

            const kakaoAccount = userResponse.data.kakao_account;
            const profile = kakaoAccount.profile;

            //  localStorage
            localStorage.setItem('kakaoToken', access_token);

            // Create user object
            const user = {
                kakaoId: userResponse.data.id,
                username: profile.nickname,
                email: kakaoAccount.email || `kakao_${userResponse.data.id}@kakao.com`,
                profile_image: profile.profile_image_url,
                isKakaoUser: true,
            };


            // Return user data
            return {
                user: user,
                newUser: user, // If user doesn't exist in your dataList, it will be added
                token: access_token,
            };
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.error_description ||
                    error.message ||
                    '카카오 로그인 처리 중 오류가 발생했습니다.'
            );
        }
    }
);
