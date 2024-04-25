import NavBar from "./NavBar";
import React from "react";
import SearchBar from "./SearchBar";
import UsersList from "./UsersList";

function SideBar() {
  return (
    <div className="">
        <NavBar/>
        <SearchBar/>
        <UsersList/>
    </div>
  )
}

export default SideBar