import React from 'react';
import moment from 'moment';

import { BookRequest } from '../../../common';
import { getFullName } from '../../../utils';


type Props = {
    bookRequest?: BookRequest
}
const BookRequestDetailComp = ({ bookRequest }: Props) => {
    const defaultImage: string = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNsNiYYMGaSw8QAyBMKifpOnueuPOu_bHDYQ&usqp=CAU';
    return (
        <>
            <div className='w-full py-4 text-[#7F7F80]'>
                <div className='text-center my-3'>
                    <h2 className='font-bold text-2xl'>Book Request Detail Modal</h2>
                </div>

                <div className='grid 
                    grid-cols-1 
                    sm:grid-cols-1 
                    md:grid-cols-2 md:space-x-2
                    lg:grid-cols-2 lg:space-x-2'
                >
                    <div >
                        <img src={bookRequest?.bookId?.bookImg || defaultImage } width="100%" alt="crypto" />
                    </div>

                    <div className='px-4'>
                        <p className='my-2'><strong>Book Requested:</strong>  {bookRequest?.bookName}</p>
                        <p className='my-3'><strong>Borrower:</strong>  {bookRequest?.borrowerName}</p>
                        <p className='my-3'><strong>Author:</strong>  {bookRequest?.bookId?.author}</p>
                        <p className='my-3'><strong>Date Issued</strong>  {moment(bookRequest?.fromDate).format("MM-DD-YYYY")}</p>
                        <p className='my-3'><strong>Expected Return Date</strong>  {moment(bookRequest?.toDate).format("MM-DD-YYYY")}</p>
                        <p className='my-3'><strong>Actual Return Date</strong>  {moment(bookRequest?.returnDate).format("MM-DD-YYYY")}</p>
                        <p className='my-3'><strong>Language:</strong>  {bookRequest?.bookId?.language}</p>
                        <p className='my-3'><strong>Request Type:</strong>  {bookRequest?.transactionType}</p>
                        <p className='my-3'><strong>Request Status:</strong>  {bookRequest?.transactionStatus}</p>
                        <p className='my-3'><strong>Book Status:</strong>  {bookRequest?.bookId?.bookStatus}</p>
                        <p className='my-3'><strong>Created At:</strong>  {moment(bookRequest?.createdAt).format("MM-DD-YYYY")}</p>
                        <p className='my-3'><strong>Created By:</strong>  {getFullName(bookRequest?.createdBy)}</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default BookRequestDetailComp;