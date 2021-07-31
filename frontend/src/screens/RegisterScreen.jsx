import React, { useState, useEffect } from "react";
import Spinner from "../components/Spinner";
import Message from "../components/Message";
import { Link } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../actions/userActions";
import FormContainer from "../components/FormContainer";
import { validate } from "react-email-validator";

const RegisterScreen = ({ location, history }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);

  const [errors, setErrors] = useState({});

  const dispatch = useDispatch();

  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error, userInfo } = userRegister;

  const redirect = location.search ? location.search.split("=")[1] : "/";

  const findFormErrors = () => {
    const newErrors = {};

    if (!name || name === "") newErrors.name = "cannot be blank!";
    else if (name.length > 30) newErrors.name = "name is too long!";

    if (!email || email === "") newErrors.email = "cannot be blank!";
    else if (!validate(email)) newErrors.email = "Invalid Email";

    if (!password || password === "") newErrors.password = "cannot be blank!";
    if (!confirmPassword || confirmPassword === "")
      newErrors.confirmPassword = "cannot be blank!";
    else if (confirmPassword !== password) {
      newErrors.password = "Password doesn't match!";
    }
    return newErrors;
  };

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    const newErrors = findFormErrors();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    }
    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
    } else {
      dispatch(register(name, email, password));
    }
  };

  return (
    <FormContainer>
      <h1>Sign Up</h1>
      {message && <Message variant='danger'>{message}</Message>}
      {error && <Message variant='danger'>{error}</Message>}
      {loading && <Spinner />}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='name'>
          <Form.Label>Name</Form.Label>
          <Form.Control
            type='name'
            placeholder='Enter name'
            value={name}
            onChange={(e) => setName(e.target.value)}
            isInvalid={!!errors.name}
          ></Form.Control>
          <Form.Control.Feedback type='invalid'>
            {errors.name}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId='email'>
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type='email'
            placeholder='Enter email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            isInvalid={!!errors.email}
          ></Form.Control>
          <Form.Control.Feedback type='invalid'>
            {errors.email}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId='password'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Enter password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            isInvalid={!!errors.password}
          ></Form.Control>
          <Form.Control.Feedback type='invalid'>
            {errors.password}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId='confirmPassword'>
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Confirm password'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            isInvalid={!!errors.confirmPassword}
          ></Form.Control>
          <Form.Control.Feedback type='invalid'>
            {errors.confirmPassword}
          </Form.Control.Feedback>
        </Form.Group>

        <Button className='mt-3' type='submit' variant='primary'>
          Register
        </Button>
      </Form>
      <Row className='py-3'>
        <Col>
          Have an Account ?
          <Link to={redirect ? `/login?redirect=${redirect}` : "/login"}>
            Login
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default RegisterScreen;
