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
              zoom={filteredList?.length > 0 ? 9 : 2}
              center={
                filteredList?.length > 0
                  ? {
                      lat: filteredList[0]?.location?.coordinates?.lat,
                      lng: filteredList[0]?.location?.coordinates?.lng,
                    }
                  : { lat: 0, lng: 0 }
              }
              mapId={process.env.REACT_APP_GOOGLE_MAPS_MAP_ID}
            >
              {!loading &&
                filteredList?.map((location, index) => (
                  <div key={index}>
                    {location?.coordinates && (
                      <AdvancedMarker
                        position={{
                          lat: location.coordinates.lat,
                          lng: location.coordinates.lng,
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
                          lat: location.coordinates.lat,
                          lng: location.coordinates.lng,
                        }}
                        onCloseClick={() => setOpenInfoWindowIndex(null)}
                      >
                        test
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
