import React from 'react';
import { Card, Header, Grid } from 'semantic-ui-react';
import Orders from '../assets/Orders';

function Customer(props) {
  
  return (
    <Card>
      <Card.Content>
        <Card.Header>{(props.customer.gender === 'MALE' ? 'Mr' : 'Mrs') + ' ' + props.customer.lastName + ' ' + props.customer.firstName}</Card.Header>
        <Card.Meta>Male, 18</Card.Meta>
        <Header as='h4'>Orders <span>({props.customer.orders ? props.customer.orders.length : 0})</span></Header>
        {
          props.customer.orders ? (
            <Grid>
              <Grid.Row>
              {
                props.customer.orders.map((order) => { return (<Orders order={order} />)})
              }
              </Grid.Row>
            </Grid>
          ) : (
            <div></div>
          )
        }
      </Card.Content>
      <Card.Content extra>
        <h4 className='grey'>{props.customer.balance + ' $'}</h4>
      </Card.Content>
    </Card>
  )
}

export default Customer;