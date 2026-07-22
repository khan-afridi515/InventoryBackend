const getDuplicateFieldLabel = (fieldPath = "") => {
  const labels = {
    "basicInfo.sku": "SKU",
    email: "email",
  };

  return labels[fieldPath] || fieldPath || "value";
};

const getDuplicateResourceName = (error) => {
  const collectionName = error?.message?.match(/collection:\s+\S+\.(\S+)/)?.[1];

  const resourceNames = {
    products: "product",
    users: "user",
    quizquestions: "quiz question",
  };

  return resourceNames[collectionName] || "record";
};

const formatApiError = (error, fallbackMessage = "Something went wrong") => {
  if (error?.code === 11000) {
    const duplicateField = Object.keys(error.keyPattern || error.keyValue || {})[0];
    const duplicateValue = error.keyValue?.[duplicateField];
    const fieldLabel = getDuplicateFieldLabel(duplicateField);
    const resourceName = getDuplicateResourceName(error);

    return {
      status: 409,
      message: duplicateValue
        ? `A ${resourceName} with this ${fieldLabel} already exists: ${duplicateValue}. Please use a different ${fieldLabel}.`
        : `A ${resourceName} with this ${fieldLabel} already exists. Please use a different ${fieldLabel}.`,
      field: duplicateField,
    };
  }

  if (error?.name === "ValidationError") {
    const firstError = Object.values(error.errors || {})[0];

    return {
      status: 400,
      message: firstError?.message || "Please check the submitted data.",
      field: firstError?.path,
    };
  }

  if (error?.name === "CastError") {
    return {
      status: 400,
      message: `Invalid ${error.path || "id"} provided.`,
      field: error.path,
    };
  }

  return {
    status: error?.status || 500,
    message: error?.message || fallbackMessage,
  };
};

export default formatApiError;
