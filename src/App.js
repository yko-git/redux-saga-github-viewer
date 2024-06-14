import { useSelector } from "react-redux";
import Header from "./components/organisms/Header";
import Modal from "./components/organisms/Modal";
import Tab from "./components/organisms/Tab";

function App() {
  const { isOpen } = useSelector((store) => store.modal);

  return (
    <div className="App">
      {isOpen && <Modal />}
      <Header />
      <Tab />
    </div>
  );
}

export default App;
