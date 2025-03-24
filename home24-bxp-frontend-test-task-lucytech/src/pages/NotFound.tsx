import Result from "../components/ui/app-result-component";
import Button from "../components/ui/app-button-component";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { DEFAULT_i18_NAMESPACE } from "../constant/constant";

const NotFound = () => {
  const { t } = useTranslation(DEFAULT_i18_NAMESPACE, {
    keyPrefix: "NotFound",
  });
  const navigate = useNavigate();

  return (
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={
        <Button type="primary" onClick={() => navigate("/dashboard")}>
          {t("NotFound")}
        </Button>
      }
    />
  );
};

export default NotFound;
