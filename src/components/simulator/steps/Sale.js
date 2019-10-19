import React, { useState, useEffect } from 'react';
import { Modal, Header, Button, Select, Form, Table } from 'semantic-ui-react';
import useForm from 'react-hook-form';
import axios from 'axios';
import Routes from '../../../utils/Network'

function Sale(props) {
  const [modalOpen, setModalOpen] = useState(false);
  useEffect(() => {
    setModalOpen(props.modalOpen);
  }, [props.modalOpen]);

  const [products, setProducts] = useState([]);
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [marketId, setMarketId] = useState('');
  const [customerId, setCustomerId] = useState('');
  const [productName, setProductName] = useState('');

  const { register, handleSubmit } = useForm();
  const onSubmit = data => {
    setRecords([...records, {
      name: productName,
      quantity: Number(data.quantity),
      key: ''+Date.now()
    }]);
  };

  const [markets, setMarkets] = useState([]);
  useEffect(() => {
    fetchMarkets();
  });
  const fetchMarkets = async () => {
    try {
      const { data } = await axios.get(Routes.MARKETS);
      if (data.length > 0) {
        const docs = [];
        for (let i=0; i<data.length; i++) {
          const d = data[i];
          const doc = {};
          doc['key'] = d.ownerId;
          doc['value'] = d.ownerId;
          doc['text'] = d.publicName;
          docs.push(doc);
        }
        setMarkets(docs);
      }
    } catch (error) {
      console.log(error);
    }
  }


  const [customers, setCustomers] = useState([]);
  useEffect(() => {
    fetchCustomers();
  });
  const fetchCustomers = async () => {
    try {
      const { data } = await axios.get(Routes.CUSTOMERS);
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
        setCustomers(docs);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function handleMarket(marketId) {
    setMarketId(marketId);
    // Fetch products
    const configs = {
      params: {
        filter: JSON.stringify({
          "where": {
            "owner": `resource:org.zonetwyn.production.Market#${marketId}`
          }
        })
      }
    }

    try {
      const { data } = await axios.get(Routes.PRODUCT, configs);
      if (data.length > 0) {
        const docs = [];
        for (let i=0; i<data.length; i++) {
          const d = data[i];
          const doc = {};
          doc['key'] = d.productId;
          doc['value'] = d.productName;
          doc['text'] = d.productName;
          docs.push(doc);
        }
        setProducts(docs);
      }
    } catch (error) {
      console.log(error.response.data);
    }
  }

  function handleClose() {
    setModalOpen(false);
    props.setAction(0);
  }

  async function hanldeSubmit() {
    if (!customerId || !marketId || records.length < 1) return;

    try {
      const docs = records.map(record => {
        delete record.key;
        return record;
      });
      setLoading(true);
      const doc = {
        "$class": "org.zonetwyn.production.ProcessOrder",
        "records": docs,
        "market": `org.zonetwyn.production.Market#${marketId}`,
        "customer": `org.zonetwyn.production.Customer#${customerId}`
      }

      await axios.post(Routes.PROCESS_ORDER, doc, null);

      setLoading(false);
      props.setStep(1);
      handleClose();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Modal
      size='small'
      open={modalOpen}
      onClose={() => handleClose()}>
      <Modal.Header>
        <Header as='h3'>Sale</Header>
      </Modal.Header>
      <Modal.Content>
        <Form>
          <Form.Group widths='equal'>
            <Form.Field>
              <Select className='select-trader' placeholder='Select a market' options={markets} onChange={(e, data) => handleMarket(data.value)}/>
            </Form.Field>
            <Form.Field>
              <Select className='select-trader' placeholder='Select a customer' options={customers} onChange={(e, data) => setCustomerId(data.value)}/>
            </Form.Field>
          </Form.Group>
        </Form>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group widths='equal'>
            <Form.Field>
              <Select className='select-trader' placeholder='Select a product' options={products} onChange={(e, data) => setProductName(data.value)}/>
            </Form.Field>
            <Form.Field>
              <input name='quantity' type='number' ref={register({ required: true, min: 1 })} />
            </Form.Field>
            <Form.Button primary type='submit'>Add</Form.Button>
          </Form.Group>
        </Form>
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Product name</Table.HeaderCell>
              <Table.HeaderCell>Quantity</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {
              records.map(record => {
                return (
                  <Table.Row key={record.key}>
                    <Table.Cell>{record.name}</Table.Cell>
                    <Table.Cell>{record.quantity}</Table.Cell>
                  </Table.Row>
                )
              })
            }
          </Table.Body>
        </Table>
      </Modal.Content>
      <Modal.Actions>
        <Button color='grey' onClick={() => handleClose()}>Cancel</Button>
        <Button primary loading={loading} onClick={() => hanldeSubmit()}>Sumbit</Button>
      </Modal.Actions>
    </Modal>
  )
}

export default Sale;