function Search() {
  return (
    <nav className="navbar bg-body-tertiary">
      <form className="container-fluid">
        <div className="input-group">
          {" "}
          <input
            type="text"
            className="form-control"
            placeholder="Enter business name or number"
            aria-label="Search"
            aria-describedby="basic-addon1"
          />
        </div>
      </form>
      <div className="d-flex-3 m-2">
        <div>
          <button className="btn btn-light mx-1">
            <i className="bi-grid-3x3-gap-fill"></i>
          </button>

          <button className="btn btn-light">
            <i className="bi-list-ul"></i>
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Search;
