import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AxiosResponse } from 'axios';
import moment from "moment";

// image
import image from '../../../assets/images/account-balance-bg.png';
import airtime from '../../../assets/images/aitime_to_cash.png';
import crypto from '../../../assets/images/buy_crypto.png';
import trade from '../../../assets/images/trade-giftcard.png';
import sell from '../../../assets/images/sell_crypto.png'


// style
import "./style.css";
import ServiceCard from '../../service-card';
import DashboardCard from './dashbord-card';
import { ApiResponse, User } from '../../../common';
import { RETREIVE_BOOKREQUESTS } from '../../../services';
import { getItem } from '../../../utils';
import Card from '../../../shared/card';
import { BookRequest } from '../../../common/book-request';

const DashboardComp = () => {
    // const ordersState = useSelector((state: RootState) => state.orderState.value);
    
    const [loading, setLoading] = useState<boolean>(false);
    const [orderRecords, setOrderRecords] = useState<BookRequest[] | []>([]);

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

    const retreiveOrders = () => {
        setLoading(true);
        const userDetail: User = getItem('clientD');
        const queryString: string = `?createdBy=${userDetail._id}&sort=-createdAt&limit=10&populate=bookId,borrowerId`;        
        RETREIVE_BOOKREQUESTS(queryString).then((res: AxiosResponse<ApiResponse>) => {
            setLoading(false);
            const { success, message, payload } = res.data;
            if(success){
                notify('success', `${message} ${payload.length} records found!`);
                setOrderRecords(payload);
            }
        }).catch((err: any) => {
            setLoading(false);
            const { message } = err.response.data;
            notify('error', message);
        })
    }

    useEffect(() => {
        retreiveOrders();
    }, [])


    return (
        <>
            <div>    
                {/* FIRST SECTION STARTS HERE */}
                {/* <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3'>
                    <div>
                        <DashboardCard image={image} />
                    </div>

                    <div className='shadow-sm bg-white lg:h-52'></div>

                    <div className=''>
                        <img src={image} alt=""  className=' bg-[#FFAB2E] lg:h-52' id='bg'/>
                    </div>
                </div> */}

                {/* service card */}
                <section>

                    <div>
                        <h3 className='text-[#7F7F80] font-semibold my-12'>What we offer</h3>

                        <div className='grid grid-cols-1 space-y-2
                            sm:grid-cols-2  sm:space-x-2 sm:space-y-3
                            md:grid-cols-2  md:space-x-2 md:space-y-3
                            lg:grid-cols-2  lg:space-x-2 lg:space-y-0
                            ' 
                        >
                            <div>
                                <ServiceCard
                                    title="Books Shelve"
                                    subTitle='Book acquistion just got easy.'
                                    link='/books'
                                    linkText='View Books'
                                    img={airtime}
                                />
                            </div>

                            <div>
                                <ServiceCard
                                    title="Book Requests"
                                    subTitle='Metrics of incoming and outgoing books'
                                    link='/book-requests'
                                    linkText='Request for Book'
                                    img={sell}
                                />

                            </div>


                            {/* <div>
                                <ServiceCard
                                    title="Trade Giftcard"
                                    subTitle='Redeem your giftcard with us'
                                    link='/trade-giftcard'
                                    linkText='Convert'
                                    img={trade}
                                />
                                
                            </div>  

                            <div>
                                <ServiceCard
                                    title="Buy Crypto"
                                    subTitle='Buy your crypto currency'
                                    link='/buy-crypto'
                                    linkText='Buy'
                                    img={crypto}
                                />
                            </div>    */}
                                                      


                        </div>

                        <section>
                            <div className='my-8'>
                                <h4 className='text-[#7F7F80] font-semibold'>Recent Book Requests</h4>
                            </div>

                            <div>
                                <Card type='sm'>
                                    <div className='overflow-x-scroll p-4'>
                                        <table className='table table-auto w-full mx-auto border-spacing-y-4'>
                                            <thead className=''>
                                                <tr className='border-spacing-y-4'>
                                                    <th className='table-caption text-left'>#</th>
                                                    <th>Book</th>
                                                    <th>Type</th>
                                                    <th>Status</th>
                                                    <th>Date</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {   orderRecords && orderRecords.length > 0 ?
                                                    orderRecords.map((item: BookRequest, idx: number) => {
                                                        return <tr key={idx} className='my-4'>
                                                        <td className="text-left border-spacing-y-4">{ idx + 1 }</td>
                                                        <td className="text-left py-3">{ item?.bookName } </td>
                                                        <td className="text-left py-3">{ item?.transactionType }</td>
                                                        <td className="text-left py-3">
                                                            <span className={
                                                                (item.transactionStatus === "AVAILABLE") ? 'text-[#2CE71C]' : 'text-[#1cd9e7]'
                                                                
                                                            }>{ item?.transactionStatus }</span>
                                                        </td>

                                                        <td className="text-left py-3">{ moment(item?.createdAt).format("DD-MM-YYYY") }</td>
                                                    </tr>
                                                    }) :

                                                    <tr>
                                                        <td colSpan={5} className="text-left py-3">No Book Request available</td>
                                                    </tr>
                                                }
                                            </tbody>

                                        </table>
                                    </div>
                                </Card>
                            </div>
                        </section>

                    </div>
                </section>
                {/* service card */}
            </div>

            <ToastContainer />
        </>
    )
}

export default DashboardComp