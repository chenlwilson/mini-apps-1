import React from 'react';
import TableCell from './TableCell.js'

var TopRow = (props) => (
  <tr id='top' className='toprow' onClick={ (e) => props.play(e) }>
    {[1,2,3,4,5,6,7].map((col) => <TableCell key={col.toString()} index={'6'+col.toString()} />)}
  </tr>
)

export default TopRow;