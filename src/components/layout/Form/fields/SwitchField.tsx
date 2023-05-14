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
  name: string;
}

export const SwitchField: FC<Props> = ({
  name,
  label,
  labelAlign,
  hasFeedback,
  ...props
}) => {
  const [field, meta, helpers] = useField(name);

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
    >
      <Switch
        {...props}
        checked={field.value}
        onChange={(checked) => {
          helpers.setValue(checked);
        }}
      />
    </Form.Item>
  );
};
