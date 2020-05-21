import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { Mutation} from 'react-apollo';

class LoginScreen extends Component{
    render() {
        return (
            <div class="container">
                <div class="row">
                    <div class = "col" id="home_banner_container">
                        <div style={{fontSize:"100px"}}>Logo Maker</div>
                        <div style={{fontSize:"40px"}}>Special Edition</div>
                    </div>
                    <div class ="col" style={{transform:"translateY(100%)"}}>
                        <div class="form-group">
                            <label>Email Address</label>
                            <input type="email" class="form-control" aria-desbribedby="emailHelp" placeholder="logoman@email.com"></input>
                        </div>
                        <div class="form-group">
                            <label>Password</label>
                            <input type="password" class="form-control" placeholder="password"></input>
                        </div>
                        <div class="form-group">
                            <Link to={`./register`} className="btn btn-secondary">Register</Link>
                            <Link to={`./home`} className="btn btn-primary">Login</Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default LoginScreen;