import React, { useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button } from 'react-bootstrap';
import { Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import SideNav from '../components/SideNav';
import { getUserDetails } from '../actions/userActions';
import { listAllProducts } from '../actions/productActions';

const AdminProductPage = ({ history }) => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userDetails = useSelector((state) => state.userDetails);
  const { user } = userDetails;

  const productList = useSelector((state) => state.productAll);
  const { loading, products, error } = productList;

  useEffect(() => {
    if (!userInfo) {
      history.push('/login');
    } else {
      if (!user || !user.email) {
        dispatch(getUserDetails('profile'));
      } else if (userInfo && user.isAdmin) {
        dispatch(listAllProducts());
      }
    }
  }, [dispatch, history, userInfo, user]);

  return (
    <Row>
      <Col md={3}>
        <SideNav />
      </Col>
      <Col md={9}>
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
                    <Table
                      striped
                      bordered
                      hover
                      responsive
                      className='table-sm'
                    >
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
                            <td>P{product.price}</td>
                            <td>{product.category}</td>
                            <td>
                              <LinkContainer
                                to={`/admin/product/${product._id}/edit`}
                              >
                                <Button variant='light' className='btn-sm'>
                                  <i className='fas fa-edit'></i>
                                </Button>
                              </LinkContainer>
                              <Button variant='danger' className='btn-sm'>
                                <i className='fas fa-trash'></i>
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>

                    {console.log(products)}
                  </>
                )}
              </>
            </div>
          </div>
        </>
      </Col>
    </Row>
  );
};

export default AdminProductPage;
