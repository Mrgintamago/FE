import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
const SidebarStyles = styled.div`
  width: 100%;
  background: #ffffff;
  box-shadow: 10px 10px 20px rgba(218, 213, 213, 0.15);
  border-radius: 8px;
  padding: 6px;

  .menu-item {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 6px 8px;
    font-weight: 500;
    font-size: 11px;
    color: #808191;
    margin-bottom: 6px;
    cursor: pointer;
    border-radius: 6px;
    transition: all 0.3s ease;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    &.active,
    &:hover {
      background: #f1fbf7;
      color: #1dc071;
    }
  }

  .menu-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 14px;
    height: 14px;
    min-width: 14px;
    flex-shrink: 0;
    svg {
      width: 100%;
      height: 100%;
    }
  }

  .menu-text {
    display: inline;
    word-break: break-word;
  }

  > .flex {
    gap: 6px;
    margin-bottom: 6px;
    flex-wrap: wrap;
    .w-\\[100px\\] {
      width: 28px;
      height: 28px;
      min-width: 28px;
    }
    .font-semibold {
      font-size: 10px;
      display: inline;
      word-break: break-word;
    }
  }

  @media (min-width: 640px) {
    padding: 8px;
    .menu-item {
      gap: 10px;
      padding: 8px 10px;
      font-size: 12px;
      margin-bottom: 8px;
    }
    .menu-icon {
      width: 16px;
      height: 16px;
      min-width: 16px;
    }
    > .flex {
      gap: 8px;
      margin-bottom: 8px;
      .w-\\[100px\\] {
        width: 36px;
        height: 36px;
        min-width: 36px;
      }
      .font-semibold {
        font-size: 11px;
      }
    }
  }

  @media (min-width: 768px) {
    width: 250px;
    padding: 12px;
    .menu-item {
      gap: 14px;
      padding: 12px 14px;
      font-size: 13px;
      margin-bottom: 12px;
      white-space: normal;
      overflow: visible;
      text-overflow: clip;
    }
    .menu-icon {
      width: 20px;
      height: 20px;
      min-width: 20px;
    }
    > .flex {
      gap: 12px;
      margin-bottom: 12px;
      flex-wrap: nowrap;
      .w-\\[100px\\] {
        width: 60px;
        height: 60px;
        min-width: 60px;
      }
      .font-semibold {
        font-size: 13px;
      }
    }
  }

  @media (min-width: 1024px) {
    width: 300px;
    padding: 16px;
    .menu-item {
      gap: 20px;
      padding: 14px 20px;
      font-size: 14px;
      margin-bottom: 20px;
    }
    .menu-icon {
      width: 24px;
      height: 24px;
      min-width: 24px;
    }
    > .flex {
      gap: 16px;
      margin-bottom: 16px;
      .w-\\[100px\\] {
        width: 100px;
        height: 100px;
        min-width: 100px;
      }
      .font-semibold {
        font-size: 16px;
      }
    }
  }
`;
const sidebarLinks = [
  {
    title: "Thông tin tài khoản",
    url: "/account",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
        />
      </svg>
    ),
  },
  {
    title: "Quản lý đơn hàng",
    url: "/account/orders",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0118 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3l1.5 1.5 3-3.75"
        />
      </svg>
    ),
  },
  {
    title: "Sổ địa chỉ",
    url: "/account/address",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
        />
      </svg>
    ),
  },
  {
    title: "Đổi mật khẩu",
    url: "/account/reset-password",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5"
        />
      </svg>
    ),
  },
];
const Sidebar = () => {
  const { current } = useSelector((state) => state.user);
  const userName = current?.name || current?.email || "Tài khoản";

  return (
    <SidebarStyles className="sidebar">
      <div className="flex items-center justify-start">
        <div className="w-[100px]">
          <img
            srcSet="/images/logo.png"
            alt=""
            className="w-full object-cover"
          />
        </div>
        <span className="font-semibold text-xl">{userName}</span>
      </div>
      {sidebarLinks.map((link) => {
        if (link.onClick) {
          return (
            <div className="menu-item" key={link.title} onClick={link.onClick}>
              <span className="menu-icon">{link.icon}</span>
              <span className="menu-text">{link.title}</span>
            </div>
          );
        }
        return (
          <NavLink to={link.url} className="menu-item" key={link.title} end>
            <span className="menu-icon">{link.icon}</span>
            <span className="menu-text">{link.title}</span>
          </NavLink>
        );
      })}
    </SidebarStyles>
  );
};

export default Sidebar;
