import React from 'react'

export default React.createClass({
  propTypes: {
    status: React.PropTypes.string.isRequired,
    text: React.PropTypes.string.isRequired
  },

  render() {
    return (
      <figure className={`status -${this.props.status} margin-bottom`}>
        <div className="status__light"></div>
        <figcaption className="status__text">{this.props.text}</figcaption>
      </figure>
    )
  }
})
