import React from 'react';
import { Hourglass } from 'react-loader-spinner';

export const Loader = () => {
  return (
    <div style={{
      display: "flex",
      justifyContent: "center",
      marginTop: "350px"
    }}>
      <Hourglass
        visible={true}
        height="100"
        width="100"
        ariaLabel="hourglass-loading"
        colors={["#cd6464", "#e67373"]}
      />
    </div>
  )
}
