import React from 'react';
import { Card, Header, Grid } from 'semantic-ui-react';
import Seed from '../assets/Seed'
import Bean from '../assets/Bean'

function Farmer(props) {
  
  return (
    <Card key={props.farmer.ownerId}>
      <Card.Content>
        <Card.Header>{props.farmer.lastName + ' ' + props.farmer.firstName}</Card.Header>
        <Card.Meta>{props.farmer.surface} m<sup>2</sup></Card.Meta>
        <Header as='h4'>Seeds <span>({props.farmer.seeds ? props.farmer.seeds.length : 0})</span></Header>
        {
          props.farmer.seeds ? (
            <Grid>
              <Grid.Row>
              {
                props.farmer.seeds.map(() => { return (<Seed />)})
              }
              </Grid.Row>
            </Grid>
          ) : (
            <div></div>
          )
        }
        <Header as='h4'>Beans <span>({props.farmer.beans ? props.farmer.beans.length : 0})</span></Header>
        {
          props.farmer.beans ? (
            <Grid>
              <Grid.Row>
              {
                props.farmer.beans.map(() => { return (<Bean />)})
              }
              </Grid.Row>
            </Grid>
          ) : (
            <div></div>
          )
        }
      </Card.Content>
      <Card.Content extra>
        <h4 className='green'>{props.farmer.balance + ' $'}</h4>
      </Card.Content>
    </Card>
  )
}

export default Farmer;