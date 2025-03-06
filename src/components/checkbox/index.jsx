import { useState } from 'react';

const CheckBox = ({ id, children, checked, className, ...props }) => {
  const [isCheck, setIsCheck] = useState(checked);
  const handleChange = () => {
    setIsCheck(!isCheck);
    checked && checked(isCheck);
  };
  return (
    <div
      className={`${
        isCheck
          ? 'overflow-hidden bg-primary-70 inline-flex items-center whitespace-nowrap cursor-pointer border-0 justify-center'
          : 'overflow-hidden inline-flex items-center whitespace-nowrap cursor-pointer border border-gray-50 justify-center'
      }
          ${className}`}
      onClick={handleChange}
    >
      <input
        className="absolute w-0 h-0 -m-[20px] p-0 border-0"
        id={id}
        type="checkbox"
        checked={isCheck}
        {...props}
      />
      <label
        htmlFor={id}
        className="inline-flex items-center gap-2 whitespace-nowrap cursor-pointer justify-center w-full h-full"
      >
        <div className="inline-flex items-center gap-2 whitespace-nowrap cursor-pointer justify-center w-full h-full">
          <div className="relative flex items-center justify-center w-full h-full">
            <img
              src={isCheck ? '/icons/check-w.svg' : '/icons/check.svg'}
              className="w-2/3 h-2/3"
            />
          </div>
          {children}
          {/* <Checked /> */}
        </div>
      </label>
    </div>
  );
};

export default CheckBox;
