import { ReactNode, useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import AppSwitch from "../components/ui/app-switch-component";
import AppConfigProvider from "../components/ui/app-config-provider-component";
import AppLayout from "../components/ui/app-layout-component";
import Avatar from "../components/ui/app-button-component";
import Button from "../components/ui/app-button-component";
import Dropdown from "../components/ui/app-dropdown-component";
import { Menu } from "../components/ui/app-menu-component";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { logoutUser } from "../store/slices/authSlice";
import { useNavigate } from "react-router-dom";

import { DEFAULT_i18_NAMESPACE } from "../constant/constant";
import { useTranslation } from "react-i18next";

interface MainLayoutProps {
  children?: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  const { t } = useTranslation(DEFAULT_i18_NAMESPACE, {
    keyPrefix: "mainLayout",
  });

  const themeContext = useContext(ThemeContext);
  const { user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  if (!themeContext) {
    throw new Error("ThemeContext is not available");
  }

  const { theme, toggleTheme } = themeContext;

  const handleLogout = () => {
    dispatch(logoutUser() as any);
    navigate("/login");
  };

  const menu = (
    <Menu>
      <Menu.Item>
        <div>{user?.email}</div>
      </Menu.Item>
      <Menu.Item>
        <Button type="primary" danger onClick={handleLogout}>
          {t("Logout")}
        </Button>
      </Menu.Item>
      <Menu.Item>
        <AppSwitch
          checked={theme.name === "dark"}
          onChange={toggleTheme}
          checkedChildren="Dark"
          unCheckedChildren="Light"
        />
      </Menu.Item>
    </Menu>
  );

  return (
    <AppConfigProvider theme={{ token: theme.token }}>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginTop: 0,
          marginBottom: 0,
        }}
      >
        <div
          style={{
            display: "block",
            alignItems: "center",
            gap: "10px",
            marginRight: 120,
          }}
        >
          {user && (
            <Dropdown overlay={menu} trigger={["click"]}>
              <Avatar size="large" style={{ cursor: "pointer" }}>
                {user?.email[0].toUpperCase()}{" "}
              </Avatar>
            </Dropdown>
          )}
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          top: 20,
          left: "50%",
          transform: "translateX(-50%)",
          fontSize: "24px",
          fontWeight: "bold",
        }}
      >
        {t("siteTitle")}
      </div>

      <div style={{ marginBottom: 0, marginTop: 0 }}>
        <AppLayout
          headerContent={
            <div
              style={{
                top: 0,
                right: 50,
              }}
            ></div>
          }
          contentStyle={{
            background: theme.token.colorBgBase,
            color: theme.token.colorTextBase,
            display: "block",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "100vh",
          }}
        >
          {children}
        </AppLayout>
      </div>
    </AppConfigProvider>
  );
};

export default MainLayout;
