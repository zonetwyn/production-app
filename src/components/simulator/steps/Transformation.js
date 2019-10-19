import React, { useState, useEffect } from 'react';
import { Modal, Header, Button, Select } from 'semantic-ui-react';
import axios from 'axios';
import Routes from '../../../utils/Network'

function Transformation(props) {
  const [modalOpen, setModalOpen] = useState(false);
  useEffect(() => {
    setModalOpen(props.modalOpen);
  }, [props.modalOpen]);

  const [factoryId, setFactoryId] = useState('');
  const [loading, setLoading] = useState(false);

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

  async function handleSubmit() {
    if (!factoryId) return; 
    // Generate seeds
    try {
      setLoading(true);
        const doc = {
          "$class": "org.zonetwyn.production.Transformation",
          "factory": "resource:org.zonetwyn.production.Factory#"+factoryId
        }

        await axios.post(Routes.TRANSFORMATION, doc, null);

        setLoading(false);
        props.setStep(6);
        handleClose();
    } catch (error) {
      if (error.response && error.response.data) {
        console.log(error.response.data)
      }
    }
  } 

  return (
    <Modal
      size='mini'
      open={modalOpen}
      onClose={() => handleClose()}>
      <Modal.Header>
        <Header as='h3'>Transformation</Header>
      </Modal.Header>
      <Modal.Content>
        <Select className='select-trader' placeholder='Select a factory' options={factories} onChange={(e, data) => setFactoryId(data.value)} />
      </Modal.Content>
      <Modal.Actions>
        <Button color='grey' onClick={() => handleClose()}>Cancel</Button>
        <Button primary loading={loading} onClick={() => handleSubmit()}>Sumbit</Button>
      </Modal.Actions>
    </Modal>
  )
}

export default Transformation;