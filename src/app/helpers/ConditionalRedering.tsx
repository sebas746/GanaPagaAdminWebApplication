import React, {JSX} from 'react'

const ConditionalRendering = ({isTrue, children}: {isTrue: boolean, children: JSX.Element}): JSX.Element => {
  if (isTrue) {
    return children
  }
  return <></>
}

export default ConditionalRendering
