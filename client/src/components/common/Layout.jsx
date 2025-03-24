import { Header, Footer, SearchBar } from "..";

const Layout = ({ children }) => {
  return (
    <>
      <header className="top-0 z-50 bg-white shadow-lg px-2">
        <Header />
        <SearchBar />
      </header>

      <main className="min-h-screen">{children}</main>

      <footer className="flex w-full">
        <Footer />
      </footer>
    </>
  );
};

export default Layout;
