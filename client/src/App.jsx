import Nabvar from './components/Nabvar';
import { Outlet, useLocation } from 'react-router';
import Footer from './components/Footer';
import UserContextProvider from './Context/UserContextProvider';
import Sidebar from './components/Sidebar';

const App = () => {
  const location = useLocation();

  const hideNavbarPaths = ['/about','/login','/signup','/addbalance','/profile','/mealmonth','/dashboard','/borderlist','/mealplan',]
  const shouldHideNavbar = hideNavbarPaths.includes(location.pathname);
  
  return (
   <UserContextProvider>
    {
      !shouldHideNavbar && (
        <nav><Nabvar/></nav>
      )}
   
   <main className='min-h-screen'><Outlet/></main>
   {/* Show Footer only if not in hidden paths */}
   {
    !shouldHideNavbar && <Footer/>
   }
   </UserContextProvider>
  );
};

export default App;

