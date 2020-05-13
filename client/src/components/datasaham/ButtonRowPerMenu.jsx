import React from 'react';
import { useDispatch } from 'react-redux';
import { Button, Menu, MenuItem, Tooltip } from '@material-ui/core';
import { ArrowDropDown } from '@material-ui/icons';
import { actionFetchListDataSaham } from '../../store/actions/datasaham';

export default function RowPerPageMenu({ changeRowPerPage }){
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const changeRow = (number) => {
    changeRowPerPage(number)
    dispatch(actionFetchListDataSaham(1, number))
    handleClose()
  }

  return(
    <>
      <Tooltip title="Baris per halaman" arrow>
        <Button
          variant="contained"
          className="button-main"
          size="small" 
          aria-controls="simple-menu" 
          aria-haspopup="true" 
          onClick={handleClick}
          endIcon={<ArrowDropDown />}>
          Baris
        </Button>
      </Tooltip>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={() => changeRow(2)}>2</MenuItem>
        <MenuItem onClick={() => changeRow(5)}>5</MenuItem>
        <MenuItem onClick={() => changeRow(10)}>10</MenuItem>
        <MenuItem onClick={() => changeRow(20)}>20</MenuItem>
      </Menu>
    </>
  )
}