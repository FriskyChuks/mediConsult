// src/pages/SearchResults.js
import { useContext, useEffect, useState } from 'react';
import { SearchContext } from './SearchContext';
import axios from 'axios';
import { MDBBadge, MDBBtn, MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';

const SearchResults = ({ baseURL }) => {
  const { searchQuery } = useContext(SearchContext);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${baseURL}/items/`); // Replace with your API endpoint
        setItems(response.data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchData();
  }, []); // Empty dependency array means this runs once when the component mounts

  const filteredItems = items.filter(item =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error fetching data: {error.message}</p>;

  return (
    <> <br /><br /><br /><br /><br />
    { items ? 
      <>
      <MDBTable className="container" align='middle'>
          <MDBTableHead>
            <tr>
              <th scope='col'>Item</th>
              <th scope='col'>Description</th>
              <th scope='col'>Price</th>
              <th scope='col'>Status</th>
              <th scope='col'>Actions</th>
            </tr>
          </MDBTableHead>
          <MDBTableBody>
            { filteredItems.map(item=>(
              <>
              <tr>
                <td>
                  <div className='d-flex align-items-center'>
                    <img
                      src='/src/assets/img/item_default.JPEG'
                      alt=''
                      style={{ width: '45px', height: '45px' }}
                      className='rounded-circle'
                    />
                    <div className='ms-3'>
                      <p className='fw-bold mb-1'>{item.title}</p>
                      <MDBBadge color='primary' pill>
                        {item.category}
                      </MDBBadge>
                    </div>
                  </div>
                </td>
                <td>
                  <p className='fw-normal mb-1'>{item.title}</p>
                  <p className='text-muted mb-0'> {item.description} </p>
                </td>
                <td>
                  <MDBBadge color='primary' pill>
                    N{item.price}
                  </MDBBadge>
                </td>
                <td>{item.status} Available</td>
                <td>
                  <MDBBtn color='success' rounded size='sm'>
                    Add to cart
                  </MDBBtn>
                </td>
              </tr>
              </>
            )) }
          </MDBTableBody>
        </MDBTable>
      </> : <p> There is no matching record to display</p>
    }
        
      
    </>
  );
};

export default SearchResults;
