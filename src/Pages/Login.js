import React, { useState } from "react";
import { GoogleLogin } from "react-google-login";

import { useHistory } from "react-router-dom";

import classes from "./Login.module.css";

import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Image from "react-bootstrap/Image";
import Form from "react-bootstrap/Form";

const Login = () => {
  const [response, setResponse] = useState({});
  let history = useHistory();

  const responseGoogle = async (res) => {
    setResponse(res);
    if (res.accessToken !== undefined) {
      localStorage.setItem("accessToken", res.accessToken);
      localStorage.setItem("googleID", res.googleId);
      history.push("/googlegrade");
    }
  };

  const googleButton = (
    <GoogleLogin
      clientId={process.env.REACT_APP_CLIENT_ID}
      buttonText="Sign In With Google"
      onSuccess={responseGoogle}
      onFailure={responseGoogle}
      cookiePolicy={"single_host_origin"}
      scope={"https://www.googleapis.com/auth/plus.business.manage"}
    />
  );

  return (
    <Container className={classes.cont}>
      <Row>
        <Col md={4} className={classes.leftCol}>
          <Image src="" rounded />
        </Col>
        <Col md={8} className={classes.Col}>
          <div className={classes.button}>{googleButton}</div>
          <Form.Group
            controlId="formBasicCheckbox"
            className={classes.formCheck}
          >
            <Form.Check
              type="checkbox"
              label=" I agree to Lokalysts Terms of Service"
            />
            <Form.Check
              type="checkbox"
              label=" I accept Lokalyst's use of my data for the service and everything else described in the Privacy Policy"
            />
          </Form.Group>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
