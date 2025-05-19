"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

export function AddFood({ onFoodAdded,onCategoryAdded }) {
  const [categories, setCategories] = useState([]);
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
    clearErrors,
  } = useForm({
    defaultValues: {
      category: "",
    },
  });

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/allCategories")
      .then((res) => setCategories(res.data.categories || []))
      .catch((err) => console.error("Category fetch error:", err.message));
  }, [onCategoryAdded]);

  useEffect(() => {
    register("category", { required: "Category is required" });
  }, [register]);

  const onSubmit = async (data) => {
    if (!image) {
      toast.success('Image is required.', {
        style: {
          border: '1px solid red',
          color: 'red',
        },
      });
      return;
    }

    

    setUploading(true);

    const formData = new FormData();
    formData.append("image", image);

    try {
      const imgRes = await axios.post(
        `https://api.imgbb.com/1/upload?key=2a9bcf84d4334dcac7a2729bb6336536`,
        formData
      );

      const imageUrl = imgRes.data.data.url;

      const foodData = {
        name: data.foodName,
        category: data.category,
        price: parseFloat(data.price),
        rating: parseFloat(data.rating),
        image: imageUrl,
      };

      console.log(foodData);

      const res = await axios.post(
        "http://localhost:5000/api/addFood",
        foodData
      );

      if (res.status === 200 || res.status === 201) {
        toast.success('Food added successfully!', {
        style: {
          border: '1px solid red',
          color: 'red',
        },
      });
        
        reset();
        setImage(null);
        onFoodAdded?.();
      }
    } catch (error) {
      
    
      toast.error('Something went wrong while uploading.', {
        style: {
          border: '1px solid red',
          color: 'red',
        },
      });
    } finally {
      setUploading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="px-4 py-2 rounded-full text-sm font-medium bg-[#2C2C2C] text-white">
          Add Food
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[400px] bg-white/20 backdrop-blur-md">
        <DialogHeader>
          <DialogTitle className="text-white">Add Food</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Input
              placeholder="Enter food name"
              className="col-span-4 rounded-full !border-2 !border-white/50 text-white placeholder-white"
              {...register("foodName", { required: "Food name is required" })}
            />
            {errors.foodName && (
              <p className="text-red-500 text-sm col-span-4 -mt-2">
                {errors.foodName.message}
              </p>
            )}
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Select
              onValueChange={(value) => {
                setValue("category", value);
                clearErrors("category");
              }}
            >
              <SelectTrigger className="col-span-4 rounded-full w-full text-white placeholder-white">
                <SelectValue placeholder="Food Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat, index) => (
                  <SelectItem key={index} value={cat.name}>
                    {cat.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.category && (
              <p className="text-red-500 text-sm col-span-4 -mt-2">
                {errors.category.message}
              </p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Input
              type="number"
              placeholder="Price"
              className="rounded-full !border-2 !border-white/50 text-white placeholder-white"
              {...register("price", {
                required: "Price is required",
                min: { value: 1, message: "Price must be at least 1" },
              })}
            />
            <Input
              type="number"
              placeholder="Rating (1-5)"
              className="rounded-full !border-2 !border-white/50 text-white placeholder-white"
              {...register("rating", {
                required: "Rating is required",
                min: { value: 1, message: "Min rating is 1" },
                max: { value: 5, message: "Max rating is 5" },
              })}
            />
          </div>
          {errors.price && (
            <p className="text-red-500 text-sm -mt-2">{errors.price.message}</p>
          )}
          {errors.rating && (
            <p className="text-red-500 text-sm -mt-2">
              {errors.rating.message}
            </p>
          )}

          <div className="grid grid-cols-4 items-center gap-4">
            <div className="col-span-4 border-dashed bg-orange-600/40 border-2 border-orange-600 rounded-full p-2 text-center">
              <label htmlFor="image" className="cursor-pointer text-white">
                {image ? image.name : "Upload or drag image here"}
              </label>
              <Input
                type="file"
                id="image"
                accept="image/*"
                onChange={(e) =>
                  setImage(e.target.files ? e.target.files[0] : null)
                }
                className="hidden"
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              type="submit"
              className="w-full rounded-full bg-orange-600 hover:bg-orange-700"
              disabled={uploading}
            >
              {uploading ? "Uploading..." : "Save"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
