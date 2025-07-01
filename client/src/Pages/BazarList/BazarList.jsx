import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router';
import dayjs from 'dayjs';

const BorderList = () => {
  const [borders, setBorders] = useState([]); // State to store the border list
  const [loading, setLoading] = useState(true); // State to manage loading
  const [error, setError] = useState(''); // State to manage errors
  const [searchTerm, setSearchTerm] = useState(''); // State for search term
  const [filterBy, setFilterBy] = useState('all'); // State for filter
  const [showFilter, setShowFilter] = useState(false); // State to control filter dropdown

  // Fetch data from the API
  useEffect(() => {
    axios.get('/api/v1/bazarlist', { withCredentials: true })
      .then((response) => {
        setBorders(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setError('Failed to fetch bazarlist data');
        setLoading(false);
      });
  }, []);

  // Filter borders based on search term and filter
  const filteredBorders = borders.filter((border) => {
    const searchTermLower = searchTerm.toLowerCase();
    const matchesSearch = 
      border.date?.toLowerCase().includes(searchTermLower) ||
      border.name?.toLowerCase().includes(searchTermLower) ||
      border.description?.toLowerCase().includes(searchTermLower) ||
      border.amount?.toString().includes(searchTermLower);
    
    return matchesSearch;
  });



  if (loading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">{error}</div>;
  }

  return (
    <section className="bg-gray-50 dark:bg-gray-900 p-2 sm:p-3 md:p-5">
      <div className="mx-auto max-w-screen-xl px-2 sm:px-4 lg:px-12">
        <h1 className="text-2xl sm:text-3xl font-bold text-[#f57600] dark:text-white mb-4 sm:mb-6 text-center py-2 rounded-lg">Bazar Lists</h1>
        <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
          <div className="flex flex-col space-y-3 p-3 sm:p-4">
            <div className="w-full">
              <form className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <div className="relative flex-grow">
                  <label htmlFor="simple-search" className="sr-only">Search</label>
                  <div className="relative w-full">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <input 
                      type="text" 
                      id="simple-search" 
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" 
                      placeholder="Search by name,date,..." 
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  <div className="relative">
                    <button 
                      type="button" 
                      onClick={() => setShowFilter(!showFilter)}
                      className="flex items-center justify-center text-white bg-[#00b4c5] hover:bg-[#0095a3] focus:ring-4 focus:ring-[#00b4c5] font-medium rounded-lg text-sm px-4 py-2 transition-colors duration-200 cursor-pointer w-full sm:w-auto"
                    >
                      <svg className="h-4 w-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z" clipRule="evenodd" />
                      </svg>
                      Filter
                    </button>
                    {showFilter && (
                      <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-10">
                        <div className="py-2">
                          <button
                            onClick={() => { setFilterBy('all'); setShowFilter(false); }}
                            className={`block w-full text-left px-4 py-2 text-sm ${filterBy === 'all' ? 'bg-gray-100 text-[#00b4c5]' : 'text-gray-700 hover:bg-gray-100'}`}
                          >
                            All Borders
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className="overflow-x-auto">
            <div className="min-w-full inline-block align-middle">
              <div className="overflow-hidden">
                <div className="overflow-x-auto [&::-webkit-scrollbar]:h-2 [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-400 [&::-webkit-scrollbar-thumb]:rounded-full">
                  <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 whitespace-nowrap">
                    <thead className="text-xs text-black uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 font-bold sticky top-0">
                      <tr>
                        <th key="sl-no" scope="col" className="px-3 py-2 sm:px-4 sm:py-3 bg-gray-50 dark:bg-gray-700">SL NO</th>
                        <th key="sl-no" scope="col" className="px-3 py-2 sm:px-4 sm:py-3 bg-gray-50 dark:bg-gray-700">Date</th>
                        <th key="full-name" scope="col" className="px-3 py-2 sm:px-4 sm:py-3 bg-gray-50 dark:bg-gray-700">Full Name</th>
                        <th key="sl-no" scope="col" className="px-3 py-2 sm:px-4 sm:py-3 bg-gray-50 dark:bg-gray-700">Descriptions</th>
                        <th key="due-amount" scope="col" className="px-3 py-2 sm:px-4 sm:py-3 bg-gray-50 dark:bg-gray-700">Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredBorders.map((border, index) => (
                        <tr key={`border-${border.id || index}`} className={`border-b dark:border-gray-700 ${index % 2 === 0 ? 'bg-[#00b4c5] text-white font-bold' : 'bg-[#5ba300] text-black font-bold'}`}>
                          <td key={`sl-${border.id || index}`} className="px-3 py-2 sm:px-4 sm:py-3">{index + 1}</td>
                          <th key={`name-${border.id || index}`} scope="row" className="px-3 py-2 sm:px-4 sm:py-3 font-medium">
                            {dayjs(border.date).format('DD/MM/YYYY')}
                          </th>
                          
                          <td key={`phone-${border.id || index}`} className="px-3 py-2 sm:px-4 sm:py-3">{border.name || 'N/A'}</td>
                          <td key={`role-${border.id || index}`} className="px-3 py-2 sm:px-4 sm:py-3">{border.description}</td>
                          <td key={`amount-${border.id || index}`} className="px-3 py-2 sm:px-4 sm:py-3">{border.amount || '0'} Tk</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <nav className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-3 sm:space-y-0 p-3 sm:p-4" aria-label="Table navigation">
            <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
              Showing
              <span className="font-semibold text-gray-900 dark:text-white mx-1">1-{filteredBorders.length}</span>
              of
              <span className="font-semibold text-gray-900 dark:text-white mx-1">{filteredBorders.length}</span>
            </span>
            <ul className="inline-flex items-stretch -space-x-px">
              <li>
                <a href="#" className="flex items-center justify-center h-full py-1.5 px-3 ml-0 text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                  <span className="sr-only">Previous</span>
                  <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">1</a>
              </li>
              <li>
                <a href="#" className="flex items-center justify-center h-full py-1.5 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                  <span className="sr-only">Next</span>
                  <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </section>
  );
};

export default BorderList;