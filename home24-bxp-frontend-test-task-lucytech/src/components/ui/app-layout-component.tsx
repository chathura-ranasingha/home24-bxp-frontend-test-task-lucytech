import { ReactNode } from "react";
import { Layout } from "antd";

const { Header, Content } = Layout;

interface AppLayoutProps {
  children?: ReactNode;
  headerContent?: ReactNode;
  contentStyle?: React.CSSProperties;
  layoutStyle?: React.CSSProperties;
}

const AppLayout = ({
  children,
  headerContent,
  contentStyle,
  layoutStyle,
}: AppLayoutProps) => {
  return (
    <Layout style={{ margin: 0, padding: 0, ...layoutStyle }}>
      <Header
        style={{
          background: "inherit",
          padding: 0,
          position: "absolute",
          top: 0,
          right: 0,
          zIndex: 10,
        }}
      >
        {headerContent}
      </Header>
      <Content
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          padding: 0,
          margin: 0,
          ...contentStyle,
        }}
      >
        {children}
      </Content>
    </Layout>
  );
};

export default AppLayout;
