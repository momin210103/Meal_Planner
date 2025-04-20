import React, { useContext,} from 'react';
import Card from '../components/card/Card';

import UserContext from '../Context/UserContext';

const Profile = () => {
  // const [user,setUser] = useState({});

  // useEffect(() => {
  //   axios.get('/api/v1/users/me', {withCredentials: true})
  //   .then((response) =>{
  //       setUser(response.data.data);
  //   })
  //   .catch((error) => {
  //       console.log(error);
  //   })
  // }, []);

  const {user} = useContext(UserContext);
  
 
    
  return (
    <div className="">
      

      <h2 className="text-3xl font-bold mb-6">Profile</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card>
          <div className="p-4">
          <p className='font-bold'>{user.fullName}</p>

            <p>Email: {user.email}</p>
            <p>Role: {user.Role}</p>
            <p>Room No: {user.RoomNumber}</p>
            <p>Phone: {user.phoneNumber}</p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Profile;