// My Imports
import React from 'react'

const PrivateRoute = ({ element: Element, ...rest }) => {
  return(
  <Element {...rest} />
      )
  }

export default PrivateRoute
