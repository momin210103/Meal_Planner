import axios from 'axios';
export const getMealPlanByMonth = async (year, month) =>{
    const res = await axios.get(`http://localhost:8000/api/v1/selectedmeals/${year}/${month}`, { withCredentials: true });
    return res.data;
};