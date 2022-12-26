import type { FC } from 'react';
import { gql, useQuery } from '@apollo/client';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';

const GET_COMMUNITY_WALLETS = gql`
  query CommunityWallets {
    communityWallets{
      address,
      description,
      link
    }
  }
`;

interface Data {
  communityWallets: {
    address: string;
    description: string;
    link: string;
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
              <TableCell align="right">Description</TableCell>
              <TableCell align="right">Link</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.communityWallets.map((wallet) => (
              <TableRow
                key={wallet.address}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {wallet.address}
                </TableCell>
                <TableCell align="right">{wallet.description}</TableCell>
                <TableCell align="right">
                  <Link href={wallet.link} target="_blank" rel="noopener noreferrer">
                    {wallet.link}
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default CommunityWallets;
