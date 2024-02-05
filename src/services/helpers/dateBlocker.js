import React from 'react';

// Day JS
import dayjs from 'dayjs';

export const isDateBlocked = (date, reservations) => {
  if (reservations?.length > 0) {
    const currentDate = dayjs(date);

    return reservations?.some((reservation) => {
      const start = dayjs(reservation?.dates?.startDate);
      const end = dayjs(reservation?.dates?.endDate);

      return currentDate.isBetween(start, end, null, '[]');
    });
  }

  return false;
};

export const renderDay = (date, _value, dayComponent, reservations) => {
  const isBlocked = isDateBlocked(date, reservations);
  return React.cloneElement(dayComponent, {
    style: {
      ...(dayComponent.props.style || {}),
      color: isBlocked ? '#FF0000' : undefined,
    },
  });
};
