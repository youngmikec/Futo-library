import React from 'react';

import UserLayout from '../../../shared/layouts/user-layout';
import BookRequestsComp from '../../../components/user-dashboard-comps/book-request';
// style link end 

const BookRequestPage = () => {

    return (

        <UserLayout>
            <BookRequestsComp />
        </UserLayout>
    )
}

export default BookRequestPage;


