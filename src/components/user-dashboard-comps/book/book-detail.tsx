import React from 'react';
import moment from 'moment';

import { Book } from '../../../common';
import { getFullName } from '../../../utils';


type Props = {
    book?: Book
}
const BookDetailComp = ({ book }: Props) => {
    const defaultImage: string = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNsNiYYMGaSw8QAyBMKifpOnueuPOu_bHDYQ&usqp=CAU';
    return (
        <>
            <div className='w-full py-4 text-[#7F7F80]'>
                <div className='text-center my-3'>
                    <h2 className='font-bold text-2xl'>Book Detail Modal</h2>
                </div>

                <div className='grid 
                    grid-cols-1 
                    sm:grid-cols-1 
                    md:grid-cols-2 md:space-x-2
                    lg:grid-cols-2 lg:space-x-2'
                >
                    <div >
                        <img src={book?.bookImg || defaultImage } width="100%" alt="crypto" />
                    </div>

                    <div className='px-4'>
                        <p className='my-2'><strong>Name:</strong>  {book?.bookName}</p>
                        <p className='my-3'><strong>Short Name:</strong>  {book?.alternateTitle}</p>
                        <p className='my-3'><strong>Author:</strong>  {book?.author}</p>
                        <p className='my-3'><strong>Publisher</strong>  {book?.publisher}</p>
                        <p className='my-3'><strong>Language:</strong>  {book?.language}</p>
                        <p className='my-3'><strong>Book Status:</strong>  {book?.bookStatus}</p>
                        <p className='my-3'><strong>Created At:</strong>  {moment(book?.createdAt).format("MM-DD-YYYY")}</p>
                        <p className='my-3'><strong>Created By:</strong>  {getFullName(book?.createdBy)}</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default BookDetailComp;