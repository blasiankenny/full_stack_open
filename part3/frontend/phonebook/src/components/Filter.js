const Filter = ({ handleFilterValue }) => {
  return (
    <p>
      {" "}
      filter shown with <input onChange={handleFilterValue} />
    </p>
  );
};

export default Filter;
