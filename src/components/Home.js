import React from 'react';
import { Grid } from 'semantic-ui-react';
import Traders from './home/Traders';
import Factories from './home/Factories';
import Farmers from './home/Farmers';
import Markets from './home/Markets';
import Customers from './home/Customers';

function Home(props) {
  return (
    <div className='Home'>
      <Grid>
        <Grid.Row columns={2}>
          <Grid.Column>
            <Traders />
          </Grid.Column>
          <Grid.Column>
            <Factories />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row columns={1}>
          <Grid.Column>
            <Farmers />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row columns={2}>
          <Grid.Column>
            <Markets />
          </Grid.Column>
          <Grid.Column>
            <Customers />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  )
}

export default Home;