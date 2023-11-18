import 'bootstrap-icons/font/bootstrap-icons.css';
import React, {useState} from 'react';
import './App.css';
import Main from './pages/Main.jsx';

export const AppContext = React.createContext();

function App() {
  const[library, setLibrary] = useState([]);
  const [bag, setBag] = useState([]);
  const [user, setUser] = useState(null);

  return (
     <>
     <AppContext.Provider value={{ library, setLibrary, bag, setBag, user, setUser }}>
      <Main />
     </AppContext.Provider>
     </>
  );
}

export default App;
