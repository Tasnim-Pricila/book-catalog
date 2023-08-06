import About from "../components/About";
import Banner from "../components/Banner";
import BrowseCategories from "../components/BrowseCategories";
import RecentBooks from "../components/RecentBooks";

const Home = () => {
  return (
    <>
      <Banner />
      <About />
      <RecentBooks />
      <BrowseCategories/>
    </>
  );
};

export default Home;
