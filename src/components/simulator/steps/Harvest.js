import React, { useState, useEffect } from 'react';
import { Modal, Header, Button, Select } from 'semantic-ui-react';
import axios from 'axios';
import Routes from '../../../utils/Network'

function Harvest(props) {
  const [modalOpen, setModalOpen] = useState(false);
  useEffect(() => {
    setModalOpen(props.modalOpen);
  }, [props.modalOpen]);

  const [farmerId, setFarmerId] = useState('');
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

  function handleClose() {
    setModalOpen(false);
    props.setAction(0);
  }

  async function handleSubmit() {
    if (!farmerId) return; 

    try {
      setLoading(true);
        const doc = {
          "$class": "org.zonetwyn.production.Harvest",
          "farmer": "resource:org.zonetwyn.production.Farmer#"+farmerId
        }

        await axios.post(Routes.HARVEST, doc, null);

        setLoading(false);
        props.setStep(4);
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
        <Header as='h3'>Harvest</Header>
      </Modal.Header>
      <Modal.Content>
        <Select className='select-trader' placeholder='Select a farmer' options={farmers} onChange={(e, data) => setFarmerId(data.value)}/>
      </Modal.Content>
      <Modal.Actions>
        <Button color='grey' onClick={() => handleClose()}>Cancel</Button>
        <Button loading={loading} primary onClick={() => handleSubmit()}>Sumbit</Button>
      </Modal.Actions>
    </Modal>
  )
}

export default Harvest;