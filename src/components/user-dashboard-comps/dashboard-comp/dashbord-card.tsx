import { url } from 'inspector';
import React from 'react'

type Props = {
    image: string;
}

const DashboardCard = ({image}: Props) => {
    const style = {
        background: `url(${image})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        blendMode: "overlay",
        backgroundColor: '#40b142',
        opacity: 0.95
    }

  return (
    <>
        <div>
            <div className='w-full py-4 px-6 text-white' style={style}>
                <p className='font-medium text-lg text-white mb-10 mt-4'>Accumulated volume of transactions</p> 
                <div className='mb-4'>
                    <h1 className='text-4xl font-semibold'>NGN 10,000</h1>
                </div>

                <div className='flex justify-between'>
                    <div> 
                        <button className='bg-[#CFBADB] rounded-md px-8 py-1'>Pending 43%</button> 
                    </div>
                    <div>
                        <button className='bg-[#CFBADB] rounded-md px-8 py-1'>Completed 57%</button>
                    </div>
                </div>
            </div>           
        </div>
    </>
  )
}

export default DashboardCard