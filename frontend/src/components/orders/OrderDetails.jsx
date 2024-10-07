import React from 'react'
import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert'

import api from '../../AxiosInstance';

import { useMessage } from "../contexts/MessageContext";

const OrderDetails = ({ baseURL }) => {
    const { showMessage } = useMessage();
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [totalCost, setTotalCost] = useState(0);  // State to track total cost
    const navigate = useNavigate();
    const accessToken = localStorage.getItem('access_token');
    const {id} = useParams();
    const userGroup = localStorage.getItem('user_group');

    const fetchOrderDetails = async() => {
        const res = await api.get(`${baseURL}/orders/order_details/${id}/`, {
            headers:{"Authorization":`FRISKY ${accessToken}`}
        });
        setData(res.data);
        setLoading(false);
        calculateTotal(res.data);  // Calculate total cost initially
    };

    // Handler to update the local state when user modifies a field
    const handleChange = (index, field, value) => {
        const updatedData = [...data];
        updatedData[index][field] = value;  // Update the specific field

        // Calculate the updated subtotal for the modified row
        updatedData[index].subtotal = updatedData[index].quantity * updatedData[index].price;
        
        setData(updatedData);
        calculateTotal(updatedData);  // Recalculate total cost
    };

    // Function to calculate the total cost
    const calculateTotal = (updatedData) => {
        const total = updatedData.reduce((sum, item) => sum + (item.quantity * item.price), 0);
        setTotalCost(total);  // Update total cost state
    };

    const OrderDetailAvailability = async (itemId) => {
        try {
            const { available } = data.find(item => item.id === itemId);
            const updateDate = { available: !available };
            await api.patch(`${baseURL}/orders/update_delete_order_detail/${itemId}/`, updateDate, {
                headers: { "Authorization": `FRISKY ${accessToken}` }
            });

            const updatedData = data.map(item => 
                item.id === itemId ? { ...item, available: !available } : item
            );
            setData(updatedData);
            fetchOrderDetails();

            showMessage('Item Updated', 'success');
        } catch (error) {
            console.error("Error updating item availability:", error);
            showMessage('Error updating item', 'error');
        }
    };

    const DeleteOrderDetail = async (orderDetailId) => {
        if (data.length > 1) {
            await api.delete(`${baseURL}/orders/update_delete_order_detail/${orderDetailId}/`, {
                headers: {"Authorization": `FRISKY ${accessToken}`}
            }).then(() => {
                fetchOrderDetails();
                showMessage('An Item has been deleted from your order', 'success');
            });
        } else {
            handleDeleteOrder();
        }
    };

    const handleDeleteOrder = () => {
        api.delete(`${baseURL}/orders/update_delete_order/${id}/`, {
            headers:{"Authorization":`FRISKY ${accessToken}`}
        }).then(() => {
            fetchOrderDetails();
            showMessage('Order deleted', 'info');
            navigate('/orders');
        });
    };

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
    };

    // Handler to save changes back to the database
      const handleSave = async () => {
      try {
        // Iterate over each order detail in the data array
        const updatePromises = data.map(async (item) => {
            const dataForUpdata =  { 
                quantity:parseInt(item.quantity), price:parseFloat(item.price) 
            } 
            console.log(dataForUpdata)
          // Make an individual API call for each order detail
          const item_id = parseInt(item.id)
          await api.patch(`${baseURL}/orders/update_delete_order_detail/${item_id}/`, dataForUpdata, {
            headers: { "Authorization": `FRISKY ${accessToken}` }
          });
        });
         // Wait for all the update requests to complete
        await Promise.all(updatePromises);

        await api.patch(`${baseURL}/orders/update_delete_order/${id}/`, {billed:true}, {
            headers: { "Authorization": `FRISKY ${accessToken}` }
          });

        // Success feedback to the user
        showMessage('All order details saved successfully!', 'success');

        // Refresh the order details after saving
        fetchOrderDetails();
    
      } catch (error) {
        showMessage('Error saving order details', 'error');
      }
    };
    

    useEffect(() => {
        fetchOrderDetails();
    }, [id, accessToken]);

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <>
        <br />
        <div className="container padding-bottom-3x mb-1">
            <h5>{data.length > 0 ? data[0].customer : ""}</h5>
            <h6>{data.length > 0 ? data[0].order_date.split("T")[0] : ""}</h6>

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
                                <button className="btn btn-sm btn-outline-danger" onClick={deletOder}>
                                    Delete Order
                                </button>
                            </th> :
                            <th className="text-center">
                                <button className="btn btn-sm btn-outline-danger">
                                    Disable Order
                                </button>
                            </th>
                            }
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((order, index) => (
                            <tr key={index}>
                                <td>
                                    <div className="product-item">
                                        <div className="product-info">
                                            <h4 className="product-title">{order.item}</h4>
                                        </div>
                                    </div>
                                </td>
                                <td className="text-center">
                                    <div className="count-input">
                                        <input type="number" className='form-control'
                                            value={order.quantity}
                                            onChange={(e) => handleChange(index, 'quantity', e.target.value)}
                                            readOnly={userGroup === 'manager' ? false : true}
                                        />
                                    </div>
                                </td>
                                <td className="text-center">
                                    <input type="number" className='form-control' 
                                        value={order.price}
                                        onChange={(e) => handleChange(index, 'price', e.target.value)}
                                        readOnly={userGroup === 'manager' ? false : true}
                                    />
                                </td>
                                <td className="text-center">
                                {`₦${(order.quantity * order.price).toLocaleString('en-NG', {minimumFractionDigits: 2})}`}
                                </td>
                                <td className="text-center">
                                    {userGroup === 'manager' ? 
                                        (!order.available ? 
                                            <i className="fa-solid fa-ban" title='Click to Enable Item'
                                                onClick={() => OrderDetailAvailability(order.id)}></i> 
                                            : 
                                            <i className="fa-solid fa-check" title='Click to Disable Item'
                                                onClick={() => OrderDetailAvailability(order.id)}></i>
                                        )
                                    :
                                        <i className="fa fa-trash" style={{color:'red'}}
                                            onClick={() => DeleteOrderDetail(order.id)}
                                        ></i>
                                    }
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            
            <div className="shopping-cart-footer text-center">
            <h4>Total Cost: <span className="text-medium">
                ₦{totalCost.toLocaleString('en-NG', {minimumFractionDigits: 2})}</span>
            </h4>

            </div>

            <div className="shopping-cart-footer"><br />
                <div className="column">
                    <Link className="btn btn-outline-secondary" to='/orders'>
                        Back to Orders
                    </Link>
                    {userGroup === 'manager' ?
                        <Link className="btn btn-success" to="" style={{float:"right"}}
                        onClick={handleSave}
                      > Process Order
                      </Link> : ""
                    }
                </div>
            </div>
        </div>
        </>
    );
}

export default OrderDetails;
