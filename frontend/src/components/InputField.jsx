import React from "react";

const InputField = React.forwardRef(
  ({ onChange, onBlur, name, label, type, placeholder, error }, ref) => {
    return (
      <div>
        {/* <label
          htmlFor={label}
          className={`block text-sm font-medium ${
            error ? "text-red-700" : "text-gray-700"
          } w-fit px-1`}
        >
          {label}
        </label> */}

        <input
          name={name}
          ref={ref}
          onChange={onChange}
          onBlur={onBlur}
          type={type}
          placeholder={placeholder}
          className={`h-12 w-full rounded-md ${
            error ? "border-red-700 focus:border-red-700 focus:ring-red-700" : "border-gray-300"
          } shadow-sm sm:text-sm`}
        />
      </div>
    );
  }
);

export default InputField;
