import { Switch } from "antd";

type AppSwitchProps = {
  checked: boolean;
  onChange: () => void;
  checkedChildren?: string;
  unCheckedChildren?: string;
};

const AppSwitch = ({
  checked,
  onChange,
  checkedChildren = "Dark",
  unCheckedChildren = "Light",
}: AppSwitchProps) => {
  return (
    <Switch
      checked={checked}
      onChange={onChange}
      checkedChildren={checkedChildren}
      unCheckedChildren={unCheckedChildren}
    />
  );
};

export default AppSwitch;
