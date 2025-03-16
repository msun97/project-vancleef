import clsx from 'clsx';
import { useState } from 'react';

const DropDown = ({ item, handleClick, className}) => {
  const [option, setOption] = useState(item[0]);
  const [isOpen, setIsOpen] = useState(false);
  const listOn = () => {
    setIsOpen(!isOpen);
  };
  const handleSelect = e => {
    setOption(e.target.innerText);
    setIsOpen(false);
    handleClick(e.target.innerText);
  };
  return (
    <div className="w-auto relative">
      <div
        className={clsx(
          'dropdown border-b flex items-center justify-between p-5',
          className,
        )}
        onClick={listOn}
      >
        <div className="option text-content-s">{option}</div>
        <div className="icon">
          <img src="/icons/down.svg" className=" w-5" />
        </div>
      </div>
      {isOpen ? (
        <div className="w-full *:dropdown-list absolute text-content-s cursor-pointer flex flex-col gap-2 bg-[rgba(255,255,255,0.9)]">
          {item.map((item, index) => (
            <div
              key={index}
              className="list-none hover:bg-gray-90 p-5 hover:text-gray-0"
              onClick={handleSelect}
              
            >
              {item}
            </div>
          ))}
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

export default DropDown;
