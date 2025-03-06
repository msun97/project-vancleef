// MyPage.js
import React from "react";
import { Link, Outlet } from "react-router-dom";

function MyPage() {
  return (
    <div className="flex flex-row w-full h-screen">
      {/* Left Side */}
      <div className="w-1/2 bg-gray-20 flex items-center justify-center p-[var(--padding-330)]">
        <div className="flex items-center justify-center space-x-10">
          <nav style={{ color: '--gray-100' }}
            className="w-1/2 flex flex-col justify-center font-secondary text-[12px] text-right
"
          >
            <Link to="/mypage/order" className="flex-row">주문내역</Link>
            <Link to="/mypage/recent"  className="flex-row">최근 본 상품</Link>
            <Link to="/mypage/wishlist" className="flex-row">위시리스트</Link>
            <Link to="/mypage/cart" className="flex-row">장바구니</Link>
            <Link to="/mypage/myposts" className="flex-row">나의 게시물</Link>
            <Link to="/profile" className="flex-row">회원정보변경</Link>
            <Link to="/logout" className="flex-row">로그아웃</Link>
          </nav>
        </div>

        {/* 필요 시 세로선 사용
        <div className="w-px h-48 bg-black" />
        */}

        <div className="w-1/2 flex items-center justify-center">
          <p className="text-content-xs text-[--gray-100]">
            WELCOME BACK. <Link to="/profile">User</Link>님
          </p>
        </div>
      </div>

      {/* Right Side */}
      <div className="absolute w-1/2 bg-white flex flex-col items-center justify-center p-[var(--padding-144)] overflow-y-scroll">
        <Outlet />
      </div>
    </div>
  );
}

export default MyPage;
