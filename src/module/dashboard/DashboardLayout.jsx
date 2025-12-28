import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import styled from "styled-components";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../dashboard/Sidebar";
import { useSelector } from "react-redux";

const DashboardStyles = styled.div`
  max-width: 1600px;
  margin: 0 auto;
  .dashboard {
    &-heading {
      font-weight: bold;
      font-size: 16px;
      margin-bottom: 16px;
      color: #1dc071;
      letter-spacing: 0px;
    }
    &-main {
      display: grid;
      grid-template-columns: 1fr;
      padding: 12px 8px;
      gap: 12px;
      align-items: start;
    }
  }

  @media (min-width: 640px) {
    .dashboard {
      &-heading {
        font-size: 18px;
        margin-bottom: 20px;
      }
      &-main {
        padding: 16px 12px;
        gap: 16px;
      }
    }
  }

  @media (min-width: 768px) {
    .dashboard {
      &-heading {
        font-size: 20px;
        margin-bottom: 24px;
      }
      &-main {
        grid-template-columns: 250px minmax(0, 1fr);
        padding: 20px 16px;
        gap: 20px;
      }
    }
  }

  @media (min-width: 1024px) {
    .dashboard {
      &-heading {
        font-size: 24px;
        margin-bottom: 40px;
        letter-spacing: 1px;
      }
      &-main {
        grid-template-columns: 300px minmax(0, 1fr);
        padding: 40px 20px;
        gap: 40px;
      }
    }
  }
`;
const DashboardLayout = ({ children }) => {
  const loggedInUser = useSelector((state) => state.user.current);
  useEffect(() => {}, [loggedInUser]);
  return (
    <DashboardStyles>
      <div className="dashboard-main">
        <Sidebar></Sidebar>
        <div className="dashboard-children">
          <Outlet></Outlet>
        </div>
      </div>
    </DashboardStyles>
  );
};

export default DashboardLayout;
