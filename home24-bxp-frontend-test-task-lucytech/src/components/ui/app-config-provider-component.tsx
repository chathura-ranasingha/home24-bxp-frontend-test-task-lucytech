import { ReactNode } from "react";
import { ConfigProvider, ThemeConfig } from "antd";

interface AppConfigProviderProps {
  children: ReactNode;
  theme: ThemeConfig;
}

const AppConfigProvider = ({ children, theme }: AppConfigProviderProps) => {
  return <ConfigProvider theme={theme}>{children}</ConfigProvider>;
};

export default AppConfigProvider;
