import Nabvar from './components/Nabvar';
import { Outlet, useLocation } from 'react-router';
import Footer from './components/Footer';

const App = () => {
  const location = useLocation();

  const hideNavbarPaths = ['/about','/login','/signup',''];
  const shouldHideNavbar = hideNavbarPaths.includes(location.pathname);
  
  return (
   <div className=''>
    {
      !shouldHideNavbar && (
        <nav><Nabvar/></nav>
      )}
   
   <main className='min-h-screen'><Outlet/></main>
   {/* Show Footer only if not in hidden paths */}
   {
    !shouldHideNavbar && <Footer/>
   }
   </div>
  );
};

export default App;

