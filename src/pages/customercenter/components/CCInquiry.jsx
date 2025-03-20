  import React, { useState, useEffect } from 'react';
  import Button from '../../../components/button';
  import { useNavigate } from 'react-router-dom';
  import { useDispatch, useSelector } from 'react-redux';
  import { paginationActions } from '../../../store/modules/paginationSlice';
  import Pagination from '../../../components/pagination';

  const CCInquiry = ({ handleClick }) => {
    const {authed , user } = useSelector(state => state.authR);
    const dispatch = useDispatch();
    const nowDate = new Date();
    const formattedDate = nowDate.toISOString().split('T')[0];
    const inquiryList = user.ccInquiries ? user.ccInquiries : [];
    const navigate = useNavigate();
    

    const [nowData, setNowData] = useState(inquiryList);
    const [prevDate, setPrevDate] = useState(formattedDate);
    const [nextDate, setNextDate] = useState(formattedDate);
    const [activeFilter, setActiveFilter] = useState('all'); 

    const onGo = tag => {
      if (authed) {
      navigate('/customers/inquiryform');
      handleClick(tag);}
      else {
        alert('로그인이 필요합니다.');
      }
    };


    const changeFilter = (filterType) => {
      setActiveFilter(filterType); 
      
      if (filterType === 'all') {
        setNowData(inquiryList);
        return;
      }
      
      const now = new Date();
      now.setHours(0, 0, 0, 0);
      
      const days = typeof filterType === 'number' ? filterType : 0;
      
      const filteredData = inquiryList.filter((item) => {
        const itemDate = new Date(item.date);
        itemDate.setHours(0, 0, 0, 0);
        
        const diffTime = now - itemDate;
        const diffDays = diffTime / (1000 * 60 * 60 * 24);
        
        return diffDays <= days;
      });
      
      setNowData(filteredData);
    };

    console.log(user.ccInquiries);

    const changeInputPrev = (e) => {
      const newPrevDate = e.target.value;
      setPrevDate(newPrevDate);

      applyDateRangeFilter(newPrevDate, nextDate);
      setActiveFilter('custom'); 
    };

    const changeInputNext = (e) => {
      const newNextDate = e.target.value;
      setNextDate(newNextDate);
      applyDateRangeFilter(prevDate, newNextDate);
      setActiveFilter('custom'); 
    };


    const applyDateRangeFilter = (start, end) => {
      const startDate = new Date(start);
      startDate.setHours(0, 0, 0, 0);
      
      const endDate = new Date(end);
      endDate.setHours(23, 59, 59, 999); 
      
      const filteredData = inquiryList.filter((item) => {
        const itemDate = new Date(item.date);
        return itemDate >= startDate && itemDate <= endDate;
      });
      
      setNowData(filteredData);
    };

    useEffect(() => {
      setNowData(inquiryList);
    }, [inquiryList]);

    const FilterButton = ({ days, label }) => {
      const isActive = activeFilter === days;
      return (
        <li className={`w-[78px] h-10 border ${isActive ? '' : 'border-gray-20 text-gray-20'} flex justify-center items-center `}>
          <button onClick={() => changeFilter(days)}>{label}</button>
        </li>
      );
    };

      useEffect(() => {
        dispatch(
          paginationActions.addData({pageId : 'inquiry', data : nowData})
        )
      }, [nowData])
      const { inquiry = {}} = useSelector((state) => state.paginationR)
      const { currPage, postsPerPage} = inquiry;
      const lastPost = currPage * postsPerPage;
      const firstPost = lastPost - postsPerPage;
      const currentPost = nowData.slice(firstPost, lastPost);
    
      console.log(postsPerPage);
    return (
      <div className="w-full">
        <div className="ccHeader flex justify-between items-center mb-4">
          <h3 className="font-secondary text-content-xl font-bold">1:1 문의</h3>
          <Button
            className="w-[188px] h-[55px] text-content-s"
            onClick={() => onGo(null)}
          >
            1:1 문의하기
          </Button>
        </div>
        <div className="filter mt-[5px] border-t border-b border-b-gray-20 py-5 mb-10 flex justify-between items-center">
          <div className="specificDay flex gap-7 items-center">
            <h4>조회기간</h4>
            <ul className="flex gap-[10px]">
              <FilterButton days="all" label="전체" />
              <FilterButton days={0} label="오늘" />
              <FilterButton days={7} label="7일" />
              <FilterButton days={15} label="15일" />
              <FilterButton days={30} label="1개월" />
              <FilterButton days={90} label="3개월" />
              <FilterButton days={365} label="1년" />
            </ul>
          </div>
          <div className="calendar flex gap-[10px] items-center">
            <input
              type="date"
              value={prevDate}
              max={nextDate} 
              className={`w-[188px] h-10 bg-gray-10 p-4 rounded-[5px] ${activeFilter === 'custom' ? 'border-blue-500' : ''}`}
              onChange={changeInputPrev}
            />
            -
            <input
              type="date"
              value={nextDate}
              min={prevDate} 
              className={`w-[188px] h-10 bg-gray-10 p-4 rounded-[5px] ${activeFilter === 'custom' ? 'border-blue-500' : ''}`}
              onChange={changeInputNext}
            />
          </div>
        </div>
        <table className="notices-table w-full">
          <thead>
            <tr className="border-t border-b border-b-gray-20">
              <th className="text-content-s text-center font-regular p-6 font-bold">
                제목
              </th>
              <th className="text-content-s text-center font-regular p-6 font-bold">
                날짜
              </th>
            </tr>
          </thead>
          <tbody className="w-full">
            {currentPost && currentPost.length > 0 ? (
              currentPost.map(item => (
                <tr key={item.id} className="border-y border-gray-20 hover:bg-gray-10 cursor-pointer" onClick={() => onGo(item.tag)}>
                  <td className="text-content-m py-5 w-[80%] text-center">
                    <div className='flex gap-4'>
                      <div className='text-gray-50'>
                        [{item.tag}]
                      </div>
                      {item.title}
                    </div>
                  </td>
                  <td className="text-content-m text-center py-5">
                    {item.date}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="2" className="text-center py-10 text-content-s">
                  게시글이 존재하지 않습니다.
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <Pagination postsPerPage={10} pageId='inquiry' className='mt-10'/>
      </div>
    );
  };

  export default CCInquiry;