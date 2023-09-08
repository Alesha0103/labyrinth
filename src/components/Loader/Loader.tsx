import React from 'react';
import { Hourglass } from 'react-loader-spinner';

export const Loader = () => {
  return (
    <div style={{
      display: "flex",
      justifyContent: "center",
      marginTop: "150px"
    }}>
      <Hourglass
        visible={true}
        height="100"
        width="100"
        ariaLabel="hourglass-loading"
        colors={["#a19afa", "#c6b2f8"]}
      />
    </div>
  )
}
