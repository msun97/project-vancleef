import React from 'react';
import Input from '../../../components/input';
import Button from '../../../components/button';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from '@ckeditor/ckeditor5-react';

const CCInquiryForm = () => {
  return (
    <div className="w-full mt-[62px]">
      <div className="title w-full border-b py-[14px] mb-10">
        <h3 className="font-secondary text-content-xl font-bold">1:1문의</h3>
      </div>
      <form>
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
          </li>
        </ul>
      </form>
    </div>
  );
};

export default CCInquiryForm;
