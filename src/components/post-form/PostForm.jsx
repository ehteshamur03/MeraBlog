import React, { useCallback } from "react";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import { Button, Input, RTE, Select } from "..";
import appwriteService from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PostForm({ post, onDelete }) {
    const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.$id || "",
            content: post?.content || "",
            status: post?.status || "active",
        },
    });

    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);

    const submit = async (data) => {
        if (post) {
            const file = data.image[0] ? await appwriteService.uploadFile(data.image[0]) : null;

            if (file) {
                appwriteService.deleteFile(post.featuredImage);
            }

            const dbPost = await appwriteService.updatePost(post.$id, {
                ...data,
                featuredImage: file ? file.$id : undefined,
            });

            if (dbPost) {
                navigate(`/post/${dbPost.$id}`);
            }
        } else {
            const file = await appwriteService.uploadFile(data.image[0]);

            if (file) {
                const fileId = file.$id;
                data.featuredImage = fileId;
                data.user_Id = userData.$id;

                const dbPost = await appwriteService.createPost(data);

                if (dbPost) {
                    navigate(`/post/${dbPost.$id}`);
                }
            }
        }
    };

    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string")
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                .replace(/\s/g, "-");

        return "";
    }, []);

    React.useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "title") {
                setValue("slug", slugTransform(value.title), { shouldValidate: true });
            }
        });

        return () => subscription.unsubscribe();
    }, [watch, slugTransform, setValue]);

    const handleDelete = async () => {
        if (window.confirm("Are you sure you want to delete this post?")) {
            await appwriteService.deletePost(post.$id);
            onDelete();
        }
    };

    return (
        <form onSubmit={handleSubmit(submit)} className="grid grid-cols-1 lg:grid-cols-2 gap-8 bg-white p-8 rounded-xl shadow-xl max-w-6xl mx-auto">
            {/* Left Column (Title, Slug, Content) */}
            <div className="space-y-6">
                <div>
                    <Input
                        label="Title :"
                        placeholder="Enter the title"
                        className="mb-4 border border-gray-300 p-6 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                        {...register("title", { required: true })}
                    />
                </div>
                <div>
                    <Input
                        label="Slug :"
                        placeholder="Enter the slug"
                        className="mb-4 border border-gray-300 p-6 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                        {...register("slug", { required: true })}
                        onInput={(e) => {
                            setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                        }}
                    />
                </div>
                <div>
                    <RTE
                        label="Content :"
                        name="content"
                        control={control}
                        defaultValue={getValues("content")}
                        className="mb-4 border border-gray-300 p-6 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
            </div>

            {/* Right Column (Image Upload, Status, Submit Button) */}
            <div className="space-y-6">
                <div className="mb-4">
                    <Input
                        label="Featured Image :"
                        type="file"
                        className="border border-gray-300 p-6 rounded-lg w-full cursor-pointer bg-gray-100 focus:outline-none"
                        accept="image/png, image/jpg, image/jpeg, image/gif"
                        {...register("image", { required: !post })}
                    />
                    {post && post.featuredImage && (
                        <div className="mt-4">
                            <img
                                src={appwriteService.getFilePreview(post.featuredImage)}
                                alt={post.title}
                                className="rounded-lg shadow-md w-full object-cover"
                            />
                        </div>
                    )}
                </div>

                <div>
                    <Select
                        options={["active", "inactive"]}
                        label="Status"
                        className="mb-4 border border-gray-300 p-6 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                        {...register("status", { required: true })}
                    />
                </div>

                <div className="flex space-x-4">
                    <Button
                        type="submit"
                        bgColor={post ? "bg-green-500 hover:bg-green-600" : "bg-blue-500 hover:bg-blue-600"}
                        className="w-full py-4 text-white rounded-lg transition duration-200"
                    >
                        {post ? "Update" : "Submit"}
                    </Button>

                    {post && (
                        <Button
                            type="button"
                            bgColor="bg-red-500 hover:bg-red-600"
                            className="w-full py-4 text-white rounded-lg transition duration-200"
                            onClick={handleDelete}
                        >
                            Delete
                        </Button>
                    )}
                </div>
            </div>
        </form>
    );
}

PostForm.propTypes = {
    post: PropTypes.shape({
        title: PropTypes.string,
        $id: PropTypes.string,
        content: PropTypes.string,
        status: PropTypes.string,
        featuredImage: PropTypes.string,
    }),
    onDelete: PropTypes.func, // Callback to refresh post list on deletion
};
