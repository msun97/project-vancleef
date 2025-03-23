const isLocal = window.location.hostname === 'localhost';
export const KAKAO_REDIRECT_URI = isLocal
    ? 'http://localhost:5173/oauth/'
    : 'https://project-vancleef.vercel.app/oauth/';