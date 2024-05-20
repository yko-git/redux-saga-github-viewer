import { useSelector } from "react-redux";
import Header from "./components/organisms/Header";
import ModalBlock from "./components/organisms/ModalBlock";
import TabBlock from "./components/organisms/TabBlock";

function App() {
  const { isOpen } = useSelector((store) => store.modal);

  return (
    <div className="App">
      {isOpen && <ModalBlock />}
      <Header />
      <TabBlock />
    </div>
  );
}

export default App;
