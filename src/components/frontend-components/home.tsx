import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';


// style
import './style.css';

//icons and images
import coin from '../../assets/images/hompage_coin.png';
import phoneCoins from '../../assets/images/phone-coin.svg'
import giftcards from '../../assets/images/giftcards.svg'
import phone from '../../assets/images/phone.png'
import icon from '../../assets/images/customer-satisfaction.png'
import networks from '../../assets/images/networks.svg';
// components
import HeroSection from '../../shared/users-frontend/hero-section';
import JoinUs from '../../shared/users-frontend/join-us';
import Footer from '../../shared/users-frontend/footer';
import { AxiosResponse } from 'axios';
import { ApiResponse } from '../../common';
import { RETREIVE_CRYPTO } from '../../services';
import ReviewComp from './review';
import ImageSlider from './ImageSlider';

const HomeComp = () => {
    // const [cryptos, setCryptos] = useState<CryptoCurrency[]>([]);

    const retrieveCryptos = () => {
        const query: string = `?sort=-name`;
        RETREIVE_CRYPTO(query)
        .then((res: AxiosResponse<ApiResponse>) => {
            const { message, payload } = res.data;
            console.log('success', message);
            // setCryptos(payload);
        })
        .catch((err: any) => {
            const { message } = err.response.data;
            console.log('error', message);
        });
    };

    useEffect(() => {
        retrieveCryptos();
    }, []);

    return (
        <>
            <HeroSection>
                {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 py-8 md:ml-32 lg:ml-36">
                    <div className='py-4 w-full relative'>
                        <h3 className='text-5xl font-bold my-8 text-white'>The Fastest Way To Buy, <br/> Sell And Trade Crypto </h3>
                        <div className='w-3/4 my-8'>
                            <p className='text-sm font-thin text-justify my-2 text-white'>Join over 100,000 users across the globe to trade</p> 
                            <p className='text-sm font-thin text-justify my-2 text-white'>your digital asset on a fast and secured platform</p>   
                        </div>

                        <div className='my-8'>
                            <button className='rounded-lg mt-4 mb-8 text-white bg-[#FFAB2E] py-4 px-7 hover:bg-white hover:text-[#FFAB2E]'>
                                <Link to="/sign-in">Let's Trade</Link>
                            </button>
                        </div>
                        <img src={coin} alt="" className='hidden sm:hidden md:block lg:block absolute right-0 bottom-0 '  />
                    </div>

                    <div className='wallet-bg'>
                    </div>
                </div> */}

                <ImageSlider />
            </HeroSection>

            <div className="overflow-hidden">
                <div className='flex flex-col w-screen mt-16'>
                    <div className='text-center'>
                        <h2 className=' font-bold text-black text-xl mb-2 capitalize text-[#7F7F80] '>Our Offers</h2>
                        <p className='text-sm text-gray-600 font-light'>Provides convenient access to a vast array of digital resources, enabling users to explore and learn. </p>
                    </div>

                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 px-10 justify-evenly my-10'>
                        <div className='text-center flex justify-center flex-col hover:shadow-lg px-7 hover:bg-white'>
                            <img src={phone} alt="" width='30' className='self-center mx-auto my-2' />
                            <h3 className='text-[#40B142] font-bold text-lg my-4'>Easy Access to Books</h3>
                            <p className=' text-sm font-light'>We help our users acquire and borrow books through digital  <br /> platforms and online libraries, eliminating the need for <br /> physical visits to brick-and-mortar libraries and enabling <br /> instant access to a diverse range of reading materials.</p>

                        </div>
                        <div className='text-center flex justify-center flex-col hover:shadow-lg px-7 hover:bg-white'>
                            <img src={icon} alt="" width='30' className='self-center mx-auto my-2' />
                            <h3  className='text-[#40B142] font-bold text-lg my-4'>Easy Access to Librarians</h3>
                            <p className=' text-sm font-light'>we help the users readily connect with librarians <br /> and information professionals through various communication channels</p>

                        </div>
                        <div className='text-center flex justify-center flex-col hover:shadow-lg px-7 hover:bg-white'>
                            <img src={phone} alt="" width='30' className='self-center mx-auto my-2' />
                            <h3 className='text-[#40B142] font-bold text-lg my-4'>24/7 Library Access</h3>
                            <p className=' text-sm font-light'>Our users have the capability of accessing library resources, materials,  <br /> and services at any time of the day or night, providing unprecedented  <br /> flexibility and convenience for users to engage in learning, research,  <br />and information gathering without being limited by traditional library hours.</p>

                        </div>
                    </div>
                </div>
            </div>  

            <div className='my-4'>
                <JoinUs />
            </div>

            <div className='my-4'>
                <ReviewComp />
            </div>

            <Footer />
        </>
    )
}

export default HomeComp;