import React, { FC, ReactNode, useMemo } from 'react';
import { Form, Input } from 'antd';
import { TextAreaProps } from 'antd/es/input';
import { FormLabelAlign } from 'antd/es/form/interface';
import { useField } from 'formik';

interface Props extends TextAreaProps {
  label?: string | ReactNode;
  labelAlign?: FormLabelAlign;
  hasFeedback?: boolean;
}

export const TextAreaField: FC<Props> = ({
  name,
  label,
  labelAlign,
  hasFeedback,
  ...props
}) => {
  const [field, meta] = useField(String(name));

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
      <Input.TextArea {...field} {...props} />
    </Form.Item>
  );
};
