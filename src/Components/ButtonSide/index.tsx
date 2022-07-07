import { Divider, Space, Typography } from "antd";
import React, { FC } from "react";
import styles from "./ButtonSide.module.scss";

interface IButtonSide {
  content: {
    icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
    label: string;
    onClick?: () => void;
  }[];
}

const ButtonSide: FC<IButtonSide> = (props) => {
  const { content } = props;

  return (
    <div className={styles.buttonSide}>
      <Space
        size={0}
        className={styles.wrapper}
        direction="vertical"
        split={<Divider type="horizontal" style={{ margin: 0 }} />}
      >
        {content.map((value, index) => {
          const handleOnClick = () => {
            if (value.onClick) {
              value.onClick();
            }
          };

          return (
            <button
              key={index}
              className={styles.button}
              onClick={handleOnClick}
            >
              <div className={styles.content}>
                <value.icon className={styles.icon} />
                <Typography.Text className={styles.text}>
                  {value.label}
                </Typography.Text>
              </div>
            </button>
          );
        })}
      </Space>
    </div>
  );
};

export default ButtonSide;
