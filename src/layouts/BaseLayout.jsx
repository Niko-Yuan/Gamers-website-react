import React from "react";
import styled from "styled-components";
import { Outlet } from "react-router-dom";
import { Navbar, Footer } from "../components/common/index";

const BaseLayout = () => {
  return (
    <LayoutWrapper>
      <Navbar />
      <ContentWrapper>
        <Outlet />
      </ContentWrapper>
      <Footer />
    </LayoutWrapper>
  );
};

export default BaseLayout;

const LayoutWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const ContentWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;
