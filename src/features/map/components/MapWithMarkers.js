import { useState } from 'react';
// Constants
import ROUTES from 'resources/routes-constants';

// MUI
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Box,
  Container,
  Typography,
  useTheme,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

// React Google Maps
import { APIProvider, Map, AdvancedMarker } from '@vis.gl/react-google-maps';

import { useNavigate } from 'react-router-dom';

// Redux
import { useSelector } from 'react-redux';

function MapWithMarkers() {
  const [accordionExpanded, setAccordionExpanded] = useState(false);

  const theme = useTheme();
  const navigate = useNavigate();

  const { filteredTrailerList, loading } = useSelector(
    (state) => state.trailer
  );
  const { theme: storeTheme } = useSelector((state) => state.ui);

  const handleAccordionChange = (event, isExpanded) => {
    setAccordionExpanded(isExpanded);
  };

  const handleMarkerClick = (trailerId) => {
    navigate(ROUTES.VIEW_TRAILER.replace(':uid', trailerId));
  };

  return (
    <APIProvider apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
      <Accordion
        expanded={accordionExpanded}
        onChange={handleAccordionChange}
        sx={{
          bgcolor: theme.palette.background.default,
        }}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          {accordionExpanded ? 'Close Map' : 'Open Map'}
        </AccordionSummary>
        <AccordionDetails>
          <Container sx={{ height: '300px' }}>
            <Map
              zoom={filteredTrailerList?.length > 0 ? 12 : 2}
              center={
                filteredTrailerList?.length > 0
                  ? {
                      lat: filteredTrailerList[0]?.location?.coordinates?.lat,
                      lng: filteredTrailerList[0]?.location?.coordinates?.lng,
                    }
                  : { lat: 0, lng: 0 }
              }
              mapId={
                storeTheme === 'light'
                  ? process.env.REACT_APP_GOOGLE_MAPS_MAP_LIGHT_ID
                  : process.env.REACT_APP_GOOGLE_MAPS_MAP_DARK_ID
              }
            >
              {!loading &&
                filteredTrailerList?.map((trailer, index) => (
                  <div key={index}>
                    {trailer?.location?.coordinates && (
                      <AdvancedMarker
                        position={{
                          lat: trailer?.location?.coordinates.lat,
                          lng: trailer?.location?.coordinates.lng,
                        }}
                        onClick={() => handleMarkerClick(trailer?.trailerId)}
                      >
                        <Box
                          sx={{
                            position: 'relative',
                            width: '100px', // Adjust width as needed
                            bgcolor: theme.palette.background.default,
                            padding: '8px', // Adjust padding as needed
                            borderRadius: '8px',
                            boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.16)',
                            marginBottom: '16px', // Adjust margin as needed
                            textAlign: 'center',
                          }}
                        >
                          {/* Point shape */}
                          <Box
                            sx={{
                              position: 'absolute',
                              bottom: '-16px', // Adjust distance from the bottom as needed
                              left: 'calc(50% + 12px)', // Adjust horizontal positioning as needed
                              width: '0',
                              height: '0',
                              borderLeft: '8px solid transparent',
                              borderRight: '8px solid transparent',
                              borderTop: `16px solid ${theme.palette.background.default}`, // Adjust size and color as needed
                            }}
                          />
                          {/* Content inside the point */}
                          <Typography variant='body1' color='text.primary'>
                            ${trailer?.dailyRate}/Day
                          </Typography>
                        </Box>
                      </AdvancedMarker>
                    )}
                  </div>
                ))}
            </Map>
          </Container>{' '}
        </AccordionDetails>
      </Accordion>
    </APIProvider>
  );
}

export default MapWithMarkers;
