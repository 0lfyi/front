import type { FC } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import CallReceivedIcon from '@mui/icons-material/CallReceived';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';

const numberFormatter = new Intl.NumberFormat('default');

interface Props {
  accountAddress: string;
  payments: {
    amount: string;
    currency: string;
    receiver: string;
    sender: string;
    timestamp: string;
    sequenceNumber: string;
  }[];
}

const PaymentList: FC<Props> = ({ accountAddress, payments }) => {
  return (
    <Box p={2} sx={{ width: "100%" }}>
      <TableContainer component={Paper}>
        <Table size="small" aria-label="community wallets">
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>Account</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell align="right">Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {payments.map((payment) => {
              const direction = payment.receiver === accountAddress ? 'incoming' : 'outgoing';
              const peer = direction === 'incoming' ? payment.sender : payment.receiver;

              return (
                <TableRow
                  key={`${payment.sequenceNumber}-${direction}`}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell>
                    {direction === 'outgoing'
                      ? <ArrowOutwardIcon color="error" />
                      : <CallReceivedIcon color="success" />
                    }
                  </TableCell>
                  <TableCell>
                    <Link component={RouterLink} to={`/account/${peer}`}>
                      {peer}
                    </Link>
                  </TableCell>
                  <TableCell>
                    {payment.currency === 'GAS'
                      ? `${numberFormatter.format(parseInt(payment.amount, 10) / 10e6)} GAS`
                      : `${numberFormatter.format(parseInt(payment.amount, 10))} ${payment.currency}`
                    }
                  </TableCell>
                  <TableCell align="right">
                    {payment.timestamp}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default PaymentList;

