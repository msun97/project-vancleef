import React from 'react';
import { useDispatch } from 'react-redux';
import { authActions } from '../../store/modules/authSlice';
import { Navigate } from 'react-router-dom';

const LogOut = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    // 로컬스토리지에서 토큰 제거 (필요한 경우 추가적으로 다른 키도 제거)
    localStorage.removeItem('token');
    localStorage.removeItem('authed');
    localStorage.removeItem('user__로그인정보');
    
    // 리덕스 상태 업데이트: 로그아웃 액션 디스패치
    dispatch(authActions.logout());
	    // 메인 페이지로 이동
			Navigate('/');
		};
	
		return (
			<div>
			<button>로그아웃 완료</button>
			</div>
		);
	};
	
export default LogOut;
