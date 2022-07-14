import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import {
  Calendar,
  DayRange,
} from "@hassanmojab/react-modern-calendar-datepicker";
import { DatePicker as AntDatePicker, Popover, Space } from "antd";
import moment, { Moment } from "moment";
import { RangeValue } from "rc-picker/lib/interface";
import { ArrowRight2, Calendar as CalendarIcon } from "iconsax-react";

interface IDatePickerRange {
  value?: RangeValue<Moment>;
  onChange?: (value: RangeValue<Moment>) => void;
}

const DatePickerRange = forwardRef((props: IDatePickerRange, ref) => {
  useImperativeHandle(ref, () => ({}));

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
  }, [value, props]);

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

      if (e) {
        const time = moment(e).toObject();
        setCalendarValue((pre) => ({
          ...pre,
          from: { day: time.date, month: time.months, year: time.years },
        }));
      } else {
        setCalendarValue((pre) => ({
          ...pre,
          from: null,
        }));
      }
    } else {
      setValue(null);
    }
  };

  const handleOnChangeTo = (e: Moment | null) => {
    if (value) {
      setValue([value[0], e]);

      if (e) {
        const time = moment(e).toObject();
        setCalendarValue((pre) => ({
          ...pre,
          to: { day: time.date, month: time.months, year: time.years },
        }));
      } else {
        setCalendarValue((pre) => ({
          ...pre,
          to: null,
        }));
      }
    } else {
      setValue(null);
    }
  };

  const calenderContent = (
    <Calendar
      value={calendarValue}
      onChange={(e) => handleOnchangeCalendar(e)}
      colorPrimary="#FF7506"
      colorPrimaryLight="#FFF2E7"
    />
  );

  return (
    <Popover
      trigger="click"
      overlayInnerStyle={{ borderRadius: 20 }}
      content={calenderContent}
    >
      <Space size={4}>
        <AntDatePicker
          value={value ? value[0] : undefined}
          size="large"
          panelRender={() => undefined}
          onChange={handleOnChangeFrom}
          suffixIcon={<CalendarIcon size={20} color="#FF7506" />}
          format="DD/MM/YYYY"
          style={{ width: 150 }}
        />
        <ArrowRight2 variant="Bold" size={12} />
        <AntDatePicker
          value={value ? value[1] : undefined}
          size="large"
          panelRender={() => undefined}
          onChange={handleOnChangeTo}
          suffixIcon={<CalendarIcon size={20} color="#FF7506" />}
          format="DD/MM/YYYY"
          style={{ width: 150 }}
        />
      </Space>
    </Popover>
  );
});

export default DatePickerRange;
