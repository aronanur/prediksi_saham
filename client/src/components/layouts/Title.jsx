import React from 'react';
import { ShowChartRounded, FunctionsRounded } from '@material-ui/icons';

export default function PageTitle({ page, title }){

  const renderIcon = () => {
    switch (page) {
      case 'stock':
        return <ShowChartRounded style={{ position: 'relative', top: -3, paddingRight: 5, fontSize: 34 }} />

      case 'function':
        return <FunctionsRounded style={{ position: 'relative', top: -3, paddingRight: 5, fontSize: 34 }} />
        

      default:
        break;
    }
  }

  return (
    <h5 className="title-text">
      { renderIcon() }
      { title }
    </h5>
  );
}