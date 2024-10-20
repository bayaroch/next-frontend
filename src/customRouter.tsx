import { useLayoutEffect, useState } from 'react'
import { BrowserRouterProps, Router } from 'react-router-dom'
import customHistory from './customHistory'
interface Props extends BrowserRouterProps {
  history: any
}
export const CustomRouter = ({ basename, history, children }: Props) => {
  const [state, setState] = useState({
    action: history.action,
    location: history.location,
  })
  useLayoutEffect(() => history.listen(setState), [history])
  return (
    <Router
      navigator={customHistory}
      location={state.location}
      navigationType={state.action}
      basename={basename}
    >
      {children}
    </Router>
  )
}
