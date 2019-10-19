import React, { useState, useEffect } from 'react';
import { Table, Loader } from 'semantic-ui-react';
import axios from 'axios';
import Routes from '../../../utils/Network'

function Orders(props) {
  const [order, setOrder] = useState({});
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  });

  const fetchData = async () => {
    try {
      const { data } = await axios.get(Routes.ORDERS + '/' + props.order.split('#')[1], null);
      if (data.records && data.records.length > 0) {
        const items = [];
        const docs = data.records;
        // Fetch price
        for (let i=0; i<docs.length; i++) {
          const doc = docs[i];
          const configs = {
            params: {
              filter: JSON.stringify({
                "where": {
                  "and": [
                    { "owner": `${data.market}`},
                    { "productName": `${doc.name}`}
                  ]
                }
              })
            }
          }
          const productsResult = await axios.get(Routes.PRODUCT, configs);
          doc['price'] = productsResult.data[0].price;
          items.push(doc);
        }
        setLoading(false);
        setRecords(items);
        setOrder(data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Table celled>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Product name</Table.HeaderCell>
          <Table.HeaderCell>Quantity</Table.HeaderCell>
          <Table.HeaderCell>Price ($)</Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      {
        loading ? (
          <Table.Body>
            <Table.Row>
              <Table.Cell colSpan='3'><Loader active inline='centered' /></Table.Cell>
            </Table.Row>
          </Table.Body>
        ) : (
          records.length > 0 ? (
            <Table.Body>
              {
                records.map(record => {
                  return (
                    <Table.Row>
                      <Table.Cell>{record.name}</Table.Cell>
                      <Table.Cell>{record.quantity}</Table.Cell>
                      <Table.Cell>{record.price * record.quantity}</Table.Cell>
                    </Table.Row>
                  )
                })
              }
            </Table.Body>
          ) : (
            <Table.Body>
              <Table.Row>
                <Table.Cell colSpan='3'>No Data found</Table.Cell>
              </Table.Row>
            </Table.Body>
          )
        )
      }

      <Table.Footer>
        <Table.Row>
          <Table.HeaderCell>Total</Table.HeaderCell>
          <Table.HeaderCell colSpan='2'>{order.totalPrice + ' $'}</Table.HeaderCell>
        </Table.Row>
      </Table.Footer>
    </Table>
  )
}

export default Orders;