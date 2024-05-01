import React from 'react';

import styles from './item-form.module.scss';
import { AddItemImage } from './item-image/item-image';
import { TWishlistItem } from '@/types/database.types';
import { Button, NumberInput, TextInput, Textarea } from '@mantine/core';
import { useItemFormState } from './item-form.state';

interface IWishlistItemFormProps {
  wishlistId: number;
  closeModal: () => void;
  isEdit?: boolean;
  item?: TWishlistItem;
  optimisticAction?: (item: TWishlistItem) => void;
}

export const WishlistItemForm: React.FC<IWishlistItemFormProps> = ({
  wishlistId,
  closeModal,
  isEdit,
  item,
  optimisticAction,
}) => {
  const {
    handleSubmit,
    onSubmit,
    register,
    translatedErrors,
    handlePriceChange,
    getValues,
    handleLinkToParse,
    linkToParse,
    setImage,
    setOgImage,
    setIsLoading,
    isLoading,
    t,
  } = useItemFormState({ wishlistId, closeModal, isEdit, item, optimisticAction });

  return (
    <form className={styles.wrapper} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.flex}>
        <TextInput
          label={t('name.label')}
          description={t('name.description')}
          placeholder={t('name.label')}
          {...(register && register('name'))}
          error={translatedErrors['name']}
          className={styles.input}
        />
        <NumberInput
          onChange={handlePriceChange}
          error={translatedErrors['price']}
          value={getValues('price')}
          prefix='$'
          min={0}
          max={100000}
          decimalScale={2}
          thousandSeparator=','
          className={styles.input}
          label={t('price.label')}
          description={t('price.description')}
        />
      </div>
      <TextInput
        className={styles.input}
        {...(register && register('link'))}
        onBlur={(event) => handleLinkToParse(event.target.value, event)}
        error={translatedErrors['link']}
        label={t('link.label')}
        description={t('link.description')}
      />
      <AddItemImage
        link={linkToParse}
        setFile={setImage}
        setImageToUpload={setOgImage}
        initialImage={getValues('imageUrl')}
        setDisabled={setIsLoading}
      />
      <Textarea
        className={styles.input}
        {...(register && register('description'))}
        label={t('description.label')}
        description={t('description.description')}
        error={translatedErrors['description']}
      />
      <Button type='submit' loading={isLoading} disabled={isLoading}>
        {t('save.label')}
      </Button>
    </form>
  );
};
