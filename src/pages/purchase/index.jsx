import React, { useState } from 'react';
import Input from '@/components/input';
import DropDown from '../../components/dropdown';
import CheckBox from '../../components/checkbox';
import Button from '../../components/button';

const Purchase = () => {
  const [isChecked, setIsChecked] = useState(false);
  const [isDelivery, setIsDelivery] = useState(false);
  const [isNext, setIsNext] = useState(false);

  return (
    <div className="flex">
      <div className="px-[114px] bg-gray-10 pt-30 flex flex-col gap-[10px] w-1/2">
        <h3 className="text-content-s">상품정보</h3>
        <ul className="border-t border-gray-90">
          <li className="border-b border-b-gray-30 py-5 flex">
            <img
              src="/images/product1.png"
              alt="product1"
              className="w-[100px] h-[100px]"
            />
            <div className="flex justify-between w-full">
              <div className="text-content-s px-2">
                <h4>스노우플레이크 펜던트, 스몰 모델</h4>
                <p className="text-content-xs text-gray-50">
                  18K 화이트 골드, 다이아몬드
                </p>
              </div>
              <p>KRW 74,000,000</p>
            </div>
          </li>
        </ul>
      </div>
      <div className="px-[114px] pt-30 flex flex-col gap-[10px] w-1/2">
        <div className="text-content-s flex gap-20 flex-col">
          <div className="flex flex-col gap-10">
            <h3 className="font-bold">주문자 정보</h3>
            <div className="flex flex-col gap-5">
              <div className="text-footer-s flex">
                <p className="w-[131px]">이름</p>
                <Input />
              </div>
              <div className="text-footer-s flex">
                <p className="w-[131px]">이메일</p>
                <div className="flex gap-4">
                  <div className="flex">
                    <Input className="flex-1" />@ <Input className="flex-1" />
                  </div>
                  <DropDown
                    item={['naver.com', 'gmail.com']}
                    className="w-[140px] !h-5 !p-1"
                  />
                </div>
              </div>
              <div className="text-footer-s flex">
                <p className="w-[131px] shrink-0">연락처</p>
                <div className="flex-1 flex">
                  <Input />-<Input />-
                  <Input />
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
                  <div className="flex gap-[10px] items-center">
                    <CheckBox
                      id="delivery"
                      checked={isDelivery}
                      onChange={setIsDelivery}
                      className="w-[15px] h-[15px]"
                    />
                    국내 배송
                  </div>
                  <div className="flex gap-[10px] items-center">
                    <CheckBox
                      id="delivery"
                      checked={isDelivery}
                      onChange={setIsDelivery}
                      className="w-[15px] h-[15px]"
                    />
                    해외 배송
                  </div>
                </div>
              </div>
              <div className="text-footer-s flex">
                <p className="w-[131px]">이름</p>
                <div className="flex gap-[18px]">
                  <Input />
                  <p className="text-content-xs underline">
                    주문자 정보와 동일합니다
                  </p>
                </div>
              </div>
              <div className="text-footer-s flex">
                <p className="w-[131px] shrink-0">연락처</p>
                <div className="flex-1 flex">
                  <Input />-<Input />-
                  <Input />
                </div>
              </div>
              <div className="text-footer-s flex items-center">
                <p className="w-[131px]">주소</p>
                <div className="flex gap-[18px] flex-wrap flex-1">
                  <div className="flex gap-[18px]">
                    <Input />
                    <div className="flex underline text-content-xs gap-[10px]">
                      <p>우편번호</p>
                      <p>주소록</p>
                    </div>
                  </div>
                  <Input className="w-full" />
                  <Input className="w-full" />
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
                      '방문 전 연락주세요.',
                      '경비실에 맏겨주세요',
                      '문 앞에 둬주세요.',
                    ]}
                    className="w-[290px] !h-5 !p-1 !text-content-xs"
                  />
                  <Input className="w-full" />
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-10">
            <h3 className="font-bold">할인 혜택</h3>
            <div className="flex gap-[106px]">
              <p className="font-secondary text-gray-50 text-footr-s">쿠폰</p>
              <div className="flex gap-[18px]">
                <Input />
                <p className="text-content-xs underline">장바구니 쿠폰 변경</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-10">
            <div className="flex justify-between">
              <h3 className="font-bold">결제 방법</h3>
              <div className="flex gap-[10px] items-center">
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
              <Button variant="secondary" className="w-[100px] h-[55px]">
                신용카드
              </Button>
              <Button variant="secondary" className="w-[100px] h-[55px]">
                무통장입금
              </Button>
            </div>
          </div>
          <div className="flex flex-col gap-10">
            <h3 className="font-bold">결제 예정금액</h3>
            <div className="flex flex-col gap-5 text-content-xs">
              <div className="flex flex-col gap-[10px]">
                <p className="text-gray-50">총 구매 금액</p>
                <p>KRW 74,000,000</p>
              </div>
              <div className="flex gap-5">
                <div className="flex flex-col gap-[10px]">
                  <p className="text-gray-50">총 구매 금액</p>
                  <p>KRW 74,000,000</p>
                </div>
                <div className="flex flex-col gap-[10px]">
                  <p className="text-gray-50">배송비</p>
                  <p>무료</p>
                </div>
                <div className="flex flex-col gap-[10px]">
                  <p className="text-gray-50">할인 금액</p>
                  <p>KRW -2,000</p>
                </div>
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
              <p className="text-[12px] text-gray-50">
                * 수집 및 이용에 동의하지 않으실 수 있으며, 동의하지 않으실 경우
                일부 구매가 제한될 수 있습니다.
              </p>
              <div className="flex flex-col gap-[15px]">
                <div className="flex gap-[10px] items-center">
                  <CheckBox
                    checked={isChecked}
                    onChange={setIsChecked}
                    id="all"
                    className="w-[15px] h-[15px]"
                  />
                  전체 동의
                </div>
                <div className="flex gap-[10px] items-center">
                  <CheckBox
                    checked={isChecked}
                    onChange={setIsChecked}
                    id="all"
                    className="w-[15px] h-[15px]"
                  />
                  [개인정보 수집·이용] 동의
                </div>
                <div className="flex gap-[10px] items-center">
                  <CheckBox
                    checked={isChecked}
                    onChange={setIsChecked}
                    id="all"
                    className="w-[15px] h-[15px]"
                  />
                  주문 / 결제 정보를 확인하여 구매 진행에 동의합니다.
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="my-20">
          <Button variant="primary" className="w-full h-[55px]">
            결제하기
          </Button>
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
