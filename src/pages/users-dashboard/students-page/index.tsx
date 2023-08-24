import React from 'react';
import UserLayout from '../../../shared/layouts/user-layout';
import StudentComp from '../../../components/user-dashboard-comps/student-comp';
// style link end 

const StudentsPage = () => {

    return (

        <UserLayout>
            <StudentComp />
        </UserLayout>
    )
}

export default StudentsPage;