import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AxiosResponse } from 'axios';
import moment from 'moment';

//icons
import { BiEditAlt } from 'react-icons/bi';

import Card from '../../../shared/card';
import { sortArray } from '../../../utils';
import { RootState } from '../../../store';
import SortComp from '../../../shared/sort-comp';
import { ApiResponse, BookRequest } from '../../../common';
import AppModalComp from '../../../shared/app-modal';
import DeleteComp from '../../../shared/delete-comp/delete-comp';
import { CloseAppModal, OpenAppModal } from '../../../store/modal';

import BookRequestForm from './book-request-form';
import BookRequestUpdateForm from './book-request-update-form';
import BookRequestDetailComp from './book-request-detail';
import { INITIALIZE_BOOK_REQUESTS, REMOVE_BOOK_REQUEST } from '../../../store/book-request';
import { DELETE_BOOKREQUEST, RETREIVE_BOOKREQUESTS } from '../../../services';


const BookRequestsComp = () => {
    const dispatch = useDispatch();
    const BookRequests: BookRequest[] = useSelector((state: RootState) => state.bookRequestState.value);

    const [deleting, setDeleting] = useState<boolean>(false);
    const [searching, setSearching] = useState<boolean>(false);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [bookRequests, setBookRequests] = useState<BookRequest[]>([]);
    const [selectedBookRequest, setSelectedBookRequest] = useState<BookRequest | undefined>();
    const [modalMode, setModalMode] = useState<string>('');

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

    const retrieveBookRequest = () => {
        const query: string = `?sort=-createdAt&populate=createdBy,bookId`;
        RETREIVE_BOOKREQUESTS(query)
        .then((res: AxiosResponse<ApiResponse>) => {
            const { message, payload } = res.data;
            notify("success", message);
            setBookRequests(payload);
            dispatch(INITIALIZE_BOOK_REQUESTS(payload));
        })
        .catch((err: any) => {
            const { message } = err.response.data;
            notify("error", message);
        });
    };

    const sortData = (field: string) => {
        const sortedArray: any[] = sortArray(bookRequests, field);
        if (sortedArray.length > 0) {
          setBookRequests(sortedArray);
        }
    };

    const handleSearchQuery = () => {
        setSearching(true);
        if(searchQuery !== '') {
            const filteredResults: BookRequest[] = bookRequests.filter((item: BookRequest) => Object.values(item).includes(searchQuery));
            setBookRequests(filteredResults);
            setSearching(false);
        }else {
            setBookRequests(BookRequests);
            setSearching(false);
        }
    }

    const openModal = (mode: string = 'create', id: string = '') => {
        setModalMode(mode);
        dispatch(OpenAppModal());
    }

    const handleDeleteRecord = (id: string) => {
        setDeleting(true);
        DELETE_BOOKREQUEST(id)
        .then((res: AxiosResponse<ApiResponse>) => {
            const { message, payload, success } = res.data;
            if(success){
                setDeleting(false);
                notify("success", message);
                dispatch(REMOVE_BOOK_REQUEST(payload._id));
                dispatch(CloseAppModal());
            }
        })
        .catch((err: any) => {
            setDeleting(false);
            const { message } = err.response.data;
            notify("error", message);
        });
    }
    
    useEffect(() => {
        retrieveBookRequest();
    }, []);

    useEffect(() => {
        setBookRequests(BookRequests);
    }, [BookRequests]);

    return (
        <>
            <div className="w-full">
                <Card type='lg'>
                    {/* Title section */}
                    <div id="title">
                        <div className="flex flex-col sm:justify-between md:justify-between lg:flex-row lg:justify-between w-full">
                            <div className='mb-8'>
                                <h3 className='text-[#40b142] text-xl font-bold mb-1'>Book Request Records Table</h3>
                                <p className='text-[#7F7F80] text-sm'>Displaying {bookRequests.length} of {bookRequests.length} Book Request Record(s)</p>
                            </div>

                            <div className='mb-8'>
                                <button 
                                    className='bg-[#40b142] text-white py-2 px-4 rounded-md'
                                    onClick={() => openModal('create')}
                                >
                                    Request Book
                                </button>
                            </div>

                        </div>

                        <div className="flex flex-col sm:justify-between md:justify-between lg:flex-row lg:justify-between w-full">
                            <div className='my-2 md:my-0 lg:my-0'>
                                <SortComp sortData={sortData} />
                            </div>

                            <div>
                                <div className='border-2 border-[#ececec] flex justify-start w-max rounded-md'>
                                    <input 
                                        type="text" 
                                        className='lg:w-80 px-3 py-1'
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                    />
                                    <button 
                                        className='bg-[#40b142] text-white text-sm px-6 py-2 rounded-md'
                                        onClick={() => handleSearchQuery()}
                                    >
                                        { searching ? 'searching...' : 'Search' }
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Title section */}

                    <div className='my-8'>
                        <div className='w-full overflow-x-scroll'>
                            <table className='table border w-full'>
                                <thead>
                                    <tr className='border-spacing-y-4'>
                                        <th className="text-left">code</th>
                                        <th>Book Name</th>
                                        <th>Borrower</th>
                                        <th>Status</th>
                                        <th>Date</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                
                                <tbody className='text-[#7F7F80]'>
                                    {
                                        bookRequests.length > 0 ?
                                        bookRequests.map((item: BookRequest) => {
                                            return <tr key={item.code}>
                                                <td className='text-left border-spacing-y-4'>{item?.code}</td>
                                                <td className="text-left py-3">{item?.bookName} [{ item?.borrowerId?.userType === 'ADMIN' ? 'Staff' : "Student"}]</td>
                                                <td className="text-left py-3">{ item?.borrowerName}</td>
                                                <td className="text-left py-3">
                                                    {
                                                        item?.transactionStatus == 'ACTIVE' || "Active" ? 
                                                        <button className='bg-[#71DD37] text-white text-sm py-1 px-4 rounded-md'>{item.transactionStatus}</button>
                                                        :
                                                        <button className='bg-[#7F7F80] text-white text-sm py-1 px-4 rounded-md'>{item.transactionStatus}</button>
                                                    }
                                                </td>
                                                <td className="text-left py-3">
                                                    {moment(item?.createdAt).format("MM-DD-YYYY")}
                                                </td>
                                                
                                                <td className="text-center py-3">
                                                    <div
                                                    className="relative mx-1 px-1 py-2 group  mb-1 md:mb-0"
                                                    id="button_pm"
                                                    >
                                                    <span className="firstlevel hover:text-red-500 whitespace-no-wrap text-gray-600 hover:text-blue-800">
                                                        <BiEditAlt className="text-blue hover:cursor-pointer inline" />
                                                    </span>
                                                    <ul className="w-max absolute left-0 top-0 mt-10 p-2 rounded-lg shadow-lg bg-[#F6F6F6] z-10 hidden group-hover:block">
                                                        <svg
                                                        className="block fill-current text-[#F6F6F6] w-4 h-4 absolute left-0 top-0 ml-3 -mt-3 z-0"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        viewBox="0 0 24 24"
                                                        >
                                                        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                                                        </svg>
                                                                                                                
                                                        <li className="hover:bg-[#40b142] hover:cursor-pointer pr-10 p-1 whitespace-no-wrap rounded-md hover:text-white text-sm md:text-base ">
                                                        <span 
                                                                className="items-left px-2 py-2"
                                                                onClick={() => {
                                                                    setSelectedBookRequest(item)
                                                                    openModal('view');
                                                                }}
                                                            >
                                                                View Detail
                                                            </span>
                                                        </li>

                                                        <li className="hover:bg-[#40b142] hover:cursor-pointer pr-10 p-1 whitespace-no-wrap rounded-md hover:text-white text-sm md:text-base ">
                                                            <span 
                                                                className="items-left px-2 py-2"
                                                                onClick={() => {
                                                                    setSelectedBookRequest(item)
                                                                    openModal('update');
                                                                }}
                                                            >
                                                                Update Record
                                                            </span>
                                                        </li>

                                                        <li className="hover:bg-[#40b142] hover:cursor-pointer pr-10 p-1 whitespace-no-wrap rounded-md hover:text-white text-sm md:text-base ">
                                                            <span 
                                                                className="items-left px-2 py-2"
                                                                onClick={() => {
                                                                setSelectedBookRequest(item)
                                                                openModal('delete')
                                                                }}
                                                            >
                                                                Delete Record
                                                            </span>
                                                        </li>
                                                    </ul>
                                                    </div>
                                                </td>
                                            </tr>
                                        }) : 
                                            <tr>
                                                <td colSpan={7} className="text-center py-3">No Book Request Record available</td>
                                            </tr>
                                    }
                                    
                                    
                                </tbody>
                            </table>
                        </div>
                    </div>
                </Card>
            </div>

            <AppModalComp title=''>
                {
                    modalMode === 'create' && <BookRequestForm />
                }
                {
                    modalMode === 'view' && <BookRequestDetailComp bookRequest={selectedBookRequest} />
                }
                {
                    modalMode === 'update' && <BookRequestUpdateForm bookRequest={selectedBookRequest}  />
                }
                {
                    modalMode === 'delete' && <DeleteComp id={selectedBookRequest?._id} action={handleDeleteRecord} deleting={deleting} />
                }
            </AppModalComp>

        <ToastContainer />

        </>
    )
}

export default BookRequestsComp;
