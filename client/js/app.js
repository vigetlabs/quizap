import React     from 'react'
import Router    from 'react-router'
import routes    from './config/routes'
import fastclick from 'fastclick'

Router.run(routes, function(Handler, state){
  React.render(<Handler router={this} params={state.params}/> , document.body)
})

fastclick.attach(document.body)
