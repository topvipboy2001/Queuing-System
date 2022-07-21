import React from "react";
import type { CustomTagProps } from "rc-select/lib/BaseSelect";
import { Tag } from "antd";

const TagRender = (props: CustomTagProps) => {
  const { label, closable, onClose } = props;
  const onPreventMouseDown = (event: React.MouseEvent<HTMLSpanElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };

  return (
    <Tag
      color={"#FFAC6A"}
      onMouseDown={onPreventMouseDown}
      closable={closable}
      onClose={onClose}
      style={{
        marginRight: 15,
        borderRadius: 9,
        fontSize: 14,
        fontWeight: 700,
      }}
    >
      {label}
    </Tag>
  );
};

export default TagRender;
