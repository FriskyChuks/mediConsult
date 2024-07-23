import { useState } from "react";

export default function Items() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [stock, setStock] = useState(0);
  const [price, setPrice] = useState(0);
  const [item_category, setItemCategory] = useState("");
  return (
    <>
      <div className="container-fluid booking py-5">
        <div className="container py-5" style={{ width: "40%" }}>
          <div className="row g-5 align-items-center">
            <div className="col-lg-12">
              <h1 className="text-white text-center mx-auto mb-3 p-2">
                Create Item
              </h1>
              <form>
                <div className="row g-3">
                  <div className="col-md-12">
                    <div className="form-floating">
                      <input
                        type="text"
                        className="form-control bg-white border-0"
                        id="title"
                        placeholder="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                      />
                      <label>Title</label>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="form-floating">
                      <input
                        type="text"
                        className="form-control bg-white border-0"
                        id="description"
                        placeholder="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                      />
                      <label>Description</label>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div
                      className="form-floating"
                      id="phone"
                      data-target-input="nearest"
                    >
                      <input
                        type="text"
                        className="form-control bg-white border-0"
                        id="phone"
                        placeholder="Stock"
                        value={stock}
                        onChange={(e) => setStock(e.target.value)}
                      />
                      <label>Stock</label>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div
                      className="form-floating date"
                      id="price"
                      data-target-input="price"
                    >
                      <input
                        type="text"
                        className="form-control bg-white border-0"
                        id="price"
                        placeholder="Price"
                        data-target="price"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                      />
                      <label>Price</label>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="form-floating date">
                      <input
                        type="text"
                        className="form-control bg-white border-0"
                        id="category"
                        placeholder="Category"
                        data-target="category"
                        value={item_category}
                        onChange={(e) => setItemCategory(e.target.value)}
                      />
                      <label>Category</label>
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
