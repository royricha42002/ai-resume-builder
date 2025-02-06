import React from "react";
import { Button } from "../ui/button";
import "./navbar.css";
import { Link } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import { UserButton } from "@clerk/clerk-react";

function Navbar() {
  const { isSignedIn } = useUser(); // Destructure isSignedIn from useUser

  return (
    <div className="navbar">
      <img src="/logo.svg" alt="Logo" width={50} height={50} />
      
      {/* Show "Get Started" button only if the user is NOT signed in */}
      {!isSignedIn && (
        <Link to={"/auth/signin"}>
          <Button>Get Started</Button>
        </Link>
      )}

      {/* Show "Dashboard" and "UserButton" only if the user is signed in */}
      {isSignedIn && (
        <div className="flex gap-2 items-center">
          <Link to={"/dashboard"}>
            <Button variant="outline">Dashboard</Button>
          </Link>
          <UserButton />
        </div>
      )}
    </div>
  );
}

export default Navbar;