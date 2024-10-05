import React from 'react'
import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert'

import api from '../../AxiosInstance';

import { useMessage } from "../contexts/MessageContext";

const OrderDetails = ({ baseURL }) => {
    const { showMessage } = useMessage();
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([])
    const navigate = useNavigate()
    const accessToken = localStorage.getItem('access_token')
    const {id} = useParams()
    const userGroup = localStorage.getItem('user_group')

    const fetchOrderDetails = async()=>{
    const res = await api.get(`${baseURL}/orders/order_details/${id}/`,{
        headers:{"Authorization":`FRISKY ${accessToken}`}
    })
    setData(res.data)
    setLoading(false)
  }

   // Handler to update the local state when user modifies a field
   const handleChange = (index, field, value) => {
    const updatedData = [...data];
    updatedData[index][field] = value;  // Update the specific field
    setData(updatedData);
  };

   // Handler to save changes back to the database
   const handleSave = () => {
    api.put('/api/update', { data })  // Send updated data to your backend API
      .then(response => {
        console.log('Data updated successfully!');
      })
      .catch(error => console.error('Error updating data:', error));
  };

  const OrderDetailAvailability = async (itemId)=>{
    const available = data.filter(item=>(item.id===itemId))[0].available
    const updateDate = {available: !available}
    await api.patch(`${baseURL}/orders/update_delete_order_detail/${itemId}/`, updateDate,{
      headers:{"Authorization":`FRISKY ${accessToken}`}
    }).then(()=>{
      fetchOrderDetails()
      showMessage('Item Updated', 'success')
    })
  }

  const DeleteOrderDetail = async (orderDetailId) => {
    {data.length > 1 ?
      await api.delete(`${baseURL}/orders/update_delete_order_detail/${orderDetailId}/`,{
        headers:{"Authorization":`FRISKY ${accessToken}`}
      })
      .then(()=>{
        fetchOrderDetails()
        showMessage('An Item has been deleted from your order', 'success')
      }) :
      handleDeleteOrder()
    }
    
  }

  const handleDeleteOrder = () => {
    api.delete(`${baseURL}/orders/update_delete_order/${id}/`,{
      headers:{"Authorization":`FRISKY ${accessToken}`}
    }).then(()=>{
      fetchOrderDetails()
      showMessage('Order deleted', 'info')
      navigate('/orders')
    })
  }

  const deletOder = async () => {
    confirmAlert({
      title: 'Confirm to delete',
      message: 'Are you sure you want to delete this item?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => handleDeleteOrder()
        },
        {
          label: 'No',
          onClick: () => {} // Do nothing
        }
      ]
    });
  }

  useEffect(()=>{
    fetchOrderDetails()
  },[id,accessToken])

  if (loading) {
    return <p>Loading...</p>;
}

  return (
    <> <br />
        <div className="container padding-bottom-3x mb-1">
              <h5>{data.length > 0 ? data[0].customer : ""}</h5>
              <h6>{data.length > 0 ? data[0].order_date.split("T")[0] : ""}</h6>
        {/* <!-- Alert--> */}
        {/* <div className="alert alert-info alert-dismissible fade show text-center" style="margin-bottom: 30px;"><span className="alert-close" data-dismiss="alert"></span><img className="d-inline align-center" src="data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTkuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iTGF5ZXJfMSIgeD0iMHB4IiB5PSIwcHgiIHZpZXdCb3g9IjAgMCA1MTIuMDAzIDUxMi4wMDMiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDUxMi4wMDMgNTEyLjAwMzsiIHhtbDpzcGFjZT0icHJlc2VydmUiIHdpZHRoPSIxNnB4IiBoZWlnaHQ9IjE2cHgiPgo8Zz4KCTxnPgoJCTxnPgoJCQk8cGF0aCBkPSJNMjU2LjAwMSw2NGMtNzAuNTkyLDAtMTI4LDU3LjQwOC0xMjgsMTI4czU3LjQwOCwxMjgsMTI4LDEyOHMxMjgtNTcuNDA4LDEyOC0xMjhTMzI2LjU5Myw2NCwyNTYuMDAxLDY0eiAgICAgIE0yNTYuMDAxLDI5OC42NjdjLTU4LjgxNiwwLTEwNi42NjctNDcuODUxLTEwNi42NjctMTA2LjY2N1MxOTcuMTg1LDg1LjMzMywyNTYuMDAxLDg1LjMzM1MzNjIuNjY4LDEzMy4xODQsMzYyLjY2OCwxOTIgICAgIFMzMTQuODE3LDI5OC42NjcsMjU2LjAwMSwyOTguNjY3eiIgZmlsbD0iIzUwYzZlOSIvPgoJCQk8cGF0aCBkPSJNMzg1LjY0NCwzMzMuMjA1YzM4LjIyOS0zNS4xMzYsNjIuMzU3LTg1LjMzMyw2Mi4zNTctMTQxLjIwNWMwLTEwNS44NTYtODYuMTIzLTE5Mi0xOTItMTkycy0xOTIsODYuMTQ0LTE5MiwxOTIgICAgIGMwLDU1Ljg1MSwyNC4xMjgsMTA2LjA2OSw2Mi4zMzYsMTQxLjE4NEw2NC42ODQsNDk3LjZjLTEuNTM2LDQuMTE3LTAuNDA1LDguNzI1LDIuODM3LDExLjY2OSAgICAgYzIuMDI3LDEuNzkyLDQuNTY1LDIuNzMxLDcuMTQ3LDIuNzMxYzEuNjIxLDAsMy4yNDMtMC4zNjMsNC43NzktMS4xMDlsNzkuNzg3LTM5Ljg5M2w1OC44NTksMzkuMjMyICAgICBjMi42ODgsMS43OTIsNi4xMDEsMi4yNCw5LjE5NSwxLjI4YzMuMDkzLTEuMDAzLDUuNTY4LTMuMzQ5LDYuNjk5LTYuNGwyMy4yOTYtNjIuMTQ0bDIwLjU4Nyw2MS43MzkgICAgIGMxLjA2NywzLjE1NywzLjU0MSw1LjYzMiw2LjY3Nyw2LjcyYzMuMTM2LDEuMDY3LDYuNTkyLDAuNjQsOS4zNjUtMS4yMTZsNTguODU5LTM5LjIzMmw3OS43ODcsMzkuODkzICAgICBjMS41MzYsMC43NjgsMy4xNTcsMS4xMzEsNC43NzksMS4xMzFjMi41ODEsMCw1LjEyLTAuOTM5LDcuMTI1LTIuNzUyYzMuMjY0LTIuOTIzLDQuMzczLTcuNTUyLDIuODM3LTExLjY2OUwzODUuNjQ0LDMzMy4yMDV6ICAgICAgTTI0Ni4wMTcsNDEyLjI2N2wtMjcuMjg1LDcyLjc0N2wtNTIuODIxLTM1LjJjLTMuMi0yLjExMi03LjMxNy0yLjM4OS0xMC42ODgtMC42NjFMOTQuMTg4LDQ3OS42OGw0OS41NzktMTMyLjIyNCAgICAgYzI2Ljg1OSwxOS40MzUsNTguNzk1LDMyLjIxMyw5My41NDcsMzUuNjA1TDI0Ni43LDQxMS4yQzI0Ni40ODcsNDExLjU2MywyNDYuMTY3LDQxMS44NCwyNDYuMDE3LDQxMi4yNjd6IE0yNTYuMDAxLDM2Mi42NjcgICAgIEMxNjEuOSwzNjIuNjY3LDg1LjMzNSwyODYuMTAxLDg1LjMzNSwxOTJTMTYxLjksMjEuMzMzLDI1Ni4wMDEsMjEuMzMzUzQyNi42NjgsOTcuODk5LDQyNi42NjgsMTkyICAgICBTMzUwLjEwMywzNjIuNjY3LDI1Ni4wMDEsMzYyLjY2N3ogTTM1Ni43NTksNDQ5LjEzMWMtMy40MTMtMS43MjgtNy41MDktMS40NzItMTAuNjg4LDAuNjYxbC01Mi4zNzMsMzQuOTIzbC0zMy42NDMtMTAwLjkyOCAgICAgYzQwLjM0MS0wLjg1Myw3Ny41ODktMTQuMTg3LDEwOC4xNi0zNi4zMzFsNDkuNTc5LDEzMi4yMDNMMzU2Ljc1OSw0NDkuMTMxeiIgZmlsbD0iIzUwYzZlOSIvPgoJCTwvZz4KCTwvZz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8L3N2Zz4K" width="18" height="18" alt="Medal icon" />&nbsp;&nbsp;With this purchase you will earn <strong>290</strong> Reward Points.</div> */}

        <div className="table-responsive shopping-cart">
            <table className="table">
                <thead>
                    <tr>
                        <th>Product Name &nbsp; &nbsp; <span style={{fontSize:"small"}}>({data.length} items)</span></th>
                        <th className="text-center">Quantity</th>
                        <th className="text-center">Price</th>
                        <th className="text-center">Subtotal</th>
                        { userGroup !== 'manager' ?
                          <th className="text-center">
                            <button className="btn btn-sm btn-outline-danger" to=""
                              onClick={deletOder}>
                              Delete Order
                            </button>
                          </th> :
                          <th className="text-center">
                            <button className="btn btn-sm btn-outline-danger" to="">
                              Disable Order
                            </button>
                          </th>
                        }
                    </tr>
                </thead>
                <tbody>
                    {data.map((order, index)=>(
                      <>
                        <tr key={index}>
                            <td>
                                <div className="product-item">
                                    {/* <a className="product-thumb" href="#"><img src="https://www.bootdey.com/image/220x180/5F9EA0/000000" alt="Product" /></a> */}
                                    <div className="product-info">
                                        <h4 className="product-title"><a href="#">{order.item}</a></h4>
                                        {/* <span><em>Size:</em> XL</span><span><em>Color:</em> Black</span> */}
                                    </div>
                                </div>
                            </td>
                            <td className="text-center">
                                <div className="count-input">
                                    <select className="form-control">
                                        <option selected="">{order.quantity}</option>
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    </select>
                                </div>
                            </td>
                            <td className="text-center text-lg text-medium">
                              <div className="price-input">
                                <input type="text" className='form-control' 
                                  value={order.price}
                                  onChange={(e) => handleChange(index, 'price', e.target.value)}
                                />
                              </div>
                            </td>
                            <td className="text-center">—</td>
                            <td className="text-center">
                              <Link className="remove-from-cart" to="" data-toggle="tooltip" title="" data-original-title="Remove item">
                                {userGroup === 'manager' ? 
                                !order.available ? 
                                  <i className="fa-solid fa-check" title='Enable Item'
                                    onClick={OrderDetailAvailability(order.id)}></i> 
                                  : 
                                  <i title='Disable Item' className="fa-solid fa-ban"
                                    onClick={()=>OrderDetailAvailability(order.id)}></i>
                                  :
                                  <i className="fa fa-trash" style={{color:'red'}}
                                    onClick={()=>DeleteOrderDetail(order.id)}
                                  ></i>
                                }
                                
                              </Link>
                            </td>
                        </tr>
                      </>
                    ))}
                </tbody>
            </table>
        </div>
        <div className="shopping-cart-footer">
            {/* <div className="column">
                <form className="coupon-form" method="post">
                    <input className="form-control form-control-sm" type="text" placeholder="Coupon code" required="" />
                    <button className="btn btn-outline-primary btn-sm" type="submit">Apply Coupon</button>
                </form>
            </div> */}
            <div className="column text-lg">Subtotal: <span className="text-medium">N00.00</span></div>
        </div>
        <div className="shopping-cart-footer">
            <div className="column">
              <Link className="btn btn-outline-secondary" to='/orders_list'>
                <i className="icon-arrow-left"></i>&nbsp;Back to Orders
              </Link>
              <span style={{float:'right'}}>
                <Link className="btn btn-success" to='' data-toast="" data-toast-type="success" data-toast-position="topRight" data-toast-icon="icon-circle-check" data-toast-title="Your cart" data-toast-message="is updated successfully!">
                  Bill this Order
                </Link>
              </span>
            </div>
            <div className="column">
              
              {/* <a className="btn btn-success" href="#">Checkout</a> */}
            </div>
        </div>
    </div>
    </>
  )
}

export default OrderDetails