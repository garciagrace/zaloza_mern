import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Row } from 'react-bootstrap';

import Product from '../components/Product';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { listAllProducts } from '../actions/productActions';

const ProductListPage = ({ match }) => {
  const keyword = match.params.keyword;

  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productAll);
  const { products, loading, error } = productList;

  // Request to the server to fetch data - all products by keyword
  useEffect(() => {
    dispatch(listAllProducts(keyword));
  }, [dispatch, keyword]);

  return (
    <>
      <h1>{keyword}</h1>

      <Link className='btn btn-light my-3' to='/'>
        Go Back
      </Link>

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Row>
          {/* Filtered product with specific category and map through each filtered product */}
          {products.map((item) => (
            <Col key={item._id} sm={12} md={6} lg={3}>
              <Product product={item} />
            </Col>
          ))}
        </Row>
      )}
    </>
  );
};

export default ProductListPage;
