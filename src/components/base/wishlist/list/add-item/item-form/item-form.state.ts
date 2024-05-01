import { useAuth } from '@/components/base/provider/auth-provider';
import { useWishlist } from '@/components/base/provider/wishlist-provider';
import { wishlistItemSchema, linkUrl } from '@/constants/validation';
import { Database } from '@/lib/schema';
import { TWishlistItem } from '@/types/database.types';
import { IWishlistItemForm } from '@/types/wishlist';
import { getValidationLocalization } from '@/utils/form';
import { notify } from '@/utils/toast';
import { yupResolver } from '@hookform/resolvers/yup';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useTranslations } from 'next-intl';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';

interface IWishlistItemFormState {
  wishlistId: number;
  closeModal: () => void;
  isEdit?: boolean;
  item?: TWishlistItem;
  optimisticAction?: (item: TWishlistItem) => void;
}

export const useItemFormState = ({
  wishlistId,
  closeModal,
  isEdit,
  item,
  optimisticAction,
}: IWishlistItemFormState) => {
  const [isLoading, setIsLoading] = useState(false);
  const [linkToParse, setLinkToParse] = useState<string | null>(null);

  const [OgImage, setOgImage] = useState<string | null>(null);
  const [image, setImage] = useState<File | null>(null);
  const user = useAuth();

  const { items } = useWishlist();

  const supabase = createClientComponentClient<Database>();

  const t = useTranslations('WishlistPage.add.form.fields');
  const commonT = useTranslations('Common');

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<IWishlistItemForm>({
    defaultValues: isEdit
      ? {
          name: item?.name,
          price: item?.price || undefined,
          link: item?.link || undefined,
          description: item?.description || undefined,
          imageUrl: item?.image_url || undefined,
        }
      : undefined,
    resolver: yupResolver<IWishlistItemForm>(wishlistItemSchema),
    mode: 'onBlur',
  });

  const translatedErrors = getValidationLocalization<IWishlistItemForm>(commonT, errors);

  const onSubmit = async (data: IWishlistItemForm) => {
    setIsLoading(true);

    if (image || OgImage) {
      await handleImageUpload();
    }

    const reqData = {
      name: data.name,
      price: data.price || null,
      link: data.link || null,
      description: data.description || null,
      image_url: data.imageUrl || null,
    };

    const { data: addedItem, error } =
      isEdit && item
        ? await supabase.from('items').update(reqData).eq('id', item.id).select()
        : await supabase
            .from('items')
            .insert({
              ...reqData,
              wishlist_id: wishlistId,
              priority: items.length,
            })
            .select();

    setIsLoading(false);

    if (error) {
      notify('error', commonT('errors.default'));
      return;
    }

    optimisticAction && optimisticAction(addedItem[0]);
    closeModal();
  };

  const handlePriceChange = (value: number | string) => {
    const numericValue = typeof value === 'string' ? parseFloat(value) : value;
    setValue('price', isNaN(numericValue) ? 0 : numericValue);
  };

  const handleLinkToParse = async (link: string, event: React.ChangeEvent<HTMLInputElement>) => {
    register('link').onBlur(event);

    const isValid = await linkUrl.isValid(link);
    isValid && setLinkToParse(link);
  };

  const handleImageUpload = async () => {
    setIsLoading(true);

    const formData = new FormData();

    formData.append('userId', user?.id);
    formData.append('wishlistId', wishlistId.toString());
    image && formData.append('file', image);
    OgImage && formData.append('url', OgImage);

    try {
      const res = await fetch('/api/upload-image', {
        method: 'POST',
        body: formData,
      });
      const { imageUrl } = await res.json();
      setIsLoading(false);
      setValue('imageUrl', imageUrl);
    } catch (error) {
      notify('error', commonT('errors.default'));
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setOgImage(null);
  }, [image]);

  return {
    isLoading,
    linkToParse,
    OgImage,
    image,
    translatedErrors,
    register,
    handleSubmit,
    onSubmit,
    setValue,
    getValues,
    handlePriceChange,
    handleLinkToParse,
    handleImageUpload,
    setImage,
    setOgImage,
    setIsLoading,
    t,
  };
};
