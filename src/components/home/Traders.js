import React, { useState } from 'react';
import { Card, Label, Table, Button, Form, Transition, Loader, Pagination } from 'semantic-ui-react';
import useForm from 'react-hook-form';
import axios from 'axios';
import Routes from '../../utils/Network';
import useInterval from '../../utils/Hooks';

function Traders() {
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
      "$class": "org.zonetwyn.production.Trader",
      "marketAddress": data.marketAddress,
      "ownerId": ""+Date.now(),
      "type": "TRADER",
      "firstName": data.firstName,
      "lastName": data.lastName,
      "balance": Number(data.balance)
    }

    setSubmitting(true);
    try {
      await axios.post(Routes.TRADERS, doc, null);
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
      await axios.delete(Routes.TRADERS + '/' + docId, null);
      setDocId('');
    } catch (error) {
      console.log(error);
    }
  }

  const fetchData = async () => {
    try {
      const { data } = await axios.get(Routes.TRADERS);
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
        <h3>Traders</h3>
        <Button primary onClick={(e) => setShowForm(!showForm)}>{ showForm ? <i className='fas fa-times'></i> : <i className='fas fa-plus'></i>}</Button>
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
              <label>Address</label>
              <input placeholder='Address' name='marketAddress' ref={register({ required: true })} />
            </Form.Field>
            <Form.Field>
              <label>Balance</label>
              <input name='balance' type='number' ref={register({ required: true, min: 1000 })} />
            </Form.Field>
          </Form.Group>
          <Form.Button loading={submitting} primary type='submit'>Save</Form.Button>
        </Form>
      </Transition>
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Last name</Table.HeaderCell>
            <Table.HeaderCell>First name</Table.HeaderCell>
            <Table.HeaderCell>Seeds count</Table.HeaderCell>
            <Table.HeaderCell>Balance</Table.HeaderCell>
            <Table.HeaderCell>#</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        {
          loading ? (
            <Table.Body>
              <Table.Row>
                <Table.Cell colSpan='5'>
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
                              <Label ribbon>{doc.lastName}</Label>
                            ) : (
                              <span>{doc.lastName}</span>
                            )
                          }
                        </Table.Cell>
                        <Table.Cell>{doc.firstName}</Table.Cell>
                        <Table.Cell>{doc.seeds ? doc.seeds.length : 0}</Table.Cell>
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
                  <Table.Cell colSpan='5' className='text-centered'>
                    No data found
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            )
          )
        }

        <Table.Footer>
          <Table.Row>
            <Table.HeaderCell colSpan='5'>
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

export default Traders;