import { ReactNode, useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import AppSwitch from "../components/ui/app-switch-component";
import AppConfigProvider from "../components/ui/app-config-provider-component";
import AppLayout from "../components/ui/app-layout-component";

import Button from "../components/ui/app-button-component";
import Dropdown from "../components/ui/app-dropdown-component";
import { Menu } from "../components/ui/app-menu-component";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { logoutUser } from "../store/slices/authSlice";
import { useNavigate } from "react-router-dom";
import { DEFAULT_i18_NAMESPACE } from "../constant/constant";
import { useTranslation } from "react-i18next";
import i18n from "i18next";

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

  const handleLanguageChange = (lang: string) => {
    i18n.changeLanguage(lang);
    localStorage.setItem("language", lang);
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
    </Menu>
  );

  const languageMenu = (
    <Menu>
      <Menu.Item onClick={() => handleLanguageChange("enUs")}>
        English
      </Menu.Item>
      <Menu.Item onClick={() => handleLanguageChange("gerGer")}>
        German
      </Menu.Item>
    </Menu>
  );

  return (
    <AppConfigProvider theme={{ token: theme.token }}>
      <div>
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
              position: "relative",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: "10px",
                right: "10px",
                display: "flex",
                alignItems: "center",
                gap: "10px",
              }}
            >
              {user && (
                <Dropdown overlay={menu} trigger={["click"]}>
                  <div style={{ cursor: "pointer" }}>
                    <img
                      src={user?.profile_pic || "/path/to/default/image.jpg"}
                      alt="profile"
                      style={{
                        width: "40px",
                        height: "40px",
                        borderRadius: "50%",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                </Dropdown>
              )}
            </div>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: 20,
            fontSize: "24px",
            fontWeight: "bold",
            width: "100%",
          }}
        >
          <div style={{ marginRight: "20px" }}>{t("siteTitle")}</div>

          <Dropdown overlay={languageMenu} trigger={["click"]}>
            <Button style={{ marginRight: "20px" }}>
              {t("Select Language")}
            </Button>
          </Dropdown>

          <AppSwitch
            checked={theme.name === "dark"}
            onChange={toggleTheme}
            checkedChildren="Dark"
            unCheckedChildren="Light"
          />
        </div>

        <div>
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
      </div>
    </AppConfigProvider>
  );
};

export default MainLayout;
