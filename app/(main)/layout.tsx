import NavbarWrapper from "@/components/NavbarWrapper";
import React from "react";

const Mainlayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <NavbarWrapper />
      {children}
    </div>
  );
};

export default Mainlayout;
