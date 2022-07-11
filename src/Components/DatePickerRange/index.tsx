import React, { createRef, FC, useEffect, useState } from "react";
import {
  Calendar,
  DayRange,
} from "@hassanmojab/react-modern-calendar-datepicker";
import { DatePicker as AntDatePicker, Popover, Space } from "antd";
import moment, { Moment } from "moment";
import { RangeValue } from "rc-picker/lib/interface";

interface IDatePickerRange {
  value?: RangeValue<Moment>;
  onChange?: (value: RangeValue<Moment>) => void;
}

const DatePickerRange: FC<IDatePickerRange> = (props) => {
  const wrapper = createRef();
  const [value, setValue] = useState<RangeValue<Moment>>(null);
  const [calendarValue, setCalendarValue] = useState<DayRange>({
    from: null,
    to: null,
  });

  useEffect(() => {
    props.value && setValue(props.value);
  }, [props, props.value]);

  useEffect(() => {
    props.onChange?.(value);
  }, [value]);

  const handleOnchangeCalendar = (e: DayRange) => {
    setCalendarValue(e);
    if (e.to && e.from) {
      setValue([
        moment({ ...e.from, month: e.from.month - 1 }),
        moment({ ...e.to, month: e.to.month - 1 }),
      ]);
    }
  };

  const handleOnChangeFrom = (e: Moment | null) => {
    if (value) {
      setValue([e, value[1]]);
      const time = moment(e).toObject();
      setCalendarValue((pre) => ({
        ...pre,
        from: { day: time.date, month: time.months, year: time.years },
      }));
    } else {
      setValue(null);
    }
  };

  const handleOnChangeTo = (e: Moment | null) => {
    if (value) {
      setValue([value[0], e]);
      const time = moment(e).toObject();

      setCalendarValue((pre) => ({
        ...pre,
        to: { day: time.date, month: time.months, year: time.years },
      }));
    } else {
      setValue(null);
    }
  };

  const calenderContent = (
    <Calendar
      value={calendarValue}
      onChange={(e) => handleOnchangeCalendar(e)}
    />
  );

  return (
    <Popover
      trigger="click"
      overlayInnerStyle={{ borderRadius: 20 }}
      content={calenderContent}
      ref={wrapper}
    >
      <Space>
        <AntDatePicker
          value={value ? value[0] : undefined}
          size="large"
          panelRender={() => undefined}
          onChange={handleOnChangeFrom}
        />
        <AntDatePicker
          value={value ? value[1] : undefined}
          size="large"
          panelRender={() => undefined}
          onChange={handleOnChangeTo}
        />
      </Space>
    </Popover>
  );
};

export default DatePickerRange;
