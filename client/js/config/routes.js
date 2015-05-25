import React     from 'react'
import Router    from 'react-router'
import Layout    from '../components/Layout'
import Player    from '../components/Player'
import Moderator from '../components/Moderator'

const { Route, DefaultRoute, NotFoundRoute } = Router

export default (
  <Route handler={Layout} path="/">
    <DefaultRoute name="root" handler={Player} />
    <Route name="moderator" path="moderator" handler={Moderator}></Route>
  </Route>
)
