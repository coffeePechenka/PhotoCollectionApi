import React from 'react'
import './Collection.css'

export default function Collection({ name, images}) {
  return (
    <div className='collection'>
        <img className='collection_big' src={images[0]} alt="" />
        <div className="collection_bottom">
          <img src={images[1]} alt="" className="collection_mini" />
          <img src={images[2]} alt="" className="collection_mini" />
          <img src={images[3]} alt="" className="collection_mini" />
        </div>
        <h4>{name}</h4>
    </div>
  )
}
