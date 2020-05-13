import React, { useState } from 'react';
// import { useDispatch } from 'react-redux';
import { Form, InputGroup, FormControl, Button } from 'react-bootstrap';
// import { actionFetchUserList } from '../../store/actions/user';

export default function SearchBar({ rowPerPage, searchList }){
  const [keyword, setKeyword] = useState('')
  // const dispatch = useDispatch()

  const searchData = (e) => {
    e.preventDefault()
    // dispatch(actionFetchUserList(1, rowPerPage, keyword))
    searchList(keyword)   
  }

  return(
    <Form
      onSubmit={searchData}>
      <InputGroup className="mb-3">
        <FormControl
          onChange={(e) => setKeyword(e.target.value)}
          className="search-bar-height"
          placeholder="Cari data..."
        />
        <InputGroup.Append>
          <Button
            type="submit" 
            size="sm" 
            className="search-bar-height" 
            variant="secondary">Cari</Button>
        </InputGroup.Append>
      </InputGroup>
    </Form>
  )
}