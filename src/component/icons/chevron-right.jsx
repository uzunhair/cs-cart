import * as React from "react";
import PropTypes from 'prop-types';

const ChevronRightIcon = ({ fill, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <path
      fill={fill}
      d="M10.707 17.707 16.414 12l-5.707-5.707-1.414 1.414L13.586 12l-4.293 4.293 1.414 1.414Z"
    />
  </svg>
);

ChevronRightIcon.propTypes = {
  fill: PropTypes.string,
};
ChevronRightIcon.defaultProps = {
  fill: '#9cb0c4',
};

export default ChevronRightIcon;
