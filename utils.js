export const getShareableUrl = (bandId, caseId, size, collection) => {
  const configuration = {
    bandId,
    caseId,
    size,
    collection,
  };
  const encodedConfig = encodeURIComponent(JSON.stringify(configuration));
  return `${window.location.origin}/?config=${encodedConfig}`;
};

export const getConfiguration = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const config = urlParams.get("config");
  if (!config) return null;
  return JSON.parse(decodeURIComponent(config));
};