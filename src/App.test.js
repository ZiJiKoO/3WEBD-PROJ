import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';
import BookList from './components/BookList';
import Search from './pages/Book/Search';

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
  $link.click();
  expect(
    await screen.findByRole("heading", { level: 1, name: "Advanced Search" })
  ).toBeInTheDocument();
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
    userEvent.type($searchInput, 'test query');
    expect($searchInput).toHaveValue('test query');

    userEvent.type($searchInput, '{enter}');

    expect(window.location.pathname).toEqual('/search');
    expect(window.location.search).toEqual('?q=test%20query');

    expect(window.location.href).toEqual('http://localhost/search?q=test%20query');
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

describe('Search page', () => {
  it('renders search page', () => {
    render(<Search />);
    
  });
});