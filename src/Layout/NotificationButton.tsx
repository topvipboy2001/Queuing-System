import { Button, Divider, Popover, Typography } from "antd";
import React, { FC, useState } from "react";
import styles from "./NotificationButton.module.scss";
import { Notification } from "iconsax-react";
import { ProviderType } from "../State/ActionTypes/ProvidersActionTypes";
import moment from "moment";
import { Link } from "react-router-dom";

interface INotificationButton {
  providerNumberData: ProviderType[];
}

const { Text } = Typography;

const NotificationButton: FC<INotificationButton> = (props) => {
  const [clicked, setClicked] = useState(false);

  return (
    <Popover
      trigger="click"
      title={
        <div className={styles.titleContainer}>
          <Typography.Text>Thông báo</Typography.Text>
        </div>
      }
      visible={clicked}
      onVisibleChange={(e) => setClicked(e)}
      className={styles.popover}
      content={
        <div className={styles.wrapper}>
          {props.providerNumberData.map((value, index) => (
            <Link
              key={index}
              to={`/provider/${value.id}`}
              className={styles.notificationContainer}
              onClick={(e) => setClicked(false)}
            >
              <div className={styles.notificationName}>
                <Text>Người dùng: </Text>
                <Text>{value.customerName}</Text>
              </div>
              <div>
                <Text>Thời gian nhận số: </Text>
                <Text>
                  {moment(value.dateProvider.toDate()).format(
                    "HH[h]mm [ngày] DD/MM/YYYY"
                  )}
                </Text>
              </div>
              <Divider style={{ margin: 16 }} />
            </Link>
          ))}
        </div>
      }
    >
      <Button
        type="link"
        className={
          clicked
            ? `${styles.notificationButton} ${styles.notificationButtonActive}`
            : styles.notificationButton
        }
        shape="circle"
        icon={<Notification variant="Bold" size="20" />}
      />
    </Popover>
  );
};

export default NotificationButton;
