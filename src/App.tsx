import React from 'react';
import './css/App.css';
import Router from './components/Router';


const App: React.FC = () => {
  return (
    <div className="App">
      <div className="Router-wrapper">
        <Router />
      </div>
    </div>
  );
}

export default App;
