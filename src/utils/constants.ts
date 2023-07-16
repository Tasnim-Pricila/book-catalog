export const genres = [
    'Fiction',
    'Non-fiction',
    'Mystery',
    'Thriller',
    'Romance',
    'Science Fiction',
    'Fantasy',
    'Horror',
    'Biography',
    'History',
    'Self-help',
    'Cooking',
  ];

  const currentYear = new Date().getFullYear();
  export const years = Array.from(
    { length: currentYear - 1900 + 1 },
    (_, index) => 1900 + index
  );