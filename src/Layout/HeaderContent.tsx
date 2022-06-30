import { Avatar, Button, Image, Typography } from "antd";
import { Notification } from "iconsax-react";
import React from "react";
import styles from "./HeaderContent.module.scss";
import avatar from "../Assets/avatar.svg";
import { Link } from "react-router-dom";

const { Text } = Typography;

const HeaderContent = () => {
  return (
    <div className={styles.headerWrapper}>
      <div></div>

      <div className={styles.avatarContainer}>
        <Button
          type="primary"
          className={styles.notificationButton}
          shape="circle"
          icon={<Notification variant="Bold" size="20" />}
        />
        <Link to="/info" className={styles.infoContainer}>
          <Avatar size={40} src={<Image src={avatar} preview={false} />} />
          <div className={styles.nameContainer}>
            <Text className={styles.hello}>Xin chào</Text>
            <Text className={styles.name}>Huỳnh Lâm Khánh Duy</Text>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default HeaderContent;
