import React from 'react'
import { withRouter } from "react-router-dom";

function Home(props) {
  return (
    <div>Home : {props.match.params.email}</div>
  )
}

export default withRouter(Home);