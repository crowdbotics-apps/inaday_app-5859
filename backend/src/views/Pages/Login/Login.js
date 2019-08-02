import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Button, Card, CardBody, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import { connect } from 'react-redux';

import { setCookie } from '../../../utils/cookies';
import {Auth} from '../../../services/firebase';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isSuccess: false,
      user: {},
      validate: '',
    };
  }

  onHandleLogin = async (event) => {
    try {
      event.preventDefault();

      let email = event.target.email.value;
      let password = event.target.password.value;

      const user = await Auth.signInWithEmailAndPassword(email, password);

      this.setState({
        isSuccess: true,
        user,
        validate: 'Sign In Successfully!'
      });

    } catch (e) {
      this.setState({
        isSuccess: false,
        validate: e.message,
      });
    }
  };

  render() {
    if (this.state.isSuccess) {
      setCookie('FBUser', this.state.user, 1);
    }
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="6">
              <Card className="p-4">
                <CardBody>
                  <Form onSubmit={this.onHandleLogin}>
                    <h1>Login</h1>
                    <p className="text-muted">Sign In to your account</p>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-user"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        type="email"
                        name="email"
                        placeholder="Email"
                        autoComplete="email"
                      />
                    </InputGroup>
                    <InputGroup className="mb-4">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-lock"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        type="password"
                        name="password"
                        placeholder="Password"
                        autoComplete="current-password"
                      />
                    </InputGroup>
                    {!this.state.isSuccess ? <div className="text-warning py-2">{this.state.validate}</div> : <Redirect to='/dashboard' />}

                    <Row>
                      <Col xs="6">

                      </Col>
                      <Col xs="6" className="text-right">
                        <Button color="primary" className="px-4">Login</Button>
                        {/*<Button color="link" className="px-0">Forgot password?</Button>*/}
                      </Col>
                    </Row>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return state
};

export default connect(mapStateToProps)(Login);
