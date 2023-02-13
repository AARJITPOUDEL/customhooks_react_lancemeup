import React, { useState, useEffect } from 'react';
import  './App.css';
const useAarjitCustomHook = (key, initialValue) => {
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

  const removeItem = (index) => {
    setValue(value.filter((_, i) => i !== index));
  };

  const clear = () => {
    setValue(initialValue);
    try {
      window.localStorage.clear();
    } catch (error) {
      console.error(error);
    }
  };

  return [value, setValue, removeItem, clear];
};

const App = () => {
  const [applicants, setApplicants, removeApplicant, clearApplicants] = useAarjitCustomHook("applicants", []);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setApplicants([...applicants, { name, phone }]);
    setName("");
    setPhone("");
  };

  return (
    <div>
      <h2>Using Custom Hook for data handling</h2>
      {/* This is a little demo for the problem provided by LancemeUp */}
      <ul>
        {applicants.map((applicant, index) => (
          <li key={index}>
            <p>Name: {applicant.name}</p>
            <p>Phone: {applicant.phone}</p>
            <button onClick={() => removeApplicant(index)}>Remove</button>
          </li>
        ))}
      </ul>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <button type="submit">Add Applicant For Internship</button>
      </form>
      <button onClick={clearApplicants} className="button" > Clear all</button>
    </div>
  );
};

export default App;
