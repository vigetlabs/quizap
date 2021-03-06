import React  from 'react/addons'
import Router from 'react-router'

let {RouteHandler, Link} = Router
const Transition = React.addons.CSSTransitionGroup

export default React.createClass({
  getDefaultProps() {
    return {
      routeDepth: 1
    }
  },

  render () {
    const key = this.props.router.getRouteAtDepth(this.props.routeDepth).name
    return (
      <div className="app">
        <header className="header">
          QUIZAP!
        </header>
        <Transition className="main" transitionName="zoom">
          <RouteHandler key={key} router={this.props.router} routeDepth={this.props.routeDepth + 1} params={this.props.params} />
        </Transition>
      </div>
    )
  }
})
