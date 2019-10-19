import React, { useState } from 'react';
import Customer from './Customer';
import { Loader } from 'semantic-ui-react';
import axios from 'axios';
import Routes from '../../../utils/Network';
import useInterval from '../../../utils/Hooks';

function CustomerList() {
  const [loading, setLoading] = useState(true);
  const [customers, setCustomers] = useState([]);

  const fetchData = async () => {
    try {
      const { data } = await axios.get(Routes.CUSTOMERS);
      setLoading(false);
      setCustomers(data);
    } catch (error) {
      console.log(error);
    }
  }

  useInterval(() => {
    fetchData();
  }, 2000);

  return (
    <div>
      <h3 className='grey'>Customers</h3>
      {
        loading ? (
          <Loader active inline='centered' />
        ) : (
          customers.length > 0 ? (
            <div>
            {
              customers.map(customer => {
                return (
                  <Customer customer={customer} />
                )
              })
            }
            </div>
          ) : (
            <div>No data found</div>
          )
        )
      }
    </div>
  )
}

export default CustomerList;