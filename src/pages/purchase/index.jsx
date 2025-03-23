import React, { useEffect, useRef, useState } from 'react';
import Input from '@/components/input';
import DropDown from '../../components/dropdown';
import CheckBox from '../../components/checkbox';
import Button from '../../components/button';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from '@/store/modules/authSlice';
import { useNavigate } from 'react-router-dom';
import { purchaseActions } from '@/store/modules/purchaseSlice';
import { clearCart, removeCart } from '@/store/modules/cartSlice';

const Purchase = () => {
  const navigate = useNavigate();
  const { purchaseItem } = useSelector(state => state.purchaseR);

  const dispatch = useDispatch();
  const { user } = useSelector(state => state.authR);
  const getItem = purchaseItem.flat();
  const [isDelivery, setIsDelivery] = useState('');
  const defaultNext = user ? user.isPurchaseNext : false;
  const [isNext, setIsNext] = useState(defaultNext);
  const [purchaseUser, setpurchaseUser] = useState(user ? user : {});
  const emailArray = purchaseUser.email.split('@');
  const changeInput = e => {
    const { name, value } = e.target;
    setpurchaseUser({
      ...purchaseUser,
      [name]: value,
    });
  };

  const [emailOption, setEmailOption] = useState(emailArray[1]);
  const handleEmailOption = option => {
    if (option === '직접 입력') {
      setEmailOption('');
    } else {
      setEmailOption(option);
    }
  };
  const changeInputEmail = e => {
    setEmailOption(e.target.value);
  };

  const splitPhoneNumber = tel => {
    if (!tel) return ['', '', ''];
    const part1 = tel.slice(0, 3);
    const part2 = tel.slice(3, 7);
    const part3 = tel.slice(7, 11);
    return [part1, part2, part3];
  };
  const [tel1, setTel1] = useState('');
  const [tel2, setTel2] = useState('');
  const [tel3, setTel3] = useState('');
  useEffect(() => {
    if (purchaseUser.tel) {
      const [part1, part2, part3] = splitPhoneNumber(purchaseUser.tel);
      setTel1(part1);
      setTel2(part2);
      setTel3(part3);
    }
  }, [purchaseUser.tel]);
  const changeTel = (e, index) => {
    const { value } = e.target;
    if (index === 0) {
      setTel1(value);
    } else if (index === 1) {
      setTel2(value);
    } else {
      setTel3(value);
    }
  };

  const [onOffline, setonOffline] = useState(false);
  useEffect(() => {
    if (isDelivery === '오프라인 구매') {
      setonOffline(true);
    } else {
      setonOffline(false);
    }
  }, [isDelivery]);

  const [deliverUser, setdeliverUser] = useState({});
  const [deliverTel1, setdeliverTel1] = useState('');
  const [deliverTel2, setdeliverTel2] = useState('');
  const [deliverTel3, setdeliverTel3] = useState('');
  const onSame = () => {
    setdeliverUser(purchaseUser);
    setdeliverTel1(tel1);
    setdeliverTel2(tel2);
    setdeliverTel3(tel3);
  };
  const onDifferent = e => {
    const { name, value } = e.target;
    setdeliverUser({
      ...deliverUser,
      [name]: value,
    });
  };
  const changeDeliverTel = (e, index) => {
    const { value } = e.target;
    if (index === 0) {
      setdeliverTel1(value);
    } else if (index === 1) {
      setdeliverTel2(value);
    } else {
      setdeliverTel3(value);
    }
  };

  useEffect(() => {
    const script = document.createElement('script');
    script.src =
      'https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const [adress, setAdress] = useState();
  const [adressNumber, setAdressNumber] = useState();
  const handlePostCode = () => {
    new window.daum.Postcode({
      oncomplete: function (data) {
        setAdress(data.address);
        setAdressNumber(data.zonecode);
      },
    }).open();
  };

  const [messageOption, setmesaageOption] = useState('');
  const handleMessageOption = option => {
    if (option === '직접 입력') {
      setmesaageOption('');
    } else {
      setmesaageOption(option);
    }
  };
  const changeInputMessage = e => {
    setmesaageOption(e.target.value);
  };
  const defaultPurchase = user ? user.whatPurchase : '';
  const [whatPurchase, setWhatPurchase] = useState(defaultPurchase);
  useEffect(() => {
    dispatch(authActions.isPurchaseNext(isNext));
    if (isNext) {
      dispatch(authActions.whatPurchase(whatPurchase));
    } else {
      dispatch(authActions.whatPurchase(''));
    }
  }, [isNext, whatPurchase]);

  const sumPrice = getItem
    .map(item => item.price)
    .reduce((acc, cur) => acc + cur);

  const [check1, setCheck1] = useState(false);
  const [check2, setCheck2] = useState(false);
  const allChecked = check1 && check2;
  const allCheckedChecked = () => {
    if (!allChecked) {
      setCheck1(true);
      setCheck2(true);
    } else {
      setCheck1(false);
      setCheck2(false);
    }
  };

  const allPurchased = useSelector(state => state.purchaseR.purchasedData);
  const emailInputRef = useRef(null);
  const deliverRef = useRef(null);
  const whatPurchaseRef = useRef(null);
  const checkRef = useRef(null);
  const onPurchase = () => {
    if (!emailOption) {
      alert('이메일을 입력하세요.');
      emailInputRef.current?.focus();
      return;
    }
    if (isDelivery === '') {
      alert('배송지를 선택 하세요.');
      deliverRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
      return;
    }
    if (
      isDelivery !== '오프라인 구매' &&
      (Object.keys(deliverUser).length === 0 ||
        !deliverTel1 ||
        !deliverTel2 ||
        !deliverTel3 ||
        !adressNumber ||
        !adress ||
        messageOption === '')
    ) {
      alert('배송 정보를 입력하세요');
      deliverRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
      return;
    }
    if (whatPurchase === '') {
      alert('결제 방법을 선택하세요');
      whatPurchaseRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
      return;
    }
    if (!allChecked) {
      alert('구매 진행에 동의하세요.');
      checkRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
      return;
    }
    const number = allPurchased.length;
    const date = new Date();
    const purchaseDate = `${date.getFullYear()}${
      date.getMonth() + 1
    }${date.getDate()}${number}`;
    const purchaseDetail = {
      deliverNumber: purchaseDate,
      deliverItem: purchaseItem,
      sumPrice: sumPrice,
      isReservation: false,
    };
    const productnumber = purchaseDetail.deliverItem.flatMap(items =>
      items.map(item => item.productnumber),
    );
    dispatch(purchaseActions.addPurchased(purchaseDetail));
    dispatch(authActions.completePurchase(purchaseDetail));
    dispatch(purchaseActions.setItem([]));
    dispatch(removeCart(productnumber));
    alert('결제 완료');
    navigate('/mypage/order');
  };

  const onReservation = () => {
    if (!emailOption) {
      alert('이메일을 입력하세요.');
      emailInputRef.current?.focus();
      return;
    }
    if (whatPurchase === '') {
      alert('결제 방법을 선택하세요');
      whatPurchaseRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
      return;
    }
    if (!allChecked) {
      alert('구매 진행에 동의하세요.');
      checkRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
    const number = allPurchased.length ? allPurchased.length + 1 : 1;
    const date = new Date();
    const purchaseDate = `${date.getFullYear()}${
      date.getMonth() + 1
    }${date.getDate()}${number}`;
    const purchaseDetail = {
      deliverNumber: purchaseDate,
      deliverItem: purchaseItem,
      sumPrice: sumPrice,
      isReservation: true,
    };
    const categories = ['necklaces', 'bracelets', 'rings', 'earrings'];

    const formattedData = purchaseDetail.deliverItem.flatMap((items, index) =>
      items.map(item => ({
        category: categories[index],
        id: item.productid,
      })),
    );
    const productnumber = purchaseDetail.deliverItem.flatMap(items =>
      items.map(item => item.productnumber),
    );
    dispatch(purchaseActions.addPurchased(purchaseDetail));
    dispatch(authActions.completePurchase(purchaseDetail));
    dispatch(purchaseActions.addReservation(formattedData));
    dispatch(purchaseActions.setItem([]));
    dispatch(removeCart(productnumber));
    alert('예약 완료');
    navigate('/reservation');
    return;
  };

  return (
    <div className="flex">
      <div className="px-[114px] bg-gray-10 pt-30 flex flex-col gap-[10px] w-1/2">
        <h3 className="text-content-s">상품정보</h3>
        <ul className="border-t border-gray-90">
          {getItem.map((item, index) => (
            <li key={index} className="border-b border-b-gray-30 py-5 flex">
              <img
                src={item.objectimage[1]}
                alt={item.title}
                className="w-[100px] h-[100px] object-cover flex-shrink-0"
              />
              <div className="flex justify-between w-full">
                <div className="text-content-s px-2">
                  <h4>{item.title}</h4>
                  <p className="text-content-xs text-gray-50">
                    {item.subtitle}
                  </p>
                </div>
                <p>
                  KRW{' '}
                  {item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="px-[114px] pt-30 flex flex-col gap-[10px] w-1/2">
        <div className="text-content-s flex gap-20 flex-col">
          <div className="flex flex-col gap-10">
            <h3 className="font-bold">주문자 정보</h3>
            <div className="flex flex-col gap-5">
              <div className="text-footer-s flex">
                <p className="w-[131px]">이름</p>
                <Input
                  name="username"
                  value={purchaseUser.username}
                  onChange={changeInput}
                />
              </div>
              <div className="text-footer-s flex">
                <p className="w-[131px] shrink-0">이메일</p>
                <div className="flex gap-4">
                  <div className="flex">
                    <Input
                      className="flex-1"
                      name="email"
                      value={emailArray[0]}
                      onChange={changeInput}
                    />
                    @{' '}
                    <Input
                      className="flex-1"
                      value={emailOption}
                      ref={emailInputRef}
                      onChange={
                        emailOption === 'naver.com' ||
                        emailOption === 'gmail.com'
                          ? ''
                          : changeInputEmail
                      }
                    />
                  </div>
                  <DropDown
                    item={['직접 입력', 'naver.com', 'gmail.com']}
                    className="w-[140px] !h-5 !p-1  cursor-pointer"
                    handleClick={handleEmailOption}
                  />
                </div>
              </div>
              <div className="text-footer-s flex">
                <p className="w-[131px] shrink-0">연락처</p>
                <div className="flex-1 flex">
                  <Input value={tel1} onChange={e => changeTel(e, 0)} />
                  -
                  <Input value={tel2} onChange={e => changeTel(e, 1)} />-
                  <Input value={tel3} onChange={e => changeTel(e, 2)} />
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-10">
            <h3 className="font-bold">배송 정보</h3>
            <div className="flex flex-col gap-5">
              <div className="text-footer-s flex">
                <p className="w-[131px]">배송지 선택</p>
                <div className="flex gap-[50px]">
                  <div
                    className="flex gap-[10px] items-center"
                    ref={deliverRef}
                  >
                    <CheckBox
                      id="국내 배송"
                      checked={isDelivery === '국내 배송'}
                      onChange={() => setIsDelivery('국내 배송')}
                      className="w-[15px] h-[15px]"
                    />
                    국내 배송
                  </div>
                  <div className="flex gap-[10px] items-center">
                    <CheckBox
                      id="해외 배송"
                      checked={isDelivery === '해외 배송'}
                      onChange={() => setIsDelivery('해외 배송')}
                      className="w-[15px] h-[15px]"
                    />
                    해외 배송
                  </div>
                  <div className="flex gap-[10px] items-center">
                    <CheckBox
                      id="오프라인 구매"
                      checked={isDelivery === '오프라인 구매'}
                      onChange={() => setIsDelivery('오프라인 구매')}
                      className="w-[15px] h-[15px]"
                    />
                    오프라인 구매
                  </div>
                </div>
              </div>
              {onOffline ? (
                ''
              ) : (
                <>
                  <div className="text-footer-s flex">
                    <p className="w-[131px]">이름</p>
                    <div className="flex gap-[18px]">
                      <Input
                        name="username"
                        value={deliverUser.username}
                        onChange={onDifferent}
                      />
                      <button
                        className="text-content-xs underline"
                        onClick={onSame}
                      >
                        주문자 정보와 동일합니다
                      </button>
                    </div>
                  </div>
                  <div className="text-footer-s flex">
                    <p className="w-[131px] shrink-0">연락처</p>
                    <div className="flex-1 flex">
                      <Input
                        value={deliverTel1}
                        onChange={e => changeDeliverTel(e, 0)}
                      />
                      -
                      <Input
                        value={deliverTel2}
                        onChange={e => changeDeliverTel(e, 1)}
                      />
                      -
                      <Input
                        value={deliverTel3}
                        onChange={e => changeDeliverTel(e, 2)}
                      />
                    </div>
                  </div>
                  <div className="text-footer-s flex items-center">
                    <p className="w-[131px]">주소</p>
                    <div className="flex gap-[18px] flex-wrap flex-1">
                      <div className="flex gap-[18px]">
                        <Input value={adressNumber} />
                        <div className="flex underline text-content-xs gap-[10px]">
                          <button onClick={handlePostCode}>우편번호</button>
                        </div>
                      </div>
                      <Input className="w-full" value={adress} />
                      <Input className="w-full" placeholder="상세주소 입력" />
                    </div>
                  </div>
                  <div className="text-footer-s flex items-center">
                    <div>
                      <p className="w-[131px]">배송메세지</p>
                      <p>(100자 내외)</p>
                    </div>
                    <div className="flex gap-5 w-full">
                      <DropDown
                        item={[
                          '직접 입력',
                          '방문 전 연락주세요.',
                          '경비실에 맡겨주세요',
                          '문 앞에 둬주세요.',
                        ]}
                        handleClick={handleMessageOption}
                        className="w-[290px] !h-5 !p-1 !text-content-xs cursor-pointer"
                      />
                      <Input
                        className="w-full"
                        value={messageOption}
                        onChange={
                          messageOption === '방문 전 연락주세요.' ||
                          messageOption === '경비실에 맡겨주세요' ||
                          messageOption === '문 앞에 둬주세요.'
                            ? ''
                            : changeInputMessage
                        }
                      />
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
          <div className="flex flex-col gap-10">
            <div className="flex justify-between">
              <h3 className="font-bold">결제 방법</h3>
              <div
                className="flex gap-[10px] items-center"
                ref={whatPurchaseRef}
              >
                <CheckBox
                  className="w-[15px] h-[15px]"
                  checked={isNext}
                  onChange={setIsNext}
                  id="next"
                />
                <p className="font-secondary text-content-xs">
                  {' '}
                  선택하신 결제수단을 다음에도 적용
                </p>
              </div>
            </div>
            <div className="flex gap-5">
              <Button
                variant={whatPurchase === 'card' ? 'primary' : 'secondary'}
                className="w-[100px] h-[55px]"
                onClick={() => setWhatPurchase('card')}
              >
                신용카드
              </Button>
              <Button
                variant={whatPurchase === 'account' ? 'primary' : 'secondary'}
                className="w-[100px] h-[55px]"
                onClick={() => setWhatPurchase('account')}
              >
                무통장입금
              </Button>
            </div>
          </div>
          <div className="flex flex-col gap-10">
            <h3 className="font-bold">결제 예정금액</h3>
            <div className="flex flex-col gap-5 text-content-xs">
              <div className="flex flex-col gap-[10px]">
                <p className="text-gray-50">총 구매 금액</p>
                <p>
                  KRW{' '}
                  {sumPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-10">
            <h3 className="font-bold">주문자 동의</h3>
            <div className="flex flex-col gap-[15px]">
              <h4 className="text-content-xs font-bold">개인정보 수집 이용</h4>
              <table className="text-content-xs border border-gray-50  font-secondary">
                <thead className="w-full ">
                  <tr className="text-center bg-gray-20 border border-gray-50">
                    <th className="border border-gray-50 font-regular py-[10px]">
                      목적
                    </th>
                    <th className="border border-gray-50 font-regular">항목</th>
                    <th className="border border-gray-50 font-regular">
                      보유기간
                    </th>
                  </tr>
                </thead>
                <tbody className="text-left text-[12px]">
                  <tr className="border border-gray-50">
                    <td className="border border-gray-50 font-regular py-[10px] px-[5px]">
                      주문자 정보 확인, 주문내역안내, 주문내역 조회
                    </td>
                    <td className="border border-gray-50 font-regular py-[10px] px-[5px]">
                      주문자 정보(연락처, 이메일)
                    </td>
                    <td
                      className="border border-gray-50 font-regular py-[10px] px-[5px] text-left align-middle"
                      rowSpan={2}
                    >
                      주문일로부터 90일까지 보유하며, 관계 법령에 따라 5년간
                      보관
                    </td>
                  </tr>
                  <tr>
                    <td className="font-regular py-[10px] px-[5px] border border-gray-50">
                      상품 배송(구매/환불/취소/교환)을 위한 수취인 정보
                    </td>
                    <td className="font-regular py-[10px] px-[5px] border border-gray-50">
                      수취인 정보(이름, 연락처1, 연락처2, 주소)
                    </td>
                  </tr>
                </tbody>
              </table>
              <p className="text-[12px] text-gray-50" ref={checkRef}>
                * 수집 및 이용에 동의하지 않으실 수 있으며, 동의하지 않으실 경우
                일부 구매가 제한될 수 있습니다.
              </p>
              <div className="flex flex-col gap-[15px]">
                <div className="flex gap-[10px] items-center">
                  <CheckBox
                    checked={allChecked}
                    onChange={allCheckedChecked}
                    id="all"
                    className="w-[15px] h-[15px]"
                  />
                  전체 동의
                </div>
                <div className="flex gap-[10px] items-center">
                  <CheckBox
                    checked={check1}
                    onChange={setCheck1}
                    id="check1"
                    className="w-[15px] h-[15px]"
                  />
                  [개인정보 수집·이용] 동의
                </div>
                <div className="flex gap-[10px] items-center">
                  <CheckBox
                    checked={check2}
                    onChange={setCheck2}
                    id="check2"
                    className="w-[15px] h-[15px]"
                  />
                  주문 / 결제 정보를 확인하여 구매 진행에 동의합니다.
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="my-20">
          {isDelivery === '오프라인 구매' ? (
            <Button
              variant="primary"
              className="w-full h-[55px]"
              onClick={onReservation}
            >
              예약하기
            </Button>
          ) : (
            <Button
              variant="primary"
              className="w-full h-[55px]"
              onClick={onPurchase}
            >
              결제하기
            </Button>
          )}
        </div>
        <div className="mb-30 text-content-xs">
          꼭 숙지해주세요!
          <br />
          <br />
          1. 당일배송 안내 <br />
          ·당일배송은 평일 오후 4시까지 결제된 당일배송에 해당하는 상품만
          주문했을 경우 출고 가능합니다.
          <br />
          ·당일배송+일반 배송 상품과 함께 주문하셨을 경우, 각각 주문건별로
          주문시 수령자 정보가 동일한 경우 자동 묶음되어 당일배송이 불가합니다.
          <br />
          ·(해당 경우 고객센터 또는 게시판으로 문의바랍니다.)
          <br />
          <br />
          2. 일반배송 안내
          <br />
          ·일반배송은 결제일로부터 평일 기준 1~5일 이내에 받아보실 수 있습니다.
          (주말 및 공휴일)
          <br />
          <br />
          3.부분배송 안내
          <br />
          ·부분배송은 주말을 제외하고 결제일로부터 평일 기준 3일 이후, 입고가
          지연되는 품목을 제외하고 준비된 상품부터 순차적으로 바로 보내드립니다.
          <br />
          ·입고가 지연되는 품목의 경우 개별적으로 연락을 드립니다.
          <br />
          ·부분배송 상품 수령 후 교환반품시에는 각각의 배송비가 부담될 수 있으니
          모든 상품 수령 후 최종적으로 접수바랍니다.
        </div>
      </div>
    </div>
  );
};

export default Purchase;
