import 'components/common/pixelArt/darthVader/styles.css';

// MUI
import { Box, Container } from '@mui/material';

const PixelDarthVader = () => {
  return (
    <Container className='pixel-block' maxWidth='sm' sx={{ mt: -20 }}>
      <Box className='pixelized--vader'></Box>
    </Container>
  );
};

export default PixelDarthVader;
