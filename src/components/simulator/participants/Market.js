import React from 'react';
import { Card, Header, Grid } from 'semantic-ui-react';
import Products from '../assets/Products';

function Market(props) {
  
  return (
    <Card>
      <Card.Content>
        <Card.Header>{props.market.publicName}</Card.Header>
        <Card.Meta>Orders ({props.market.orders? props.market.orders.length : 0})</Card.Meta>
        <Header as='h4'>Products </Header>
        <Grid>
          <Grid.Row>
            <Products products={props.market.products}/>
          </Grid.Row>
        </Grid>
      </Card.Content>
      <Card.Content extra>
        <h4 className='orange'>{props.market.balance + ' $'}</h4>
      </Card.Content>
    </Card>
  )
}

export default Market;