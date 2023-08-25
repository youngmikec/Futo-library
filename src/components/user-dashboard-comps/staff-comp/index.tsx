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
import { ApiResponse, Book, User } from '../../../common';
import AppModalComp from '../../../shared/app-modal';
import DeleteComp from '../../../shared/delete-comp/delete-comp';
import { CloseAppModal, OpenAppModal } from '../../../store/modal';
import { DELETE_BOOK, RETREIVE_ALL_USERS, RETREIVE_BOOKS } from '../../../services';
import { INITIALIZE_BOOKS, REMOVE_BOOk } from '../../../store/book';

import StaffForm from './staff-form';
import StaffUpdateForm from './staff-update-form';
import StaffDetailComp from './staff-detail';
import { INITIALIZE_STAFF } from '../../../store/staff';

const StaffComp = () => {
    const dispatch = useDispatch();
    const Staffs: User[] = useSelector((state: RootState) => state.staffsState.value);

    const [deleting, setDeleting] = useState<boolean>(false);
    const [searching, setSearching] = useState<boolean>(false);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [staff, setStaff] = useState<User[]>([]);
    const [selectedStaff, setSelectedStaff] = useState<User | undefined>();
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

    const retrieveStaffRecords = () => {
        const query: string = `?userType=ADMIN&sort=-createdAt&populate=createdBy`;
        RETREIVE_ALL_USERS(query)
        .then((res: AxiosResponse<ApiResponse>) => {
            const { message, payload } = res.data;
            notify("success", message);
            const data = payload.filter((item: User) => item.userType === 'ADMIN')
            setStaff(data);
            dispatch(INITIALIZE_STAFF(data));
        })
        .catch((err: any) => {
            const { message } = err.response.data;
            notify("error", message);
        });
    };

    const sortData = (field: string) => {
        const sortedArray: any[] = sortArray(staff, field);
        if (sortedArray.length > 0) {
          setStaff(sortedArray);
        }
    };

    const handleSearchQuery = () => {
        setSearching(true);
        if(searchQuery !== '') {
            const filteredResults: User[] = staff.filter((item: User) => Object.values(item).includes(searchQuery));
            setStaff(filteredResults);
            setSearching(false);
        }else {
            setStaff(Staffs);
            setSearching(false);
        }
    }

    const openModal = (mode: string = 'create', id: string = '') => {
        setModalMode(mode);
        dispatch(OpenAppModal());
    }

    const handleDeleteRecord = (id: string) => {
        setDeleting(true);
        DELETE_BOOK(id)
        .then((res: AxiosResponse<ApiResponse>) => {
            const { message, payload, success } = res.data;
            if(success){
                setDeleting(false);
                notify("success", message);
                dispatch(REMOVE_BOOk(payload._id));
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
        retrieveStaffRecords();
    }, []);

    useEffect(() => {
        setStaff(Staffs);
    }, [Staffs]);

    return (
        <>
            <div className="w-full">
                <Card type='lg'>
                    {/* Title section */}
                    <div id="title">
                        <div className="flex flex-col sm:justify-between md:justify-between lg:flex-row lg:justify-between w-full">
                            <div className='mb-8'>
                                <h3 className='text-[#40b142] text-xl font-bold mb-1'>Staff Records Table</h3>
                                <p className='text-[#7F7F80] text-sm'>Displaying {staff.length} of {staff.length} Staff Record(s)</p>
                            </div>

                            <div className='mb-8'>
                                <button 
                                    className='bg-[#40b142] text-white py-2 px-4 rounded-md'
                                    onClick={() => openModal('create')}
                                >
                                    Create New Staff
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
                                        <th className="text-left">Employee Id</th>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Phone</th>
                                        <th>BirthDate</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                
                                <tbody className='text-[#7F7F80]'>
                                    {
                                        staff.length > 0 ?
                                        staff.map((item: User, idx: number) => {
                                            return <tr key={idx}>
                                                <td className='text-left border-spacing-y-4'>{item?.employeeId}</td>
                                                <td className="text-left py-3">{item?.fullName}</td>
                                                <td className="text-left py-3">{ item?.email}</td>
                                                <td className="text-left py-3">{ item?.phoneNumber}</td>
                                                
                                                <td className="text-left py-3">
                                                    {moment(item?.dob).format("MM-DD-YYYY")}
                                                </td>
                                                
                                                <td className="text-left py-3">
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
                                                                    setSelectedStaff(item)
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
                                                                    setSelectedStaff(item)
                                                                    openModal('update');
                                                                }}
                                                            >
                                                                Update Staff
                                                            </span>
                                                        </li>

                                                        <li className="hover:bg-[#40b142] hover:cursor-pointer pr-10 p-1 whitespace-no-wrap rounded-md hover:text-white text-sm md:text-base ">
                                                            <span 
                                                                className="items-left px-2 py-2"
                                                                onClick={() => {
                                                                setSelectedStaff(item)
                                                                openModal('delete')
                                                                }}
                                                            >
                                                                Delete Staff
                                                            </span>
                                                        </li>
                                                    </ul>
                                                    </div>
                                                </td>
                                            </tr>
                                        }) : 
                                            <tr>
                                                <td colSpan={7} className="text-left py-3">No Staff available</td>
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
                    modalMode === 'create' && <StaffForm />
                }
                {
                    modalMode === 'view' && <StaffDetailComp staff={selectedStaff} />
                }
                {/* {
                    modalMode === 'update' && <StaffUpdateForm book={selectedStaff}  />
                } */}
                {
                    modalMode === 'delete' && <DeleteComp id={selectedStaff?._id} action={handleDeleteRecord} deleting={deleting} />
                }
            </AppModalComp>

        <ToastContainer />

        </>
    )
}

export default StaffComp;