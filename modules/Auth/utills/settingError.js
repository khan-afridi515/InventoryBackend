//This funtion is only for validation error. If the validation if faild then this would be work proper

const settingErrorStatusAndMessage = (error) => {
  const issue = error.issues[0];
  const validationErrors = new Error(issue.message);
  validationErrors.status = 400;
  validationErrors.field = issue.path.join(".");
  validationErrors.messages = issue.message;
  
  return validationErrors;
};

// exports
export { settingErrorStatusAndMessage };
