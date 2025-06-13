const getError = (error) => {
  return (
    error.code.charAt(0).toUpperCase() +
    error.code.split("/")[0].substring(1) +
    " error: " +
    error.code.split("/")[1].replace(/-/g, " ")
  );
};

export default getError;
