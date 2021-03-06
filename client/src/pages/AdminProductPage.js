import React, { useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { getUserDetails } from '../actions/userActions';
import { listAllProducts, deleteProduct } from '../actions/productActions';
import { numberWithCommas } from '../utilities';

const AdminProductPage = ({ history }) => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userDetails = useSelector((state) => state.userDetails);
  const { user } = userDetails;

  const productList = useSelector((state) => state.productAll);
  const { loading, products, error } = productList;

  const productDelete = useSelector((state) => state.productDelete);
  const { success } = productDelete;

  useEffect(() => {
    if (!userInfo) {
      history.push('/login');
    } else {
      if (!user || !user.email) {
        dispatch(getUserDetails('profile'));
      } else if ((userInfo && user.isAdmin) || success) {
        dispatch(listAllProducts());
      }

      if (success) {
        dispatch(listAllProducts());
      }
    }
  }, [dispatch, history, userInfo, user, success]);

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure')) {
      dispatch(deleteProduct(id));
    }
  };

  return (
    <>
      <div className='canvas'>
        <div className='canvas-header'>
          <h5>DASHBOARD - PRODUCT</h5>
        </div>
        <div className='canvas-body'>
          <>
            {loading ? (
              <Loader />
            ) : error ? (
              <Message variant='danger'>{error}</Message>
            ) : (
              <>
                <Row>
                  <Col className='d-flex justify-content-end'>
                    <Link
                      className='btn btn-primary my-3'
                      to={`/admin/product/new`}
                    >
                      <i className='fas fa-plus'></i> Create Product
                    </Link>
                  </Col>
                </Row>
                <Table striped bordered hover responsive className='table-sm'>
                  <thead>
                    <tr>
                      <th>NAME</th>
                      <th>PRICE</th>
                      <th>CATEGORY</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((product) => (
                      <tr key={product._id}>
                        <td>{product.name}</td>
                        <td>P{numberWithCommas(product.price)}</td>
                        <td>{product.category}</td>
                        <td>
                          <LinkContainer
                            to={`/admin/product/${product.category}/${product._id}/edit`}
                          >
                            <Button variant='light' className='btn-sm'>
                              <i className='fas fa-edit'></i>
                            </Button>
                          </LinkContainer>
                          <Button
                            variant='danger'
                            className='btn-sm'
                            onClick={() => deleteHandler(product._id)}
                          >
                            <i className='fas fa-trash'></i>
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </>
            )}
          </>
        </div>
      </div>
    </>
  );
};

export default AdminProductPage;
