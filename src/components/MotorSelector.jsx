import React from 'react';
import { motorSpecs } from '../data/motorData';
import './MotorSelector.css';

/**
 * MotorSelector Component
 * UI for selecting motors to compare
 * 
 * @param {Array} selectedMotors - Array of currently selected motor names
 * @param {Function} onSelectionChange - Callback when selection changes
 */
export default function MotorSelector({ selectedMotors, onSelectionChange }) {
  const handleMotorToggle = (motorName) => {
    if (selectedMotors.includes(motorName)) {
      // Remove motor from selection
      onSelectionChange(selectedMotors.filter(name => name !== motorName));
    } else {
      // Add motor to selection
      onSelectionChange([...selectedMotors, motorName]);
    }
  };

  return (
    <div className="motor-selector">
      <h2>Select Motors to Compare</h2>
      <div className="motor-buttons">
        {Object.entries(motorSpecs).map(([name, spec]) => (
          <button
            key={name}
            className={`motor-button ${selectedMotors.includes(name) ? 'selected' : ''}`}
            onClick={() => handleMotorToggle(name)}
            style={{
              borderColor: selectedMotors.includes(name) ? spec.color : '#ccc',
              backgroundColor: selectedMotors.includes(name) ? `${spec.color}22` : 'transparent'
            }}
          >
            <div className="motor-name">{name}</div>
            <div className="motor-details">
              {spec.statorWidth}mm × {spec.statorHeight}mm
            </div>
          </button>
        ))}
      </div>
      
      {selectedMotors.length > 0 && (
        <div className="selected-info">
          <h3>Selected Motors ({selectedMotors.length})</h3>
          <div className="specs-grid">
            {selectedMotors.map(name => {
              const spec = motorSpecs[name];
              return (
                <div key={name} className="spec-card" style={{ borderLeftColor: spec.color }}>
                  <div className="spec-header">
                    <strong>{spec.name}</strong>
                    <span className="remove-btn" onClick={() => handleMotorToggle(name)}>×</span>
                  </div>
                  <div className="spec-detail">Stator: {spec.statorWidth}mm × {spec.statorHeight}mm</div>
                  <div className="spec-detail">Height: {spec.totalHeight}mm</div>
                  <div className="spec-detail">Mounting: {spec.mountingPattern}</div>
                  <div className="spec-detail">Shaft: ⌀{spec.shaftDiameter}mm</div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
