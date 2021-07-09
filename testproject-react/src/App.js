import React from "react";
import AddUser from "./components/userAdd";
import ListUsers from './components/userList'

export const AppComponent = () => {
  return (
    <div>
      <AddUser/>
      <ListUsers/>
    </div>
  )
}
