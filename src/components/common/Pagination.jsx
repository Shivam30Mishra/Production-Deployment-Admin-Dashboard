function Pagination({ currentPage, totalPages, onNext, onPrevious }) {
  return (
    <div style={{ marginTop: "12px" }}>
      <button onClick={onPrevious} disabled={currentPage === 1}>
        Previous
      </button>

      <span style={{ margin: "0 10px" }}>
        Page {currentPage} of {totalPages}
      </span>

      <button onClick={onNext} disabled={currentPage === totalPages}>
        Next
      </button>
    </div>
  );
}

export default Pagination;
