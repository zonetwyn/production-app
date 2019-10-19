import React, { useState } from 'react';
import Market from './Market';
import { Loader } from 'semantic-ui-react';
import axios from 'axios';
import Routes from '../../../utils/Network';
import useInterval from '../../../utils/Hooks';

function MarketList() {
  const [loading, setLoading] = useState(true);

  const [markets, setMarkets] = useState([]);
  const fetchData = async () => {
    try {
      const { data } = await axios.get(Routes.MARKETS);
      setLoading(false);
      setMarkets(data);
    } catch (error) {
      console.log(error);
    }
  }

  useInterval(() => {
    fetchData();
  }, 2000);

  return (
    <div>
      <h3 className='orange'>Markets</h3>
      {
        loading ? (
          <Loader active inline='centered' />
        ) : (
          markets.length > 0 ? (
            <div>
            {
              markets.map(market => {
                return (
                  <Market market={market} />
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

export default MarketList;