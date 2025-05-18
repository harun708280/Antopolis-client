'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
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

export function AddFood() {
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
      category: '',
    },
  });

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/allCategories")
      .then((res) => setCategories(res.data.categories || []))
      .catch((err) => console.error("Category fetch error:", err.message));
  }, []);

  useEffect(() => {
    register("category", { required: "Category is required" });
  }, [register]);

  const onSubmit = async (data) => {
    if (!image) {
      alert("Image is required.");
      return;
    }

    setUploading(true);

    const formData = new FormData();
    formData.append('image', image);

    try {
      const imgRes = await axios.post(
        `https://api.imgbb.com/1/upload?key=2a9bcf84d4334dcac7a2729bb6336536`,
        formData
      );

      const imageUrl = imgRes.data.data.url;

      const foodData = {
        name: data.foodName,
        category: data.category,
        image: imageUrl,
      };

      console.log(foodData);
      

      const res = await axios.post("http://localhost:5000/api/addFood", foodData);

      if (res.status === 200 || res.status === 201) {
        alert("Food added successfully!");
        reset();
        setImage(null);
      }
    } catch (error) {
      console.error("Upload error:", error);
      alert("Something went wrong while uploading.");
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
              <p className="text-red-500 text-sm col-span-4 -mt-2">{errors.foodName.message}</p>
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
              <p className="text-red-500 text-sm col-span-4 -mt-2">{errors.category.message}</p>
            )}
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <div className="col-span-4 border-dashed bg-orange-600/40 border-2 border-orange-600 rounded-full p-2 text-center">
              <label htmlFor="image" className="cursor-pointer text-white">
                {image ? image.name : "Upload or drag image here"}
              </label>
              <Input
                type="file"
                id="image"
                accept="image/*"
                onChange={(e) => setImage(e.target.files ? e.target.files[0] : null)}
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
