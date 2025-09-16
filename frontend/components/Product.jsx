import React from 'react'

const Product = ({name, description, price, image , stock}) => {
  return (
   <div className='flex flex-col'>
    <img src={image} alt={name} className='mb-1 ' />
    <h2 className='prod_name mb-1 text-text-primary text-center'>{name}</h2>
    <p className='prod_desc text-text-secondary'>{description}</p>
   </div>
  )
}

export default Product
// work on css
