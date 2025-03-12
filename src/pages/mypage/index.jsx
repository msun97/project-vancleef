// MyPage.js
import React from "react";
import { Link, Outlet } from "react-router-dom";

function MyPage() {
  return (
    <div className="relative flex flex-row w-full h-screen">
      {/* Left Side */}
      <div className="w-1/2 bg-[#F7F7F7] flex items-center justify-center p-[var(--spacing-330)]">
        <div className="flex items-baseline justify-center space-y-10">
          <nav
            className="w-1/2 flex flex-col items-end text-right font-secondary text-[12px]  whitespace-nowrap m-0 mr-[31px]  font-[var(--font-weight-regular)]  space-y-[12px]"
          >
            <Link to="/mypage/order" className="hover:font-bold">주문내역</Link>
            <Link to="/mypage/recent"  className="hover:font-bold">최근본상품</Link>
            <Link to="/mypage/wishlist" className="hover:font-bold">위시리스트</Link>
            <Link to="/mypage/cart" className="hover:font-bold">장바구니</Link>
            <Link to="/mypage/myposts" className="hover:font-bold">나의게시물</Link>
            <Link to="/mypage/profile" className="hover:font-bold">회원정보변경</Link>
            <Link to="/mypage/logout" className="hover:font-bold">로그아웃</Link>
          </nav>
        </div>

        <div className="w-px h-[302px] bg-black" />

        <div className="w-1/2 flex justify-center whitespace-nowrap">
          <p className="text-content-xs m-0 ml-[57px]">
            WELCOME BACK. <Link to="/profile">User</Link>님
          </p>
        </div>
      </div>

      {/* Right Side */}
      <div className="relative w-1/2 bg-white flex flex-col items-center justify-center p-[var(--padding-144)] overflow-y-scroll">
        <Outlet />
      </div>
    </div>
  );
}

export default MyPage;
