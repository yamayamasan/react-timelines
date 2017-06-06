import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import { addListener, removeListener } from '../../utils/events'

class LayoutContainer extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      headerMouseDown: false,
      dragStartX: 0,
      dragX: 0
    }

    this.handleHeaderMouseDown = this.handleHeaderMouseDown.bind(this)
    this.handleMouseUp = this.handleMouseUp.bind(this)
    this.handleHeaderMouseMove = this.handleHeaderMouseMove.bind(this)
  }

  componentDidMount() {
    addListener('mouseup', this.handleMouseUp)
  }

  componentWillUnmount() {
    removeListener('mouseup', this.handleMouseUp)
  }

  handleHeaderMouseDown(e) {
    this.setState({
      headerMouseDown: true,
      dragStartX: e.clientX
    })
  }

  handleMouseUp() {
    this.setState({ headerMouseDown: false })
  }

  handleHeaderMouseMove(e) {
    if (this.state.headerMouseDown) {
      const xDiff = this.state.dragStartX - e.clientX
      this.setState({ dragX: xDiff })
    }
  }

  render() {
    const drag = {
      onDown: this.handleHeaderMouseDown,
      onMove: this.handleHeaderMouseMove,
      x: this.state.dragX,
      mouseDown: this.state.headerMouseDown
    }
    return (
      <div>
        {React.cloneElement(this.props.children, { drag })}
      </div>
    )
  }
}

LayoutContainer.propTypes = {
  children: PropTypes.node
}

export default LayoutContainer
