import React, { useState } from "react";

const StudentForm = ({ onAddStudent }) => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const newStudent = {
      id: crypto.randomUUID(), // ✅ uuid dependency ഇല്ല
      name: name.trim(),
      age: Number(age),
    };

    onAddStudent(newStudent);
    setName("");
    setAge("");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 border rounded">
      <div>
        <label className="block font-medium">Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 rounded w-full"
          required
        />
      </div>

      <div>
        <label className="block font-medium">Age:</label>
        <input
          type="number"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          className="border p-2 rounded w-full"
          required
        />
      </div>

      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
      >
        Add Student
      </button>
    </form>
  );
};

export default StudentForm;
