import React from 'react';
import { TextInput, TextInputLogin, PasswordInput, NumberInput, DateInput } from '../index';
import { Col } from 'react-bootstrap';

export default function FormStore({ formList, handleInput, validationError = {}, value = {}, disabled = false, type = "general", columnNumber }){

  const generateForm = () => {
    return(
      <>
        { formList.map((form, i) => {
          return(
            <div key={i}>
              { formType(form, i) }
            </div>
          )
        }) } 
      </>
    )
  }

  const generateRegistrationForm = () => {
    return(
      <>
        { formList.map((form, i) => {
          return(
            <Col md={columnNumber} key={i}>
              { formType(form, i) }
            </Col>
          )
        }) } 
      </>
    )
  }

  const formType =  (form, i) => {
    switch (form.type) {
      case 'text':
        return(
          <TextInput
            key={i}
            disabled={disabled} 
            label={form.label}
            name={form.name}
            maxLength={form.maxLength}
            value={value[form.name]}
            placeholder={form.placeholder}
            inputChange={handleInput}
            isInvalid={validationError[form.name]}
          />
        )

      case 'number':
        return(
          <NumberInput
            key={i}
            disabled={disabled} 
            label={form.label}
            name={form.name}
            maxLength={form.maxLength}
            value={value[form.name]}
            placeholder={form.placeholder}
            inputChange={handleInput}
            isInvalid={validationError[form.name]}
          />
        )

      case 'password':
        return(
          <PasswordInput
            key={i} 
            label={form.label}
            name={form.name}
            value={value[form.name]}
            placeholder={form.placeholder}
            inputChange={handleInput}
            isInvalid={validationError[form.name]}
          />
        )

      case 'text-login':
        return(
          <TextInputLogin
          key={i}
          label={form.label} 
          name={form.name}
          value={value[form.name]}
          placeholder={form.placeholder}
          inputChange={handleInput}
        />
        )

        case 'date':
          return(
            <DateInput
              key={i} 
              label={form.label}
              name={form.name}
              value={value[form.name]}
              placeholder={form.placeholder}
              inputChange={handleInput}
              isInvalid={validationError[form.name]} 
            />
          );
    
      default:
        return(
          <TextInput
            key={i}
            disabled={disabled} 
            label={form.label}
            maxLength={form.maxLength}
            name={form.name}
            value={value[form.name]}
            placeholder={form.placeholder}
            inputChange={handleInput}
            isInvalid={validationError[form.name]}
        />
        )
    }

  }

  return(
    <>
      { type === 'registrasi' ? generateRegistrationForm() : generateForm() }
    </>
  )

}