import { IconContext } from "react-icons";
import { useSelector } from "react-redux";
import Header from "./components/organisms/Header";
import Modal from "./components/organisms/Modal";
import Tab from "./components/organisms/Tab";

function App() {
  const { isOpen } = useSelector((store) => store.modal);

  return (
    <div className="App">
      <IconContext.Provider value={{ size: "20px" }}>
        {isOpen && <Modal />}
        <Header />
        <Tab />
      </IconContext.Provider>
    </div>
  );
}

export default App;
