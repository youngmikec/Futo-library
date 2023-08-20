import React from 'react';
import UserLayout from '../../../shared/layouts/user-layout';
import BooksComp from '../../../components/user-dashboard-comps/book';
// style link end 

const BooksPage = () => {

    return (

        <UserLayout>
            <BooksComp />
        </UserLayout>
    )
}

export default BooksPage;