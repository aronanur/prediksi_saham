import React from 'react';
import { Form } from 'react-bootstrap';

export default function TextInput(props){
  return (
    <Form.Group>
      <Form.Control
        disabled={props.disabled} 
        type="password"
        name={props.name}
        value={props.value} 
        placeholder={ props.placeholder }
        onChange={props.inputChange} />
    </Form.Group>
  )
}