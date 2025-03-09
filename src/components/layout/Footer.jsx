import React from 'react';

const Footer = () => {
  return (
    <footer className="p-330 flex justify-between h-[520px] items-center font-secondary text-primary-70">
      <div className="left flex flex-col gap-[45px]">
        <div className="offline text-footer-l font-regular">
          오프라인 매장 찾기
        </div>
        <div className="contact flex gap-1 flex-col">
          <p className="text-footer-s">Van Cleef & Arpels</p>
          <p className="text-footer-l font-bold">contact us</p>
        </div>
      </div>
      <div className="right flex gap-[45px] flex-col items-end">
        <div className="shop w-[145px] h-[60px] border rounded-[100%] flex items-center justify-center text-footer-m font-bold">
          상품 보기
        </div>
        <div className="sns">
          <ul className="flex">
            <li className="border-r px-1 border-primary-70">
              <a href="#">Insta</a>
            </li>
            <li className="border-r px-1 border-primary-70">
              <a href="#">Facebook</a>
            </li>
            <li className="border-r px-1 border-primary-70">
              <a href="#">X</a>
            </li>
            <li className=" px-1">
              <a href="#">Youtube</a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
