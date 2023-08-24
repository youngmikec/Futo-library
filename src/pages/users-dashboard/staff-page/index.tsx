import React from 'react';
import UserLayout from '../../../shared/layouts/user-layout';
import BooksComp from '../../../components/user-dashboard-comps/book';
import StaffComp from '../../../components/user-dashboard-comps/staff-comp';
// style link end 

const StaffPage = () => {

    return (

        <UserLayout>
            <StaffComp />
        </UserLayout>
    )
}

export default StaffPage;