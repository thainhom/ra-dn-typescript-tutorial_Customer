const getStaticResourceUrl = (path: string | undefined): string => {
  console.log(path);
  return path ? `http://localhost:8000/assets/${path}` : "";
};

export { getStaticResourceUrl };
