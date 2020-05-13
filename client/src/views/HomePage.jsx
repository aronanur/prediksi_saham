import React from 'react';
import { Fade } from 'react-reveal';
import { Navbar, Footer } from '../components/index';
import { Col } from 'react-bootstrap';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import { DataSahamPage, PrediksiSahamPage } from './index';

export default function HomePage(){
  const { path } = useRouteMatch()

  return(
    <Fade>
      <Navbar />
      <Col
        md={10}
        className="mx-auto home-page"
        style={{ minHeight: '80vh' }}>
        <Switch>
          <Route exact path={`${path}/`}>
            <DataSahamPage />
          </Route>
          <Route exact path={`${path}/prediksi-saham`}>
            <PrediksiSahamPage />
          </Route>
        </Switch>
      </Col>
      <Footer />
    </Fade>
  );

};