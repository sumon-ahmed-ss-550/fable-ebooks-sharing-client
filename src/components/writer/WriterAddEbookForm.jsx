"use client";

import React, { useState } from "react";
import { Card, Form, Input, TextArea, Button } from "@heroui/react";
import {
  ArrowUpToLine,
  BookOpen,
  CircleCheckFill,
  CircleExclamation,
} from "@gravity-ui/icons";
import Image from "next/image";

const WriterAddEbookForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    genre: "",
  });

  const [coverImage, setCoverImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState({ type: "", text: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCoverImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const uploadToImgBB = async (imageFile) => {
    const bodyData = new FormData();
    bodyData.append("image", imageFile);

    const response = await fetch(
      `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`,
      {
        method: "POST",
        body: bodyData,
      },
    );

    const data = await response.json();
    if (data.success) {
      return data.data.display_url;
    } else {
      throw new Error("ImgBB upload failed.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatusMessage({ type: "", text: "" });

    try {
      if (!coverImage) {
        throw new Error("Please select a cover image for the Ebook.");
      }

      const coverImageUrl = await uploadToImgBB(coverImage);

      const ebookPayload = {
        title: formData.title,
        description: formData.description,
        price: Number(formData.price),
        genre: formData.genre,
        coverImage: coverImageUrl,
      };

      setStatusMessage({
        type: "success",
        text: "Ebook added successfully!",
      });

      setFormData({ title: "", description: "", price: "", genre: "" });
      setCoverImage(null);
      setImagePreview(null);
    } catch (err) {
      setStatusMessage({
        type: "error",
        text: err.message || "An unexpected error occurred.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full shadow-lg border-2 border-default-200">
      <Card.Header className="flex gap-3 px-6 pt-6 pb-2">
        <div className="p-2 rounded-lg bg-primary-100 text-primary">
          <BookOpen className="w-6 h-6" />
        </div>
        <div>
          <Card.Title className="text-xl font-bold text-foreground">
            Add New Ebook
          </Card.Title>
          <Card.Description className="text-small text-default-500">
            Fill in the details below to publish a new book on Fable.
          </Card.Description>
        </div>
      </Card.Header>

      <Card.Content className="px-6 py-4">
        {statusMessage.text && (
          <div
            className={`mb-6 p-4 rounded-xl flex items-center gap-3 text-small ${
              statusMessage.type === "success"
                ? "bg-success-50 text-success border border-success-200"
                : "bg-danger-50 text-danger border border-danger-200"
            }`}
          >
            {statusMessage.type === "success" ? (
              <CircleCheckFill className="w-5 h-5 shrink-0" />
            ) : (
              <CircleExclamation className="w-5 h-5 shrink-0" />
            )}
            <span>{statusMessage.text}</span>
          </div>
        )}

        <Form onSubmit={handleSubmit} className="w-full flex flex-col gap-5">
          {/* Title */}
          <div className="w-full border-2 border-default-300 rounded-xl px-3 py-1 focus-within:border-primary transition-colors">
            <Input
              required
              label="Ebook Title"
              placeholder="e.g., The Secret of the Whispering Woods"
              name="title"
              value={formData.title}
              onChange={handleChange}
              size="lg"
              className="w-full"
            />
          </div>

          {/* Genre & Price */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
            <div className="w-full border-2 border-default-300 rounded-xl px-3 py-1 focus-within:border-primary transition-colors">
              <Input
                required
                label="Genre"
                placeholder="e.g., Fantasy, Sci-Fi, Romance"
                name="genre"
                value={formData.genre}
                onChange={handleChange}
                className="w-full"
              />
            </div>

            <div className="w-full border-2 border-default-300 rounded-xl px-3 py-1 focus-within:border-primary transition-colors">
              <Input
                required
                type="number"
                min="0"
                step="0.01"
                label="Price ($)"
                placeholder="0.00 (Set 0 for free)"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="w-full"
              />
            </div>
          </div>

          {/* Description / Content */}
          <div className="w-full border-2 border-default-300 rounded-xl px-3 py-2 focus-within:border-primary transition-colors">
            <TextArea
              required
              label="Description / Full Content"
              placeholder="Enter the ebook synopsis or full content overview..."
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={5}
              className="w-full"
            />
          </div>

          {/* Cover Image Upload */}
          <div className="w-full flex flex-col gap-2">
            <label className="text-small font-medium text-foreground">
              Cover Image Upload <span className="text-danger">*</span>
            </label>

            <div className="w-full flex flex-col sm:flex-row items-center gap-4">
              <label className="w-full flex flex-col items-center justify-center p-6 border-2 border-dashed border-default-300 hover:border-primary rounded-xl cursor-pointer transition-colors bg-default-50 hover:bg-default-100">
                <ArrowUpToLine className="w-8 h-8 text-default-500 mb-2" />
                <span className="text-small text-default-600 font-medium">
                  Click to select cover image
                </span>
                <span className="text-tiny text-default-400">
                  PNG, JPG, JPEG or WEBP
                </span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>

              {imagePreview && (
                <div className="relative w-32 h-44 shrink-0 rounded-lg overflow-hidden border-2 border-default-300 shadow-sm">
                  <Image
                    width={128}
                    height={176}
                    loading="eager"
                    src={imagePreview}
                    alt="Cover Preview"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            color="primary"
            size="lg"
            isLoading={loading}
            className="w-full mt-2 font-semibold"
          >
            {loading ? "Uploading & Saving..." : "Publish Ebook"}
          </Button>
        </Form>
      </Card.Content>
    </Card>
  );
};

export default WriterAddEbookForm;
