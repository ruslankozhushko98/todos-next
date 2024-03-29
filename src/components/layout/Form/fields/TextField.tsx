import React, { FC, ReactNode, useMemo } from 'react';
import { Form, Input, InputProps } from 'antd';
import { FormLabelAlign } from 'antd/es/form/interface';
import { useField } from 'formik';
import classNames from 'classnames';

import classes from './Fields.module.scss';

interface Props extends InputProps {
  label?: string | ReactNode;
  labelAlign?: FormLabelAlign;
  hasFeedback?: boolean;
  textarea?: boolean;
  hideError?: boolean;
}

export const TextField: FC<Props> = ({
  name,
  label,
  labelAlign,
  hasFeedback,
  hideError = false,
  className,
  ...props
}) => {
  const [field, meta] = useField(String(name));

  const isError: boolean = useMemo(() => {
    return !hideError && meta.touched && Boolean(meta.error);
  }, [meta.touched, meta.error]);

  return (
    <Form.Item
      label={label}
      labelAlign={labelAlign}
      validateStatus={isError ? 'error' : undefined}
      help={isError ? meta.error : null}
      hasFeedback={hasFeedback}
    >
      {props.type === 'password' ? (
        <Input.Password
          {...field}
          {...props}
          className={classNames(classes.textField, className)}
        />      
      ) : (
        <Input
          {...field}
          {...props}
          className={classNames(classes.textField, className)}
        />
      )}
    </Form.Item>
  );
};
