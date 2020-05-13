import React from 'react';
import { Form } from 'react-bootstrap';

export default function TextInput(props){
  return (
    <Form.Group>
    <Form.Label>{ props.label }</Form.Label>
      <Form.Control
        disabled={props.disabled} 
        type="text"
        name={props.name}
        value={props.value} 
        placeholder={ props.placeholder }
        onChange={props.inputChange} />
    </Form.Group>
  )
}