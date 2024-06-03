import React from 'react'
import { Outlet } from 'react-router-dom'

const IfUserNotRequired = () => {
  return (
    <div>
      user not required
      <Outlet/>
    </div>
  )
}

export default IfUserNotRequired
