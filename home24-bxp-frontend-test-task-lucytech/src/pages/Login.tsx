import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { loginUser } from "../store/slices/authSlice";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

import Form from "../components/ui/app-form-component";
import Input from "../components/ui/app-input-component";
import Button from "../components/ui/app-button-component";
import Typography from "../components/ui/app-typography-component";
import Spin from "../components/ui/app-spin-component";
import { useTranslation } from "react-i18next";
import { DEFAULT_i18_NAMESPACE } from "../constant/constant";

const { Title } = Typography;

const Login = () => {
  const { t } = useTranslation(DEFAULT_i18_NAMESPACE, { keyPrefix: "login" });
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { user, loading, error } = useSelector(
    (state: RootState) => state.auth
  );

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  const onFinish = (values: { email: string; password: string }) => {
    dispatch(loginUser(values));
  };

  return (
    <div
      style={{
        width: 300,
        margin: "100px auto",
        textAlign: "center",
      }}
    >
      <Title level={2}>{t("login")}</Title>
      <Form onFinish={onFinish} layout="vertical">
        <Form.Item
          label={t("username")}
          name="email"
          rules={[{ required: true, message: `${t("validations.email")}` }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label={t("password")}
          name="password"
          rules={[{ required: true, message: `${t("validations.password")}` }]}
        >
          <Input.Password />
        </Form.Item>

        {loading && <Spin />}
        {error && <p style={{ color: "red" }}>{error}</p>}

        <Button type="primary" htmlType="submit" block>
          {t("login")}
        </Button>
      </Form>
    </div>
  );
};

export default Login;
