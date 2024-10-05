import api from "../../AxiosInstance";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useMessage } from "../contexts/MessageContext";

export default function PlaceOrders({ baseURL }) {
  const [item, setItem] = useState("");
  const { showMessage } = useMessage();
  const [itemList, setItemList] = useState([]);
  const [msg, setMsg] = useState("");
  const [states, setStates] = useState([]);
  const [selectedState, setSelectedState] = useState("");
  const [lgas, setLgas] = useState([]);
  const [selectedLga, setSelectedLga] = useState("");
  const [address, setAddress] = useState("");
  const [userAddr, setUserAddr] = useState("");
  const accessToken = localStorage.getItem("access_token")
  const navigate = useNavigate()
  const customer_id = parseInt(localStorage.getItem('user_id'))


  const userAddress = async () => {
    await api.get(`${baseURL}/address/get_customer_address/${customer_id}/`).then(res=>{
      setUserAddr(res.data)
    })
  } 

  useEffect(()=>{
    userAddress()
  },[])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/src/data/StatesLGA.json");
        const data = await response.json();
        setStates(data.states);
      } catch (error) {
        console.error("Error fetching the states and LGAs data:", error);
      }
    };

    fetchData();
  }, [baseURL]);

  const handleQuantityChange = (index, newQuantity) => {
    const updatedItemList = [...itemList];
    updatedItemList[index].quantity = newQuantity;
    setItemList(updatedItemList);
  };

  const handleStateChange = (e) => {
    setSelectedState(e.target.value);

    const selectedStateData = states.find(
      (state) => state.alias === e.target.value
    );
    setLgas(selectedStateData ? selectedStateData.lgas : []);
  };
  const handleLga = (e) => {
    setSelectedLga(e.target.value);
  };

  const handleAddItem = (e) => {
    e.preventDefault()
    if (item.trim()) {
      setItemList([...itemList, { name: item, quantity: 1 }]);
      setItem("");
    }
  };

  const handleDeleteItem = (index) => {
    const newList = itemList.filter((_, i) => i !== index);
    setItemList(newList);
  };

  const submitAddress = async () => {
    const addrInput = {
      customer:customer_id, address:address, 
      state:selectedState, lga:selectedLga
    }
    await api.post(`${baseURL}/address/`, addrInput, {
      headers: { "Authorization": `FRISKY ${accessToken}` }
    })
  }

  const handleSubmitOrder = async (e) => {
    e.preventDefault()
    submitAddress()
    const order = {
      customer_id: customer_id
    }
    const res = await api.post(`${baseURL}/orders/create_order/`, order, {
      headers: { "Authorization": `FRISKY ${accessToken}` }
    })
    if (res.data) {
      itemList.map((item) => (
        api.post(`${baseURL}/orders/create_order_detail/`, 
          { item: item.name, order: res.data.id, quantity: item.quantity }, {
          headers: { "Authorization": `FRISKY ${accessToken}` }
        })
      ))
    }
    showMessage('Your order was successfully placed')
    setItem('')
    setItemList([])
    navigate('/orders')
  };


  return (
    <>
  <h3 className="text-center" style={{ color: "green" }}>{msg}</h3>
  <h2 className="text-center">Order Form</h2>
  <div className="container">
    <form onSubmit={handleSubmitOrder}>
      <div className="container mt-4 mb-2">
        <div className="row">
          <div className="col-lg-6 col-md-12 mb-4">
          <h5 className="section-about-title text-primary pe-3">ENTER ITEMS</h5>
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Add item"
                value={item}
                onChange={(e) => setItem(e.target.value)}
                style={{ height: "60px" }}
              />
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleAddItem}
                style={{ height: "60px" }}
              >
                Add
              </button>
            </div>

            <div className="border rounded p-3">
              {itemList.length === 0 && (
                <p className="text-center">Start adding items...</p>
              )}
              <ul className="list-group">
                {itemList.map((item, index) => (
                  <li
                    key={index}
                    className="list-group-item d-flex justify-content-between align-items-center"
                  >
                    {item.name}
                    <span className="d-flex align-items-center">
                      <input
                        type="number"
                        className="form-control text-primary me-2"
                        value={item.quantity}
                        min={1}
                        style={{ maxWidth: "60px" }}
                        onChange={(e) => handleQuantityChange(index, parseInt(e.target.value, 10))}
                      />
                      <button
                        type="button"
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDeleteItem(index)}
                      >
                        Delete
                      </button>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Address Form */}
          { userAddr.length < 1 ? 
            <>
              <div className="col-lg-1 col-md-12"></div>
              <div className="col-lg-5 col-md-12">
                <h5 className="section-about-title text-primary pe-3">ENTER ADDRESS DETAILS</h5>
                  <div className="mb-3">
                    <label><b>State:</b></label>
                    <select
                      id="state"
                      className="form-control"
                      value={selectedState}
                      onChange={handleStateChange}
                      required
                    >
                      <option value="" disabled>Select state</option>
                      {states.map((state) => (
                        <option key={state.alias} value={state.alias}>
                          {state.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="mb-3">
                    <label><b>LGA:</b></label>
                    <select
                      id="lga"
                      className="form-control"
                      disabled={!selectedState}
                      onChange={handleLga}
                      required
                    >
                      <option value="">
                        {!selectedState ? "Select LGA" : `Select LGA in ${selectedState}`}
                      </option>
                      {lgas.map((lga, index) => (
                        <option key={index} value={lga}>
                          {lga}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="mb-3">
                    <label><b>Address:</b></label>
                    <textarea
                      id="address"
                      className="form-control"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      required
                    />
                  </div>
              </div>
            </> : 
            <>
              <div className="col-lg-1 col-md-12"></div>
              <div className="col-lg-5 col-md-12">
              <h5 className="section-about-title text-primary pe-3">ADDRESS INFORMATION</h5>
                {userAddr.map(addr => (
                  <>
                    <p>{addr.address}</p>
                    <p>{addr.lga}</p>
                    <p>{addr.state}</p>
                    <p>{addr.country}</p>
                  </>
                ))}
              </div>
            </>
          }
        </div>
        <button type="submit" className="btn btn-success w-100 mt-3">ORDER</button>
      </div>
    </form>
  </div>

  <br />
  <br />
</>

 );
}
