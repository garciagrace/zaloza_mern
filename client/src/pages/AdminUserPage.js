import React, { useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import SideNav from '../components/SideNav';
import { getAllUsers } from '../actions/userActions';

const AdminUserPage = ({ history }) => {
  const dispatch = useDispatch();

  const userList = useSelector((state) => state.userList);
  const { loading, error, users } = userList;

  const userDetails = useSelector((state) => state.userDetails);
  const { user: currentUser } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo && currentUser.isAdmin) {
      dispatch(getAllUsers());
    } else {
      history.push('/login');
    }
  }, [dispatch, history, userInfo, currentUser]);

  return (
    <Row>
      <Col md={3}>
        <SideNav isAdmin={currentUser.isAdmin} />
      </Col>
      <Col md={9}>
        <>
          <div className='canvas'>
            <div className='canvas-header'>
              <h5>DASHBOARD - USER</h5>
            </div>
            <div className='canvas-body'>
              {loading ? (
                <Loader />
              ) : error ? (
                <Message variant='danger'>{error}</Message>
              ) : (
                <Table striped bordered hover responsive className='table-sm'>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>EMAIL</th>
                      <th>ADMIN</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr key={user._id}>
                        <td>{user._id}</td>
                        <td>
                          <a href={`mailto:${user.email}`}>{user.email}</a>
                        </td>
                        <td>
                          {user.isAdmin ? (
                            <i
                              className='fas fa-check'
                              style={{ color: 'green' }}
                            ></i>
                          ) : (
                            <i
                              className='fas fa-times'
                              style={{ color: 'red' }}
                            ></i>
                          )}
                        </td>
                        <td>
                          <LinkContainer to={`/admin/user/${user._id}/edit`}>
                            <Button variant='light' className='btn-sm'>
                              <i className='fas fa-edit'></i>
                            </Button>
                          </LinkContainer>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              )}
            </div>
          </div>
        </>
      </Col>
    </Row>
  );
};

export default AdminUserPage;
