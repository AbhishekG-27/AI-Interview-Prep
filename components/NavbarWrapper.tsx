import React from "react";
import Navbar from "./Navbar";
import { getServerSession } from "next-auth";

const NavbarWrapper = async () => {
  const session = await getServerSession();
  return <Navbar isloggedIn={!!session?.user?.email} />;
};

export default NavbarWrapper;
