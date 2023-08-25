import React, { useState, useRef } from 'react';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from 'react-redux';
import { AxiosResponse } from 'axios';

import './style.css';
import { ApiResponse } from '../../../common';
import { SIGN_UP_USER } from '../../../services';
import { ADD_TO_STAFF } from '../../../store/staff';
import { ADD_TO_STUDENT } from '../../../store/student';


const StudentForm = () => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState<boolean>(false);

    const [photo, setPhoto] = useState<{value: string, error: boolean }>({value: '', error: false});
    const [userType, setUserType] = useState<{value: string, error: boolean }>({value: '', error: false});
    const [fullName, setFullName] = useState<{value: string, error: boolean }>({value: '', error: false});
    const [regNumber, setRegNumber] = useState<{value: string, error: boolean }>({value: '', error: false});
    const [age, setAge] = useState<{value: number, error: boolean }>({value: 25, error: false});
    const [dob, setDob] = useState<{value: string, error: boolean }>({value: '', error: false});
    const [gender, setGender] = useState<{value: string, error: boolean }>({value: '', error: false});
    const [address, setAddress] = useState<{value: string, error: boolean }>({value: '', error: false});
    const [phoneNumber, setPhoneNumber] = useState<{value: string, error: boolean }>({value: '', error: false});
    const [email, setEmail] = useState<{value: string, error: boolean }>({value: '', error: false});
    const [password, setPassword] = useState<{value: string, error: boolean }>({value: '', error: false});

    const fileRef = useRef<HTMLInputElement>(null);

    const openFile = () => {
        return fileRef.current?.click();
    }

    const handleFileRead = async (event: any) => {
        const file = event.target.files[0];
        const base64: any = await convertBase64(file);
        setPhoto({...photo, value: base64});
    }


    const convertBase64 = (file: any) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file)
            fileReader.onload = () => {
            resolve(fileReader.result);
            }
            fileReader.onerror = (error) => {
                reject(error);
            }
        })
    }

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

    const inputCheck = (): boolean => {
        let isValid: boolean = true;
        if (fullName.value === "" || undefined || null) {
          isValid = false;
          setFullName({ ...fullName, error: true });
        } else {
          setFullName({ ...fullName, error: false });
        }
        
        if (regNumber.value === "" || undefined || null) {
          isValid = false;
          setRegNumber({ ...regNumber, error: true });
        } else {
          setRegNumber({ ...regNumber, error: false });
        }

        if (age.value === 0 || undefined || null) {
          isValid = false;
          setAge({ ...age, error: true });
        } else {
          setAge({ ...age, error: false });
        }
        if (dob.value === "" || undefined || null) {
          isValid = false;
          setDob({ ...dob, error: true });
        } else {
          setDob({ ...dob, error: false });
        }
        if (gender.value === "" || undefined || null) {
          isValid = false;
          setGender({ ...gender, error: true });
        } else {
          setGender({ ...gender, error: false });
        }

        if (address.value === "" || undefined || null) {
          isValid = false;
          setAddress({ ...address, error: true });
        } else {
          setAddress({ ...address, error: false });
        }

        if (phoneNumber.value === "" || undefined || null) {
          isValid = false;
          setPhoneNumber({ ...phoneNumber, error: true });
        } else {
          setPhoneNumber({ ...phoneNumber, error: false });
        }
        if (email.value === "" || undefined || null) {
          isValid = false;
          setEmail({ ...email, error: true });
        } else {
          setEmail({ ...email, error: false });
        }
        if (password.value === "" || undefined || null) {
          isValid = false;
          setPassword({ ...password, error: true });
        } else {
          setPassword({ ...password, error: false });
        }

        return isValid;
    };

    const clearFormStates = () => {
        setPhoto({value: '', error: false});
        setFullName({value: '', error: false});
        setAge({value: 25, error: false});
        setDob({value: '', error: false});
        setAddress({value: '', error: false});
        setPhoneNumber({value: '', error: false});
        setEmail({value: '', error: false});
        setGender({value: '', error: false});
        setRegNumber({value: '', error: false});
        setPassword({value: '', error: false});
    }

    const handleSubmit = () => {
        if (inputCheck()) {
            setLoading(true);
            let data = { 
                userType: "STUDENT",
                fullName: fullName.value,
                regNumber: regNumber.value,
                age: age.value,
                dob: dob.value,
                gender: gender.value,
                address: address.value,
                phoneNumber: phoneNumber.value,
                email: email.value,
                password: password.value,
            };
            let payload;
            if(photo.value !== ''){
                payload = { ...data, photo: photo.value}
            }else {
                payload = data;
            }
            
            SIGN_UP_USER(payload)
            .then((res: AxiosResponse<ApiResponse>) => {
                const { message, payload } = res.data;
                setLoading(false);
                notify("success", message);
                dispatch(ADD_TO_STUDENT(payload));
                clearFormStates();
            })
            .catch((err: any) => {
                console.log('error', err)
                notify("error", err.message);
                setLoading(false);
            });
        }else {
            notify("error", `Fill in all required fields`);
        }  
    };


    return (
        <>
            <div className='grid grid-cols-1 lg:grid-cols-2 lg:space-x-3'>
                <div>
                    <div className="my-3">
                        <label htmlFor="shortName" className="text-[#BFBFBF] text-sm block">
                            Student Profile Image
                        </label>
                        <div
                            className={`border-2 rounded-md my-3 h-60 w-full flex justify-center ${
                                photo.error ? 'error-border' : 'input-border'
                            } px-4 py-2 `}
                        >
                            {
                                photo.value ? 
                                <img src={photo?.value} alt="uploaded" /> :
                                <button className='text-center text-[#7F7F80]' onClick={() => openFile()}>
                                    + <br /> Choose file
                                </button>
                            }
                            <input 
                                type="file" 
                                className='hidden'
                                ref={fileRef}
                                onChange={(e) => handleFileRead(e)}
                            />
                        </div>
                    </div>
                    
                </div>

                <div>
                    <div id='form'>

                        <div className="my-3">
                            <label htmlFor="fullName" className="text-[#BFBFBF] text-sm block">
                                Student Full Name*
                            </label>
                            <input
                                type="text"
                                name="fullName"
                                value={fullName.value}
                                onChange={(e) =>
                                    setFullName({ ...fullName, value: e.target.value })
                                }
                                className={`bg-white text-[#6A6A6A] border-2 ${
                                    fullName.error ? 'error-border' : 'input-border'
                                } rounded-md px-4 py-2 w-full`}
                            />
                        </div>

                        <div className="my-3">
                            <label htmlFor="email" className="text-[#BFBFBF] text-sm block">
                                Email*
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={email.value}
                                onChange={(e) =>
                                    setEmail({ ...email, value: e.target.value })
                                }
                                className={`bg-white text-[#6A6A6A] border-2 ${
                                    email.error ? 'error-border' : 'input-border'
                                } rounded-md px-4 py-2 w-full`}
                            />
                        </div>
                        <div className="my-3">
                            <label htmlFor="phoneNumber" className="text-[#BFBFBF] text-sm block">
                                Phone Number*
                            </label>
                            <input
                                type="text"
                                name="phoneNumber"
                                minLength={10}
                                value={phoneNumber.value}
                                onChange={(e) =>
                                    setPhoneNumber({ ...phoneNumber, value: e.target.value })
                                }
                                className={`bg-white text-[#6A6A6A] border-2 ${
                                    phoneNumber.error ? 'error-border' : 'input-border'
                                } rounded-md px-4 py-2 w-full`}
                            />
                        </div>

                        <div className="my-3">
                            <label htmlFor="address" className="text-[#BFBFBF] text-sm block">
                                Address*
                            </label>
                            <input
                                type="text"
                                name="address"
                                minLength={10}
                                value={address.value}
                                onChange={(e) =>
                                    setAddress({ ...address, value: e.target.value })
                                }
                                className={`bg-white text-[#6A6A6A] border-2 ${
                                    address.error ? 'error-border' : 'input-border'
                                } rounded-md px-4 py-2 w-full`}
                            />
                        </div>

                        <div className="my-3">
                            <label htmlFor="regNumber" className="text-[#BFBFBF] text-sm block">
                                Student Reg Number*
                            </label>
                            <input
                                type="text"
                                name="regNumber"
                                value={regNumber.value}
                                onChange={(e) =>
                                    setRegNumber({ ...regNumber, value: e.target.value })
                                }
                                className={`bg-white text-[#6A6A6A] border-2 ${
                                    regNumber.error ? 'error-border' : 'input-border'
                                } rounded-md px-4 py-2 w-full`}
                            />
                        </div>

                        <div className="my-3">
                            <label htmlFor="gender" className="text-[#BFBFBF] text-sm block">
                                Gender*
                            </label>
                            <select 
                                name="gender" 
                                id="gender"
                                onChange={(e) => setGender({ ...gender, value: e.target.value})}
                                className={`bg-white text-[#6A6A6A] border-2 ${
                                    gender.error ? 'error-border' : 'input-border'
                                } rounded-md px-4 py-2 w-full`}
                            >
                                <option value="">Select Gender</option>
                                <option value="MALE">MALE</option>
                                <option value="FEMALE">FEMALE</option>
                            </select>
                        </div>
                        

                        <div className="my-3">
                            <label htmlFor="age" className="text-[#BFBFBF] text-sm block">
                                Age*
                            </label>
                            <input
                                type="number"
                                name="age"
                                value={age.value}
                                onChange={(e) =>
                                    setAge({ ...age, value: parseInt(e.target.value) })
                                }
                                className={`bg-white text-[#6A6A6A] border-2 ${
                                    age.error ? 'error-border' : 'input-border'
                                } rounded-md px-4 py-2 w-full`}
                            />
                        </div>

                        <div className="my-3">
                            <label htmlFor="dob" className="text-[#BFBFBF] text-sm block">
                                Birth Date*
                            </label>
                            <input
                                type="date"
                                name="dob"
                                value={dob.value}
                                onChange={(e) =>
                                    setDob({ ...dob, value: e.target.value })
                                }
                                className={`bg-white text-[#6A6A6A] border-2 ${
                                    dob.error ? 'error-border' : 'input-border'
                                } rounded-md px-4 py-2 w-full`}
                            />
                        </div>

                        <div className="my-3">
                            <label htmlFor="password" className="text-[#BFBFBF] text-sm block">
                                Password*
                            </label>
                            <input
                                type="password"
                                name="password"
                                value={password.value}
                                onChange={(e) =>
                                    setPassword({ ...password, value: e.target.value })
                                }
                                className={`bg-white text-[#6A6A6A] border-2 ${
                                    password.error ? 'error-border' : 'input-border'
                                } rounded-md px-4 py-2 w-full`}
                            />
                        </div>

                        <div className="my-3 text-center">
                            <button
                                onClick={() => handleSubmit()}
                                className="bg-[#40b142] text-white py-1 px-10 rounded-2xl"
                            >
                                {loading ? "Processing..." : "Create Student"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <ToastContainer />
        </>
    )
}

export default StudentForm;