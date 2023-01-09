import type { FC } from 'react';
import { gql, useQuery } from '@apollo/client';
import { Link as RouterLink } from 'react-router-dom';
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

const GET_COMMUNITY_WALLETS = gql`
  query CommunityWallets {
    communityWallets{
      address,
      description,
      link
      account {
        balances {
          amount
          currency
        }
      }
    }
  }
`;

interface Data {
  communityWallets: {
    address: string;
    description: string;
    link: string;
    account: {
      balances: {
        amount: string;
        currency: string;
      }[];
    }
    __typename: string;
  }[];
}

const CommunityWallets: FC = () => {
  const { loading, error, data } = useQuery<Data>(GET_COMMUNITY_WALLETS);

  if (loading) {
    return (
      <div>
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div>
        {`Error! ${error.message}`}
      </div>
    );
  }

  return (
    <Box p={2} sx={{ width: "100%" }}>
      <TableContainer component={Paper}>
        <Table size="small" aria-label="community wallets">
          <TableHead>
            <TableRow>
              <TableCell>Address</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Link</TableCell>
              <TableCell align="right">Balance</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.communityWallets.map((wallet) => {
              const gasBalance = wallet.account.balances.find((it) => it.currency === 'GAS');
              return (
                <TableRow
                  key={wallet.address}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {/* <Link component={RouterLink} to={`/account/${wallet.address}`}>
                      {wallet.address}
                    </Link> */}
                    {wallet.address}
                  </TableCell>
                  <TableCell>{wallet.description}</TableCell>
                  <TableCell>
                    <Link href={wallet.link} target="_blank" rel="noopener noreferrer">
                      {wallet.link}
                    </Link>
                  </TableCell>
                  <TableCell align="right">
                    {gasBalance && `${numberFormatter.format(parseInt(gasBalance.amount, 10) / 10e6)} GAS`}
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

export default CommunityWallets;
