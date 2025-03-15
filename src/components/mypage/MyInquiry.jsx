const MyInquiry = () => {
    // 가상의 Q&A 데이터 (실제로는 API 또는 Redux에서 가져와야 함)
    const qnaList = [
        {
            id: 'qna1',
            productName: '프러포즈 펜던트, 스몰 모델',
            title: '펜던트 체인 길이 문의',
            content: '기본 제공되는 체인의 길이가 몇 cm인가요? 추가 구매 가능한지도 알려주세요.',
            status: '답변완료',
            isPrivate: false,
            date: '2023-12-10',
            answer: {
                content:
                    '안녕하세요. 기본 체인 길이는 45cm이며, 추가 구매 가능합니다. 고객센터로 연락주시면 안내해 드리겠습니다.',
                date: '2023-12-11',
            },
        },
        {
            id: 'qna2',
            productName: '클래식 시계, 미디엄 모델',
            title: '배터리 교체 비용 문의',
            content: '배터리 교체 비용은 얼마인가요? 서비스센터 방문 없이 직접 교체 가능한가요?',
            status: '답변완료',
            isPrivate: false,
            date: '2023-11-25',
            answer: {
                content: '안녕하세요. 배터리 교체 비용은 무료입니다. 품질 보증을 위해 서비스센터 방문을 권장드립니다.',
                date: '2023-11-26',
            },
        },
        {
            id: 'qna3',
            productName: '실크 스카프, 레드 컬러',
            title: '세탁 방법 문의',
            content: '스카프 세탁 방법이 궁금합니다. 드라이클리닝만 가능한가요?',
            status: '답변대기',
            isPrivate: true,
            date: '2023-12-15',
            answer: null,
        },
    ];

    return (
        <div>
            <h2 className='text-xl font-bold mb-4'>내가 작성한 문의</h2>

            {qnaList.length > 0 ? (
                <div className='border-t border-gray-200'>
                    {qnaList.map((qna) => (
                        <div key={qna.id} className='p-4 border-b border-gray-200'>
                            <div className='flex justify-between mb-2'>
                                <span className='text-sm text-gray-500'>{qna.productName}</span>
                                <div className='flex space-x-2'>
                                    <span
                                        className={`text-xs px-2 py-1 rounded ${
                                            qna.status === '답변완료'
                                                ? 'bg-green-100 text-green-700'
                                                : 'bg-yellow-100 text-yellow-700'
                                        }`}
                                    >
                                        {qna.status}
                                    </span>
                                    {qna.isPrivate && (
                                        <span className='text-xs px-2 py-1 rounded bg-gray-100 text-gray-700'>
                                            비공개
                                        </span>
                                    )}
                                </div>
                            </div>

                            <h3 className='font-medium mb-2'>{qna.title}</h3>
                            <p className='text-sm text-gray-700 mb-2'>{qna.content}</p>
                            <p className='text-xs text-gray-500 mb-4'>작성일: {qna.date}</p>

                            {qna.answer ? (
                                <div className='bg-gray-50 p-3 rounded'>
                                    <div className='flex items-center mb-2'>
                                        <span className='bg-blue-500 text-white text-xs px-2 py-1 rounded mr-2'>
                                            답변
                                        </span>
                                        <span className='text-xs text-gray-500'>답변일: {qna.answer.date}</span>
                                    </div>
                                    <p className='text-sm'>{qna.answer.content}</p>
                                </div>
                            ) : (
                                <div className='text-sm text-gray-500 italic'>답변을 기다리고 있습니다.</div>
                            )}

                            <div className='mt-3 flex justify-end space-x-2'>
                                <button className='px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded'>
                                    수정
                                </button>
                                <button className='px-3 py-1 text-sm bg-red-50 text-red-600 hover:bg-red-100 rounded'>
                                    삭제
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className='text-center text-gray-500 py-8 border-t border-b border-gray-200'>
                    작성한 문의가 없습니다.
                </div>
            )}
        </div>
    );
};

export default MyInquiry;
