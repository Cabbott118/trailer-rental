import React from 'react';

// MUI
import { useTheme } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const ItemContainer = ({ items }) => {
  const theme = useTheme();

  const itemContainer = (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 200 }} aria-label='simple table'>
        <TableHead>
          <TableRow>
            <TableCell>Item Title</TableCell>
            <TableCell align='right'>Description</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {items?.map((item, key) => (
            <TableRow
              key={key}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component='th' scope='row'>
                {item.title}
              </TableCell>
              <TableCell align='right'>{item.desc}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
  return items.length == 0 ? null : itemContainer;
};

export default ItemContainer;
