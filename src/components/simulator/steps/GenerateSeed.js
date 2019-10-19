import React, { useState, useEffect } from 'react';
import { Modal, Header, Button, Select } from 'semantic-ui-react';
import axios from 'axios';
import Routes from '../../../utils/Network'

function GenerateSeed(props) {
  const [modalOpen, setModalOpen] = useState(false);
  useEffect(() => {
    setModalOpen(props.modalOpen);
  }, [props.modalOpen]);
  
  const [docs, setDocs] = useState([]);
  useEffect(() => {
    fetchTraders();
  });
  const fetchTraders = async () => {
    try {
      const { data } = await axios.get(Routes.TRADERS);
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
        setDocs(docs);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const [traderId, setTraderId] = useState('');
  const [loading, setLoading] = useState(false);

  function handleClose() {
    setModalOpen(false);
    props.setAction(0);
  }

  async function handleSubmit() {
    if (!traderId) return; 
    // Generate seeds
    try {
      setLoading(true);
        const doc = {
          "$class": "org.zonetwyn.production.GenerateSeed",
          "trader": "resource:org.zonetwyn.production.Trader#"+traderId
        }

        await axios.post(Routes.GENERATE_SEEDS, doc, null);

        setLoading(false);
        props.setStep(2);
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
        <Header as='h3'>Generate Seeds</Header>
      </Modal.Header>
      <Modal.Content>
        <Select className='select-trader' placeholder='Select a trader' options={docs} onChange={(e, data) => setTraderId(data.value)} />
      </Modal.Content>
      <Modal.Actions>
        <Button color='grey' onClick={() => handleClose()}>Cancel</Button>
        <Button loading={loading} primary onClick={() => handleSubmit()}>Sumbit</Button>
      </Modal.Actions>
    </Modal>
  )
}

export default GenerateSeed;