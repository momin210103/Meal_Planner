import Nabvar from './components/Nabvar';
import { Outlet } from 'react-router';
import Footer from './components/Footer';

const App = () => {
  
  return (
   <div className=''>
   <nav><Nabvar/></nav>
   <main className='min-h-screen'><Outlet/></main>
   <Footer/>
   </div>
  );
};

export default App;

//