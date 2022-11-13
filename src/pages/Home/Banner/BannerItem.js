import React from 'react';
import './BannerItem.css'

const BannerItem = ({slide}) => {
    const {image, id, prev, next} = slide;
    return (
        <div id={`slide${id}`} className="carousel-item relative w-full">
            <div className='carousel-img'>
              <img src={image} alt="img" className="w-full rounded-xl" />
            </div>
            
            <div className="absolute flex justify-end transform -translate-y-1/2 left-24 top-1/3">
              <h1 className='text-6xl text-white font-bold'>
                Affordable <br /> 
                Price For Car <br /> 
                Servicing</h1>
            </div>
            <div className="absolute flex justify-end w-2/5 transform -translate-y-1/2 left-24 top-1/2">
              <h1 className='text-xl text-white'>There are many variations of passages of  available, but the majority have suffered alteration in some form</h1>
            </div>
            <div className="absolute flex justify-start w-2/5 transform -translate-y-1/2 left-24 top-3/4">
                <button className="btn btn-warning mr-5">Warning</button>
                <button className="btn btn-outline btn-warning">Warning</button>
            </div>
            <div className="absolute flex justify-end transform -translate-y-1/2 left-5 right-5 bottom-0">
              <a href={`#slide${prev}`} className="btn btn-circle hover:btn-warning mr-6">❮</a> 
              <a href={`#slide${next}`} className="btn btn-circle hover:btn-warning">❯</a>
            </div>
          </div>
    );
};

export default BannerItem;