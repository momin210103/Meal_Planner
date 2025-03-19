import React from 'react';
import Nabvar from './components/Nabvar';
import { Outlet } from 'react-router';

const App = () => {
  return (
   <>
   <nav><Nabvar/></nav>
   <main className='min-h-[calc(100vh-100px)]'><Outlet/></main>
   <footer>Footer</footer>
   </>
  );
};

export default App;