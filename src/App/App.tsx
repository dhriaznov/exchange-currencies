import React from 'react';
import { Carousel, Button, Row, Col, Form, Input } from 'antd';

import { StyledCarouselItem, StyledHeader } from './App.styled';
import { Currencies } from 'types';

const bankAccount: {
  [key in keyof typeof Currencies]: number
} = {
  [Currencies.EUR]: 144.46,
  [Currencies.USD]: 78.34,
  [Currencies.GBP]: 98.22,
};

export const App = () => {
  return (
    <div className="App">
      <StyledHeader>
        <Row align="middle" justify="space-between">
          <Col>
            <Button>Cancel</Button>
          </Col>
          <Col>
            <div>1 eur = 1.21 usd</div>
          </Col>
          <Col>
            <Button type="primary">Exchange</Button>
          </Col>
        </Row>
      </StyledHeader>
      <Form>
        <Carousel>
          {Object.entries(bankAccount).map((item) => (
            <StyledCarouselItem>
              <Row justify="space-around" align="middle">
                <Col>
                  <div>{item[0]}</div>
                  <div>You have {item[1]}</div>
                </Col>
                <Col>
                  <Input />
                </Col>
              </Row>
            </StyledCarouselItem>
          ))}
        </Carousel>
      </Form>
    </div>
  );
}
