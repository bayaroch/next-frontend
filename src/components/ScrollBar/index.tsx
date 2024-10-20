import React from 'react'
import Scrollbars from 'react-custom-scrollbars-2'

//todo - need to see how to define prop-types for this.

const Scrollbar = React.forwardRef((props: any, ref: any) => {
  const renderTrackProp = {
    renderTrackVertical: ({ ...props }) => (
      <div
        style={{
          top: '2px',
          bottom: '2px',
          borderRadius: '3px',
          right: 'auto',
          left: '2px',
        }}
        {...props}
      />
    ),
  }

  return (
    <Scrollbars
      renderView={(props: any) => (
        <div
          {...props}
          style={{
            ...props?.style,
            marginLeft: '-17px',
            marginRight: 0,
          }}
        />
      )}
      ref={ref}
      {...renderTrackProp}
      {...props}
    />
  )
})

export default Scrollbar
