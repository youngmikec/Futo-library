import React from 'react';
import moment from 'moment';

import { User } from '../../../common';
import { getFullName } from '../../../utils';
import defaultImage from '../../../assets/images/arash.png';


type Props = {
    staff?: User
}
const StaffDetailComp = ({ staff }: Props) => {
    return (
        <>
            <div className='w-full py-4 text-[#7F7F80]'>
                <div className='text-center my-3'>
                    <h2 className='font-bold text-2xl'>Staff Detail Modal</h2>
                </div>

                <div className='grid 
                    grid-cols-1 
                    sm:grid-cols-1 
                    md:grid-cols-2 md:space-x-2
                    lg:grid-cols-2 lg:space-x-2'
                >
                    <div >
                        <img src={staff?.photo || defaultImage } width="100%" alt="crypto" />
                    </div>

                    <div className='px-4'>
                        <p className='my-2'><strong>Name:</strong>  {staff?.fullName}</p>
                        <p className='my-3'><strong>Employee Id:</strong>  {staff?.employeeId}</p>
                        <p className='my-3'><strong>Email:</strong>  {staff?.email}</p>
                        <p className='my-3'><strong>Phone Number</strong>  { staff?.phoneNumber }</p>
                        <p className='my-3'><strong>Address:</strong>  {staff?.address}</p>
                        <p className='my-3'><strong>Birth Date:</strong>  {moment(staff?.dob).format("MM-DD-YYYY")}</p>
                        <p className='my-3'><strong>Role:</strong>  {staff?.userType}</p>
                        <p className='my-3'><strong>Created At:</strong>  {moment(staff?.createdAt).format("MM-DD-YYYY")}</p>
                        <p className='my-3'><strong>Created By:</strong>  {getFullName(staff?.createdBy)}</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default StaffDetailComp;