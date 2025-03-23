import CheckBox from '../checkbox';
import Button from '../button';
import { useDispatch, useSelector } from 'react-redux';
import { removeCart } from '../../store/modules/cartSlice';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { purchaseActions } from '@/store/modules/purchaseSlice';

const ShoppingcartModal = ({ handleModal, modalType }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = () => {
    if (selectedItems.length > 0) {
      dispatch(purchaseActions.setItem(selectedItems));
      navigate('/purchase');
    } else {
      alert('구매하실 상품을 선택하세요');
    }
  };

  const { cart } = useSelector(state => state.cartR);
  const [selectedItems, setSelectedItems] = useState([]);
  const [isChecked, setIsChecked] = useState(false); // 전체 선택 체크박스 상태 관리
  const handleSelectItem = itemId => {
    if (selectedItems.includes(itemId)) {
      setSelectedItems(selectedItems.filter(item => item.id === itemId));
    } else {
      setSelectedItems([...selectedItems, itemId]);
    }
  };
  // 전체 선택/해제 처리
  const handleSelectAll = () => {
    setIsChecked(!isChecked);
    if (!isChecked) {
      setSelectedItems(cart.map(item => item.productnumber));
    } else {
      setSelectedItems([]);
    }
  };

  const handleDeleteSelected = () => {
    selectedItems.forEach(itemId => {
      dispatch(removeCart(itemId)); // 장바구니에서 선택된 항목 삭제
    });
    setSelectedItems([]); // 삭제 후 선택된 항목 초기화
  };

  // body 오버플로우를 hidden 처리
  useEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, []);

  const [modalClose, SetModalClose] = useState(false);

  const handlecloseclick = () => {
    SetModalClose(!modalClose);

    handleModal(false);
  };

  return (
    <div
      className="fixed bg-[rgba(0,0,0,0.5)] w-full h-full top-0 left-0"
      style={{ zIndex: 9999 }}
    >
      <div className="flex justify-end w-full h-screen">
        <div className="w-[458px] h-screen px-[50px] py-[50px] bg-white">
          <div>
            <div className="flex justify-between">
              <div className="text-[16px] h-[20px] ">
                CART : {cart.length}개
              </div>
              <button
                className="h-[20px] cursor-pointer"
                onClick={handlecloseclick}
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5.41406 4.33594L4.33594 5.41406L10.9219 12L4.33594 18.5859L5.41406 19.6641L12 13.0781L18.5859 19.6641L19.6641 18.5859L13.0781 12L19.6641 5.41406L18.5859 4.33594L12 10.9219L5.41406 4.33594Z"
                    fill="#B9B9B9"
                  />
                </svg>
              </button>
            </div>
            <div className="border-b-1 border-gray-600 h-[58px] flex justify-between">
              <div className="text-[13px] leading-[58px] font-secondary tracking-wide">
                <CheckBox
                  id={'all'}
                  className={'h-[18px] w-[18px] mr-[3px]'}
                  checked={isChecked}
                  onChange={handleSelectAll}
                />
                전체선택
              </div>
              <button
                className="text-[13px] inline-block underline font-secondary tracking-wide"
                onClick={handleDeleteSelected} // 선택삭제 버튼 클릭 시 실행
              >
                선택삭제
              </button>
            </div>
          </div>

          <div className="w-full h-[770px] flex flex-col justify-between">
            {/* 장바구니에 담긴 상품들 */}
            {cart.map(item => (
              <div className="relative flex" key={item.id}>
                <div className="my-[20px]">
                  <div className="w-[100px] border border-[#dddddd]">
                    <CheckBox
                      id={item.productnumber}
                      className={'h-[18px] w-[18px] mr-[3px] absolute'}
                      checked={selectedItems.includes(item.productnumber)} // 개별 선택 상태
                      onChange={() => handleSelectItem(item.productnumber)} // 개별 체크박스 클릭 시 실행
                    />
                    <img
                      src={item.objectimage[0]}
                      alt="목업상품"
                      className="w-[100px] h-[100px]"
                    />
                  </div>
                </div>
                <div className="w-full my-[20px] ml-[10px]">
                  <div className="w-full flex justify-between items-center">
                    <div className="text-[8px] font-secondary text-gray-50 ">
                      국내택배
                    </div>
                  </div>
                  <div className="text-content-xs mt-[9px]">{item.title}</div>
                  <div className="text-content-xs mt-[2px]">
                    {item.price
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}{' '}
                    원
                  </div>
                  <div className="flex">
                    <span className="text-label-xs text-gray-50">
                      {' '}
                      {item.stone && item.stone.trim() ? item.stone : 'x'}
                    </span>
                  </div>
                  {/*     <button className="text-content-xs underline color-gray-90">옵션변경</button> */}
                </div>
              </div>
            ))}

            {/* 상품 합계금액 및 주문하기 버튼 */}
            <div className="flex flex-col justify-between border-t border-[#666666]">
              <div className="flex justify-between pt-[11px] pb-[20px]">
                <div className="text-[13px] tracking-wider">상품합계금액</div>
                <div className="text-[13px] tracking-wider">
                  KRW{' '}
                  {cart
                    .reduce((acc, item) => acc + item.price, 0)
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}{' '}
                  {/* 장바구니 합계 계산 */}
                </div>
              </div>
              <Button
                className="w-full h-[55px] text-[17px] tracking-wide"
                onClick={handleClick}
              >
                주문하기
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingcartModal;
