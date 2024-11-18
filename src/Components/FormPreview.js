import React from "react";
import { useForm } from "react-hook-form";
import "../index.css";

const FormPreview = ({ jsonData }) => {
  // call the hook unconditionally
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  // handle conditional rendering
  if (!jsonData || Object.keys(jsonData).length === 0) {
    return <p>Loading form...</p>;
  }

  const { formTitle, formDescription, fields } = jsonData;

  const onSubmit = (data) => {
    console.log("Form Data:", data);
    alert("Form submitted successfully!");
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">{formTitle}</h1>
      <p className="text-gray-600 mb-6">{formDescription}</p>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {fields.map((field) => {
          switch (field.type) {
            case "text":
            case "email":
              return (
                <div key={field.id}>
                  <label className="block mb-1 font-semibold">
                    {field.label}
                  </label>
                  <input
                    {...register(field.id, {
                      required: field.required,
                      pattern: field.validation?.pattern
                        ? {
                            value: new RegExp(field.validation.pattern),
                            message: field.validation.message,
                          }
                        : undefined,
                    })}
                    type={field.type}
                    placeholder={field.placeholder}
                    className="border p-2 w-full rounded"
                  />
                  {errors[field.id] && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors[field.id]?.message || "This field is required"}
                    </p>
                  )}
                </div>
              );
            case "select":
              return (
                <div key={field.id}>
                  <label className="block mb-1 font-semibold">
                    {field.label}
                  </label>
                  <select
                    {...register(field.id, { required: field.required })}
                    className="border p-2 w-full rounded"
                  >
                    <option value="">Select an option</option>
                    {field.options?.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  {errors[field.id] && (
                    <p className="text-red-500 text-sm mt-1">
                      This field is required
                    </p>
                  )}
                </div>
              );
            case "radio":
              return (
                <div key={field.id}>
                  <label className="block mb-1 font-semibold">
                    {field.label}
                  </label>
                  {field.options?.map((option) => (
                    <label
                      key={option.value}
                      className="flex items-center space-x-2"
                    >
                      <input
                        {...register(field.id, { required: field.required })}
                        type="radio"
                        value={option.value}
                      />
                      <span>{option.label}</span>
                    </label>
                  ))}
                  {errors[field.id] && (
                    <p className="text-red-500 text-sm mt-1">
                      This field is required
                    </p>
                  )}
                </div>
              );
            case "textarea":
              return (
                <div key={field.id}>
                  <label className="block mb-1 font-semibold">
                    {field.label}
                  </label>
                  <textarea
                    {...register(field.id, { required: field.required })}
                    placeholder={field.placeholder}
                    className="border p-2 w-full rounded"
                  />
                  {errors[field.id] && (
                    <p className="text-red-500 text-sm mt-1">
                      This field is required
                    </p>
                  )}
                </div>
              );
            default:
              return null;
          }
        })}
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default FormPreview;