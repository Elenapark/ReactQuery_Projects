import React, { forwardRef } from "react";

const Species = forwardRef(({ name, language, averageLifespan }, ref) => {
  return (
    <li ref={ref}>
      {name}
      <ul>
        <li>lang : {language}</li>
        <li>avg lifespan : {averageLifespan}</li>
      </ul>
    </li>
  );
});

export default Species;
