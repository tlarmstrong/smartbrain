import React from 'react';

import './rank.styles.css';

const Rank = ({user}) => {
  const { name, count } = user;

  return (
    <div className='rank-container'>
      <div className='rank-wrapper'>
        <div className='intro-to-user'>
          Hello, {name}! You're current entry count is...
        </div>
        <div className='user-rank'>
          {count}
        </div>
      </div>
    </div>
  )
}

export default Rank;
