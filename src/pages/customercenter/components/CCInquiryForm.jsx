import React, { useState } from 'react';
import Input from '@/components/input';
import Button from '../../../components/button';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import { useNavigate } from 'react-router-dom';
import CCInquiryFormModal from './CCInquiryFormModal';
import { useDispatch, useSelector } from 'react-redux';
import { inquiryActions } from '../../../store/modules/ccinquirySlice';
import DropDown from '../../../components/dropdown';
import { authActions } from '@/store/modules/authSlice';

const CCInquiryForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.authR);
  const { userid } = user;
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [tag, setTag] = useState('제품문의');
  const [subfileData, setSubFileData] = useState('');
  const [subfileName, setSubFileName] = useState('');
  const date = new Date();
  const formattedDate = `${date.getFullYear()}-${
    date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
  }-${date.getDate()}`;
  const [data, setData] = useState({
    userId: userid,
    tag: tag,
    title: '',
    content: '',
    orderData: '',
    fileData: [],
    fileName: [],
    date: formattedDate,
  });

  const { title, content, orderData, fileData, fileName } = data;
  const changeInput = e => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const onEditorChange = (e, editor) => {
    setData({ ...data, content: editor.getData() });
  };
  const changeImg = e => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSubFileName(file.name);
        setSubFileData(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const addFile = e => {
    e.preventDefault();
    setData(prevData => ({
      ...prevData,
      fileData: [...prevData.fileData, subfileData],
      fileName: [...prevData.fileName, subfileName],
    }));

    setSubFileName('');
    setSubFileData('');
  };

  const handleOpenModal = () => {
    setModalIsOpen(!modalIsOpen);
  };
  const goBack = () => {
    navigate(-1);
  };
  const changeTag = tag => {
    setTag(tag);
    setData({ ...data, tag: tag });
  };
  const addInquiry = () => {
    if (data.title && data.content) {
      dispatch(inquiryActions.addInquiry(data));
      dispatch(authActions.addccInquiry(data));
      alert('등록 완료');
      goBack();
    } else {
      alert('제목과 내용을 입력하세요.');
    }
  };

  console.log(tag);
  return (
    <div className={`w-full mt-[62px]`}>
      <div className="title w-full border-b py-[14px]">
        <h3 className="font-secondary text-content-xl font-bold">1:1문의</h3>
      </div>
      <form className="py-10 border-b border-b-gray-30">
        <ul className="list-disc flex flex-col gap-[26px]">
          <li className="list-disc flex  items-center">
            <div className="title flex gap-[10px] items-center w-[128px]">
              {' '}
              <div className="square w-1 h-1 bg-gray-90" />
              <p className="">말머리</p>
            </div>
            <DropDown
              item={['제품문의', '배송문의', '사이트 문의', '기타']}
              handleClick={changeTag}
              className="border p-5 w-80 h-[55px] z-[100]"
            />
          </li>
          <li className="list-disc flex gap-[50px] items-center">
            <div className="title flex gap-[10px] items-center w-[128px]">
              {' '}
              <div className="square w-1 h-1 bg-gray-90" />
              <p className="">주문 내역</p>
            </div>
            <div className="modal flex gap-[10px]">
              <Input
                placeholder="선택된 주문이 없습니다."
                className="border p-5 w-80 h-[55px]"
                name="orderData"
                value={orderData}
                onChange={changeInput}
              />
              <Button
                variant="secondary"
                className="!text-content-s !font-bold w-[140px] h-[55px] !text-gray-30 border-gray-90 hover:!text-gray-0"
                onClick={handleOpenModal}
                type="button"
              >
                주문 내역
              </Button>
            </div>
          </li>
          <li className="list-disc flex gap-[50px] items-center">
            <div className="title flex gap-[10px] items-center w-[128px]">
              {' '}
              <div className="square w-1 h-1 bg-gray-90" />
              <p className="">제목</p>
            </div>
            <Input
              className="border p-5 w-full h-[55px] flex-1"
              name="title"
              value={title}
              onChange={changeInput}
            />
          </li>
          <li className="list-disc flex gap-[50px]">
            <div className="title flex gap-[10px] items-center w-[128px] h-fit">
              {' '}
              <div className="square w-1 h-1 bg-gray-90" />
              <p className="">본문</p>
            </div>
            <div className="flex-1 w-full">
              <CKEditor
                editor={ClassicEditor}
                data="<p>문의 내용을 입력하세요.</p><br/><br/><br/>"
                config={{
                  licenseKey: 'GPL',
                }}
                onChange={onEditorChange}
              />
            </div>
          </li>
          <li className="list-disc flex gap-[50px] items-center">
            <div className="title flex gap-[10px] items-center w-[128px]">
              {' '}
              <div className="square w-1 h-1 bg-gray-90" />
              <p className="">첨부파일</p>
            </div>
            <div className="flex gap-[10px] ">
              <div>
                <input
                  type="file"
                  id="fileholder"
                  accept="image/*"
                  className="hidden"
                  onChange={changeImg}
                />
                <Input
                  readOnly
                  placeholder="선택된 파일 없음"
                  className="border p-5 w-80 h-[55px]"
                  name="fileName"
                  value={subfileName}
                />
                <div>
                  <ul>
                    {fileName.map((file, index) => (
                      <li key={index}>{file}</li>
                    ))}
                  </ul>
                </div>
              </div>
              <label
                htmlFor="fileholder"
                className="w-[140px] h-[55px] cursor-pointer flex items-center justify-center bg-gray-100 hover:bg-gray-80 text-content-s font-bold text-white border-primary "
              >
                찾아보기
              </label>
              <Button
                variant="secondary"
                className="!text-content-s !font-bold w-[140px] h-[55px] border-gray-90 hover:!text-gray-0"
                onClick={addFile}
              >
                +추가
              </Button>
            </div>
          </li>
        </ul>
      </form>
      <div className="button my-8 w-full flex gap-2 justify-center">
        <Button
          variant="secondary"
          className="!text-content-s !font-bold w-[295px] h-[55px] border-gray-90 hover:"
          onClick={goBack}
        >
          취소
        </Button>
        <Button
          variant="primary"
          className="!text-content-l!font-bold w-[295px] h-[55px] !text-white border-primary hover:!border-primary"
          onClick={addInquiry}
        >
          제출
        </Button>
      </div>
      {modalIsOpen && <CCInquiryFormModal handleOpenModal={handleOpenModal} />}
    </div>
  );
};

export default CCInquiryForm;
