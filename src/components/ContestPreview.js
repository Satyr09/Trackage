import React from 'react';

const ContestPreview = (contest)=>(
  <div className="ContestPreview list-group-flush">
    <div className="category-name list-group-item">
      {contest.categoryName}
    </div>
    <div className="contest-name list-group-item">
      {contest.contestName}
    </div>
  </div>
);

export default ContestPreview;
