import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AxiosResponse } from 'axios';

import './styles.css';
import { ApiResponse } from '../../common';
import { CREATE_SUBSCRIBER } from '../../services';
import ClientsCard from './clients-card';

type MarketNumber = {
    title: string;
    value: string;
}

const JoinUs = () => {
    const marketNumbers: MarketNumber[] = [
        { title: "Happy Customers", value: "+60k"},
        { title: "Daily Transactions", value: "+500"},
        { title: "Ticket Resolved", value: "+99%"},
    ];

    const navigate = useNavigate();
    const [loading, setLoading] = useState<boolean>(false);
    const [email, setEmail] = useState<string>('');
    const [projectsCount, setProjectsCount] = useState<number>(0);
    const [clientsCount, setClientsCount] = useState<number>(0);
    const [supportCount, setSupportCount] = useState<number>(0);
    const [experienceCount, setExperienceCount] = useState<number>(0);

    const notify = (type: string, msg: string) => {
        if (type === "success") {
          toast.success(msg, {
            position: toast.POSITION.TOP_RIGHT,
          });
        }
    
        if (type === "error") {
          toast.error(msg, {
            position: toast.POSITION.TOP_RIGHT,
          });
        }
    };

    const handleSubscribe = () => {
        setLoading(true);
        const data = { subscriberEmail: email }
        CREATE_SUBSCRIBER(data).then((res: AxiosResponse<ApiResponse>) => {
            const { success } = res.data;
            if(success){
                setLoading(false);
                setEmail('');
                notify('success', 'successfully subscribed');
                setTimeout(() => {
                    navigate('/sign-in');
                }, 2000);
            }
        }).catch((err: any) => {
            setLoading(false);
            const { message } = err.response.data;
            notify('error', message);
        })
    }

    
    
    const countDown = () => {
        let count = 0;
        const intervalId = setInterval(() => {
            count += 2;
            if(count <= 10){
                setExperienceCount(count);
            }
            if(count <= 500){
                setSupportCount(count);
            }
            if(count <= 800){
                setClientsCount(count);
            }
            setProjectsCount(count);
            if(count === 1000){
                clearInterval(intervalId);
            }
        }, 40)
    }
   
    useEffect(() => {
        countDown();
    }, [])


    return (
        <>
            {/* input section */}
            <div className='hero-bg flex justify-center justify-items-center'>
                <div className='text-center my-16 w-10/12 sm:w-7/12 md:w-6/12 lg:w-5/12'>
                    <p className="text-slate-700 text-lg font-semibold mb-8">Subscribe to our news letter today</p>

                    <div className='flex w-full justify-between rounded-lg border-none bg-white'>
                        <input 
                            placeholder='someone@gmail.com'
                            type="email" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className='w-full rounded-lg border-none bg-white py-3 px-5' 
                        />
                        <button 
                            onClick={() => handleSubscribe()}
                            className='rounded-lg text-white bg-[#40b142] py-3 px-6 min-w-max'
                        >
                            {/* <Link to="/sign-in"></Link> */}
                            { loading ? 'joining...' : "Join" }
                        </button>
                    </div>
                </div>
            </div>
            {/* input section */}




            {/* Market Numbers */}
            <div className="w-full">
                <div className="mx-auto w-9/12 my-12">
                    <p className="text-[#7F7F80] text-xl text-center font-semibold my-8">Our Statistics so far</p>
                    {/* market Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 mg:grid-cols-3 lg:grid-cols-3">
                        <div className='stats-block hover:shadow-lg px-2 py-4 text-center'>
                            <h3 className='my-5 text-[#40b142] text-3xl font-bold'>3254</h3>
                            <p className='stats-count text-[#12121271]'>Books</p>
                        </div>

                        <div className='stats-block hover:shadow-lg px-2 py-4 text-center'>
                            <h3 className='my-5 text-[#40b142] text-3xl font-bold'>254</h3>
                            <p className='stats-count'>Total Members</p>
                        </div>
                        <div className='stats-block hover:shadow-lg px-2 py-4 text-center'>
                            <h3 className='my-5 text-[#40b142] text-3xl font-bold'>54</h3>
                            <p className='stats-count'>Reservations</p>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
            {/* Market Numbers */}
        </>
    )
}

export default JoinUs;