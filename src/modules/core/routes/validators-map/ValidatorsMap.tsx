import { FC, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import CircularProgress from '@mui/material/CircularProgress';
import { gql } from '@apollo/client';
import apolloClient from '../../../apollo';
import Map from './Map';

const ValidatorsMap: FC = () => {
  const [loaded, setLoaded] = useState(false);
  const [locations, setLocations] = useState<{
    vfn: [number, number][];
    validators: [number, number][];
  }>();

  useEffect(() => {
    const load = async () => {
      try {
        const res = await apolloClient.query({
          query:  gql`
            query ValidatorPresences {
              validatorPresences {
                vfn
                validator
              }
            }
          `
        });

        const locations: {
          vfn: [number, number][];
          validators: [number, number][];
        } = {
          vfn: [],
          validators: []
        };

        for (const it of res.data.validatorPresences) {
          if (it.vfn) {
            locations.vfn.push(it.vfn);
          }
          if (it.validator) {
            locations.validators.push(it.validator);
          }
        } 

        setLocations(locations);
      } finally {
        setLoaded(true);
      }
    };

    load();
  }, []);

  if (!loaded) {
    return (
      <Box alignItems="center" justifyContent="center" width="100%" display="flex">
        <CircularProgress />
      </Box>
    );
  }

  if (locations) {
    return (
      <Map locations={locations} />
    );
  }

  return (
    <div>
      <p>nothing to show</p>
    </div>
  );
};

export default ValidatorsMap;
