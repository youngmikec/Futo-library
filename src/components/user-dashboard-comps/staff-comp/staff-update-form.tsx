import React, { useState, useRef, useEffect } from 'react';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from 'react-redux';
import { AxiosResponse } from 'axios';

import './style.css';
import { ApiResponse, Book, BookCategory } from '../../../common';
import { UPDATE_BOOK } from '../../../services';
import { UPDATE_BOOk_STATE } from '../../../store/book';

type Props = {
    book?: Book
}

const StaffUpdateForm = ({ book }: Props) => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState<boolean>(false);

    const [bookImg, setBookImg] = useState<{value: string | undefined, error: boolean }>({value: '', error: false});
    const [bookName, setBookName] = useState<{value: string | undefined, error: boolean }>({value: '', error: false});
    const [language, setLanguage] = useState<{value: string | undefined, error: boolean }>({value: '', error: false});
    const [author, setAuthor] = useState<{value: string | undefined, error: boolean }>({value: '', error: false});
    const [publisher, setPublisher] = useState<{value: string | undefined, error: boolean }>({value: '', error: false});
    const [bookCountAvailable, setBookCountAvailable] = useState<{value: number | undefined, error: boolean }>({value: 0, error: false});
    const [bookStatus, setBookStatus] = useState<{value: string | undefined, error: boolean }>({value: 'AVAILABLE', error: false});
    const [categories, setCategories] = useState<{value: string[] | any, error: boolean }>({value: [], error: false});

    const fileRef = useRef<HTMLInputElement>(null);

    const openFile = () => {
        return fileRef.current?.click();
    }

    const handleFileRead = async (event: any) => {
        const file = event.target.files[0];
        const base64: any = await convertBase64(file);
        setBookImg({...bookImg, value: base64});
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


    const clearFormStates = () => {
        setBookImg({value: '', error: false});
        setBookName({value: '', error: false});
        setAuthor({value: '', error: false});
        setPublisher({value: '', error: false});
        setBookCountAvailable({value: 0, error: false});
        setLanguage({value: '', error: false});
        setBookStatus({value: '', error: false});
        setCategories({value: [], error: false});
    }

    const handleSubmit = () => {
        setLoading(true);
        let data = { 
            bookName: bookName.value,
            author: author.value,
            language: language.value,
            publisher: publisher.value,
            bookCountAvailable: bookCountAvailable.value,
            bookStatus: bookStatus.value,
            // categories: categories.value,
            categories: ["64cee4033b2d4a40d4b292e5"],
            bookImg: bookImg.value || '',
            
        };
        // if(bookImg.value !== ''){
        //     data.bookImg = bookImg.value;
        // }
        
      const id: string = book?._id ? book._id : '';
      UPDATE_BOOK(id, data)
        .then((res: AxiosResponse<ApiResponse>) => {
            const { message, payload } = res.data;
            setLoading(false);
            notify("success", message);
            dispatch(UPDATE_BOOk_STATE(payload));
            clearFormStates();
        })
        .catch((err: any) => {
            const { message } = err.response.data;
            notify("error", message);
            setLoading(false);
        });
         
    };

    useEffect(() => {
        setBookImg({value: book?.bookImg, error: false});
        setBookName({value: book?.bookName, error: false});
        setAuthor({value: book?.author, error: false});
        setPublisher({value: book?.publisher, error: false});
        setBookCountAvailable({value: book?.bookCountAvailable, error: false});
        setLanguage({value: book?.language, error: false});
        setBookStatus({value: book?.bookStatus, error: false});
        setCategories({value: book?.categories.map(item => item._id), error: false});
    }, [])


    return (
        <>
            <div className='grid grid-cols-1 lg:grid-cols-2 lg:space-x-3'>
                <div>
                    <div className="my-3">
                        <label htmlFor="shortName" className="text-[#BFBFBF] text-sm block">
                            Book image
                        </label>
                        <div
                            className={`border-2 rounded-md my-3 h-60 w-full flex justify-center ${
                                bookImg.error ? 'error-border' : 'input-border'
                            } px-4 py-2 `}
                        >
                            {
                                bookImg.value ? 
                                <img src={bookImg?.value} alt="uploaded" /> :
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
                            <label htmlFor="name" className="text-[#BFBFBF] text-sm block">
                                Book Name*
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={bookName.value}
                                onChange={(e) =>
                                    setBookName({ ...bookName, value: e.target.value })
                                }
                                className={`bg-white text-[#6A6A6A] border-2 ${
                                    bookName.error ? 'error-border' : 'input-border'
                                } rounded-md px-4 py-2 w-full`}
                            />
                        </div>

                        <div className="my-3">
                            <label htmlFor="rate" className="text-[#BFBFBF] text-sm block">
                                Author*
                            </label>
                            <input
                                type="text"
                                name="author"
                                min={0}
                                value={author.value}
                                onChange={(e) =>
                                    setAuthor({ ...author, value: e.target.value })
                                }
                                className={`bg-white text-[#6A6A6A] border-2 ${
                                    author.error ? 'error-border' : 'input-border'
                                } rounded-md px-4 py-2 w-full`}
                            />
                        </div>
                        <div className="my-3">
                            <label htmlFor="rate" className="text-[#BFBFBF] text-sm block">
                                Pulisher*
                            </label>
                            <input
                                type="text"
                                name="publisher"
                                min={0}
                                value={publisher.value}
                                onChange={(e) =>
                                    setPublisher({ ...publisher, value: e.target.value })
                                }
                                className={`bg-white text-[#6A6A6A] border-2 ${
                                    publisher.error ? 'error-border' : 'input-border'
                                } rounded-md px-4 py-2 w-full`}
                            />
                        </div>

                        <div className="my-3">
                            <label htmlFor="bookStatus" className="text-[#BFBFBF] text-sm block">
                                Book Category*
                            </label>
                            <select 
                                name="categories" 
                                id="categories"
                                onChange={(e) => setCategories({ ...categories, value: categories.value.push(e.target.value) })}
                                className={`bg-white text-[#6A6A6A] border-2 ${
                                    categories.error ? 'error-border' : 'input-border'
                                } rounded-md px-4 py-2 w-full`}
                            >
                                <option value="">Select Book Category</option>
                                <option value="AI">AI</option>
                                <option value="Chemisty">Chemistry</option>
                                <option value="Mathematics">Mathematics</option>
                                <option value="Business">Business</option>
                                <option value="Economics">Economics</option>
                                <option value="Computer Science">Computer Science</option>
                                <option value="Information techology">Information techology</option>
                            </select>
                        </div>
                        <div className="my-3">
                            <label htmlFor="rate" className="text-[#BFBFBF] text-sm block">
                                Book Status*
                            </label>
                            <select 
                                name="bookStatus" 
                                id="bookStatus"
                                onChange={(e) => setBookStatus({ ...bookStatus, value: e.target.value })}
                                className={`bg-white text-[#6A6A6A] border-2 ${
                                    bookStatus.error ? 'error-border' : 'input-border'
                                } rounded-md px-4 py-2 w-full`}
                            >
                                <option value="">Select Book Status</option>
                                <option value="AVAILABLE">AVAILABLE</option>
                                <option value="UNAVAILABLE">UNAVAILABLE</option>
                                <option value="PENDING">PENDING</option>
                                <option value="PUBLISHED">PUBLISHED</option>
                                <option value="OUTDATED">OUTDATED</option>
                                <option value="UNPUBLISHED">UNPUBLISHED</option>
                            </select>
                        </div>

                        <div className="my-3">
                            <label htmlFor="walletAddress" className="text-[#BFBFBF] text-sm block">
                                Language*
                            </label>
                            <input
                                type="text"
                                name="language"
                                value={language.value}
                                onChange={(e) =>
                                    setLanguage({ ...language, value: e.target.value })
                                }
                                className={`bg-white text-[#6A6A6A] border-2 ${
                                    language.error ? 'error-border' : 'input-border'
                                } rounded-md px-4 py-2 w-full`}
                            />
                        </div>

                        <div className="my-3">
                            <label htmlFor="bookCountAvailable" className="text-[#BFBFBF] text-sm block">
                                Quantity*
                            </label>
                            <input
                                type="number"
                                name="bookCountAvailable"
                                value={bookCountAvailable.value}
                                onChange={(e) =>
                                    setBookCountAvailable({ ...bookCountAvailable, value: parseInt(e.target.value) })
                                }
                                className={`bg-white text-[#6A6A6A] border-2 ${
                                    bookCountAvailable.error ? 'error-border' : 'input-border'
                                } rounded-md px-4 py-2 w-full`}
                            />
                        </div>

                        <div className="my-3 text-center">
                            <button
                                onClick={() => handleSubmit()}
                                className="bg-[#40b142] text-white py-1 px-10 rounded-2xl"
                            >
                                {loading ? "Processing..." : "Create"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <ToastContainer />
        </>
    )
}

export default StaffUpdateForm;