import { useState } from "react";

export default function Items() {
  const [customer, setCustomer] = useState("");
  const [discount, setDiscount] = useState("");
  const [VAT, setVat] = useState(0);
  const [order_date, setOrderdate] = useState("");
  const [dispatch_date, setDispatchDate] = useState("");
  return (
    <>
      <div className="container-fluid booking py-5">
        <div className="container py-5" style={{ width: "40%" }}>
          <div className="row g-5 align-items-center">
            <div className="col-lg-12">
              <h1 className="text-white text-center mx-auto mb-3 p-2">Order</h1>
              <form>
                <div className="row g-3">
                  <div className="col-md-12">
                    <div className="form-floating">
                      <input
                        type="text"
                        className="form-control bg-white border-0"
                        value={customer}
                        onChange={(e) => setCustomer(e.target.value)}
                      />
                      <label>Customer</label>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="form-floating">
                      <input
                        type="number"
                        className="form-control bg-white border-0"
                        value={discount}
                        onChange={(e) => setDiscount(e.target.value)}
                      />
                      <label>Discount</label>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="form-floating">
                      <input
                        type="text"
                        className="form-control bg-white border-0"
                        placeholder="VAT"
                        value={VAT}
                        onChange={(e) => setVat(e.target.value)}
                      />
                      <label>VAT</label>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="form-floating date">
                      <input
                        type="date"
                        className="form-control bg-white border-0"
                        value={order_date}
                        onChange={(e) => setOrderdate(e.target.value)}
                      />
                      <label>Date</label>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="form-floating date">
                      <input
                        type="date"
                        className="form-control bg-white border-0"
                        value={dispatch_date}
                        onChange={(e) => setDispatchDate(e.target.value)}
                      />
                      <label>Dispatch Date</label>
                    </div>
                  </div>
                  <div className="col-12">
                    <button
                      className="btn btn-primary text-white w-100 py-3"
                      type="submit"
                    >
                      Create
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
