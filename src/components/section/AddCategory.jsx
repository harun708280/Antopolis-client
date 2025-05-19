'use client';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axios from 'axios';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

const schema = yup.object().shape({
  categoryName: yup.string().required('Category name is required'),
});

export function AddCategory({onCategoryAdded}) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      const res = await axios.post('https://antopolis-server-two.vercel.app/api/categories', {
        name: data.categoryName,
      });
    
      onCategoryAdded()
      reset(); 
      toast.success('Category added!', {
        style: {
          border: '1px solid red',
          color: 'red',
        },
      });
    } catch (err) {
     toast.error('Failed to add category', {
        style: {
          border: '1px solid red',
          color: 'red',
        },
      });
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="px-4 py-2 rounded-full text-sm font-medium bg-[#2C2C2C] text-white">
          Add Category
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[300px] bg-white/20 backdrop-blur-md">
        <DialogHeader>
          <DialogTitle className="text-white">Add Category</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-2 py-4">
            <Input
              placeholder="Enter category name"
              {...register('categoryName')}
              className="col-span-4 rounded-full !border-white"
            />
            {errors.categoryName && (
              <p className="text-red-500 text-sm">
                {errors.categoryName.message}
              </p>
            )}
          </div>

          <DialogFooter className="w-full">
            <Button
              className="w-full rounded-full bg-orange-700 hover:bg-orange-800"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Saving...' : 'Save'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
