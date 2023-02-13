import React, { useState, useEffect } from 'react';

const useLocalStorage = (key, initialValue) => {
  const [value, setValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(error);
    }
  }, [key, value]);

  const removeItem = () => {
    setValue(initialValue);
    try {
      window.localStorage.removeItem(key);
    } catch (error) {
      console.error(error);
    }
  };

  const clear = () => {
    setValue(initialValue);
    try {
      window.localStorage.clear();
    } catch (error) {
      console.error(error);
    }
  };

  const getValue = () => {
    try {
      return window.localStorage.getItem(key);
    } catch (error) {
      console.error(error);
    }
  };

  return [value, setValue, removeItem, clear, getValue];
};

const App = () => {
  const [name, setName, removeName, clearName, getName] = useLocalStorage("name", "");

  return (
    <div>
      <p>Name: {name}</p>
      <input type="text" value={name} onChange={e => setName(e.target.value)} />
      <button onClick={removeName}>Remove Name</button>
      <button onClick={clearName}>Clear all</button>
      <p>Value from local storage: {getName()}</p>
    </div>
  );
};

export default App;
