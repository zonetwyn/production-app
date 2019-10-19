import React, { useState } from 'react';
import { Card, Label, Table, Button, Form, Transition, Loader, Pagination } from 'semantic-ui-react';
import useForm from 'react-hook-form';
import axios from 'axios';
import Routes from '../../utils/Network';
import useInterval from '../../utils/Hooks';

function Markets() {
  const [showForm, setShowForm] = useState(false);
  const [docs, setDocs] = useState([]);
  const [activeDocs, setActiveDocs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(0);
  const [activePage, setActivePage] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [docId, setDocId] = useState('');

  const { register, handleSubmit } = useForm();
  const onSubmit = async (data, e) => {
    const doc = {
      "$class": "org.zonetwyn.production.Market",
      "publicName": data.publicName,
      "ownerId": ""+Date.now(),
      "type": "MARKET",
      "firstName": data.firstName,
      "lastName": data.lastName,
      "balance": Number(data.balance)
    }

    setSubmitting(true);
    try {
      await axios.post(Routes.MARKETS, doc, null);
      setSubmitting(false);
      e.target.reset();
      setShowForm(false);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteDoc = async (docId) => {
    try {
      setDocId(docId);
      await axios.delete(Routes.MARKETS + '/' + docId, null);
      setDocId('');
    } catch (error) {
      console.log(error);
    }
  }

  const fetchData = async () => {
    try {
      const { data } = await axios.get(Routes.MARKETS);
      setLoading(false);
      setDocs(data);
      setActiveDocs(docs.slice(0, 3));
      const pages = (docs.length > 0) ? Math.ceil((docs.length / 3)) : 0;
      setTotalPages(pages)
    } catch (error) {
      console.log(error);
    }
  }

  useInterval(() => {
    fetchData();
  }, 2000);

  const onPageChange = (e, { activePage }) => {
    const first = (activePage - 1) * 3;
    const last = first + 3;
    setActivePage(activePage);
    setActiveDocs(docs.slice(first, last));
  }

  return (
    <Card>
      <header>
        <h3 className='orange'>Markets</h3>
        <Button color='orange' onClick={(e) => setShowForm(!showForm)}>{ showForm ? <i className='fas fa-times'></i> : <i className='fas fa-plus'></i>}</Button>
      </header>
      <Transition visible={showForm} animation='slide right' duration={500}>
        <Form onSubmit={handleSubmit(onSubmit)} className={showForm ? 'visible' : 'hide'}>
          <Form.Group widths='equal'>
            <Form.Field>
              <label>Last name</label>
              <input placeholder='Last Name' name='lastName' ref={register({ required: true })} />
            </Form.Field>
            <Form.Field>
              <label>First name</label>
              <input placeholder='First Name' name='firstName' ref={register({ required: true })} />
            </Form.Field>
          </Form.Group>
          <Form.Group widths='equal'>
            <Form.Field>
              <label>Public name</label>
              <input placeholder='Public name' name='publicName' ref={register({ required: true})} />
            </Form.Field>
            <Form.Field>
              <label>Balance</label>
              <input type='number' name='balance' ref={register({ required: true, min: 10000 })} />
            </Form.Field>
          </Form.Group>
          <Form.Button loading={submitting} primary type='submit'>Save</Form.Button>
        </Form>
      </Transition>
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Public name</Table.HeaderCell>
            <Table.HeaderCell>Orders count</Table.HeaderCell>
            <Table.HeaderCell>Balance</Table.HeaderCell>
            <Table.HeaderCell>#</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        {
          loading ? (
            <Table.Body>
              <Table.Row>
                <Table.Cell colSpan='4'>
                  <Loader active inline='centered' />
                </Table.Cell>
              </Table.Row>
            </Table.Body>
          ) : (
            docs.length > 0 ? (
              <Table.Body>
                {
                  activeDocs.map((doc, i) => {
                    return (
                      <Table.Row key={doc.ownerId}>
                        <Table.Cell>
                          {
                            (i === 0 && activePage === 1) ? (
                              <Label ribbon>{doc.publicName}</Label>
                            ) : (
                              <span>{doc.publicName}</span>
                            )
                          }
                        </Table.Cell>
                        <Table.Cell>{doc.orders ? doc.orders.length : 0}</Table.Cell>
                        <Table.Cell>{doc.balance + ' $'}</Table.Cell>
                        <Table.Cell>
                          <Button loading={docId === doc.ownerId} color='red' onClick={() => { deleteDoc(doc.ownerId) }}>
                            <i className='fas fa-trash-alt'></i>
                          </Button>
                        </Table.Cell>
                      </Table.Row>
                    )
                  })
                }
              </Table.Body>
            ) : (
              <Table.Body>
                <Table.Row>
                  <Table.Cell colSpan='4' className='text-centered'>
                    No data found
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            )
          )
        }

        <Table.Footer>
          <Table.Row>
            <Table.HeaderCell colSpan='4'>
              <Pagination 
                defaultActivePage={1}
                ellipsisItem={null}
                firstItem={null}
                lastItem={null}
                siblingRange={1}
                totalPages={totalPages}
                onPageChange={onPageChange}
                floated='right' />
            </Table.HeaderCell>
          </Table.Row>
        </Table.Footer>
      </Table>
    </Card>
  )
}

export default Markets;