import React, { useState } from 'react';
import WishForm from './WishForm';
import WishDisplay from './WishDisplay';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const App = () => {
  const [generatedWish, setGeneratedWish] = useState('');

  const generateWish = (wishObject) => {
    // Send wishObject to the server and get the generated wish
    // For now, just concatenate the wishObject properties
    const generated = Object.values(wishObject).filter((value) => value !== '').join(' ');
    setGeneratedWish(generated);
  };

  const changeWish = () => {
    setGeneratedWish('');
  };

  return (
    <div>
    <div>
    <Router>
        <Routes>
          <Route path='/' element={<WishForm></WishForm>}></Route>
          <Route path='/WishDisplay' element={<WishDisplay></WishDisplay>}></Route>
    
        </Routes>
    </Router>
    </div>
    <div>
      {/* {generatedWish ? (
        <WishDisplay wish={generatedWish} changeWish={changeWish} />
      ) : (
        <WishForm generateWish={generateWish} />
      )} */}
    </div>
    </div>
  );
};

export default App;
