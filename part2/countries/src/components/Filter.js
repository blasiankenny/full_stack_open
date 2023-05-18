const Filter = ({ handleFilterValue }) => {
  return (
    <p style={{ margin: "0" }}>
      {" "}
      find countries <input onChange={handleFilterValue} />
    </p>
  );
};

export default Filter;
