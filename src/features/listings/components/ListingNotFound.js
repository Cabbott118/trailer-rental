import { useEffect } from 'react';

// Components
import BreadcrumbNavigator from 'components/common/BreadcrumbNavigator';
import PixelObiWan from 'components/common/pixelArt/obiWan/PixelObiWan';
import PixelDarthVader from 'components/common/pixelArt/darthVader/PixelDarthVader';

// Constants
import ROUTES from 'resources/routes-constants';

// MUI
import {
  Container,
  Grid,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';

export default function ListingNotFound() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const previousPages = [
    {
      name: 'Find trailers',
      route: ROUTES.FIND_TRAILERS,
    },
  ];

  let themeMode = theme.palette.mode;

  return (
    <Container
      sx={{
        pt: isMobile ? 10 : 20,
      }}
    >
      <BreadcrumbNavigator
        previousPages={previousPages}
        currentPage='Not found'
        sx={{
          color: theme.palette.primary.contrastText,
        }}
      />

      <Grid
        container
        alignItems='center'
        justifyContent='center'
        sx={{ minHeight: '40vh' }}
      >
        <Grid item xs={12}>
          <Typography
            align='center'
            variant='h4'
            component='h1'
            color='text.primary'
          >
            This is not the URL you're looking for
          </Typography>
        </Grid>
        <Grid item xs={12}>
          {themeMode === 'light' ? <PixelObiWan /> : <PixelDarthVader />}
        </Grid>
      </Grid>
    </Container>
  );
}
