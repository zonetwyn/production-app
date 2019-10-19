import React from 'react';
import { Card, Grid, Header } from 'semantic-ui-react';
import Seed from '../assets/Seed'

function Trader(props) {

  return (
    <Card key={props.trader.ownerId}>
      <Card.Content>
        <Card.Header>{props.trader.lastName + ' ' + props.trader.firstName}</Card.Header>
        <Card.Meta>{props.trader.marketAddress}</Card.Meta>
        <Header as='h4'>Seeds <span>({props.trader.seeds ? props.trader.seeds.length : 0})</span></Header>
        {
          props.trader.seeds ? (
            <Grid>
              <Grid.Row>
              {
                props.trader.seeds.map(() => { return (<Seed />)})
              }
              </Grid.Row>
            </Grid>
          ) : (
            <div></div>
          )
        }
      </Card.Content>
      <Card.Content extra>
        <h4 className='blue'>{props.trader.balance + ' $'}</h4>
      </Card.Content>
    </Card>
  )
}

export default Trader;