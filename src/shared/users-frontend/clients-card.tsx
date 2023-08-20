import React from 'react';

type Props = {
    value: string;
    title: string;
}

const ClientsCard = ({ value, title }: Props) => {
    return (
        <>
            <div className="hover:shadow-lg px-2 py-4 text-center">
                <h3 className='my-5 text-[#40b142] text-3xl font-bold'>{ value }</h3>
                <p className='text-[#12121271]'>{ title }</p>
            </div>
        </>
    )
}

export default ClientsCard;