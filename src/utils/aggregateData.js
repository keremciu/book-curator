// TODO: we can put a lot of improvements here to memoize data aggregation.
// We already have kinda hash map in our response.
const getCategoriesWithBooks = (categories, books) =>
  categories.reduce((mem, input) => {
    const bookArray = input.book_ids.map(bookID =>
      books.find(b => b.id === bookID)
    );
    mem.push({
      id: input.id,
      books: bookArray
    });
    return mem;
  }, []);

export { getCategoriesWithBooks };
