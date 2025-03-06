import React from 'react';
import Button from '../../components/button';
import CheckBox from '../../components/checkbox';
import Input from '../../components/input';

const Home = () => {
  return (
    <div className="bg-gray-10 text-title-l font-secondary font-extrabold p-330">
      안녕 test
      <Button className="w-2xl" variant="secondary">
        ㅎ2
      </Button>
      <CheckBox checked={false} className="w-80 h-80" />
      <Input placeholder="test" />
    </div>
  );
};

export default Home;
