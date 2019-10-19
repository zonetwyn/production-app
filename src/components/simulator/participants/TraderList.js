import React, { useState } from 'react';
import Trader from './Trader';
import { Loader } from 'semantic-ui-react';
import axios from 'axios';
import Routes from '../../../utils/Network';
import useInterval from '../../../utils/Hooks';

function TraderList() {
  const [traders, setTraders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const { data } = await axios.get(Routes.TRADERS);
      setLoading(false);
      setTraders(data);
    } catch (error) {
      console.log(error);
    }
  }

  useInterval(() => {
    fetchData();
  }, 2000);

  return (
    <div>
      <h3>Traders</h3>
      {
        loading ? (
          <Loader active inline='centered' />
        ) : (
          traders.length > 0 ? (
            <div>
            {
              traders.map(trader => {
                return (
                  <Trader trader={trader} />
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

export default TraderList;