import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'rsuite/dist/rsuite.min.css';
import Home from './Components/Home';
import Layout from './Components/Layout';
import Teams from './Components/Teams';
import Pokemon from './Components/Pokemon';
import Team from './Components/Team';
import Type from './Components/Type';

function App() {
  return (
    <Router>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route path="" element={<Home />} />
            <Route path='pokemon/:slug' element={<Pokemon />} />
            <Route path="teams" element={<Teams />} />
            <Route path="team/:slug" element={<Team />} />
            <Route path="type/:slug" element={<Type />} />
          </Route>
          <Route path="*" element={<div>404 Not Found</div>} />
        </Routes>
    </Router>
  );
}

export default App;
