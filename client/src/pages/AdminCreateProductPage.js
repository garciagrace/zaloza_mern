import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Row, Col, Table } from 'react-bootstrap';
import FormContainer from '../components/FormContainer';
import { useDispatch, useSelector } from 'react-redux';

import { createProduct } from '../actions/productActions';
import Message from '../components/Message';

const AdminCreateProductPage = ({ history }) => {
  const dispatch = useDispatch();

  const [name, setName] = useState('');
  const [brand, setBrand] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [productType, setProductType] = useState('');
  const [price, setPrice] = useState(0);
  const [stocks, setStocks] = useState([]);
  const [size, setSize] = useState('');
  const [qty, setQty] = useState(0);

  const productCreate = useSelector((state) => state.productCreate);
  const { success, error } = productCreate;

  useEffect(() => {
    if (success) {
      history.push('/admin/product');
      dispatch({ type: 'PRODUCT_LIST_ALL_RESET' });
    }
  }, [dispatch, history, success]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (stocks.length !== 0) {
      dispatch(
        createProduct({
          name,
          brand,
          description,
          category,
          productType,
          price,
          stocks,
          image: '-',
        })
      );
    }
  };

  const addStockHandler = () => {
    if (size !== '' && qty > 0) {
      setStocks([
        ...stocks,
        {
          size,
          qty,
        },
      ]);
    }
  };

  return (
    <>
      <div className='canvas'>
        <div className='canvas-header'>
          <h5>DASHBOARD - NEW PRODUCT</h5>
        </div>
        <div className='canvas-body'>
          <Link className='btn btn-light my-3' to={`/admin/product/`}>
            Go Back
          </Link>
          <FormContainer>
            {error && <Message variant='danger'>{error}</Message>}
            <Form onSubmit={submitHandler}>
              <Form.Group controlId='name'>
                <Form.Label>Product Name</Form.Label>
                <Form.Control
                  type='name'
                  placeholder='Enter product name'
                  onChange={(e) => setName(e.target.value)}
                  required
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId='brand'>
                <Form.Label>Brand</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Enter brand name'
                  onChange={(e) => setBrand(e.target.value)}
                  required
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId='description'>
                <Form.Label>Description</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Enter description'
                  onChange={(e) => setDescription(e.target.value)}
                  required
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId='category'>
                <Form.Label>Category</Form.Label>
                <Form.Control
                  as='select'
                  onChange={(e) => setCategory(e.target.value)}
                  required
                >
                  <option key='0' value=''>
                    Enter category
                  </option>
                  <option key='1' value='Men'>
                    Men
                  </option>
                  <option key='2' value='Women'>
                    Women
                  </option>
                  <option key='3' value='Kids'>
                    Kids
                  </option>
                  <option key='4' value='Beauty'>
                    Beauty
                  </option>
                  <option key='5' value='Home'>
                    Home
                  </option>
                  <option key='6' value='Gadgets'>
                    Gadgets
                  </option>
                </Form.Control>
              </Form.Group>

              <Form.Group controlId='productType'>
                <Form.Label>Product Type</Form.Label>
                <Form.Control
                  as='select'
                  onChange={(e) => setProductType(e.target.value)}
                  required
                >
                  <option key='0' value=''>
                    Enter product type
                  </option>
                  <option key='1' value='Clothing'>
                    Clothing
                  </option>
                  <option key='2' value='Smallclothes'>
                    Smallclothes
                  </option>
                  <option key='3' value='One Size'>
                    One Size
                  </option>
                </Form.Control>
              </Form.Group>

              <Form.Group controlId='price'>
                <Form.Label>Product Price</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Enter product price'
                  pattern='[0-9]*'
                  onKeyPress={(e) => !/[0-9]/.test(e.key) && e.preventDefault()}
                  onChange={(e) => setPrice(e.target.value)}
                  required
                ></Form.Control>
              </Form.Group>

              <Row>
                <Col>
                  <Form.Group controlId='size'>
                    <p className='fw-900'>Number of Stocks</p>
                    <Form.Label>Size</Form.Label>
                    <Form.Control
                      as='select'
                      onChange={(e) => setSize(e.target.value)}
                      required
                    >
                      <option key='0' value=''>
                        Enter size
                      </option>

                      {productType === 'Clothing' ? (
                        <>
                          <option key='1' value='XS'>
                            XS
                          </option>
                          <option key='2' value='S'>
                            S
                          </option>
                          <option key='3' value='M'>
                            M
                          </option>
                          <option key='4' value='L'>
                            L
                          </option>
                          <option key='5' value='XL'>
                            XL
                          </option>
                        </>
                      ) : productType === 'Smallclothes' ? (
                        <>
                          <option key='1' value='1y - 2y'>
                            1y - 2y
                          </option>
                          <option key='2' value='3y - 4y'>
                            3y - 4y
                          </option>
                          <option key='3' value='5y - 6y'>
                            5y - 6y
                          </option>
                          <option key='4' value='7y - 8y'>
                            7y - 8y
                          </option>
                        </>
                      ) : (
                        productType === 'One Size' && (
                          <>
                            <option key='1' value='One Size'>
                              One Size
                            </option>
                          </>
                        )
                      )}
                    </Form.Control>
                  </Form.Group>

                  <Form.Group controlId='qty'>
                    <Form.Label>Quantity</Form.Label>
                    <Form.Control
                      type='text'
                      placeholder='Enter quantity'
                      pattern='[0-9]*'
                      onKeyPress={(e) =>
                        !/[0-9]/.test(e.key) && e.preventDefault()
                      }
                      onChange={(e) => setQty(e.target.value)}
                      required
                    ></Form.Control>
                  </Form.Group>

                  <p>&#8251; Add stock first</p>

                  <Button className='btn-sm mt-2' onClick={addStockHandler}>
                    Add stocks
                  </Button>
                </Col>
                <Col>
                  {stocks.length !== 0 && (
                    <>
                      <Table
                        striped
                        bordered
                        hover
                        responsive
                        className='table-sm'
                      >
                        <thead>
                          <tr>
                            <th>Size</th>
                            <th>Qty</th>
                          </tr>
                        </thead>
                        <tbody>
                          {stocks.map((stock, index) => (
                            <tr key={index}>
                              <td>{stock.size}</td>
                              <td>{stock.qty}</td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    </>
                  )}
                </Col>
              </Row>

              <hr />

              <Button className='mt-2' type='submit' variant='primary'>
                Add Product
              </Button>
            </Form>
          </FormContainer>
        </div>
      </div>
    </>
  );
};

export default AdminCreateProductPage;
