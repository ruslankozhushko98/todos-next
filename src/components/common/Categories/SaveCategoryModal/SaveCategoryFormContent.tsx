import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Form } from 'antd';
import { useFormikContext } from 'formik';

import { SaveEntityInitialValues } from '@/libs/utils/types';
import { TextField, TextAreaField } from '@/components/layout/Form/fields';

interface Props {
  onCancel: () => void;
}

export const SaveCategoryFormContent: FC<Props> = ({ onCancel }) => {
  const { t } = useTranslation();
  const { handleSubmit, isSubmitting } = useFormikContext<SaveEntityInitialValues>();

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
        hasFeedback
      />

      <TextAreaField
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
