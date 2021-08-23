import React from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer className='py-3 bg-primary text-white text-uppercase'>
      <Container>
        <Row>
          <Col className='text-center py-2 '>
            <Button variant='link' className='footer-link'>
              About
            </Button>
            <Button variant='link' className='footer-link'>
              Privacy
            </Button>
            <Button variant='link' className='footer-link'>
              Terms of Service
            </Button>
          </Col>
        </Row>

        <Row>
          <Col className='text-center pt-2'>&copy; 2021, Zaloza</Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
