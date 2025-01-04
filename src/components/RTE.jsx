/* eslint-disable no-unused-vars */
import React from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Controller } from "react-hook-form";
import PropTypes from "prop-types";
import { isMobile } from "react-device-detect";

export default function RTE({ name, control, label, defaultValue = "" }) {
  const dynamicHeight = isMobile ? 300 : 500; // Adjust height based on device

  const editorConfig = {
    initialValue: defaultValue,
    icons: "thin",
    readonly: false,
    height: dynamicHeight,
    menubar: !isMobile, // Disable menubar on mobile for simplicity
    mobile: {
      menubar: false,
      plugins: "autolink lists autosave",
      toolbar: "undo redo | bold italic | bullist numlist",
    },
    plugins: [
      "image",
      "advlist",
      "autolink",
      "lists",
      "link",
      "charmap",
      "preview",
      "anchor",
      "searchreplace",
      "visualblocks",
      "fullscreen",
      "insertdatetime",
      "media",
      "table",
      "help",
      "wordcount",
    ],
    toolbar: !isMobile
      ? "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help"
      : "undo redo | bold italic | bullist numlist", // Simplified toolbar for mobile
    content_style:
      "body { font-family: Helvetica, Arial, sans-serif; font-size: 14px; line-height: 1.6 }",
    skin: "oxide",
    content_css: "default",
  };

  return (
    <div className="w-full space-y-4">
      {label && (
        <label className="inline-block mb-2 pl-1 text-lg font-semibold text-gray-800">
          {label}
        </label>
      )}

      <Controller
        name={name || "content"}
        control={control}
        render={({ field: { onChange } }) => (
          <Editor
            initialValue={defaultValue}
            apiKey={"kzysrma0k0q0e07zs3leab0ufufratduhvj7wq56w4cawq92"}
            init={editorConfig}
            onEditorChange={onChange}
            className="rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        )}
      />

      {/* Placeholder for validation messages */}
      <p className="text-red-500 text-sm">{/* Validation message here */}</p>
    </div>
  );
}

RTE.propTypes = {
  name: PropTypes.string,
  control: PropTypes.object.isRequired,
  label: PropTypes.string,
  defaultValue: PropTypes.string,
};

RTE.defaultProps = {
  name: "content",
  defaultValue: "",
  label: null,
};
