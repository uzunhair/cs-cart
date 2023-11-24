import React, {useState} from 'react';
import PropTypes from 'prop-types';

import './collapse.scss';

const Collapse = ({children, showDefault, title}) => {
  const [show, setShow] = useState(showDefault);

  const onShow = () => {
    setShow(prev => !prev);
  };

  return (
    <div className={`collapse ${show ? 'collapse_show' : 'collapse_hidden'}`}>
      <div className="collapse__header">
        <button type="button" aria-expanded="true" className="collapse__button" onClick={onShow}>
          <span>{title}</span>
        </button>
      </div>
      <div className="collapse__body">
        {children}
      </div>
    </div>
  );
};

Collapse.propTypes = {
  children: PropTypes.node.isRequired,
  showDefault: PropTypes.bool,
  title: PropTypes.string,
};
Collapse.defaultProps = {
  showDefault: true,
  title: 'Open/Close',
};

export default Collapse;
