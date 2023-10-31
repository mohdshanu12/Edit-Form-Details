import React, { useEffect, useState } from 'react';
import './Reactform.css';

function FormApp() {
  const initialvalue = {
    firstName: '',
    lastName: '',
    number: '',
    email: '',
    gender: '',
    subjects: [],
    id: Math.floor(Math.random() * 1000),
  };

  const [person, setPerson] = useState(initialvalue);
  const [people, setPeople] = useState([]);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    const getFromLocal = JSON.parse(localStorage.getItem('people'));
    setPeople(getFromLocal || []);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPerson((prev) => ({ ...prev, [name]: value }));
  }

  function setinLocal() {
    localStorage.setItem('people', JSON.stringify(people));
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId !== null) {
      // Edit mode
      const updatedPeople = people.map((p) => (p.id === editingId ? person : p));
      setPeople(updatedPeople);
      setEditingId(null);
    } else {
      // Add mode
      const newPerson = { ...person, id: Math.floor(Math.random() * 1000) };
      setPeople((prev) => [...prev, newPerson]);
    }

    setPerson(initialvalue);
    setinLocal();
  }

  const handleEdit = (id) => {
    const personToEdit = people.find((p) => p.id === id);
    if (personToEdit) {
      setPerson(personToEdit);
      setEditingId(id);
    }
  };

  const handleDelete = (id) => {
    const updatedPeople = people.filter((p) => p.id !== id);
    setPeople(updatedPeople);
    setinLocal();
  };

  return (
    <>
      <div className="App">
        <h1>REACT FORM</h1>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', padding: '5px', width: '400px' }}>
          {/* ... Rest of the form inputs ... */}
          <label htmlFor="firstName">First Name:</label>
          <input type="text" id="firstName" value={person.firstName} name="firstName" onChange={handleChange} placeholder="Enter your First Name" required />

          <label htmlFor="lastName">Last Name:</label>
          <input type="text" id="lastName" value={person.lastName} name="lastName" onChange={handleChange} placeholder="Enter your Last Name" required />

          <label htmlFor="number">Mobile Number:</label>
          <input
            type="text"
            id="number"
            value={person.number}
            name="number"
            onChange={handleChange}
            placeholder="Enter your Phone Number"
            pattern="[0-9]{10}"
            title="Please enter a 10-digit number." disabled={person.id?true:false}
          />

          <label htmlFor="email">Email:</label>
          <input type="email" id="email" value={person.email} name="email" onChange={handleChange} placeholder="Enter your email" disabled={person.id?true:false} required />

          {/* Radio buttons */}
          <label>Gender:</label>
          <div>
            <input
              type="radio"
              id="male"
              name="gender"
              value="male"
              checked={person.gender === 'male'}
              onChange={handleChange}
            />
            <label htmlFor="male">Male</label>
          </div>
          <div>
            <input
              type="radio"
              id="female"
              name="gender"
              value="female"
              checked={person.gender === 'female'}
              onChange={handleChange}
            />
            <label htmlFor="female">Female</label>
          </div>

          {/* Checkboxes for Subjects */}
          <label>Subjects:</label>
          <div>
            <input
              type="checkbox"
              id="maths"
              name="subjects"
              value="maths"
              checked={person.subjects.includes('maths')}
              onChange={handleChange}
            />
            <label htmlFor="maths">Maths</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="science"
              name="subjects"
              value="science"
              checked={person.subjects.includes('science')}
              onChange={handleChange}
            />
            <label htmlFor="science">Science</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="computer"
              name="subjects"
              value="computer"
              checked={person.subjects.includes('computer')}
              onChange={handleChange}
            />
            <label htmlFor="computer">Computer</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="hindi"
              name="subjects"
              value="hindi"
              checked={person.subjects.includes('hindi')}
              onChange={handleChange}
            />
            <label htmlFor="hindi">Hindi</label>
          </div>

          <button type="submit">{editingId !== null ? 'Update' : 'Submit'}</button>
        </form>

        <div>
          <table>
            <thead>
              <tr>
                <th>Sr</th>
                <th>Name</th>
                <th>Lastname</th>
                <th>email</th>
                <th>phone</th>
                <th>gender</th>
                <th>Subjects</th>
                <th>ID</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {people.map((val, index) => {
                return (
                  <tr key={val.id}>
                    <td>{index + 1}</td>
                    <td>{val.firstName}</td>
                    <td>{val.lastName}</td>
                    <td>{val.email}</td>
                    <td>{val.number}</td>
                    <td>{val.gender}</td>
                    <td>{val.subjects}</td>
                    <td>{val.id}</td>
                    <td>
                      <button onClick={() => handleDelete(val.id)}>Delete</button>
                      <button onClick={() => handleEdit(val.id)}>Edit</button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default FormApp;
