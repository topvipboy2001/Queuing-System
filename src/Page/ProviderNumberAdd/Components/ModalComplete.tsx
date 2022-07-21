import { Modal, Typography } from "antd";
import moment from "moment";
import React, { FC } from "react";
import { ProviderType } from "../../../State/ActionTypes/ProvidersActionTypes";
import styles from "./ModalComplete.module.scss";
import Icon from "@ant-design/icons";
import { ReactComponent as closeSvg } from "../../../Assets/close.svg";

interface IModalComplete {
  providerData: ProviderType;
  modalVisible: boolean;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const { Text } = Typography;

const ModalComplete: FC<IModalComplete> = (props) => {
  return (
    <Modal
      width={470}
      footer={null}
      visible={props.modalVisible}
      centered
      onCancel={() => props.setModalVisible(false)}
      closeIcon={<Icon style={{ fontSize: 24 }} component={closeSvg} />}
    >
      <div className={styles.modalContainer}>
        <Text className={styles.modalLabel}>Số thứ tự được cấp</Text>
        <Text className={styles.modalValue}>
          {props.providerData.ordinalNumber}
        </Text>
        <div className={styles.subValue}>
          <Text>DV:</Text>
          <Text> {props.providerData.services.name} </Text>
          <Text>(tại quầy số 1)</Text>
        </div>
      </div>
      <div className={styles.modalTime}>
        <div className={styles.modalTimeWrapper}>
          <Text className={styles.timeLabel}>Thời gian cấp: </Text>
          <Text>
            {moment(props.providerData.dateProvider.toDate()).format(
              "HH:mm DD/MM/YYYY"
            )}
          </Text>
        </div>
        <div className={styles.modalTimeWrapper}>
          <Text className={styles.timeLabel}>Hạn sử dụng: </Text>
          <Text>
            {moment(props.providerData.dateValid.toDate()).format(
              "HH:mm DD/MM/YYYY"
            )}
          </Text>
        </div>
      </div>
    </Modal>
  );
};

export default ModalComplete;
