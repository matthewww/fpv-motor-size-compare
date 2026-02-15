import { useState } from 'react';
import './App.css';
import Scene from './components/Scene';
import MotorSelector from './components/MotorSelector';
import { getMotorSpec } from './data/motorData';

function App() {
  const [selectedMotorNames, setSelectedMotorNames] = useState(['1105', '1404']);

  // Convert motor names to motor specs
  const selectedMotors = selectedMotorNames.map(name => getMotorSpec(name));

  return (
    <div className="app">
      <header className="app-header">
        <h1>FPV Motor Size Comparison Tool</h1>
        <p>Interactive 3D visualization of FPV motor dimensions</p>
      </header>

      <div className="app-content">
        <div className="controls-panel">
          <MotorSelector 
            selectedMotors={selectedMotorNames}
            onSelectionChange={setSelectedMotorNames}
          />
          
          <div className="instructions">
            <h3>How to Use</h3>
            <ul>
              <li><strong>Select Motors:</strong> Click motor buttons above to add/remove from comparison</li>
              <li><strong>Rotate:</strong> Left-click and drag</li>
              <li><strong>Zoom:</strong> Scroll wheel or pinch</li>
              <li><strong>Pan:</strong> Right-click and drag</li>
            </ul>
          </div>
        </div>

        <div className="scene-container">
          {selectedMotors.length > 0 ? (
            <Scene selectedMotors={selectedMotors} />
          ) : (
            <div className="no-selection">
              <h2>Select motors to compare</h2>
              <p>Choose at least one motor from the selection panel above</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
