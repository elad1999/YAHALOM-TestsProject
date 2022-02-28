const QuestionsFilter = (props) => {
  const FilterInputHandler = (event) => {
    let filters = event.target.value.split(",");
    let trimedFilters = [];
    filters.forEach((f) => {
      let ft = f.trim();
      if (ft.length > 2) trimedFilters.push(ft);
    });
    if (trimedFilters.length > 0) {
      props.onFilterStatusChange(true);
      props.onFilterInputChange(trimedFilters);
    } else props.onFilterStatusChange(false);
  };

  return (
    <div>
      <h4>Select the questions you want to include in the test</h4>
      <p>
        You can use the tag filter to narrow down the list to a specific subject
        - Don't worry, filtering won't effect your previous selections
      </p>
      <div>
        <label>
          <strong>Filter by tags or content: </strong>
        </label>
        <input type="text" onChange={FilterInputHandler} />
        <label>{props.FilterStatus ? "Filter is ON" : "Filter is OFF"}</label>
      </div>
    </div>
  );
};

export default QuestionsFilter;
