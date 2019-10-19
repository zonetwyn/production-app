import React from 'react';
import { Grid } from 'semantic-ui-react';
import TraderList from '../simulator/participants/TraderList';
import FarmerList from '../simulator/participants/FarmerList';
import FactoryList from '../simulator/participants/FactoryList';
import MarketList from '../simulator/participants/MarketList';
import CustomerList from '../simulator/participants/CustomerList';

function Participants() {

  return (
    <div className='Participants'>
      <Grid columns={5} divided>
        <Grid.Column>
          <TraderList />
        </Grid.Column>
        <Grid.Column>
          <FarmerList />
        </Grid.Column>
        <Grid.Column>
          <FactoryList />
        </Grid.Column>
        <Grid.Column>
          <MarketList />
        </Grid.Column>
        <Grid.Column>
          <CustomerList />
        </Grid.Column>
      </Grid>
    </div>
  )
}

export default Participants;