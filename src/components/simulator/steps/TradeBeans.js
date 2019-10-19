import React, { useState, useEffect } from 'react';
import { Modal, Header, Button, Select, Form } from 'semantic-ui-react';
import axios from 'axios';
import Routes from '../../../utils/Network'

function TradeBeans(props) {
  const [modalOpen, setModalOpen] = useState(false);
  useEffect(() => {
    setModalOpen(props.modalOpen);
  }, [props.modalOpen]);

  const [farmerId, setFarmerId] = useState('');
  const [factoryId, setFactoryId] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [loading, setLoading] = useState(false);

  const [farmers, setFarmers] = useState([]);
  useEffect(() => {
    fetchFarmers()
  });
  const fetchFarmers = async () => {
    try {
      const { data } = await axios.get(Routes.FARMERS);
      if (data.length > 0) {
        const docs = [];
        for (let i=0; i<data.length; i++) {
          const d = data[i];
          const doc = {};
          doc['key'] = d.ownerId;
          doc['value'] = d.ownerId;
          doc['text'] = d.lastName + ' ' + d.firstName;
          docs.push(doc);
        }
        setFarmers(docs);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const [factories, setFactories] = useState([]);
  useEffect(() => {
    fetchFactories()
  });
  const fetchFactories = async () => {
    try {
      const { data } = await axios.get(Routes.FACTORIES);
      if (data.length > 0) {
        const docs = [];
        for (let i=0; i<data.length; i++) {
          const d = data[i];
          const doc = {};
          doc['key'] = d.ownerId;
          doc['value'] = d.ownerId;
          doc['text'] = d.lastName + ' ' + d.firstName;
          docs.push(doc);
        }
        setFactories(docs);
      }
    } catch (error) {
      console.log(error);
    }
  }

  function handleClose() {
    setModalOpen(false);
    props.setAction(0);
  }

  async function hanldeSubmit() {
    if (!factoryId || !farmerId || quantity < 1) return;

    try {
      setLoading(true);
      const doc = {
        "$class": "org.zonetwyn.production.TradeBean",
        "farmer": "resource:org.zonetwyn.production.Farmer#"+farmerId,
        "factory": "resource:org.zonetwyn.production.Factory#"+factoryId,
        "quantity": quantity
      }

      await axios.post(Routes.TRADE_BEANS, doc, null);

      setLoading(false);
      props.setStep(5);
      handleClose();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Modal
      size='mini'
      open={modalOpen}
      onClose={() => handleClose()}>
      <Modal.Header>
        <Header as='h3'>Trade Beans</Header>
      </Modal.Header>
      <Modal.Content>
        <Form>
          <Form.Field>
            <Select className='select-trader' placeholder='Select a farmer' options={farmers} onChange={(e, data) => setFarmerId(data.value)} />
          </Form.Field>
          <Form.Field>
            <Select className='select-trader' placeholder='Select a factory' options={factories} onChange={(e, data) => setFactoryId(data.value)} />
          </Form.Field>
          <Form.Field>
            <input name='quantity' type='number' onChange={(e) => setQuantity(Number(e.target.value))} />
          </Form.Field>
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button color='grey' onClick={() => handleClose()}>Cancel</Button>
        <Button primary loading={loading} onClick={() => hanldeSubmit()}>Sumbit</Button>
      </Modal.Actions>
    </Modal>
  )
}

export default TradeBeans;