import React from 'react';
import Select, { MultiValue, StylesConfig } from 'react-select';

import { TodoTagType } from '@/app/(main)/types';
import { convertHexToRGBA } from '@/lib/utils';

type TagOption = {
  label: string;
  value: string;
  fontColor: string;
  bgColor: string;
};

const colourStyles: StylesConfig<TagOption, true> = {
  control: (styles) => ({ ...styles, backgroundColor: 'white' }),
  option: (styles, { data, isDisabled, isFocused, isSelected }) => {
    return {
      ...styles,
      'color': data.fontColor,
      ':hover': { backgroundColor: convertHexToRGBA(data.bgColor, 0.2) },
    };
  },
  multiValue: (styles, { data }) => {
    return {
      ...styles,
      borderRadius: '8px',
      backgroundColor: convertHexToRGBA(data.bgColor, 0.2),
    };
  },
  multiValueLabel: (styles, { data }) => ({
    ...styles,
    color: data.fontColor,
  }),
  multiValueRemove: (styles, { data }) => ({
    ...styles,
    borderRadius: '0px 8px 8px 0px',
    cursor: 'pointer',
  }),
};

const TagSelect = ({
  options,
  defaultOptions,
  onChange,
  name,
  ...props
}: {
  name: string;
  onChange: (options: MultiValue<TagOption>) => void;
  options: Array<TodoTagType>;
  defaultOptions: Array<TodoTagType>;
}) => {
  const selectOptions = options.map((o) => ({ ...o, label: o.name, value: o._id }));
  const selectDefaultOptions = defaultOptions.map((o) => ({ ...o, label: o.name, value: o._id }));
  return (
    <Select
      {...props}
      name={name}
      onChange={(params) => onChange(params)}
      options={selectOptions}
      defaultValue={selectDefaultOptions}
      closeMenuOnSelect={false}
      isMulti
      styles={colourStyles}
    />
  );
};

export default TagSelect;
