import axios from 'axios';
export const getMealPlanByMonth = async (year, month) =>{
    const res = await axios.get(`http://localhost:8000/api/v1/selectedmeals/${year}/${month}`, { withCredentials: true });
    return res.data;
};
export const getBalance = async () =>{
    const res = await axios.get(`http://localhost:8000/api/v1/getbalance`,{withCredentials:true});
    return res.data;
}

// export const addBalance = async() =>{
//     const res = await axios.put(``)
// }