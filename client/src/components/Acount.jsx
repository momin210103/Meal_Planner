import Card from './card/Card';
import ADDBalance from './ADDBalance';
import { useNavigate } from 'react-router';
import BalanceDetails from './BalanceDetails';

const Acount = ({balance}) => {
    const navigate = useNavigate();
    const handleClick = () =>{
        navigate('/addbalance');
    }

    return (
        <>
            <Card>
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-5 bg-gray-100 text-black font-bold p-3 sm:p-5'>
                    <div className='CuBalance'>
                        <h1 className='text-lg sm:text-xl mb-2'>Current Balance</h1>
                        <Card className='text-center h-24 flex items-center justify-center'>{balance?.amount || 0}</Card>
                    </div>
                    <div>
                        <h1 className='text-lg sm:text-xl mb-2'>Previous Balance</h1>
                        <Card className='text-center h-24 flex items-center justify-center' />
                    </div>
                    <div>
                        <h1 className='text-lg sm:text-xl mb-2'>Total Meal</h1>
                        <Card className='text-center h-24 flex items-center justify-center' />
                    </div>
                    <div>
                        <h1 className='text-lg sm:text-xl mb-2'>Meal Cost</h1>
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
