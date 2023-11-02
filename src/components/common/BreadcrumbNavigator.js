// MUI
import { Breadcrumbs, Typography } from '@mui/material';

// React Router
import { Link } from 'react-router-dom';

// Styled
import styled from 'styled-components';

const StyledTypography = styled(Typography)`
  text-decoration: none;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
`;

const BreadcrumbNavigator = ({ previousPages, currentPage }) => {
  return (
    <div>
      <Breadcrumbs>
        {previousPages.map((previousPage, index) => (
          <StyledTypography
            key={index}
            component={Link}
            to={previousPage.route}
            color='inherit'
          >
            {previousPage.name}
          </StyledTypography>
        ))}
        <Typography color='text.primary'>{currentPage}</Typography>
      </Breadcrumbs>
    </div>
  );
};

export default BreadcrumbNavigator;
