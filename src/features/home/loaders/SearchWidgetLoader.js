// MUI
import {
  Grid,
  Skeleton,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';

export default function SearchWidgetLoader() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <>
      <Grid
        item
        xs={12}
        container
        sx={{
          bgcolor: theme.additionalPalette.primary,
          p: 3,
          mt: 3,
          borderRadius: 3,
        }}
      >
        <Grid item xs={12} sx={{ mb: 1 }}>
          <Typography variant='h6' color={theme.palette.primary.contrastText}>
            Where would you like to search?
          </Typography>
          <Typography
            variant='caption'
            color={theme.palette.primary.contrastText}
          >
            Our results will display trailers within a 50 mile radius
          </Typography>
        </Grid>
        <Grid item xs={12} sx={{ mb: 3 }}>
          <Skeleton variant='rounded' height={56} />
        </Grid>
        <Grid item xs={12}>
          <Skeleton
            sx={{ bgcolor: theme.palette.primary.main }}
            variant='rounded'
            height={36.5}
          />
        </Grid>
      </Grid>
    </>
  );
}
