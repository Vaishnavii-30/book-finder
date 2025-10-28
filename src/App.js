import React, { useState } from "react";
import "./App.css";
import BookCard from "./components/BookCard";

function App() {
  const [query, setQuery] = useState("");
  const [author, setAuthor] = useState("");
  const [books, setBooks] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const fetchBooks = async (searchQuery, searchAuthor, pageNum = 1) => {
    if (!searchQuery && !searchAuthor) return;
    setLoading(true);
    try {
      const response = await fetch(
        `https://openlibrary.org/search.json?title=${searchQuery}&author=${searchAuthor}&page=${pageNum}`
      );
      const data = await response.json();
      setBooks(data.docs || []);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
    fetchBooks(query, author, 1);
  };

  const handleNext = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchBooks(query, author, nextPage);
  };

  const handlePrev = () => {
    if (page > 1) {
      const prevPage = page - 1;
      setPage(prevPage);
      fetchBooks(query, author, prevPage);
    }
  };

  return (
    <div className={`App ${darkMode ? "dark" : ""}`}>
      <h1>📚 Book Finder</h1>

      <button className="dark-toggle" onClick={() => setDarkMode(!darkMode)}>
        {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
      </button>

      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          placeholder="Search by title..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <input
          type="text"
          placeholder="Search by author..."
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      {loading ? (
        <p>Loading...</p>
      ) : books.length === 0 && (query || author) ? (
        <p>No results found ❌</p>
      ) : (
        <div className="book-list">
          {books.map((book, index) => (
            <BookCard key={index} book={book} />
          ))}
        </div>
      )}

      <div className="pagination">
        <button onClick={handlePrev} disabled={page === 1}>
          ◀ Previous
        </button>
        <span>Page {page}</span>
        <button onClick={handleNext}>Next ▶</button>
      </div>
    </div>
  );
}

export default App;
