import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Grid, TextField,Button,LinearProgress,IconButton } from "@material-ui/core";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import MuiPhoneNumber from "material-ui-phone-number";
import DateFnsUtils from "@date-io/date-fns";
import { userActions } from "../_actions";
import Dropzone from "react-dropzone";
import "./UpdateUser.css";
var moment = require('moment');
class UpdateUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        name: "",
        dob: moment(new Date()).format('MM-DD-YYYY'),
        phonenumber: "",
        id:this.props.user.id?this.props.user.id:"",
        image: "Profile Photo",
        address: "",
      },
      selectedImage:undefined,
      isUploading:false,
      isUploaded:false,
      submitted: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount()
  {
   this.props.getUsers();
  }
  handleChange(event) {
    const { name, value } = event.target;
    const { user } = this.state;
    this.setState({
      user: {
        ...user,
        [name]: value,
      },
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState({ submitted: true });
    const { user } = this.state;
    if (user.name && user.dob && user.phonenumber) {
      this.props.update(user);
    }
  }
  handleDateChange = (name, date) => {
    const { user } = this.state;
    this.setState({
      user: {
        ...user,
        [name]: moment(date).format('MM-DD-YYYY')
      },
    });
  };
  clearFile = () => {
    const {user}=this.state;
    this.setState({
      selectedImage: undefined,
      user: {
        ...user,
        ["image"]: "Profile Photo",
      },
    });
};
onDrop = (acceptedFiles) => {
  this.setState({
    isUploading:true
  })
    acceptedFiles[0]["preview"] = URL.createObjectURL(acceptedFiles[0]);
    let imageName = acceptedFiles[0].name;
    const { user } = this.state;
    this.setState({
      ["selectedImage"]: acceptedFiles[0],
      user: {
        ...user,
        ["image"]:imageName
      },
    },()=>{
      this.handleUploadProfile();
    });
};
handleUploadProfile=()=>{
  this.setState({ isUploading: false,isUploaded:true })
}
  handlePhoneNumberChange = (value) => {
    const { user } = this.state;
    this.setState({
      user: {
        ...user,
        ["phonenumber"]: value,
      },
    });
  };
  render() {
    const { user, submitted } = this.state;
    const thumbs = (
        <div
            key={this.state.user.selectedImage}
            className={this.state.user.selectedImage ? "image" : ""}
        >
            <div>
                <a>{this.state.user.image}</a>
            </div>
        </div>
    );
    return (
      <div className="col-md-6 col-md-offset-3 usersection">
        <h4>Update User Detail</h4>
        <form name="form" onSubmit={this.handleSubmit}>
          <div
            className={
              "form-group" + (submitted && !user.name ? " has-error" : "")
            }
          >
            <label htmlFor="name">name</label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={user.name}
              onChange={this.handleChange}
            />
            {submitted && !user.name && (
              <div className="help-block">"name is required"</div>
            )}
          </div>
          <div
            className={
              "form-group" + (submitted && !user.dob ? " has-error" : "")
            }
          >
            <label htmlFor="dob">Date of Birth</label>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <Grid  container>
                <KeyboardDatePicker
                  // disableToolbar
                  // variant="inline"
                  format="dd/MM/yyyy"
                  margin="normal"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  maxDate={new Date()}
                  placeholder="Select DOB"
                  // id="date-picker-inline
                  value={this.state.user.dob}
                  onChange={this.handleDateChange.bind(this, "dob")}
                  KeyboardButtonProps={{
                    "aria-label": "change date",
                  }}
                  keyboardIcon={
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20.5"
                      height="20"
                      viewBox="0 0 31.5 36"
                    >
                      <path
                        id="Icon_awesome-calendar-alt"
                        data-name="Icon awesome-calendar-alt"
                        d="M0,32.625A3.376,3.376,0,0,0,3.375,36h24.75A3.376,3.376,0,0,0,31.5,32.625V13.5H0ZM22.5,18.844A.846.846,0,0,1,23.344,18h2.813a.846.846,0,0,1,.844.844v2.813a.846.846,0,0,1-.844.844H23.344a.846.846,0,0,1-.844-.844Zm0,9A.846.846,0,0,1,23.344,27h2.813a.846.846,0,0,1,.844.844v2.813a.846.846,0,0,1-.844.844H23.344a.846.846,0,0,1-.844-.844Zm-9-9A.846.846,0,0,1,14.344,18h2.813a.846.846,0,0,1,.844.844v2.813a.846.846,0,0,1-.844.844H14.344a.846.846,0,0,1-.844-.844Zm0,9A.846.846,0,0,1,14.344,27h2.813a.846.846,0,0,1,.844.844v2.813a.846.846,0,0,1-.844.844H14.344a.846.846,0,0,1-.844-.844Zm-9-9A.846.846,0,0,1,5.344,18H8.156A.846.846,0,0,1,9,18.844v2.813a.846.846,0,0,1-.844.844H5.344a.846.846,0,0,1-.844-.844Zm0,9A.846.846,0,0,1,5.344,27H8.156A.846.846,0,0,1,9,27.844v2.813a.846.846,0,0,1-.844.844H5.344a.846.846,0,0,1-.844-.844ZM28.125,4.5H24.75V1.125A1.128,1.128,0,0,0,23.625,0h-2.25A1.128,1.128,0,0,0,20.25,1.125V4.5h-9V1.125A1.128,1.128,0,0,0,10.125,0H7.875A1.128,1.128,0,0,0,6.75,1.125V4.5H3.375A3.376,3.376,0,0,0,0,7.875V11.25H31.5V7.875A3.376,3.376,0,0,0,28.125,4.5Z"
                      />
                    </svg>
                  }
                />
              </Grid>
            </MuiPickersUtilsProvider>
            {/* <input type="text" className="form-control" name="dob" value={user.dob} onChange={this.handleChange} /> */}
            {submitted && !user.dob && (
              <div className="help-block">dob is required</div>
            )}
          </div>
          <div
            className={
              "form-group" +
              (submitted && !user.phonenumber ? " has-error" : "")
            }
          >
            <label htmlFor="phonenumber">phonenumber</label>
            <div>
            <MuiPhoneNumber
              defaultCountry={"us"}
              value={this.state.user.phonenumber}
              onChange={this.handlePhoneNumberChange}
            />
            </div>
            {submitted && !user.phonenumber && (
              <div className="help-block">phonenumber is required</div>
            )}
          </div>
          <div
            className={
              "form-group" + (submitted && !user.address ? " has-error" : "")
            }
          >
            <label htmlFor="address">address</label>
            <input
              type="address"
              className="form-control"
              name="address"
              value={user.address}
              onChange={this.handleChange}
            />
            {submitted && !user.address && (
              <div className="help-block">address is required</div>
            )}
          </div>
          <div id="UserImageSection">
            <Dropzone onDrop={this.onDrop} accept="image/*">
                {({ getRootProps, getInputProps }) => (
                    <div {...getRootProps()} className="uploadLogo">
                        <input {...getInputProps()} />
                        {thumbs}
                        <IconButton onClick={this.clearFile}>Browse</IconButton>
                    </div>
                )}
            </Dropzone>
            {this.state.isUploading ? (<div style={{ width: '40%' }}>
                <LinearProgress />
            </div>) : this.state.isUploaded ? <span>File uploaded successfully</span> : ""}
        </div>
          <div className="form-group">
            <button className="btn btn-primary">Save</button>
            {/* {registering && (
              <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
            )} */}
            <Link to="/login" className="btn btn-link">
              Cancel
            </Link>
          </div>
        </form>
      </div>
    );
  }
}

function mapState(state) {
  const { users, authentication } = state;
  const { user } = authentication;
  const { updateIn } = users;
  return { user, users,updateIn };
}

const actionCreators = {
  update: userActions.update,
  getUsers: userActions.getAll,
};
const connectedUpdateUser = connect(mapState, actionCreators)(UpdateUser);
export { connectedUpdateUser as UpdateUser };
