import { useState } from 'react';

// MUI
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Container,
  useTheme,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

// React Google Maps
import {
  APIProvider,
  Map,
  AdvancedMarker,
  Pin,
  InfoWindow,
} from '@vis.gl/react-google-maps';

// Redux
import { useSelector } from 'react-redux';

function MapWithMarkers() {
  const theme = useTheme();
  const [openInfoWindowIndex, setOpenInfoWindowIndex] = useState(null);
  const [accordionExpanded, setAccordionExpanded] = useState(false);

  const { filteredList, loading } = useSelector((state) => state.trailer);
  const { theme: storeTheme } = useSelector((state) => state.ui);

  const handleAccordionChange = (event, isExpanded) => {
    setAccordionExpanded(isExpanded);
  };

  return (
    <APIProvider apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
      <Accordion
        expanded={accordionExpanded}
        onChange={handleAccordionChange}
        sx={{ bgcolor: theme.palette.background.default }}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          {accordionExpanded ? 'Close Map' : 'Open Map'}
        </AccordionSummary>
        <AccordionDetails>
          <Container sx={{ height: '300px' }}>
            <Map
              zoom={filteredList?.length > 0 ? 12 : 2}
              center={
                filteredList?.length > 0
                  ? {
                      lat: filteredList[0]?.location?.coordinates?.lat,
                      lng: filteredList[0]?.location?.coordinates?.lng,
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
                filteredList?.map((trailer, index) => (
                  <div key={index}>
                    {trailer?.location?.coordinates && (
                      <AdvancedMarker
                        position={{
                          lat: trailer?.location?.coordinates.lat,
                          lng: trailer?.location?.coordinates.lng,
                        }}
                        onClick={() => setOpenInfoWindowIndex(index)}
                      >
                        <Pin
                          background={theme.palette.secondary.light}
                          borderColor={theme.palette.primary.dark}
                          glyphColor={theme.palette.primary.main}
                        />
                      </AdvancedMarker>
                    )}
                    {openInfoWindowIndex === index && (
                      <InfoWindow
                        position={{
                          lat: trailer?.location.coordinates.lat,
                          lng: trailer?.location.coordinates.lng,
                        }}
                        onCloseClick={() => setOpenInfoWindowIndex(null)}
                      >
                        <div
                          style={{
                            color: 'black',
                            backgroundColor: '#fff',
                            padding: '10px',
                          }}
                        >
                          {trailer?.owner?.ownerName?.firstName}'s{' '}
                          {trailer?.type}
                        </div>
                      </InfoWindow>
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
