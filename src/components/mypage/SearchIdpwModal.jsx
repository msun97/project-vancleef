import React, { useRef, useState } from 'react';
import Draggable from 'react-draggable';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';

const SearchIdPwModal = () => {
  const [activeTab, setActiveTab] = useState('id'); // 'id' 또는 'password'
	 const nodeRef = useRef(null)
	 	const dispatch = useDispatch();
		const Navigate = useNavigate();

  return (


		<>
			
	    		 <div
											className='fixed inset-0 bg-[rgba(0,0,0,0.5)]'
											style={{ zIndex: 9998 }}
											onClick={() => dispatch(closeModal())}
									/>
			
									<Draggable nodeRef={nodeRef} bounds='' handle='.handle'>
											<div
													ref={nodeRef}
													className='fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 min-w-[710px] min-h-[626px] mt-[80px] mx-auto p-[50px] bg-white rounded-md border border-black'
													style={{ zIndex: 9999 }}
											><div className='max-w-[708px] mt-[30px] mx-auto mb-[60px]'>
	      {/* 탭 버튼 영역 */}
	      <div className='flex flex-row'>
	        <button
	          onClick={() => setActiveTab('id')}
	          className={`w-1/2 h-[55px] py-3 text-center font-bold border border-black ${
	            activeTab === 'id' ? 'bg-black text-white border-b-2' : 'bg-white text-red font-regular'
	          }`}
	        >
	          아이디 찾기
	        </button>
	        <button
	          onClick={() => setActiveTab('password')}
	          className={`w-1/2 h-[55px] py-3 text-center font-bold border border-black ${
	            activeTab === 'password' ? 'bg-black text-white border-b-2' : 'bg-white text-red font-regular'
	          }`}
	        >
	          비밀번호 찾기
	        </button>
	      </div>
	
	      {/* 탭별 내용 영역 */}
	      <div className='mt-4'>
	        {activeTab === 'id' && (
	          <div>
	            {/* 아이디 찾기 페이지 내용 */}
	            <p>계정에 등록된 전화번호 또는 이메일로 본인 인증 후 아이디를 찾을 수 있습니다.</p>
	            {/* 아이디 찾기 로직(예: 입력폼, API 호출 등) 추가 */}
	          </div>
	        )}
	        {activeTab === 'password' && (
	          <div>
	            {/* 비밀번호 찾기 페이지 내용 */}
	            <p>계정에 등록된 전화번호 또는 이메일로 본인 인증 후 비밀번호 재설정 절차를 진행합니다.</p>
	            {/* 비밀번호 찾기 로직(예: 입력폼, 인증 코드 발송 등) 추가 */}
	          </div>
	        )}
				<button onClick={Navigate(-1)}>닫기</button>
	      </div>
	    </div>
			</div>
				</Draggable>
		</>
  );
};

export default SearchIdPwModal;
