import './App.css';
import Main from './components/Main';
import Header from './components/Header';

const trafficChangeData = []

function App() {
  return (
    <div className="App">
      <Header title="Traffic Data Visualization" subtitle="When data meets graphics"></Header>
      <Main></Main>
    </div>
  );
}

export default App;
