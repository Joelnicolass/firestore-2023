export const getCat = async () => {
  const url = "https://api.thecatapi.com/v1/images/search";

  const response = await fetch(url);
  const data = await response.json();
  return data[0].url;
};
