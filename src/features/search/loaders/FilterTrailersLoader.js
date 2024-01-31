// MUI
import { Grid, Skeleton, useTheme } from '@mui/material';

export default function FilterTrailersLoader() {
  const theme = useTheme();
  return (
    <Grid container spacing={1} sx={{ py: 3 }}>
      <Grid item xs={12}>
        <Skeleton variant='rounded' height={56} sx={{ my: 1 }} />
      </Grid>
      <Grid item xs={12}>
        <Skeleton variant='rounded' height={56} />
      </Grid>
      <Grid item xs={12}>
        <Skeleton
          sx={{ bgcolor: theme.palette.primary.main, mt: 1 }}
          variant='rounded'
          height={36.5}
        />
      </Grid>
    </Grid>
  );
}
