import React from 'react';
import { Card, Header, Grid } from 'semantic-ui-react';
import Bean from '../assets/Bean'
import Products from '../assets/Products';

function Factory(props) {
  
  return (
    <Card key={props.factory.ownerId}>
      <Card.Content>
        <Card.Header>{props.factory.lastName + ' ' + props.factory.firstName}</Card.Header>
        <Card.Meta>{new Date(props.factory.createdAt).toLocaleString()}</Card.Meta>
        <Header as='h4'>Beans <span>({props.factory.beans ? props.factory.beans.length : 0})</span></Header>
        {
          props.factory.beans ? (
            <Grid>
              <Grid.Row>
              {
                props.factory.beans.map(() => { return (<Bean />)})
              }
              </Grid.Row>
            </Grid>
          ) : (
            <div></div>
          )
        }
        <Header as='h4'>Products </Header>
        <Grid>
          <Grid.Row>
            <Products products={props.factory.products}/>
          </Grid.Row>
        </Grid>
      </Card.Content>
      <Card.Content extra>
        <h4 className='red'>{props.factory.balance + ' $'}</h4>
      </Card.Content>
    </Card>
  )
}

export default Factory;