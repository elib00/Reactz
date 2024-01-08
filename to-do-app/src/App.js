import './App.css';
import Header from "./components/Header"
import Todo from './components/Todo';

function App() {
  return (
    <div className="App">
      <Header />
      <div className="content-wrapper">
        <Todo />
      </div>
    </div>
  );
}

export default App;
