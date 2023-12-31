import {useState} from 'react';
import { useSelector, useDispatch } from 'react-redux'

import TotalPitchers from '../TotalPitchers'
import TotalCatchers from '../TotalCatchers';

function App() {
  const [currentPitcher, setCurrentPitcher] = useState('Maud Nelson');
  const [currentCatcher, setCurrentCatcher] = useState('Elston Howard');
  
  const [newPitcher, setNewPitcher] = useState('');
  const [newCatcher, setNewCatcher] = useState('');
  
  const pitcherList = useSelector((store) => store.pitcherList);
  const catcherList = useSelector((store) => store.catcherList);

  const handlePitcherNameChange = event => {
    setNewPitcher(event.target.value);
  };
  const handleCatcherNameChange = event => {
    setNewCatcher(event.target.value);
  };
  
  const dispatch = useDispatch()

  // add new pitcher to the array. this will move to the pitcher reducer!
  const handlePitcherSubmit = event => {
    event.preventDefault();
    // spread: give me everything in pitcherList, then add this new thing
    // setPitcherList([...pitcherList, newPitcher]);
    dispatch({
      type: 'PITCHER_DISPATCH',
      payload: newPitcher
    })
    setNewPitcher('');
  };

  // add new catcher to array. this will move to the catcher reducer!
  const handleCatcherSubmit = event => {
    event.preventDefault();
    // spread: give me everything in catcherList, then add this new thing
    // setCatcherList([...catcherList, newCatcher]);
    dispatch({
      type: 'CATCHER_DISPATCH',
      payload: newCatcher
    })
    setNewCatcher('');
  };

  return (
    <div>
      <h1>Redux Baseball Pitchers</h1>
      <h2>On the Mound: {currentPitcher}</h2>
      <h2>Behind the Plate: {currentCatcher}</h2>
      <TotalPitchers />
      <TotalCatchers />
      <h3>All Pitchers</h3>
      <form onSubmit={handlePitcherSubmit}>
        <input
          type="text"
          value={newPitcher}
          onChange={handlePitcherNameChange}
          placeholder="New Pitcher Name"
        />
        <button type="submit">Add Pitcher</button>
      </form>
      <ul>
        {pitcherList.map(pitcher => (
          <li
            onClick={() => setCurrentPitcher(pitcher)}
          >
            {pitcher}
          </li>
        ))}
      </ul>
      <h3>All Catchers</h3>
      <form onSubmit={handleCatcherSubmit}>
        <input
          type="text"
          value={newCatcher}
          onChange={handleCatcherNameChange}
          placeholder="New Catcher Name"
        />
        <button type="submit">Add Catcher</button>
      </form>
      <ul>
        {catcherList.map(catcher => (
          <li
            onClick={() => setCurrentCatcher(catcher)}
          >
            {catcher}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
