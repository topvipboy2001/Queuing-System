import { message } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  serviceGetByIdAction,
  serviceUpdateByIdAction,
} from "../../State/Actions/ServicesActions";
import { ServiceAddType } from "../../State/ActionTypes/ServicesActionTypes";
import { RootStore } from "../../State/Store";
import ServiceUpdateLayout from "./Components/ServiceUpdateLayout";

const ServiceUpdate = () => {
  const dispatch = useDispatch();
  const state = useSelector((state: RootStore) => state.service);
  const updateState = useSelector((state: RootStore) => state.services);
  const [prefix, setPrefix] = useState(false);
  const [surfix, setSurfix] = useState(false);
  const [increase, setIncrease] = useState(false);
  const { id } = useParams();

  const [initialValues, setInitialValues] = useState({});

  const onFinish = async (values: any) => {
    const valueFormat: ServiceAddType = {
      id: values.id,
      name: values.name,
      description: values.description ? values.description : null,
      increase: {
        from: increase ? values.increaseFrom : null,
        to: increase ? values.increaseTo : null,
      },
      prefix: prefix ? values.prefix : null,
      surfix: surfix ? values.surfix : null,
      isReset: values.isReset,
    };

    try {
      await dispatch(serviceUpdateByIdAction(valueFormat));
      message.success("Cập nhật dịch vụ thành công!");
    } catch (error: any) {
      message.error(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (typeof id === "string") {
          await dispatch(serviceGetByIdAction(id));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [dispatch, id]);

  useEffect(() => {
    if (state.current.increase) {
      setIncrease(true);
    }

    if (state.current.surfix) {
      setSurfix(true);
    }

    if (state.current.prefix) {
      setPrefix(true);
    }

    setInitialValues({
      id: state.current.id,
      name: state.current.name,
      increaseTo: state.current.increase.to,
      increaseFrom: state.current.increase.from,
      prefix: state.current.prefix,
      surfix: state.current.surfix,
      isReset: state.current.isReset,
      description: state.current.description,
    });
    // eslint-disable-next-line
  }, [state.current]);

  return (
    <ServiceUpdateLayout
      initialValues={initialValues}
      onFinish={onFinish}
      loading={updateState.loading}
      prefix={prefix}
      setPrefix={setPrefix}
      surfix={surfix}
      setSurfix={setSurfix}
      increase={increase}
      setIncrease={setIncrease}
    />
  );
};

export default ServiceUpdate;
