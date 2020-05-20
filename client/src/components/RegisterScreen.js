import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { Mutation} from 'react-apollo';

class RegisterScreen extends Component {
    render() {
        return (
            <div class="container">
                <div class="row align-self-center">
                    <div class="col-sm" style={{transform:"translateY(10%)"}}>
                        <div id="home_banner_container">
                            <div>Register</div>
                        </div>
                        <div class="form-group">
                            <label>Email Address</label>
                            <input type="email" class="form-control" aria-desbribedby="emailHelp" placeholder="logoman@email.com"></input>
                        </div>
                        <div class="form-group">
                            <label>Password</label>
                            <input type="password" class="form-control" placeholder="password"></input>
                        </div>
                        <div class="form-group">
                            <label>Confirm Password</label>
                            <input type="password" class="form-control" placeholder="password"></input>
                        </div>
                        <Link to={`./`} className="btn btn-primary">Register</Link>
                        <Link to={`./login`} className="btn btn-secondary">Back to Login</Link>
                    </div>
                </div>
            </div>
        )
    }
}
export default RegisterScreen;