import { IconContext } from "react-icons";
import { useSelector } from "react-redux";
import Modal from "./components/organisms/Modal";
import Tab from "./components/organisms/Tab";
import Layout from "./Layout";

function App() {
  const { isOpen } = useSelector((store) => store.modal);

  return (
    <div className="App">
      <IconContext.Provider value={{ size: "20px" }}>
        <Layout>
          {isOpen && <Modal />}
          <Tab />
        </Layout>
      </IconContext.Provider>
    </div>
  );
}

export default App;
