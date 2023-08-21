import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from 'react-redux';
import { AxiosInstance, AxiosResponse } from 'axios';

import './style.css';
import { ApiResponse, Book, User } from '../../../common';
import { CREATE_BOOKREQUEST, RETREIVE_ALL_USERS, RETREIVE_BOOKS } from '../../../services';
import { ADD_TO_BOOK_REQUESTS } from '../../../store/book-request';


const BookRequestForm = () => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState<boolean>(false);

    const [books, setBooks] = useState<Book[]>([]);
    const [users, setUsers] = useState<User[]>([]);
    const [selectedBook, setSelectedBook] = useState<Book | null>(null);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [bookId, setBookId] = useState<{value: string, error: boolean }>({value: '', error: false});
    const [borrowerId, setBorrowerId] = useState<{value: string, error: boolean }>({value: '', error: false});
    const [borrowerName, setBorrowerName] = useState<{value: string, error: boolean }>({value: "", error: false});
    const [bookName, setBookName] = useState<{value: string, error: boolean }>({value: '', error: false});
    const [transactionType, setTransactionType] = useState<{value: string, error: boolean }>({value: '', error: false});
    const [fromDate, setFromDate] = useState<{value: string, error: boolean }>({value: '', error: false});
    const [toDate, setToDate] = useState<{value: string, error: boolean }>({value: '', error: false});

    
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

    const handleSelectBook = (id: string) => {
        const book = books.find(item => item._id === id);
        if(book) {
            setSelectedBook(book);
            setBookName({...bookName, value: book.bookName});
        }
    }
    const handleSelectUser = (id: string) => {
        const user = users.find(item => item._id === id);
        if(user) {
            setSelectedUser(user);
            setBorrowerName({...borrowerName, value: user.fullName});
        }
    }

    const inputCheck = (): boolean => {
        let isValid: boolean = true;
        if (bookId.value === "" || undefined || null) {
          isValid = false;
          setBookId({ ...bookId, error: true });
        } else {
          setBookId({ ...bookId, error: false });
        }
        
        if (borrowerId.value === "" || undefined || null) {
          isValid = false;
          setBorrowerId({ ...borrowerId, error: true });
        } else {
          setBorrowerId({ ...borrowerId, error: false });
        }

        // if (borrowerName.value === "" || undefined || null) {
        //   isValid = false;
        //   setBorrowerName({ ...borrowerName, error: true });
        // } else {
        //   setBorrowerName({ ...borrowerName, error: false });
        // }
        // if (bookName.value === "" || undefined || null) {
        //   isValid = false;
        //   setBookName({ ...bookName, error: true });
        // } else {
        //   setBookName({ ...bookName, error: false });
        // }
        if (transactionType.value === "" || undefined || null) {
          isValid = false;
          setTransactionType({ ...transactionType, error: true });
        } else {
          setTransactionType({ ...transactionType, error: false });
        }

        if (fromDate.value === "" || undefined || null) {
          isValid = false;
          setFromDate({ ...fromDate, error: true });
        } else {
          setFromDate({ ...fromDate, error: false });
        }

        if (toDate.value === "" || undefined || null) {
          isValid = false;
          setToDate({ ...toDate, error: true });
        } else {
          setToDate({ ...toDate, error: false });
        }

        return isValid;
    };

    const clearFormStates = () => {
        setBookId({value: '', error: false});
        setBorrowerId({value: '', error: false});
        setBorrowerName({value: '', error: false});
        setBookName({value: '', error: false});
        setTransactionType({value: '', error: false});
        setFromDate({value: '', error: false});
        setToDate({value: '', error: false});
    }

    const handleSubmit = () => {
        if (inputCheck()) {
            setLoading(true);
            let data = { 
                bookId: bookId.value,
                borrowerId: borrowerId.value,
                borrowerName: borrowerName.value,
                bookName: bookName.value,
                transactionType: transactionType.value,
                fromDate: fromDate.value,
                toDate: toDate.value,
            };
            
          CREATE_BOOKREQUEST(data)
            .then((res: AxiosResponse<ApiResponse>) => {
                const { message, payload } = res.data;
                setLoading(false);
                notify("success", message);
                dispatch(ADD_TO_BOOK_REQUESTS(payload));
                clearFormStates();
            })
            .catch((err: any) => {
                const { message } = err.response.data;
                notify("error", message);
                setLoading(false);
            });
        }else {
            notify("error", `Fill in all required fields`);
        }  
    };

    const retrieveAllBooks = () => {
        setLoading(true);
        RETREIVE_BOOKS().then((res: AxiosResponse<ApiResponse>) => {
            const { payload } = res.data;
            setLoading(false);
            setBooks(payload);
        })
        .catch((err: any) => {
            const { message } = err.response.data;
            setLoading(false);
        })
    }

    const retrieveAllUsers = () => {
        setLoading(true);
        RETREIVE_ALL_USERS().then((res: AxiosResponse<ApiResponse>) => {
            const { payload } = res.data;
            setLoading(false);
            setUsers(payload);
        })
        .catch((err: any) => {
            const { message } = err.response.data;
            setLoading(false);
        })
    }

    useEffect(() => {
        retrieveAllBooks();
        retrieveAllUsers();
    }, [])


    return (
        <>
            <div id='form'>

                <div className="my-3">
                    <label htmlFor="bookId" className="text-[#BFBFBF] text-sm block">
                        Available Books*
                    </label>
                    <select 
                        name="bookId" 
                        id="bookId"
                        onChange={(e) => {
                            setBookId({ ...bookId, value: e.target.value });
                            handleSelectBook(e.target.value);
                        }}
                        className={`bg-white text-[#6A6A6A] border-2 ${
                            bookId.error ? 'error-border' : 'input-border'
                        } rounded-md px-4 py-2 w-full`}
                    >
                        <option value="">Select Book</option>
                        {
                            books && books.map((item: Book, idx: number) => {
                                return <option key={idx} value={item._id}>{ item?.bookName }</option>
                            })
                        }
                        
                    </select>
                </div>

                <div className="my-3">
                    <label htmlFor="borrowerId" className="text-[#BFBFBF] text-sm block">
                        Borrower*
                    </label>
                    <select 
                        name="borrowerId" 
                        id="borrowerId"
                        onChange={(e) => {
                            setBorrowerId({ ...borrowerId, value: e.target.value });
                            handleSelectUser(e.target.value)
                        }}
                        className={`bg-white text-[#6A6A6A] border-2 ${
                            borrowerId.error ? 'error-border' : 'input-border'
                        } rounded-md px-4 py-2 w-full`}
                    >
                        <option value="">Select User</option>
                        {
                            users && users.map((item: User, idx: number) => {
                                return <option key={idx} value={item._id}>{ item?.fullName } [{ item.userType === 'ADMIN' ? item?.employeeId : item?.regNumber }]</option>
                            })
                        }
                        
                    </select>
                </div>

                <div className="my-3">
                    <label htmlFor="transactionType" className="text-[#BFBFBF] text-sm block">
                        Book Request Type*
                    </label>
                    <select 
                        name="transactionType" 
                        id="transactionType"
                        onChange={(e) => setTransactionType({ ...transactionType, value: e.target.value })}
                        className={`bg-white text-[#6A6A6A] border-2 ${
                            transactionType.error ? 'error-border' : 'input-border'
                        } rounded-md px-4 py-2 w-full`}
                    >
                        <option value="">Select Book Request Type</option>
                        <option value="RESERVE">RESERVE</option>
                        <option value="ISSUE">ISSUE</option>
                    </select>
                </div>

                <div className="my-3">
                    <label htmlFor="fromDate" className="text-[#BFBFBF] text-sm block">
                        Request Date*
                    </label>
                    <input
                        type="date"
                        name="fromDate"
                        value={fromDate.value}
                        onChange={(e) =>
                            setFromDate({ ...fromDate, value: e.target.value })
                        }
                        className={`bg-white text-[#6A6A6A] border-2 ${
                            fromDate.error ? 'error-border' : 'input-border'
                        } rounded-md px-4 py-2 w-full`}
                    />
                </div>

                <div className="my-3">
                    <label htmlFor="toDate" className="text-[#BFBFBF] text-sm block">
                        Expected Return Date*
                    </label>
                    <input
                        type="date"
                        name="toDate"
                        value={toDate.value}
                        onChange={(e) =>
                            setToDate({ ...toDate, value: e.target.value })
                        }
                        className={`bg-white text-[#6A6A6A] border-2 ${
                            toDate.error ? 'error-border' : 'input-border'
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

            <ToastContainer />
        </>
    )
}

export default BookRequestForm;