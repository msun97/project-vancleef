import React, { useState } from 'react';
import Input from '../../components/input';
import DropDown from '../../components/dropdown';
import CheckBox from '../../components/checkbox';
import Button from '../../components/button';

const Purchase = () => {
  const [isChecked, setIsChecked] = useState(false);
  return (
    <div className="pt-20">
      <div>
        <h3>상품정보</h3>
        <ul>
          <li>
            <img src="/images/product1.png" alt="product1" />
            <div>
              <div>
                <h4>스노우플레이크 펜던트, 스몰 모델</h4>
                <p>18K 화이트 골드, 다이아몬드</p>
              </div>
              <p>가격: $100</p>
            </div>
          </li>
        </ul>
      </div>
      <div>
        <div>
          <h3>주문자 정보</h3>
          <div>
            <p>이름</p>
            <Input />
          </div>
          <div>
            <p>이메일</p>
            <div>
              <Input />@ <Input />
              <DropDown item={['naver.com', 'gmail.com']} />
            </div>
          </div>
          <div>
            <p>연락처</p>
            <Input />-<Input />-<Input />
          </div>
        </div>
        <div>
          <h3>배송 정보</h3>
          <div>
            <p>배송지 선택</p>
            <div>
              <CheckBox checked={isChecked} onChange={setIsChecked} />
              국내배송
              <CheckBox />
              해외배송
            </div>
          </div>
          <div>
            <p>이름</p>
            <div>
              <Input />
              <p>주문자 정보와 동일합니다</p>
            </div>
          </div>
          <div>
            <p>연락처</p>
            <Input />-<Input />-<Input />
          </div>
          <div>
            <p>주소</p>
            <Input />
          </div>
          <div>
            <div>
              <p>배송메세지</p>
              <p>(100자 내외)</p>
            </div>
            <div>
              <DropDown
                item={[
                  '방문 전 연락주세요.',
                  '경비실에 맏겨주세요',
                  '문 앞에 둬주세요.',
                ]}
              />
              <Input />
            </div>
          </div>
        </div>
        <div>
          <h3>할인 혜택</h3>
          <div>
            <p>쿠폰</p>
            <div>
              <Input />
              <p>장바구니 쿠폰 변경</p>
            </div>
          </div>
        </div>
        <div>
          <div>
            <h3>결제 방법</h3>
            <CheckBox />
            선택하신 결제수단을 다음에도 적용
          </div>
          <div>
            <Button variant="secondary">신용카드</Button>
            <Button variant="secondary">무통장입금</Button>
          </div>
        </div>
        <div>
          <h3>결제 예정금액</h3>
          <div>
            <div>
              <p>총 구매 금액</p>
              <p>KRW 74,000,000</p>
            </div>
            <div>
              <div>
                <p>총 구매 금액</p>
                <p>KRW 74,000,000</p>
              </div>
              <div>
                <p>배송비</p>
                <p>무료</p>
              </div>
              <div>
                <p>할인 금액</p>
                <p>KRW -2,000</p>
              </div>
            </div>
          </div>
        </div>
        <div>
          <h3>주문자 도동의</h3>
          <div>
            <h4>개인정보 수집 이용</h4>
            <table>
              <thead>
                <tr>
                  <th>목적</th>
                  <th>항목</th>
                  <th>보유기간</th>
                </tr>
              </thead>
              <tbody></tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Purchase;
