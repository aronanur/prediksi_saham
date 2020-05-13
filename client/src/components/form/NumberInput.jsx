import React from 'react';
import { Form } from 'react-bootstrap';

export default function NumberInput(props){
  return (
    <Form.Group>
      <Form.Label>{ props.label }</Form.Label>
      <Form.Control
        disabled={props.disabled} 
        type="number"
        name={props.name}
        maxLength={props.maxLength}
        value={props.value} 
        placeholder={ props.placeholder }
        isInvalid={props.isInvalid}
        onChange={props.inputChange} />
      <Form.Control.Feedback type="invalid">
        {props.isInvalid}
      </Form.Control.Feedback>
    </Form.Group>
  )
}