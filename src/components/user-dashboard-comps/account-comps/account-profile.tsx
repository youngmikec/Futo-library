import React, { useState, useEffect, useRef } from 'react';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AxiosResponse } from 'axios';

import { ApiResponse } from '../../../common';
import profile from '../../../assets/images/arash.png';
import { RETRIEVE_PROFILE, UPDATE_PROFILE } from '../../../services';
import { setItem } from '../../../utils';

const AccountProfile = () => {
    const fileRef: any = useRef<HTMLButtonElement>(null)
    const [email, setEmail] = useState<string>('');
    const [phone, setPhone] = useState<string>('');
    const [photo, setphoto] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [firstName, setFirstName] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [updating, setUpdating] = useState<boolean>(false);

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

    const openFile = () => {
        return fileRef.current?.click();
    }

    const handleFileRead = async (e: any) => {
        const file = e.target.files[0];
        const base64 = await convertBase64(file);
        updateProfile({photo: base64})
    }

    const convertBase64 = (file: any): Promise<any> => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = () => {
                resolve(fileReader.result)
            }
            fileReader.onerror = (error) => {
                reject(error);
            }
        }
        )
    }

    const updateProfile = (data: any) => {
        setUpdating(true);
        UPDATE_PROFILE(data).then((res: AxiosResponse<ApiResponse>) => {
            const { message, success, payload } = res.data;
            if(success){
                setUpdating(false);
                setProfile(payload);
                setItem('clientD', payload);
                notify('success', message);
            }
        }).catch(err => {
            setUpdating(false);
            const { message } = err.response.data;
            notify('error', message);
        })
    }

    const handleUpdateProfile = () => {
        const data = {
            phone,
            email,
            firstName,
            lastName,
        };
        updateProfile(data);
    }

    const setProfile = (payload: any) => {
        setFirstName(payload.firstName);
        setLastName(payload.lastName);
        setEmail(payload.email);
        setPhone(payload.phone);
        setphoto(payload.photo);
    }

    const retreiveProfile = () => {
        setLoading(true);
        RETRIEVE_PROFILE().then((res: AxiosResponse<ApiResponse>) => {
            setLoading(false);
            const { success, message, payload } = res.data;
            if(success){
                notify('success', `${message}`);
                setProfile(payload);
            }
        }).catch((err: any) => {
            setLoading(false);
            const { message } = err.response.data;
            notify('error', message);
        })
    }

    useEffect(() => {
        retreiveProfile();
    }, [])

    return (
        <>
            <div>
                <div className='w-full border-b-2 border-[#7f7f8056] py-5 px-5'>
                    <div className='flex justify-start'>
                        <div className='mx-3'>
                            <div className="rounded-full bg-[#b1bbdf] p-1">
                                <img src={photo || profile} className="rounded-full" alt="profile" width='80px' height='80px'  />
                            </div>
                        </div>

                        <div className='mx-3 my-auto'>
                            <button 
                                className='hover:bg-[#40b142] border-2 border-[#40b142]
                                text-[#40b142] hover:text-white rounded-md py-1 px-6'
                                onClick={() => openFile()}
                            >
                                Upload
                            </button>
                            <input className='hidden' type="file" ref={fileRef} onChange={(e) => handleFileRead(e)} />
                        </div>

                        {/* <div className='mx-3 my-auto'>
                            <button className='text-[#40b142] border-2 border-[#40b142] rounded-md py-1 px-6'>
                                Upload
                            </button>
                        </div> */}
                        <div></div>
                    </div>
                </div>

                <div className='mt-6 py-5 px-5'>
                    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 lg:space-x-2">
                        <div className='my-4'>
                            <label htmlFor="firstName" className='text-[#7F7F80] text-sm font-bold'>First Name</label>
                            <div className='border-2 border-gray-100 rounded-xl mt-2'>
                                <input 
                                    type="text" 
                                    name="firstName" 
                                    className='w-full px-4 py-2'
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className='my-4'>
                            <label htmlFor="lastName" className='text-[#7F7F80] text-sm font-bold'>Last Name</label>
                            <div className='border-2 border-gray-100 rounded-xl mt-2'>
                                <input 
                                    type="text" 
                                    name="lastName" 
                                    className='w-full px-4 py-2'
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 lg:space-x-2">
                        <div className='my-4'>
                            <label htmlFor="email" className='text-[#7F7F80] text-sm font-bold'>Email Address</label>
                            <div className='border-2 border-gray-100 rounded-xl mt-2'>
                                <input 
                                    type="eamil" 
                                    name="email" 
                                    className='w-full px-4 py-2'
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className='my-4'>
                            <label htmlFor="phone" className='text-[#7F7F80] text-sm font-bold'>Phone Number</label>
                            <div className='border-2 border-gray-100 rounded-xl mt-2'>
                                <input 
                                    type="text" 
                                    name="phone" 
                                    className='w-full px-4 py-2'
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>

                    <div className='mt-6 flex justify-center'>
                        <button 
                            className='rounded-md bg-[#40b142] text-white px-6 py-3'
                            onClick={() => handleUpdateProfile()}
                        >
                            { updating ? 'Saving...' : 'Save Change'}
                        </button>
                    </div>
                </div>
            </div>

            <ToastContainer />
        </>
    )
}

export default AccountProfile;