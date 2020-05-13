import React from 'react';
import { ButtonDeleteSaham, ButtonEditSaham } from '../index';

export default function ActionButton({ id, rowPerPage }){
  return(
    <>
    <ButtonEditSaham 
      id={id}
    />
    <ButtonDeleteSaham
      id={id}
      rowPerPage={rowPerPage}
    />
    </>
  );
}