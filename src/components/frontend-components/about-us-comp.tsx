import React from 'react';

// style
import './style.css';

//images and icons
import coin from '../../assets/images/hompage_coin.png'
import logo from '../../assets/images/logo-white.png'
import phone from '../../assets/images/phone.png'
import icon from '../../assets/images/customer-satisfaction.png'
// components
import HeroSection from '../../shared/users-frontend/hero-section';
import { Link } from 'react-router-dom';
import JoinUs from '../../shared/users-frontend/join-us';
import Footer from '../../shared/users-frontend/footer';

import banner from '../../assets/images/banner-img.jpg';
import randomimg from '../../assets/images/account-balance-bg.png'

const AboutUsComp = () => {
  return (
    <>
        <HeroSection>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 overflow-hidden md:ml-32 lg:ml-36">
                <div className='py-12 w-full relative'>
                    <h3 className='text-5xl font-bold my-8 text-slate-800'>FEED THE BRAIN</h3>
                    <p className='text-sm font-thin text-justify w-3/4 my-8 text--slate-800'>Get books in all courses, General books on different aspect of life (Finance, Lifestyle, etc.).
                    We only give you the best.</p>
                    <button className='rounded-lg mt-4 mb-8 text-white bg-[#40B142] py-4 px-7 hover:bg-white hover:text-[#40B142]'>
                        <Link to="/sign-in">Get started</Link>
                    </button>
                </div>

                <div className='about-bg hidden sm:hidden md:block lg:block'>
                    
                </div>
                
            </div>
        </HeroSection>

        <div className='flex w-screen bg-ellipse flex-col  overflow-hidden'>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 py-8 w-10/12 mx-auto mb-32 ">

              <div className="py-4 ">
                <div className="about-bg2 w-full py-28 sm:py-20 ">
                  <img src={randomimg} alt="" className='mt-5 mx-auto small-icon' />
                </div>
              </div>

              <div className='md:px-24 sm:px-8 flex'>
                <div className='text-left  flex flex-col self-center my-auto w-full'>
                  <h3 className='text-black text-lg font-bold mt-2 mb-8 px-8'>Vision & Mission</h3>
                  <p className='font-light px-8 text-gray-700'>"Empowering Curiosity, Enabling Exploration: Our vision is to create an e-library that transcends physical boundaries, providing seamless access to a world of knowledge, fostering continuous learning, and inspiring individuals to discover, connect, and thrive in a digital age."</p>
                </div>
              </div> 

            </div>

            {/* difference section */}
            <div className='flex flex-col w-screen'>
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
            {/* difference section */}

        </div>

        <div className='my-4'>
            <JoinUs />
        </div>

        <Footer />
    </>
  )
}

export default AboutUsComp;