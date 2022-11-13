import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthProvider/AuthProvider';
import OrderRow from './OrderRow/OrderRow';

const Orders = () => {
    const {user, logOut} = useContext(AuthContext);
    const [orders, setOrders] = useState([]);

    useEffect( () => {
        fetch(`https://genius-car-server-alpha.vercel.app/orders?email=${user?.email}`, {
            headers: {
                authorization: `bearer ${localStorage.getItem('genius-token')}`
            }
        })
        .then(res => {
            if(res.status === 401 || res.status === 403){
                return logOut();
            }
            return res.json()
        })
        .then(data => setOrders(data))
    }, [user?.email, logOut]);


    const handleDelete = id => {
        const proceed = window.confirm('Are you sure? You want to cancle this order.');
        
        if(proceed){
            fetch(`https://genius-car-server-alpha.vercel.app/orders/${id}`, {
                method: 'DELETE',
                headers: {
                    authorization: `bearer ${localStorage.getItem('genius-token')}`
                }
            })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if(data.deletedCount > 0){
                    alert('Order Deleted Successfully.')
                }
                const remainingOrder = orders.filter(odr => odr._id !== id);
                setOrders(remainingOrder);
            })
        }
    }

    return (
        <div className='my-12'>
            <h2 className='text-3xl'>You have: {orders.length} Orders</h2>
            <div className="overflow-x-auto w-full">
            <table className="table w-full">
                <thead>
                <tr>
                    <th>
                    </th>
                    <th>Name</th>
                    <th>Job</th>
                    <th>Favorite Color</th>
                    <th>Message</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                    {
                        orders.map(order => <OrderRow
                            key={order._id}
                            order = {order}
                            handleDelete = {handleDelete}
                        ></OrderRow>)
                    }
                </tbody>
            </table>
            </div>
        </div>
    );
};

export default Orders;