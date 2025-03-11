import { Link, useNavigate } from 'react-router-dom';
import Button from '../../components/button';
import CheckBox from '../../components/checkbox';
import { useRef, useState, useEffect } from 'react';
import Input from '../../components/input';

const flexIC = 'flex items-center';

const ProductInquiry = () => {
    const fileInputRef = useRef(null);
    const navigate = useNavigate();
    const [fileName, setFileName] = useState(''); // 파일명 상태 추가
    const [userInquiry, setUserInquiry] = useState({
        title: '',
        content: '',
        name: '',
        password: '',
        date: '',
        inquiryType: '상품',
    });

    // 두 개의 체크박스를 위한 별도의 상태 생성
    const [isSecretPost, setIsSecretPost] = useState(false);
    const [isAgreed, setIsAgreed] = useState(false);

    // 비밀글 체크시 비밀번호 필수 입력 확인
    useEffect(() => {
        if (isSecretPost && !userInquiry.password) {
            // 비밀글이 체크되었지만 비밀번호가 없는 경우
            console.log('비밀글에는 비밀번호가 필요합니다.');
        }
    }, [isSecretPost, userInquiry.password]);

    const buttonStyle = isAgreed
        ? 'w-50 h-[55px] border border-primary text-primary hover:bg-primary hover:text-white cursor-pointer'
        : 'w-50 h-[55px] border border-gray-400 text-gray-400 cursor-not-allowed';

    const handleButtonClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    // 파일 선택 시 호출되는 함수
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFileName(file.name);
        }
    };

    const { title, content, name, password } = userInquiry;

    const changeInput = (e) => {
        const { value, name } = e.target;
        setUserInquiry({
            ...userInquiry,
            [name]: value,
        });
    };

    const now = new Date();

    const onSubmit = (e) => {
        e.preventDefault();
        if (!title || !name || !content) return;

        // 비밀글 체크했는데 비밀번호 없으면 제출 차단
        if (isSecretPost && !password) {
            alert('비밀글 작성 시 비밀번호를 반드시 입력해주세요.');
            return;
        }

        userInquiry.date = `${now.getFullYear()} - ${now.getMonth() + 1} -${now.getDate()} `;
        navigate('/productdetail');
    };

    const onExit = (e) => {
        e.preventDefault();
        navigate('/productdetail');
    };

    return (
        <div className='wrap p-330 pt-[80px]'>
            <h2 className='font-secondary font-bold text-heading-m border-b'>상품 문의 쓰기</h2>
            <div className={`${flexIC} p-4 border-b gap-7`}>
                <div>
                    <img
                        src='https://www.vancleefarpels.com/content/dam/rcq/vca/21/38/78/2/2138782.png.transform.vca-w820-1x.png'
                        alt='제품이미지-샘플'
                        className='w-[61px] h-[61px]'
                    />
                </div>
                <div>
                    <h3 className='font-bold text-heading-m'>상품명</h3>
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
                                type='text'
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
                    <li className='flex items-center'>
                        <div className='w-32 flex items-center gap-2'>
                            <div className='bg-black w-1 h-1'></div>
                            <h4>파일</h4>
                        </div>
                        <div>
                            <input
                                className='border border-gray-40 p-3 w-56 h-10 text-xs'
                                placeholder={`${fileName}`}
                            />
                        </div>
                        <div className='relative'>
                            <Button onClick={handleButtonClick} className='w-20 h-10 py-3 px-4 ml-4 text-xs'>
                                찾아보기
                            </Button>
                            <Input
                                ref={fileInputRef}
                                type='file'
                                onChange={handleFileChange} // 파일 선택 시 이벤트 연결
                                className='absolute opacity-0 w-0 h-0'
                            />
                        </div>
                        <Button className='w-20 h-10 py-3 px-4 ml-2 text-xs' variant='secondary'>
                            + 추가
                        </Button>
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
