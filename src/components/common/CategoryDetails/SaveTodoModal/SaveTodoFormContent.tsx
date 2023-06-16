import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useFormikContext } from 'formik';
import { Form } from 'antd';

import { SaveTodoInitialValues } from '@/libs/utils/types';
import {
  TextAreaField,
  TextField,
  SwitchField,
} from '@/components/layout/Form/fields';

import classes from './SaveTodoModal.module.scss';

interface Props {
  onCancel: () => void;
}

export const SaveTodoFormContent: FC<Props> = ({ onCancel }) => {
  const { t } = useTranslation();
  const { handleSubmit, isSubmitting } = useFormikContext<SaveTodoInitialValues>();

  return (
    <Form onFinish={handleSubmit} layout="vertical">
      <TextField
        label={
          <span className="text-text text-base">
            {t('categories.saveCategoryModal.fields.titleField.label')}
          </span>
        }
        placeholder={t('categories.saveCategoryModal.fields.titleField.placeholder').toString()}
        type="text"
        name="title"
        size="large"
        autoFocus
        hasFeedback
      />

      <TextAreaField
        className="resize-none"
        label={
          <span className="text-text text-base">
            {t('categories.saveCategoryModal.fields.descriptionField.label')}
          </span>
        }
        placeholder={t('categories.saveCategoryModal.fields.descriptionField.placeholder').toString()}
        name="description"
        size="large"
        rows={10}
      />

      <div className="flex justify-end">
        <SwitchField
          formItemClassName={classes.formItemSwitch}
          name="isDone"
          label={
            <span className="text-text text-base">
              {t('categories.saveCategoryModal.fields.switchField.label')}
            </span>
          }
        />
      </div>

      <div className="flex justify-end items-center">
        <button
          type="button"
          onClick={onCancel}
          className="bg-white hover:bg-slate-100 px-5 py-2 rounded-xl"
        >
          <span className="text-black text-base">
            {t('categories.saveCategoryModal.cancelBtn')}
          </span>
        </button>

        <button
          type="submit"
          className="ml-4 bg-blue hover:bg-sky-600 px-5 py-2 rounded-xl"
          disabled={isSubmitting}
        >
          <span className="text-white text-base">
            {t('categories.saveCategoryModal.saveBtn')}
          </span>
        </button>
      </div>
    </Form>
  );
};
