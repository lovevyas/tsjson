import React, { useState, useEffect } from 'react';
import playersData from './players.json'; // Import the JSON data
import { Player } from './types'; // Import the Player type
import './App.css'; // Import the styles

function App() {
  // State to store player data
  const [tableData, setTableData] = useState<Player[]>([]);
  const [totalCredits, setTotalCredits] = useState(0);
  const [addedItem, setAddedItems] = useState<Set<string>>(new Set());

  const [teamStats, setTeamStats] = useState<{ [key: string]: {count: number; credits: number} } > ({
    Team1: {count: 0, credits: 0},
    Team2: {count: 0, credits: 0}
  })

  useEffect( ()=>{
    setTableData(playersData);
  }, []);

  const handleCreditToggle = (player: Player) => {
      setAddedItems( prevAddedItem => {
        const updatedAI = new Set(prevAddedItem);
        const team = player.team;
        let total = totalCredits;
        setTeamStats( prevStats => {
          const updatedStats = { ...prevStats};

          if(updatedAI.has(player.name)) {
            updatedAI.delete(player.name);
            updatedStats[team].count -= 1;
            updatedStats[team].credits -= player.credits;
            total -= player.credits;
            // setTotalCredits(prevTotal => prevTotal - player.credits);
          } else {
            updatedAI.add(player.name);
            updatedStats[team].count += 1;
            updatedStats[team].credits += player.credits;
            total += player.credits;
            // setTotalCredits(prevTotal => prevTotal + player.credits);
          }
          setTotalCredits(total);
          return updatedStats;
        })

        
        return updatedAI;
      });
  };
 
  return (
    <div className="App">
      <table className="table-container">
        <thead>
          <tr>
            <th>Name</th>
            <th>Team</th>
            <th>Credits</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((player) => (
            <tr key = {player.name}>
                <td>{player.name} </td>
                <td>{player.team} </td>
                <td>{player.credits} </td>
                <td>
                  <button onClick= {()=> handleCreditToggle(player) } >
                    {addedItem.has(player.name) ? 'Remove' : 'Add'}
                  </button>
                </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <h2>Team Statistics</h2>
        <div>Team1: {teamStats.Team1.count}  Team1 Credits: {teamStats.Team1.credits}</div>
        <div>Team2: {teamStats.Team2.count}  Team2 Credits: {teamStats.Team2.credits}</div>
      </div>
      <br />
      <div>Total Credits: {totalCredits}</div>
    </div>
  );
}

export default App;
