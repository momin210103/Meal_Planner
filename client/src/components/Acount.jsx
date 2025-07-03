import Card from './card/Card';
import ADDBalance from './ADDBalance';
import { useNavigate } from 'react-router';
import BalanceDetails from './BalanceDetails';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { getBalance } from '../api/Api';
const Acount = () => {
    const navigate = useNavigate();
    const [totalMeal,setTotalMeal] = useState(0);
    const [balanceData, setBalanceData] = useState(null);
    const [loading,setLoading] = useState(true);
    const handleClick = () =>{
        navigate('/addbalance');
    }
    useEffect(()=>{
        const fetchBalance = async() =>{
            try {
             const res = await getBalance();
            const balance = res.data[0];
            setBalanceData(balance);
            console.log(balance);

            } catch(error){
                console.error("Error fetching Balance",error);

            } finally{
                setLoading(false);
            }

        };
        fetchBalance();
    },[]);
    useEffect(() => {
        const fetchMonthlyMealCount = async () => {
            const now = new Date();
            const year = now.getFullYear();
            const month = String(now.getMonth() + 1).padStart(2, '0');
    
            try {
                const response = await axios.get(
                    'http://localhost:8000/api/v1/mealplan/monthly-meal-count',
                    {
                        params: { year, month },
                        withCredentials: true, // ✅ সঠিক জায়গা
                    }
                );
                setTotalMeal(response.data.data[0]?.totalMealsSelected ||0);
            } catch (error) {
                console.error("Error fetching meal count:", error);
            }
        };
    
        fetchMonthlyMealCount();
    }, []);
    
    return (
        <>
            <Card>
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-5 bg-gray-100 text-black font-bold p-3 sm:p-5'>
                    <div className='CuBalance'>
                        <h1 className='text-lg sm:text-xl mb-2'>Current Balance</h1>
                        <Card className='text-center h-24 flex items-center justify-center'> {loading ? "Loading..." : (balanceData?.currentBalance ?? "N/A")}</Card>
                    </div>
                    <div>
                        <h1 className='text-lg sm:text-xl mb-2'>Previous Balance</h1>
                        <Card className='text-center h-24 flex items-center justify-center' />
                    </div>
                    <div>
                        <h1 className='text-lg sm:text-xl mb-2'>Total Meal</h1>
                        <Card className='text-center h-24 flex items-center justify-center'>{totalMeal}</Card>
                    </div>
                    <div>
                        <h1 className='text-lg sm:text-xl mb-2'>Meal Cost</h1>
                        <Card className='text-center h-24 flex items-center justify-center' />
                    </div>
                    <div>
                        <h1 className='text-lg sm:text-xl mb-2'>Meal Rate</h1>
                        <Card className='text-center h-24 flex items-center justify-center' />
                    </div>
                    <div>
                        <h1 className='text-lg sm:text-xl mb-2'>Due Amount</h1>
                        <Card className='text-center h-24 flex items-center justify-center' />
                    </div>
                    <div className="col-span-1 sm:col-span-2 flex justify-center mt-4">
                        <button
                            onClick={handleClick}
                            className='
                                w-full sm:w-auto
                                px-4 sm:px-8 
                                py-2 sm:py-3
                                rounded-xl
                                font-bold text-white
                                bg-gradient-to-r from-emerald-400 via-green-500 to-lime-400
                                hover:from-emerald-500 hover:via-green-600 hover:to-lime-500
                                active:scale-[0.98]
                                transition-all duration-300
                                shadow-lg hover:shadow-xl
                                transform hover:-translate-y-0.5
                                focus:outline-none focus:ring-4 focus:ring-emerald-300/50
                                relative overflow-hidden
                                group cursor-pointer
                            '>
                            <h1>ADD Balance</h1>
                        </button>
                    </div>
                </div>
            </Card>
        </>
    );
};

export default Acount;
