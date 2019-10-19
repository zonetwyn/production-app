import React, { useState } from 'react';
import { Container, Grid, Button, Header, Image } from 'semantic-ui-react';
import stepOne from './hydro-power-white.png';
import stepTradeBeans from './coffee-beans-white.png';
import stepHarvest from './harvest-white.png';
import stepTrade from './exchange-arrows-white.png';
import stepFactory from './factory-white.png';
import stepSale from './people-trading.png';
import GenerateSeed from './steps/GenerateSeed';
import TradeSeeds from './steps/TradeSeeds';
import Harvest from './steps/Harvest';
import TradeBeans from './steps/TradeBeans';
import Transformation from './steps/Transformation';
import TradeProducts from './steps/TradeProducts';
import Sale from './steps/Sale';

function Steps() {
  const [step, setStep] = useState(1);
  const [action, setAction] = useState(0);

  return (
    <Container className='Steps'>
      <Grid centered columns={7}>
        <Grid.Column>
          <Button circular size='massive' className='step-button' color='blue' disabled={step !== 1} onClick={() => setAction(1)}>
            <Image src={stepOne} className='step-image' />
          </Button>
          <Header as='h3' className='step'>Generate Seeds</Header>
        </Grid.Column>
        <Grid.Column>
          <Button circular size='massive' className='step-button' color='green' disabled={step !== 2} onClick={() => setAction(2)}>
            <Image src={stepTrade} className='step-image' />
          </Button>
          <Header as='h3' className='step'>Trade Seeds</Header>
        </Grid.Column>
        <Grid.Column>
          <Button circular size='massive' className='step-button' color='green' disabled={step !== 3} onClick={() => setAction(3)}>
            <Image src={stepHarvest} className='step-image' />
          </Button>
          <Header as='h3' className='step'>Harvest</Header>
        </Grid.Column>
        <Grid.Column>
          <Button circular size='massive' className='step-button' color='red' disabled={step !== 4} onClick={() => setAction(4)}>
            <Image src={stepTradeBeans} className='step-image' />
          </Button>
          <Header as='h3' className='step'>Trade Beans</Header>
        </Grid.Column>
        <Grid.Column>
          <Button circular size='massive' className='step-button' color='red' disabled={step !== 5} onClick={() => setAction(5)}>
            <Image src={stepFactory} className='step-image' />
          </Button>
          <Header as='h3' className='step'>Tranformation</Header>
        </Grid.Column>
        <Grid.Column>
          <Button circular size='massive' className='step-button' color='orange' disabled={step !== 6} onClick={() => setAction(6)}>
            <Image src={stepTrade} className='step-image' />
          </Button>
          <Header as='h3' className='step'>Trade Products</Header>
        </Grid.Column>
        <Grid.Column>
          <Button circular size='massive' className='step-button' color='grey' disabled={step !== 7} onClick={() => setAction(7)}>
            <Image src={stepSale} className='step-image' />
          </Button>
          <Header as='h3' className='step'>Sale</Header>
        </Grid.Column>
      </Grid>
      <GenerateSeed modalOpen={action === 1} setAction={setAction} setStep={setStep} />
      <TradeSeeds modalOpen={action === 2} setAction={setAction} setStep={setStep} />
      <Harvest modalOpen={action === 3} setAction={setAction} setStep={setStep} />
      <TradeBeans modalOpen={action === 4} setAction={setAction} setStep={setStep} />
      <Transformation modalOpen={action === 5} setAction={setAction} setStep={setStep} />
      <TradeProducts modalOpen={action === 6} setAction={setAction} setStep={setStep} />
      <Sale modalOpen={action === 7} setAction={setAction} setStep={setStep} />
    </Container>
  )
}

export default Steps;