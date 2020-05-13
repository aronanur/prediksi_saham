import React from 'react';
import { Col } from 'react-bootstrap';
import { Pagination } from '@material-ui/lab';
import { useDispatch } from 'react-redux';
import { actionFetchListDataSaham } from '../../store/actions/datasaham';

export default function PaginationSaham({ count, rowPerPage }){
  const totalPage = Math.ceil(count / rowPerPage);
  const dispatch = useDispatch();

  return(
    <Col md={3} className="ml-auto mt-3 d-flex justify-content-end">
      <Pagination 
        onChange={(event, page) => dispatch(actionFetchListDataSaham(page, rowPerPage))} 
        count={totalPage} 
        color="primary" 
        shape="rounded" />
    </Col>
  )
}