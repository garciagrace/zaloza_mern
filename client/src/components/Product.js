import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { numberWithCommas } from '../utilities';

const Product = ({ product }) => {
  return (
    <Card className='product'>
      <Link to={`/products/${product.category.toLowerCase()}/${product._id}`}>
        <Card.Img variant='top' src={product.image} />
        <Card.Body>
          <Card.Text as='div' className='product-title'>
            <h5>{product.name}</h5>
          </Card.Text>
          <Card.Text as='div'>
            <p>P{product.price && numberWithCommas(product.price)}</p>
          </Card.Text>
        </Card.Body>
      </Link>
    </Card>
  );
};

export default Product;
