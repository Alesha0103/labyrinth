import classNames from 'classnames';
import React from 'react';
import { Hourglass } from 'react-loader-spinner';
import { useAppSelector } from '../../hooks/redux';

type LoaderProps = {
  appLoader?: boolean,
  class?: string,
}

export const Loader: React.FC<LoaderProps> = () => {
  const { blackTheme } = useAppSelector(state => state.generalReducer);

  return (
    <div className={classNames("app-overlay loader-overlay", {"app-overlay__black": blackTheme})}>
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
    </div>
  )
}
