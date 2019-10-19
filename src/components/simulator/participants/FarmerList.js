import React, { useState } from 'react';
import Farmer from './Farmer';
import { Loader } from 'semantic-ui-react';
import axios from 'axios';
import Routes from '../../../utils/Network';
import useInterval from '../../../utils/Hooks';

function FarmerList() {
  const [farmers, setFarmers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const { data } = await axios.get(Routes.FARMERS);
      setLoading(false);
      setFarmers(data);
    } catch (error) {
      console.log(error);
    }
  }

  useInterval(() => {
    fetchData();
  }, 2000);

  return (
    <div>
      <h3 className='green'>Farmers</h3>
      {
        loading ? (
          <Loader active inline='centered' />
        ) : (
          farmers.length > 0 ? (
            <div>
            {
              farmers.map(farmer => {
                return (
                  <Farmer farmer={farmer} />
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

export default FarmerList;