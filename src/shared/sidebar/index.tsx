import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AiOutlineSetting, AiOutlineDollar } from 'react-icons/ai';
import { RiDashboardFill } from 'react-icons/ri';
import { IoCardOutline, IoCopyOutline } from 'react-icons/io5';
import { MdOutlineDashboardCustomize } from 'react-icons/md';

import logo from '../../assets/images/FUTO_logo.png';
import { CgLogOff } from 'react-icons/cg';

type Props = {
    sidebarMenus?: any[]
}

const Sidebar = ({sidebarMenus}: Props) => {
    const location = useLocation();
    const { pathname } = location;

    const handleLogout = () => {
        localStorage.removeItem("auth");
        localStorage.removeItem("clientId");
        localStorage.removeItem("clientID");
        localStorage.removeItem("clientD");
        localStorage.removeItem("clientToken");
        window.location.href = "/sign-in";
    };

    return (
        <>
            <div className="bg-white min-h-screen max-h-fit px-4 py-5">
                <div className="my-5 px-4">
                    <img src={logo} alt="logo" width="100px" height="100px" />
                </div>
                <ul className="list-none text-[#8c8c8c]">
                    <li 
                        className={`${ pathname === '/users-dashboard' && 'bg-[#40b142] text-white' } my-6 py-3 px-4 text-center rounded-md hover:bg-[#40b142] hover:text-white` } 
                        title="Dashboard"
                    >
                        <Link to="/users-dashboard">
                            <div className='flex justify-start'>
                                <div><span><RiDashboardFill className='text-xl'/></span></div>
                                <div className='mx-2'>Dashboard</div>
                            </div>     
                        </Link>
                    </li>
            
                    <li 
                        className={`${ pathname === '/books' && 'bg-[#40b142] text-white' } my-6 py-3 px-4 text-center rounded-md hover:bg-[#40b142] hover:text-white` }
                        title="Books"
                    >
                        <Link to="/books">
                            <div className='flex justify-start'>
                                <div><span><AiOutlineDollar className='text-xl'/></span></div>
                                <div className='mx-2'>Books</div>
                            </div>           
                        </Link>
                    </li>
                    <li 
                        className={`${ pathname === '/staff' && 'bg-[#40b142] text-white' } my-6 py-3 px-4 text-center rounded-md hover:bg-[#40b142] hover:text-white` }
                        title="Staff and Student users."
                    >
                        <Link to="/staff">
                            <div className='flex justify-start'>
                                <div><span><AiOutlineDollar className='text-xl'/></span></div>
                                <div className='mx-2'>Staff</div>
                            </div>                
                        </Link>
                    </li>
                    <li 
                        className={`${ pathname === '/students' && 'bg-[#40b142] text-white' } my-6 py-3 px-4 text-center rounded-md hover:bg-[#40b142] hover:text-white` }
                        title="Staff and Student users."
                    >
                        <Link to="/students">
                            <div className='flex justify-start'>
                                <div><span><AiOutlineDollar className='text-xl'/></span></div>
                                <div className='mx-2'>Students</div>
                            </div>                
                        </Link>
                    </li>
                    <li 
                        className={`${ pathname === '/book-requests' && 'bg-[#40b142] text-white' } my-6 py-3 px-4 text-center rounded-md hover:bg-[#40b142] hover:text-white` }
                        title="Book Requests"
                    >
                        <Link to="/book-requests">
                            <div className='flex justify-start'>
                                <div><span><IoCardOutline  className='text-xl'/></span></div>
                                <div className='mx-2'>Book Requests</div>
                            </div>                       
                        </Link>
                    </li>
                    {/* <li 
                        className={`${ pathname === '/airtime' && 'bg-[#40b142] text-white' } my-6 py-3 px-4 text-center rounded-md hover:bg-[#40b142] hover:text-white` }
                        title="airtime"
                    >
                        <Link to="/airtime">
                            <div className='flex justify-start'>
                                <div><span><IoCopyOutline className='text-xl'/></span></div>
                                <div className='mx-2'>Airtime to cash</div>
                            </div>                             
                        </Link>
                    </li>
                    <li 
                        className={`${ pathname === '/history' && 'bg-[#40b142] text-white' } my-6 py-3 px-4 text-center rounded-md hover:bg-[#40b142] hover:text-white` }
                        title="Order history"
                    >
                        <Link to="/history">
                            <div className='flex justify-start'>
                                <div><span><MdOutlineDashboardCustomize className='text-xl'/></span></div>
                                <div className='mx-2'>Order History</div>
                            </div>                                   
                        </Link>
                    </li> */}
                    <li 
                        className={`${ pathname === '/account' && 'bg-[#40b142] text-white' } my-6 py-3 px-4 text-center rounded-md hover:bg-[#40b142] hover:text-white` }
                        title="Account setting"
                    >
                        <Link to="/account">
                            <div className='flex justify-start'>
                                <div><span><AiOutlineSetting className='text-xl'/></span></div>
                                <div className='mx-2'>Account Settings</div>
                            </div>                                   
                        </Link>
                    </li>

                    <li 
                        className={"cursor-pointer my-6 py-3 px-4 text-center rounded-md hover:bg-[#40b142] hover:text-white" }
                        title="account"
                        onClick={() => handleLogout()}
                    >
                        <div className='flex justify-start'>
                            <div><span><CgLogOff className='text-xl'/></span></div>
                            <div className='mx-2'>Log Out</div>
                        </div>           
                    </li>

                   
                    
                </ul>
            </div>
        </>
    )
}

export default Sidebar;