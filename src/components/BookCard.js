import React from "react";

const BookCard = ({ book }) => {
  const title = book.title || "No Title";
  const author = book.author_name ? book.author_name.join(", ") : "Unknown";
  const year = book.first_publish_year || "N/A";
  const coverId = book.cover_i;
  const coverImage = coverId
    ? `https://covers.openlibrary.org/b/id/${coverId}-M.jpg`
    : "https://via.placeholder.com/150?text=No+Cover";

  return (
    <div className="book-card">
      <img src={coverImage} alt={title} />
      <h3>{title}</h3>
      <p><strong>Author:</strong> {author}</p>
      <p><strong>Year:</strong> {year}</p>
    </div>
  );
};

export default BookCard;
