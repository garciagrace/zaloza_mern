import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Row, Col, Table } from 'react-bootstrap';
import FormContainer from '../components/FormContainer';
import { useDispatch, useSelector } from 'react-redux';

import { listProductDetails, updateProduct } from '../actions/productActions';
import Message from '../components/Message';
import Loader from '../components/Loader';

const AdminUpdateProductPage = ({ match, history }) => {
  const [name, setName] = useState('');
  const [brand, setBrand] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [productType, setProductType] = useState('');
  const [price, setPrice] = useState(0);
  const [stocks, setStocks] = useState([]);
  const [size, setSize] = useState('');
  const [qty, setQty] = useState(0);
  const [image, setImage] = useState('');
  const [uploading, setUploading] = useState('');

  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const productUpdate = useSelector((state) => state.productUpdate);
  const { success: successUpdate } = productUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: 'PRODUCT_UPDATE_RESET' });
      dispatch({ type: 'PRODUCT_DETAILS_RESET' });
      history.push('/admin/product');
    } else {
      if (!product.name || product._id !== match.params.id) {
        dispatch(listProductDetails(match.params.category, match.params.id));
      } else {
        setName(product.name);
        setBrand(product.brand);
        setDescription(product.description);
        setCategory(product.category);
        setProductType(product.productType);
        setPrice(product.price);
        setStocks(product.stocks);
        setSize(product.size);
        setQty(product.qty);
        setImage(product.image);
      }
    }
  }, [dispatch, history, match, product, successUpdate]);

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('image', file);
    setUploading(true);

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };

      const { data } = await axios.post('/api/upload', formData, config);

      setImage(data);
      setUploading(false);
    } catch (error) {
      console.error(error);
      setUploading(false);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateProduct({
        _id: match.params.id,
        name,
        brand,
        description,
        category,
        productType,
        price,
        stocks,
        image,
      })
    );
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

          {loading ? (
            <Loader />
          ) : error ? (
            <Message variant='danger'>{error}</Message>
          ) : (
            <FormContainer>
              <Form onSubmit={submitHandler}>
                <Form.Group controlId='name'>
                  <Form.Label>Product Name</Form.Label>
                  <Form.Control
                    type='name'
                    placeholder='Enter product name'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  ></Form.Control>
                </Form.Group>

                <Form.Group controlId='brand'>
                  <Form.Label>Brand</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='Enter brand name'
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                    required
                  ></Form.Control>
                </Form.Group>

                <Form.Group controlId='description'>
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='Enter description'
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                  ></Form.Control>
                </Form.Group>

                <Form.Group controlId='category'>
                  <Form.Label>Category</Form.Label>
                  <Form.Control
                    as='select'
                    value={category}
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
                    value={productType}
                    onChange={(e) => setProductType(e.target.value)}
                    required
                  >
                    <option key='0' value=''>
                      Enter product type
                    </option>
                    <option key='1' value='Clothing'>
                      Clothing
                    </option>
                    <option key='2' value='Footwear'>
                      Footwear
                    </option>
                    <option key='3' value='Smallclothes'>
                      Smallclothes
                    </option>
                    <option key='4' value='One Size'>
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
                    onKeyPress={(e) =>
                      !/[0-9]/.test(e.key) && e.preventDefault()
                    }
                    value={price}
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
                        ) : productType === 'Footwear' ? (
                          <>
                            <option key='1' value='US - 4'>
                              US - 4
                            </option>
                            <option key='2' value='US - 5'>
                              US - 5
                            </option>
                            <option key='3' value='US - 6'>
                              US - 6
                            </option>
                            <option key='4' value='US - 7'>
                              US - 7
                            </option>
                            <option key='5' value='US - 8'>
                              US - 8
                            </option>
                            <option key='6' value='US - 9'>
                              US - 9
                            </option>
                            <option key='7' value='US - 10'>
                              US - 10
                            </option>
                            <option key='8' value='US - 11'>
                              US - 11
                            </option>
                            <option key='9' value='US - 12'>
                              US - 12
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

                <Form.Group controlId='image' className='mt-3'>
                  <Form.Label>Image</Form.Label>
                  <Form.File
                    id='image-file'
                    accept='.png, .jpg, .jpeg'
                    custom
                    onChange={uploadFileHandler}
                  ></Form.File>
                  {uploading && <Loader />}
                </Form.Group>

                <hr />

                <Button className='mt-2' type='submit' variant='primary'>
                  Update Product
                </Button>
              </Form>
            </FormContainer>
          )}
        </div>
      </div>
    </>
  );
};

export default AdminUpdateProductPage;
