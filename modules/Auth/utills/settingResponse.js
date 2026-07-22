//This function we use when we send the response when the validation is failed
const settingResponse = (res, result) => {
  return res.status(result.status || 500).json({
    success: false,
    message: result.message || result.messages || "An unexpected error occurred",
    ...(result.field ? { field: result.field } : {})
  });
};


export { settingResponse };
