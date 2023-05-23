const Persons = ({ filteredList, handleDelete }) => {
  return (
    <ul style={{ listStyle: "none", paddingLeft: "0" }}>
      {filteredList.map((person) => {
        return (
          <li key={person.name}>
            {person.name} {person.number}
            <button onClick={() => handleDelete(person.id)}>delete</button>
          </li>
        );
      })}
    </ul>
  );
};

export default Persons;
