import React, { FC, ReactNode, useMemo } from 'react';
import { Form, Switch, SwitchProps } from 'antd';
import { FormLabelAlign } from 'antd/es/form/interface';
import { useField } from 'formik';

interface Props extends SwitchProps {
  label?: string | ReactNode;
  labelAlign?: FormLabelAlign;
  hasFeedback?: boolean;
  textarea?: boolean;
  hideError?: boolean;
  formItemClassName?: string;
  name: string;
}

export const SwitchField: FC<Props> = ({
  name,
  label,
  labelAlign,
  hasFeedback,
  formItemClassName,
  ...props
}) => {
  const [field, meta, helpers] = useField(name);

  const handleChange = (checked: boolean): void => helpers.setValue(checked); 

  const isError: boolean = useMemo(() => {
    return meta.touched && Boolean(meta.error);
  }, [meta.touched, meta.error]);

  return (
    <Form.Item
      label={label}
      labelAlign={labelAlign}
      validateStatus={isError ? 'error' : undefined}
      help={isError ? meta.error : null}
      hasFeedback={hasFeedback}
      className={formItemClassName}
    >
      <Switch
        {...props}
        checked={field.value}
        onChange={handleChange}
      />
    </Form.Item>
  );
};
