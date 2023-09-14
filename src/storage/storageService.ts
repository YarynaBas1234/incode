type IAddToLocalStorage = (key: string, value: string) => void;

const addToLocalStorage: IAddToLocalStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

type IGetFromLocalStorage = (key: string) => string;

const getFromLocalStorage: IGetFromLocalStorage = key => {
  const storageKey = localStorage.getItem(key);
  return storageKey ? JSON.parse(storageKey) : null;
};

type IDeleteFromLocalStorage = (key: string) => void;

const deleteFromLocalStorage: IDeleteFromLocalStorage = key => {
  localStorage.removeItem(key);
};

export const localStorageService = {
  addToLocalStorage,
  getFromLocalStorage,
  deleteFromLocalStorage
};
