import React, { useState } from 'react';
import { Card, Label, Table, Button, Form, Transition, Loader, Pagination, Select } from 'semantic-ui-react';
import useForm from 'react-hook-form';
import axios from 'axios';
import Routes from '../../utils/Network';
import useInterval from '../../utils/Hooks';

const genders = [
  { key: 'm', text: 'Male', value: 'MALE' },
  { key: 'f', text: 'Female', value: 'FEMALE' }
]

function Customers() {
  const [showForm, setShowForm] = useState(false);
  const [docs, setDocs] = useState([]);
  const [activeDocs, setActiveDocs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(0);
  const [activePage, setActivePage] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [docId, setDocId] = useState('');
  const [gender, setGender] = useState('MALE');

  const { register, handleSubmit } = useForm();
  const onSubmit = async (data, e) => {
    const doc = {
      "$class": "org.zonetwyn.production.Customer",
      "gender": gender,
      "age": Number(data.age),
      "ownerId": ""+Date.now(),
      "type": "CUSTOMER",
      "firstName": data.firstName,
      "lastName": data.lastName,
      "balance": Number(data.balance)
    }

    setSubmitting(true);
    try {
      await axios.post(Routes.CUSTOMERS, doc, null);
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
      await axios.delete(Routes.CUSTOMERS + '/' + docId, null);
      setDocId('');
    } catch (error) {
      console.log(error);
    }
  }

  const fetchData = async () => {
    try {
      const { data } = await axios.get(Routes.CUSTOMERS);
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
        <h3 className='grey'>Customers</h3>
        <Button color='grey' onClick={(e) => setShowForm(!showForm)}>{ showForm ? <i className='fas fa-times'></i> : <i className='fas fa-plus'></i>}</Button>
      </header>
      <Transition visible={showForm} animation='slide right' duration={500}>
        <Form onSubmit={handleSubmit(onSubmit)} className={showForm ? 'visible' : 'hide'}>
          <Form.Group widths='equal'>
            <Form.Field>
              <label>Gender</label>
              <Select options={genders} onChange={(e, data) => setGender(data.value)} />
            </Form.Field>
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
              <label>Age</label>
              <input type='number' name='age' ref={register({ required: true, min: 10 })} />
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
            <Table.HeaderCell>Last name</Table.HeaderCell>
            <Table.HeaderCell>First name</Table.HeaderCell>
            <Table.HeaderCell>Orders count</Table.HeaderCell>
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

export default Customers;