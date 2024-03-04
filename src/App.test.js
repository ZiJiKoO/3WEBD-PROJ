import { render, screen, act, fireEvent, within, waitFor } from "@testing-library/react";
import userEvent from '@testing-library/user-event';
import App from './App';
import BookList from './components/BookList';
jest.setTimeout(60000);

test("render home page", () => {
  render(<App />);
  expect(screen.getByText("Homepage")).toBeInTheDocument();
});

test("render footer", () => {
  render(<App />);
  expect(screen.getByText("© 2024 Our Library")).toBeInTheDocument();
});

test("render advanced search", async () => {
  render(<App />);
  const $link = screen.getByRole("link", { name: /Advanced Search/i});
  expect($link).toBeInTheDocument();
  $link.click();
  await waitFor (() => {
    const SearchTerm = screen.getByRole('textbox', { name: /Search Term/i })
    expect(SearchTerm).toBeInTheDocument();
    const SearchAuthor = screen.getByRole('textbox', { name: /Author/i })
    expect(SearchAuthor).toBeInTheDocument();
    const SearchTitle = screen.getByRole('textbox', { name: /Title/i })
    expect(SearchTitle).toBeInTheDocument();
    const SearchSubject = screen.getByRole('textbox', { name: /Subject/i })
    expect(SearchSubject).toBeInTheDocument();
    userEvent.type(SearchTerm, "frigiel");
    userEvent.type(SearchAuthor, "frigiel");
    userEvent.type(SearchTitle, "ender");
    userEvent.type(SearchSubject, "minecraft");
    const SearchButton = screen.getByRole('button', { name: /Search/i })
    expect(SearchButton).toBeInTheDocument();
    SearchButton.click();
  }, { timeout: 10000 });
  
});

test("render homepage", async () => {
  render(<App />);
  const $link = screen.getByRole("link", { name: /Homepage/i});
  $link.click();
  expect(
    await screen.findByRole("heading", { level: 1, name: "Welcome to Our Website" })
  ).toBeInTheDocument();
});

test("handle search change", async () => {
  render(<App />);

  const $searchInput = screen.getByPlaceholderText("Search for books...");
  userEvent.type($searchInput, 'test query');
  expect($searchInput).toHaveValue('test query');
});

  test("handle search submit on Enter key press", async () => {
    render(<App />);

    const $searchInput = screen.getByPlaceholderText("Search for books...");
    userEvent.type($searchInput, 'frigiel');
    expect($searchInput).toHaveValue('frigiel');

    userEvent.type($searchInput, '{enter}');

    expect(window.location.pathname).toEqual('/search');
    expect(window.location.search).toEqual('?q=frigiel');

    expect(window.location.href).toEqual('http://localhost/search?q=frigiel');
    await waitFor(() => {
      const list = screen.getByRole("list", { name: /BookList/i });
      expect(list).toBeInTheDocument();
    
      const BookItem = within(list).getAllByRole('link');
      
      expect(BookItem).toHaveLength(30);
    

     }, { timeout: 10000 });
     const pageButton = screen.getByRole('button', { name: /next page/i });
     expect(pageButton).toBeInTheDocument();
      userEvent.click(pageButton);
      await waitFor(() => {
      const pageNumber = screen.getByText(/page 2 of */i)
      expect(pageNumber).toBeInTheDocument();
      }, { timeout: 10000 });
  });

describe('BookList component', () => {
  it('renders loading message when loading is true', () => {
    render(<BookList loading={true} />);
    expect(screen.getByText('Loading…')).toBeInTheDocument();
  });

  it('renders no results message when noResults is true', () => {
    render(<BookList noResults={true} />);
    expect(screen.getByText('No results found.')).toBeInTheDocument();
  });
});

test("render book detail", async () => {
  render(<App />);

  const $searchInput = screen.getByPlaceholderText("Search for books...");
  userEvent.type($searchInput, 'frigiel');
  expect($searchInput).toHaveValue('frigiel');

  userEvent.type($searchInput, '{enter}');

  expect(window.location.pathname).toEqual('/search');
  expect(window.location.search).toEqual('?q=frigiel');

  expect(window.location.href).toEqual('http://localhost/search?q=frigiel');
  await waitFor(() => {
    const list = screen.getByRole("list", { name: /BookList/i });
    expect(list).toBeInTheDocument();
  
    const BookItem = within(list).getAllByRole('link');
    
    expect(BookItem).toHaveLength(30);
  

   }, { timeout: 10000 });
   const list = screen.getByRole("list", { name: /BookList/i });
   const Firstbook= within(list).getAllByRole('link')[0];
    Firstbook.click();
    await waitFor(() => {
      const cover = screen.getByRole('img', {name: /book cover/i});
      expect(cover).toBeInTheDocument();
      const wikilink = screen.getByRole('link', { name: /voir sur wikipedia/i })
      expect(wikilink).toBeInTheDocument();
    }, { timeout: 10000 });
});