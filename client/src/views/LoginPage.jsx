import React, { useState } from 'react';
import { Fade } from 'react-reveal';
import Unpak from '../assets/logo/unpak.png';
import { Col, Container, Form, Button, Alert } from 'react-bootstrap';
import { formLogin, formBody } from '../form/login';
import { useHistory } from 'react-router-dom';
import { actionLogin } from '../server/request/login';
import { FormStore } from '../components/index';
import { SendRounded, ErrorRounded } from '@material-ui/icons';

export default function LoginPage(){
  const history = useHistory();
  const [form, setForm] = useState(formBody);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleInput = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const notification = () => {
    if(error){
      return(
        <Alert variant="danger" className="alert-text">
          <ErrorRounded className="start-icon"/> { error }
        </Alert>
      )
    }
  }

  const loginHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    const request = await actionLogin(form, setLoading, setError);
    if(request.status === 200) history.push('/prediksi');
  }

  return(
    <Container fluid className="bg-main wrapper">
      <Col md={4} className="mx-auto login-container">
        <br></br>
        <Fade>
          <img alt="Logo Unpak" src={Unpak} className="login-image"/>
          <h3 className="text-center">Sistem Prediksi Saham</h3>
          <h5 className="text-secondary text-center">Fuzzy Time Series</h5>
        </Fade>
        <Fade delay={600}>
          <Form
            className="login-form"
            onSubmit={loginHandler}>
            <FormStore
              formList={formLogin}
              handleInput={handleInput}
              />
              { notification() }
            <Button
              className="button-login"
              variant="primary"
              disabled={loading}
              type="submit">
                <SendRounded className="start-icon" />
                { loading ? 'Loading...' : 'Masuk' }
            </Button>
          </Form>
        </Fade>
      </Col>
    </Container>
  )
}