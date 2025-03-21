import Nabvar from './components/Nabvar';
import { Outlet } from 'react-router';
import Footer from './components/Footer';

const App = () => {
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
   <>
   {/* {!isLoggedIn && <Nabvar />} */}
   <nav><Nabvar/></nav>
   <main className='min-h-[calc(100vh-100px)]'><Outlet/></main>
   <Footer/>
   </>
  );
};

export default App;