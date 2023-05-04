import React from 'react';

// React Query
import { useQuery } from 'react-query';

// Components
import Spinner from '../components/Spinner';
import ItemContainer from '../components/ItemContainer';

// Functions
import { getItems } from '../functions/items/getItems';

// MUI
import { useTheme } from '@mui/material';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';

const ItemListPage = () => {
  const theme = useTheme();

  const {
    data: items,
    isLoading: isItemsLoading,
    isError: isItemsError,
  } = useQuery('items', getItems, {
    refetchOnMount: false,
  });

  if (isItemsError) {
    return <div>Failed to load items</div>;
  }

  const loadingSpinner = (
    <Grid
      container
      direction='column'
      justifyContent='center'
      alignItems='center'
      sx={{
        minHeight: '75vh',
      }}
    >
      <Spinner
        loading={isItemsLoading}
        color={theme.palette.primary.main}
        size={30}
        type='clip'
      />
    </Grid>
  );

  const itemsContainer = (
    <Container maxWidth='sm'>
      <Grid
        container
        direction='column'
        justifyContent='center'
        alignItems='center'
      >
        <ItemContainer items={items} />
      </Grid>
    </Container>
  );

  return isItemsLoading ? loadingSpinner : itemsContainer;
};

export default ItemListPage;
