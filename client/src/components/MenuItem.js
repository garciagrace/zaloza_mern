import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const MenuItem = ({ item }) => {
  return (
    <Card className='text-white my-2 menu'>
      <Link to={`/products/${item.toLowerCase()}/`}>
        <Card.Img
          src={`/images/menu/${item.toLowerCase()}.jpg`}
          alt='Card image'
        />
        <Card.ImgOverlay>
          <Card.Title as='div'>
            <h3>SHOP {item}</h3>
          </Card.Title>
        </Card.ImgOverlay>
      </Link>
    </Card>
  );
};

export default MenuItem;
