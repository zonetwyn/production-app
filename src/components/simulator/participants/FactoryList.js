import React, { useState } from 'react';
import Factory from './Factory';
import { Loader } from 'semantic-ui-react';
import axios from 'axios';
import Routes from '../../../utils/Network';
import useInterval from '../../../utils/Hooks';

function FactoryList() {
  const [factories, setFactories] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const { data } = await axios.get(Routes.FACTORIES);
      setLoading(false);
      setFactories(data);
    } catch (error) {
      console.log(error);
    }
  }

  useInterval(() => {
    fetchData();
  }, 2000);
  
  return (
    <div>
      <h3 className='red'>Factories</h3>
      {
        loading ? (
          <Loader active inline='centered' />
        ) : (
          factories.length > 0 ? (
            <div>
            {
              factories.map(factory => {
                return (
                  <Factory factory={factory} />
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

export default FactoryList;