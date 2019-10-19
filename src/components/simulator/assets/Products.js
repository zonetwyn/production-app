import React, { useState, useEffect } from 'react';
import { Table, Loader } from 'semantic-ui-react';
import axios from 'axios';
import Routes from '../../../utils/Network'

function Products(props) {

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const docs = props.products;
      if (docs && docs.length > 0) {
        const array = [];
        for (let i=0; i<docs.length; i++) {
          // Fetch product
          const docId = docs[i].split('#')[1];
          const productResult = await axios.get(Routes.PRODUCT + '/' + docId, null);
          const product = productResult['data'];
          
          // Fetch stock
          const configs = {
            params: {
              filter: JSON.stringify({
                "where": {
                  "product": `resource:${product['$class']}#${product['productId']}`
                }
              })
            }
          }
          const stockResult = await axios.get(Routes.STOCK, configs);
          const stock = stockResult['data'][0];
          product['stock'] = stock;
          array.push(product);
        }
        setLoading(false);
        setProducts(array);
      } else {
        setLoading(false);
        setProducts(docs);
      }
    }

    setTimeout(() => {
      fetchData();
    }, 500);
  }, [props.products])

  return (
    <Table celled>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Product name</Table.HeaderCell>
          <Table.HeaderCell>Price ($)</Table.HeaderCell>
          <Table.HeaderCell>Stock</Table.HeaderCell>
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
          (products && products.length > 0) ? (
            <Table.Body>
              {
                products.map(product => {
                  return (
                    <Table.Row key={product.productId}>
                      <Table.Cell>{product.productName}</Table.Cell>
                      <Table.Cell>{product.price}</Table.Cell>
                      <Table.Cell>{product.stock.quantity}</Table.Cell>
                    </Table.Row>
                  )
                })
              }
            </Table.Body>
          ) : (
            <Table.Body>
              <Table.Row>
                <Table.Cell colSpan='3' className='text-centered'>No products</Table.Cell>
              </Table.Row>
            </Table.Body>
          )
        )
      }
      
    </Table>
  )
}

export default Products;