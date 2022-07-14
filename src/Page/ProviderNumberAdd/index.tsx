import { Modal, Typography } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { providerAddAction } from "../../State/Actions/ProvidersActions";
import { serviceGetAction } from "../../State/Actions/ServicesActions";
import { ProviderAddType } from "../../State/ActionTypes/ProvidersActionTypes";
import { RootStore } from "../../State/Store";
import ProviderNumberAddLayout from "./Components/ProviderNumberAddLayout";
import { ReactComponent as closeSvg } from "../../Assets/close.svg";
import Icon from "@ant-design/icons";
import styles from "./ProviderNumberAdd.module.scss";
import moment from "moment";

const {  Text } = Typography;

const ProviderNumberAdd = () => {
  const dispatch = useDispatch();
  const servicesState = useSelector((state: RootStore) => state.services);
  const state = useSelector((state: RootStore) => state.providers);
  const providerState = useSelector((state: RootStore) => state.provider);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const fetchService = async () => {
      try {
        await dispatch(serviceGetAction());
      } catch (error) {
        console.log(error);
      }
    };

    fetchService();
  }, [dispatch]);

  const onFinish = async (values: ProviderAddType) => {
    try {
      await dispatch(providerAddAction(values.service));
      setModalVisible(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <ProviderNumberAddLayout
        servicesLoading={servicesState.loading}
        servicesData={servicesState.current}
        loading={state.loading}
        onFinish={onFinish}
      />
      <Modal
        width={470}
        footer={null}
        visible={modalVisible}
        centered
        onCancel={() => setModalVisible(false)}
        closeIcon={<Icon style={{ fontSize: 24 }} component={closeSvg} />}
      >
        <div className={styles.modalContainer}>
          <Text className={styles.modalLabel}>Số thứ tự được cấp</Text>
          <Text className={styles.modalValue}>
            {providerState.current.ordinalNumber}
          </Text>
          <div className={styles.subValue}>
            <Text>DV:</Text>
            <Text> {providerState.current.services.name} </Text>
            <Text>(tại quầy số 1)</Text>
          </div>
        </div>
        <div className={styles.modalTime}>
          <div className={styles.modalTimeWrapper}>
            <Text className={styles.timeLabel}>Thời gian cấp: </Text>
            <Text>
              {moment(providerState.current.dateProvider.toDate()).format(
                "HH:mm DD/MM/YYYY"
              )}
            </Text>
          </div>
          <div className={styles.modalTimeWrapper}>
            <Text className={styles.timeLabel}>Hạn sử dụng: </Text>
            <Text>
              {moment(providerState.current.dateValid.toDate()).format(
                "HH:mm DD/MM/YYYY"
              )}
            </Text>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ProviderNumberAdd;
