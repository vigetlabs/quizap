import React from 'react'
import Router from 'react-router'
import Layout from '../components/Layout'
import Messages from '../components/Messages'

const { Route, DefaultRoute, NotFoundRoute } = Router

export default (
  <Route handler={Layout} path="/">
    <DefaultRoute name="root" handler={Messages} />
  </Route>
)
