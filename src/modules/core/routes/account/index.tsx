import { useParams } from 'react-router-dom';
import { gql, useQuery } from '@apollo/client';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import PaymentList from './PaymentList';

const GET_ACCOUNT = gql`
  query GetAccount($address: String!) {
    account(address: $address) {
      address
      sequenceNumber
      version
      role
      balances {
        amount
        currency
      }
      paymentEvents {
        amount
        currency
        sender
        receiver
        timestamp
        sequenceNumber
      }
    }
  }
`;

const AccountRoute = () => {
  const { address } = useParams();
  const { loading, error, data } = useQuery(GET_ACCOUNT, {
    variables: {
      address,
    }
  });

  if (loading) {
    return (
      <div>Loading...</div>
    );
  }

  if (error) {
    return (
      <div>
        Error! ${error.message}
      </div>
    );
  }

  console.log(data);

  return (
    <Box p={2} sx={{ width: "100%" }}>
      <Paper>
        <Box p={2}>
          <h1>Account</h1>
          <div>{address}</div>
        </Box>
      </Paper>
      <PaymentList accountAddress={address!} payments={data.account.paymentEvents} />
    </Box>
  );
};

export default AccountRoute;
