import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import { userActions } from '../_actions';
class HomePage extends React.Component {
    componentDidMount() {
        this.props.getUsers();
    }
    render() {
        const { user, users } = this.props;
        return (
            <div style={{width:"100%"}} className="TableData">
                <h1>Hi {user.username}!</h1>
                <h3>All users:</h3>
                {users.loading && <em>Loading users...</em>}
                {users.error && <span className="text-danger">ERROR: {users.error}</span>}
                <TableContainer component={Paper}>
      <Table style={{minWidth:'850'}} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Email</TableCell>
            <TableCell align="right">phoneNumber</TableCell>
            <TableCell align="right">Address</TableCell>
            <TableCell align="right">DOB</TableCell>
            <TableCell align="right">Image</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {users.items && users.items.map((user, index) =>  (
            <TableRow key={user.id}>
              <TableCell component="th" scope="row">
                {user.name}
              </TableCell>
              <TableCell align="right">{user.email}</TableCell>
              <TableCell align="right">{user.phonenumber}</TableCell>
              <TableCell align="right">{user.address}</TableCell>
              <TableCell align="right">{user.dob}</TableCell>
              <TableCell align="right">{user.image}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
                <p>
                    <Link to="/login">Logout</Link>
                </p>
            </div>
        );
    }
}

function mapState(state) {
    const { users, authentication } = state;
    const { user } = authentication;
    return { user, users };
}

const actionCreators = {
    getUsers: userActions.getAll,
}

const connectedHomePage = connect(mapState, actionCreators)(HomePage);
export { connectedHomePage as HomePage };