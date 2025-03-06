// MyPage.js
import React from "react";
import { Link, Outlet } from "react-router-dom";

function MyPage() {
  return (
    <div className="flex flex-row w-full h-screen">
      {/* Left Side */}
      <div className="w-1/2 bg-gray-20 flex items-center justify-center p-[var(--spacing-330)]">
        <div className="flex items-center justify-center space-y-10">
          <nav
            className="w-1/2 flex flex-col items-end text-right font-secondary text-[12px]  whitespace-nowrap m-0 mr-[31px] "
          >
            <Link to="/mypage/order" >주문내역</Link>
            <Link to="/mypage/recent"  >최근본상품</Link>
            <Link to="/mypage/wishlist" >위시리스트</Link>
            <Link to="/mypage/cart" >장바구니</Link>
            <Link to="/mypage/myposts" >나의게시물</Link>
            <Link to="/mypage/profile" >회원정보변경</Link>
            <Link to="/mypage/logout" >로그아웃</Link>
          </nav>
        </div>

        <div className="w-px h-[302px] bg-black" />

        <div className="w-1/2 flex items-center justify-center whitespace-nowrap">
          <p className="text-content-xs m-0 ml-[57px]">
            WELCOME BACK. <Link to="/profile">User</Link>님
          </p>
        </div>
      </div>

      {/* Right Side */}
      <div className="w-1/2 bg-white flex flex-col items-center justify-center p-[var(--padding-144)] overflow-y-scroll">
        <Outlet />
      </div>
    </div>
  );
}

export default MyPage;
