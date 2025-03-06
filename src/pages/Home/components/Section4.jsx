import React from 'react';

const Section4 = () => {
  const data = [
    { id: 1, name: 'perlee' },
    { id: 2, name: 'Frivole' },
    { id: 3, name: 'A-Cheval' },
  ];
  return (
    <div className="h-screen flex flex-col items-center justify-center">
      {data.map(item => (
        <div
          key={item.id}
          className="content flex justify-center items-center flex-col gap-[30px]"
        >
          <div className="logo">
            <img
              src={`/images/${item.name}.png`}
              alt={item.name}
              className="w-[155px]"
            />
          </div>
          <div className="text flex flex-col gap-[60px] justify-center items-center">
            <div className="title text-center">
              <h2 className="text-title-s font-secondary font-extrabold">
                {item.name}
              </h2>
            </div>
          </div>
        </div>
      ))}
      <div className="content flex justify-center items-center flex-col">
        <h3 className="text-content-xxxl font-extrabold">Van Cleef와 함께</h3>
        <h2 className="text-title-s font-extrabold font-secondary">
          가치관을, 비전을, 인생을
        </h2>
      </div>
    </div>
  );
};

export default Section4;
