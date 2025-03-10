import React, { useState } from 'react';
import Input from '../../../components/input';
import Button from '../../../components/button';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import { useNavigate } from 'react-router-dom';
import CCInquiryFormModal from './CCInquiryFormModal';

const CCInquiryForm = () => {
  const navigate = useNavigate();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const handleOpenModal = () => {
    setModalIsOpen(!modalIsOpen);
  };
  const goBack = () => {
    navigate(-1);
  };
  return (
    <div className="w-full mt-[62px]">
      <div className="title w-full border-b py-[14px]">
        <h3 className="font-secondary text-content-xl font-bold">1:1문의</h3>
      </div>
      <form className="py-10 border-b border-b-gray-30">
        <ul className="list-disc flex flex-col gap-[26px]">
          <li className="list-disc flex gap-[50px] items-center">
            <div className="title flex gap-[10px] items-center w-[128px]">
              {' '}
              <div className="square w-1 h-1 bg-gray-90" />
              <p className="">말머리</p>
            </div>
            <Input
              placeholder="문의내용"
              className="border p-5 w-80 h-[55px]"
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
            <Input className="border p-5 w-full h-[55px] flex-1" />
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
                data="<p>Hello from CKEditor&nbsp;5!</p>"
                config={{
                  licenseKey: 'GPL', // Or 'GPL'.
                }}
                onReady={editor => {
                  // You can store the "editor" and use when it is needed.
                  console.log('Editor is ready to use!', editor);
                }}
                onChange={event => {
                  console.log(event);
                }}
                onBlur={(event, editor) => {
                  console.log('Blur.', editor);
                }}
                onFocus={(event, editor) => {
                  console.log('Focus.', editor);
                }}
              />
            </div>
          </li>
          <li className="list-disc flex gap-[50px] items-center">
            <div className="title flex gap-[10px] items-center w-[128px]">
              {' '}
              <div className="square w-1 h-1 bg-gray-90" />
              <p className="">첨부파일</p>
            </div>
            <div className="flex gap-[10px] items-center">
              <input type="file" id="fileholder" className="hidden" />
              <Input
                readOnly
                placeholder="선택된 파일 없음"
                className="border p-5 w-80 h-[55px]"
              />
              <label
                htmlFor="fileholder"
                className="w-[140px] h-[55px] cursor-pointer flex items-center justify-center bg-gray-100 hover:bg-gray-80 text-content-s font-bold text-white border-primary "
              >
                찾아보기
              </label>
              <Button
                variant="secondary"
                className="!text-content-s !font-bold w-[140px] h-[55px] border-gray-90 hover:!text-gray-0"
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
        >
          제출
        </Button>
      </div>
      {modalIsOpen && <CCInquiryFormModal />}
    </div>
  );
};

export default CCInquiryForm;
