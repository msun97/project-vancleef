import { Link, useNavigate } from 'react-router-dom';
import Button from '../../components/button';
import CheckBox from '../../components/checkbox';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { productInquiryActions } from '../../store/modules/productInquirySlice';

const flexIC = 'flex items-center';

const ProductInquiry = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // 로그인 정보 및 상품 정보 가져오기
    const userInfo = useSelector((state) => state.authR?.user);
    const productInfo = useSelector((state) => state.productR?.currentProduct);
    const isLoggedIn = useSelector((state) => state.authR?.authed);

    // 로컬스토리지에서 currentUser 확인
    useEffect(() => {
        // 로그인 체크
        if (!isLoggedIn) {
            alert('로그인이 필요한 서비스입니다.');
            navigate('/login', { state: { from: window.location.pathname } });
        } else {
            // 로컬스토리지의 currentUser 확인
            const currentUser = JSON.parse(localStorage.getItem('currentUser'));
            console.log('현재 로그인한 사용자:', currentUser);

            // myInquiries 초기화 (아직 없다면)
            if (currentUser && !currentUser.myInquiries) {
                currentUser.myInquiries = [];
                localStorage.setItem('currentUser', JSON.stringify(currentUser));
                console.log('사용자에 myInquiries 초기화');
            }
        }
    }, [isLoggedIn, navigate]);

    // 유저 ID 및 상품 ID
    const userId =
        userInfo?.id ||
        (localStorage.getItem('currentUser') ? JSON.parse(localStorage.getItem('currentUser')).id : null);
    const productId = productInfo?.id || window.location.pathname.split('/').pop();

    const [userInquiry, setUserInquiry] = useState({
        title: '',
        content: '',
        name:
            userInfo?.username ||
            (localStorage.getItem('currentUser') ? JSON.parse(localStorage.getItem('currentUser')).username : ''),
        password: '',
        date: '',
        inquiryType: '상품',
        productId: productId, // 상품 ID 추가
        productName: productInfo?.name || '상품명', // 상품명 추가
        productImage:
            productInfo?.image ||
            'https://www.vancleefarpels.com/content/dam/rcq/vca/21/38/78/2/2138782.png.transform.vca-w820-1x.png', // 상품 이미지 추가
    });

    // 유저 정보가 변경될 때 이름 업데이트
    useEffect(() => {
        if (userInfo?.username) {
            setUserInquiry((prev) => ({
                ...prev,
                name: userInfo.username,
            }));
        }
    }, [userInfo]);

    // 두 개의 체크박스를 위한 별도의 상태 생성
    const [isSecretPost, setIsSecretPost] = useState(false);
    const [isAgreed, setIsAgreed] = useState(false);

    const buttonStyle = isAgreed
        ? 'w-50 h-[55px] border border-primary text-primary hover:bg-primary hover:text-white cursor-pointer'
        : 'w-50 h-[55px] border border-gray-400 text-gray-400 cursor-not-allowed bg-gray-400 hover:bg-gray-400';

    const { title, content, name, password } = userInquiry;

    const changeInput = (e) => {
        const { value, name } = e.target;
        setUserInquiry({
            ...userInquiry,
            [name]: value,
        });
    };

    const onSubmit = (e) => {
        e.preventDefault();

        // 로그인 상태 재확인
        if (!isLoggedIn) {
            alert('로그인이 필요한 서비스입니다.');
            navigate('/login');
            return;
        }

        if (!title || !content) {
            alert('제목과 내용을 모두 입력해주세요.');
            return;
        }

        // 비밀글 체크했는데 비밀번호 없으면 제출 차단
        if (isSecretPost && !password) {
            alert('비밀글 작성 시 비밀번호를 반드시 입력해주세요.');
            return;
        }

        const now = new Date();
        const formattedDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(
            now.getDate()
        ).padStart(2, '0')}`;

        // 로컬스토리지의 currentUser ID 가져오기
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        const currentUserId = currentUser ? currentUser.id : null;

        console.log('제출 시 사용자 ID:', currentUserId || userId);
        console.log('제출 시 상품 ID:', productId);

        // 디스패치하는 데이터
        const inquiryData = {
            ...userInquiry,
            isSecretPost,
            date: formattedDate,
            id: currentUserId || userId,
            inquiryId: Date.now(),
        };

        console.log('디스패치하는 데이터:', inquiryData);

        // 리덕스 액션 디스패치하여 문의 추가
        dispatch(productInquiryActions.addInquiry(inquiryData));

        alert('문의가 등록되었습니다.');
        navigate('/productdetail/1');
    };

    const onExit = (e) => {
        e.preventDefault();
        navigate('/productdetail/1');
    };

    // 로그인 상태가 아니면 로딩 중이거나 리다이렉트 중이므로 아무것도 렌더링하지 않음
    if (!isLoggedIn) {
        return null;
    }

    return (
        <div className='wrap p-330 pt-[80px]'>
            <h2 className='font-secondary font-bold text-heading-m border-b'>상품 문의 쓰기</h2>
            <div className={`${flexIC} p-4 border-b gap-7`}>
                <div>
                    <img src={userInquiry.productImage} alt='제품이미지' className='w-[61px] h-[61px]' />
                </div>
                <div>
                    <h3 className='font-bold text-heading-m'>{userInquiry.productName}</h3>
                    <p className='font-bold text-gray-40 text-heading-m'>상품설명</p>
                </div>
            </div>
            <form className='w-full' onSubmit={onSubmit}>
                <ul className='flex flex-col w-full border-b py-8 px-4 gap-5'>
                    <li className='flex items-center'>
                        <div className='w-32 flex items-center gap-2'>
                            <div className='bg-black w-1 h-1'></div>
                            <h4>말머리</h4>
                        </div>
                        <div className='relative inline-block'>
                            <select
                                className='border border-gray-40 p-3 w-56 h-10 text-xs appearance-none'
                                name='inquiryType'
                                value={userInquiry.inquiryType}
                                onChange={changeInput}
                            >
                                <option value='상품'>상품</option>
                                <option value='배송'>배송</option>
                                <option value='반품/환불'>반품/환불</option>
                                <option value='교환/변경'>교환/변경</option>
                                <option value='기타'>기타</option>
                            </select>
                            <div className='absolute top-0 right-0 h-full flex items-center pr-3 pointer-events-none'>
                                <svg
                                    width='24'
                                    height='24'
                                    viewBox='0 0 48 49'
                                    fill='none'
                                    xmlns='http://www.w3.org/2000/svg'
                                >
                                    <path
                                        d='M12 18.875L24 30.875L36 18.875'
                                        stroke='black'
                                        strokeWidth='2'
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                    />
                                </svg>
                            </div>
                        </div>
                    </li>
                    <li className='flex items-center'>
                        <div className='w-32 flex items-center gap-2'>
                            <div className='bg-black w-1 h-1'></div>
                            <h4>작성자</h4>
                        </div>
                        <div>
                            <input
                                className='border border-gray-40 p-3 w-56 h-10 text-xs'
                                type='text'
                                placeholder='작성자'
                                name='name'
                                value={name}
                                onChange={changeInput}
                                readOnly={isLoggedIn} // 로그인 시 작성자명 수정 불가
                            />
                        </div>
                    </li>
                    <li className='flex items-center'>
                        <div className='w-32 flex items-center gap-2'>
                            <div className='bg-black w-1 h-1'></div>
                            <h4>비밀번호</h4>
                        </div>
                        <div>
                            <input
                                className='border border-gray-40 p-3 w-56 h-10 text-xs'
                                type='password'
                                placeholder='비밀번호'
                                name='password'
                                value={password}
                                onChange={changeInput}
                            />
                        </div>
                    </li>
                    <li className='flex items-center'>
                        <div className='w-32 flex items-center gap-2'>
                            <div className='bg-black w-1 h-1'></div>
                            <h4>제목</h4>
                        </div>
                        <div className='ml-3 w-full'>
                            <input
                                className='p-3 border border-gray-40  w-full h-10 text-xs'
                                type='text'
                                placeholder='제목'
                                name='title'
                                value={title}
                                onChange={changeInput}
                            />
                        </div>
                    </li>
                    <li className='flex items-start'>
                        <div className='w-32 flex items-center gap-2'>
                            <div className='bg-black w-1 h-1'></div>
                            <h4>내용</h4>
                        </div>
                        <div className='flex flex-col gap-4 w-full ml-3'>
                            <div className='flex items-center gap-1.5'>
                                <CheckBox
                                    id='secretPost'
                                    checked={isSecretPost}
                                    onChange={setIsSecretPost}
                                    className='w-5 h-5'
                                />
                                <span>비밀글</span>
                            </div>
                            <textarea
                                className='border border-gray-40 p-3 w-full h-40 text-xs'
                                cols='100'
                                rows='10'
                                placeholder='내용'
                                name='content'
                                value={content}
                                onChange={changeInput}
                            ></textarea>
                        </div>
                    </li>
                </ul>
                <div className='flex flex-col w-full border-b py-8 px-4 text-s'>
                    <h4 className='text-xs font-extrabold'>비회원 개인정보 수집동의</h4>
                    <p>
                        회사는 비회원의 게시글 등록시 콘텐츠 등록 및 고객 문의 응대 등을 원활하게 진행하기 위해 아래와
                        가은 개인정보를 수집하고 있습니다.
                    </p>
                    <ul className='mt-2'>
                        <li>- 수집항목: 이름, 비밀번호, 닉네임, 휴대폰 번호, 이메일IP </li>
                        <li>- 수집/이용목적: 게시글 접수 및 결과 회신 </li>
                        <li>- 이용기간: 개인정보 수집 및 이용목적 달성 시 까지 </li>
                    </ul>
                    <p className='mt-2'>
                        원칙적으로 개인정보 수집 및 이용목적이 달성된 후에는 해당 정보를 지체 없이 파기합니다. 단,
                        관계법령의 규정에 의하여 보전할 필요가 있는 경우 일정기간 동안 개인정보를 보관할 수 있습니다. 그
                        밖의 사항은 넷마블힐러비(주) 개인정보처리방침을 준수합니다.
                    </p>
                    <div className='flex items-center gap-2 mt-4'>
                        <CheckBox id='agreement' checked={isAgreed} onChange={setIsAgreed} className='w-5 h-5' />
                        <p>위 내용에 동의합니다.</p>
                        <Link>전체보기 {'>'}</Link>
                    </div>
                </div>
                <div className='flex justify-center gap-4 py-8 px-4'>
                    <Button variant='secondary' className='w-50 h-[55px]' onClick={onExit}>
                        취소
                    </Button>
                    <Button
                        className={buttonStyle}
                        type='submit'
                        disabled={!isAgreed}
                        onClick={(e) => {
                            if (!isAgreed) {
                                e.preventDefault();
                            }
                        }}
                    >
                        확인
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default ProductInquiry;
