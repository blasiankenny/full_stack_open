import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import Form from "./components/Form";
import Persons from "./components/Persons";
import personService from "./services/personService";
import Notification from "./components/Notification";
const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filteredList, setFilteredList] = useState(persons);
  const [errorMessage, setErrorMessage] = useState(null);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    personService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
      setFilteredList(initialPersons);
    });
  }, []);

  const addPerson = (event) => {
    event.preventDefault();
    const personObject = {
      name: newName,
      number: newNumber,
    };
    if (
      persons.some((person) => {
        return person.name === newName;
      }) &&
      window.confirm(
        `${newName} is already added to phonebook, replace the old number with a new one?`
      )
    ) {
      const existingPerson = persons.find((person) => person.name === newName);

      personService
        .update(existingPerson.id, personObject)
        .then((updatedPerson) => {
          setPersons(
            persons.map((person) => {
              return person.id === updatedPerson.id ? updatedPerson : person;
            })
          );
          setFilteredList(
            filteredList.map((person) => {
              return person.id === updatedPerson.id ? updatedPerson : person;
            })
          );
          setMessage(`Added ${newName} `);
          setTimeout(() => {
            setMessage(null);
          }, 5000);
        })
        .catch((error) => {
          setErrorMessage(
            `Information of ${newName} has already been removed from server`
          );
          setTimeout(() => {
            setErrorMessage(null);
          }, 5000);
        });
    } else if (
      !persons.some((person) => {
        return person.name === newName;
      })
    ) {
      personService
        .create(personObject)
        .then((returnedPerson) => {
          setPersons(persons.concat(returnedPerson));
          setFilteredList([...filteredList, returnedPerson]);
          setMessage(`Added ${newName} `);
          setTimeout(() => {
            setMessage(null);
          }, 5000);
        })
        .catch((error) => {
          console.log(error.response.data.error);
        });
      // setPersons([...persons, personObject]);
    }
  };

  const handleNewName = (event) => {
    event.preventDefault();
    setNewName(event.target.value);
    console.log(event.target.value);
  };

  const handleNewNumber = (event) => {
    event.preventDefault();
    setNewNumber(event.target.value);
  };

  const handleFilterValue = (event) => {
    console.log(event.target.value);
    if (event.target.value === "") {
      setFilteredList(persons);
    } else {
      setFilteredList(
        persons.filter((person) => {
          return person.name.includes(event.target.value);
        })
      );
    }
  };

  const handleDelete = (id) => {
    console.log(id);
    const person = persons.find((person) => id === person.id);
    if (person === "") {
      alert(`The person does not exist in the list`);
    } else if (window.confirm(`Delete ${person.name} ?`)) {
      personService
        .axiosDelete(person.id)
        .then(() => {
          setPersons(persons.filter((person) => person.id !== id));
        })
        .catch((error) => {
          alert(
            `The person with thier id '${person.id}' was already deleted from server`
          );
        });
      setPersons(
        persons.filter((person) => {
          return person.id !== id;
        })
      );
      setFilteredList(
        filteredList.filter((person) => {
          return person.id !== id;
        })
      );
    }
  };
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} errorMessage={errorMessage} />
      <Filter handleFilterValue={handleFilterValue} />

      <h2>Add a new</h2>
      <Form
        addPerson={addPerson}
        newName={newName}
        handleNewName={handleNewName}
        newNumber={newNumber}
        handleNewNumber={handleNewNumber}
      />
      <h2>Numbers</h2>
      <Persons filteredList={filteredList} handleDelete={handleDelete} />
    </div>
  );
};

export default App;
