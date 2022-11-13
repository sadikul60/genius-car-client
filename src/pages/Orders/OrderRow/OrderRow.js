import React, { useEffect, useState } from 'react';

const OrderRow = ({order, handleDelete}) => {
    const {_id, serviceName, price, service, phone, customer} = order;
    const [orderService, setOrderService] = useState({});

    useEffect ( () => {
        fetch(`https://genius-car-server-alpha.vercel.app/services/${service}`)
        .then(res => res.json())
        .then(data => {
            setOrderService(data);
        })
    }, [service]);

    

    return (
            <tr>
                <th>
                    <label>
                        <button onClick={() => handleDelete(_id)} className='btn btn-ghost text-2xl text-red-600'>X</button>
                    </label>
                    </th>
                    <td>
                    <div className="flex items-center space-x-3">
                        <div className="avatar">
                        <div className="mask mask-squircle w-24 h-24">
                            {
                                orderService?.img &&
                                <img src={orderService?.img} alt="Avatar Tailwind CSS Component" />
                            }
                        </div>
                        </div>
                        <div>
                        <div className="font-bold">{customer}</div>
                        <div className="text-sm opacity-50">{phone}</div>
                        </div>
                    </div>
                    </td>
                    <td>
                        {serviceName}
                    <br/>
                    <span className="badge badge-ghost badge-sm">{price}</span>
                    </td>
                    <td>Purple</td>
                    <th>
                    <button className="btn btn-ghost btn-xs">details</button>
                </th>
            </tr>
    );
};

export default OrderRow;