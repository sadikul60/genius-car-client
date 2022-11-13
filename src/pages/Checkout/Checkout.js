import React, { useContext } from 'react';
import { useLoaderData } from 'react-router-dom';
import { AuthContext } from '../../context/AuthProvider/AuthProvider';

const Checkout = () => {
    const {_id, title, price} = useLoaderData();
    const {user} = useContext(AuthContext);

    const handlePlaceOrder = event => {
        event.preventDefault();
        const form = event.target;
        const name = `${form.firstName.value} ${form.lastName.value}`;
        const phone = form.phone.value;
        const email = user?.email || 'unregistered';
        const message = form.message.value;

        const order = {
            service: _id,
            serviceName: title,
            price,
            customer: name,
            email,
            phone,
            message
        }

        fetch('https://genius-car-server-alpha.vercel.app/orders', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(order)
        })
        .then(res => res.json())
        .then(data => {
            if(data.acknowledged){
                alert('Order placed successfully.')
                form.reset();
            }
            console.log(data)
        })
        .catch(er => console.log(er))

    }

    return (
        <div className='my-8 p-8 border-2 rounded-2xl'>
            <form onSubmit={handlePlaceOrder}>
                <h2 className='text-4xl font-bold my-3'>You are about to order: {title}</h2>
                <h4 className='text-2xl text-orange-500 font fold my-3'>Price: ${price}</h4>
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-5'>
                    <input name='firstName' type="text" placeholder="First name" className="input input-bordered w-full" required/>
                    <input name='lastName' type="text" placeholder="Last name" className="input input-bordered w-full" required/>
                    <input name='phone' type="text" placeholder="Your phone" className="input input-bordered w-full" required/>
                    <input name='email' type="text" placeholder="Your email" defaultValue={user?.email} readOnly className="input input-bordered w-full" required/>
                </div>
                <textarea name='message' className="textarea textarea-bordered h-24 w-full my-5" placeholder="Your message"></textarea>
                <input className='btn btn-warning hover:bg-orange-500 border-none font-bold text-xl text-center w-1/2 mx-auto m-3' type="submit" value="Place your order" />
            </form>
        </div>
    );
};

export default Checkout;