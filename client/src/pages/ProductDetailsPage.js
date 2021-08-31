import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  Button,
  Card,
  Col,
  // Form,
  Image,
  ListGroup,
  Row,
} from 'react-bootstrap';

import Message from '../components/Message';
import Loader from '../components/Loader';

import { numberWithCommas } from '../utilities';

import { listProductDetails } from '../actions/productActions';

const ProductDetailsPage = ({ match }) => {
  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  useEffect(() => {
    if (!product._id || product._id !== match.params.id) {
      dispatch(listProductDetails(match.params.category, match.params.id));
    }
    // eslint-disable-next-line
  }, [dispatch, match]);

  return (
    <>
      <Link
        className='btn btn-light my-3'
        to={`/products/${match.params.category}/`}
      >
        Go Back
      </Link>

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Row>
            <Col md={4}>
              <Image src={product.image} alt={product.name} fluid />
            </Col>
            <Col md={5}>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <h3>{product.name}</h3>
                  <h5>P{product.price && numberWithCommas(product.price)}</h5>
                  <p>{product.description}</p>
                </ListGroup.Item>
                <ListGroup.Item>
                  <p>
                    <i className='fas fa-check'></i> 30 Days Return
                  </p>
                  <p>
                    <i className='fas fa-check'></i> Cash On Delivery
                  </p>
                </ListGroup.Item>
                <ListGroup.Item>
                  <p className='font-weight-bold'>Delivery estimate</p>
                  <p>
                    Greater NCR: 2-4 days, Major cities: 3-8 days, Provincial:
                    4-9 days. All in working days
                  </p>
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={3}>
              <Card>
                <ListGroup variant='flush'>
                  <ListGroup.Item className='v-space'>
                    <p>100% Original Product</p>
                    <p>Select Size</p>

                    {console.log(product.stocks)}

                    {/* {product.stocks.foreach((stock) => (
                      <p>{stock.size}</p>
                    ))} */}

                    <Button className='btn-add'>Add To Cart</Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default ProductDetailsPage;
