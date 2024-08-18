// import logo from './logo.svg';
import './App.css';
import Home from './Components/Home'
import Lifecycle from './Components/LifeCycle';
import ParentComponent from './Components/ParentComponent';
import RenderHome from './Routing/RenderHome';

function App() {
  return (
    <div className="App">
      <Home color='green'/>
      <Lifecycle/>
      <ParentComponent/>
      <RenderHome/>
    </div>
  );
}

export default App;
