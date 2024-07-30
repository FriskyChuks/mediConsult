import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom';
import {MDBContainer,MDBRow,MDBCol,MDBCard,MDBCardBody,MDBCardImage,MDBIcon,
    MDBBtn,MDBRipple,} from "mdb-react-ui-kit";

const ItemDetail = ({ baseURL }) => {
    const navigate = useNavigate()
    const [item, setItem] = useState([])
    let {id} = useParams()
    
    const getItem = async()=>{
        const {data} = await axios.get(`${baseURL}/items/item_detail/${id}/`)
        setItem(data)
    }

    useEffect(()=>{
        getItem()
    },[baseURL])

  return (
    <> <br /> <br />
        <div className="container ps-md-0">
            <div className="row g-0 justify-content-center align-items-center min-vh-100">
                <div className="d-none d-md-flex col-md-4 col-lg-6 item-image">
                    <img src="/src/assets/img/item_default.png" alt="" />
                </div>
                <div className="col-md-8 col-lg-6">
                <div className="login d-flex align-items-center py-5">
                    <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-9 col-lg-8 mx-auto">
                        <h2 className="item-heading mb-4">{item.title}</h2>
                        <b>Availability: In Stock</b>
                        <p><b>Brand:</b> apex</p>
                        <b>{item.category}</b>
                        <p>Sofa</p>
                        <h1>N{new Intl.NumberFormat().format(item.price)}</h1>
                        <p>
                            {item.description}
                        </p>
                        <p>Quantity</p>
                        <button className="add_to_cart btn btn-primary">Add to Cart</button>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default ItemDetail