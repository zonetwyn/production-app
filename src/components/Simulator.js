import React from 'react';
import Participants from './simulator/Participants';
import Steps from './simulator/Steps';
import { Divider } from 'semantic-ui-react';

function Simulator(props) {
  return (
    <div className='Simulator'>
      <Participants />
      <Divider />
      <Steps />
    </div>
  )
}

export default Simulator;