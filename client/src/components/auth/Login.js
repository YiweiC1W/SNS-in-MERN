import React, { Fragment, useState } from "react";
import {Link, Redirect} from "react-router-dom";
import {connect} from 'react-redux';
import {login} from '../../actions/auth.action'

const Login = ({isAuthenticated, login}) => {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const {email, password} = formData;

  const onChange = e =>
      setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    if (password.length<6) {
      console.log("password not good");
    } else {
      login(email ,password);
    }
  };

  // redirect if logged in
    if (isAuthenticated){
        return <Redirect to="/dashboard"/>
    }


  return (
      <Fragment>
        <h1 className="large text-primary">Sign In</h1>
        <p className="lead">
          <i className="fas fa-user" /> Login Your Account
        </p>
        <form className="form" onSubmit={e => onSubmit(e)}>
          <div className="form-group">
            <input
                type="email"
                placeholder="Email Address"
                name="email"
                value={email}
                onChange={e => onChange(e)}
                required
            />
            <small className="form-text">
              This site uses Gravatar so if you want a profile image, use a
              Gravatar email
            </small>
          </div>
          <div className="form-group">
            <input
                type="password"
                placeholder="Password"
                name="password"
                minLength="6"
                value={password}
                onChange={e => onChange(e)}
                required
            />
          </div>
          <input type="submit" className="btn btn-primary" value="Login" />
        </form>
        <p className="my-1">
          Not have an account? <Link to="/register">Sign Up</Link>
        </p>
      </Fragment>
  );
};

const mapStateToProps = state =>({
    isAuthenticated: state.auth.isAuthenticated
});

const mapDispatchToProps = {
    login: login
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
