"use client"
import Navigation from "./navigation";
import ShowSideBar from "./showSidebar";
import Toggle from "./toggle";
import { Wrapper } from "./wrapper";

export const Sidebar = () => {
  return (
    <>
      <ShowSideBar />
      <Wrapper>
        <Toggle />
        <Navigation />
      </Wrapper>
    </>
  );
};
