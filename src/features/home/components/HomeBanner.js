// MUI
import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';

export default function HomeBanner() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Box sx={{ pt: isMobile ? 12 : 20 }}>
      <Typography variant='h1' color={theme.palette.primary.main}>
        Trailer Rental
      </Typography>

      <Typography variant='h6' color={theme.palette.primary.contrastText}>
        A modern solution for all your trailer rental needs
      </Typography>
    </Box>
  );
}
