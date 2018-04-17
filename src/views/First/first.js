import React from 'react';

import { withRouter } from 'react-router-dom';

class First extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    console.log(this.props);
  }

  render() {
    return(
      <div>第一页</div>
    )
  }
}

export default withRouter(First);
