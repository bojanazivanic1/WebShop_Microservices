export const convertImage = (img) => {
    return `data:image/jpg;base64,${img}`;
};

export const formatDateTime = (dateTimeString) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    };
    return new Date(dateTimeString).toLocaleString(undefined, options);
};

export const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(dateString).toLocaleString(undefined, options);
};

export default {
    convertImage,
    formatDateTime,
    formatDate
};