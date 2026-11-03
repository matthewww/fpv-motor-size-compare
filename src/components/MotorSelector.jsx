import React, { useState } from 'react';
import { getCustomMotorKey, getMotorSpec, getMotorsList } from '../data/motorData';
import './MotorSelector.css';

/**
 * MotorSelector Component
 * UI for selecting built-in motors or adding custom stator dimensions.
 *
 * @param {Array} selectedMotors - Array of currently selected motor keys
 * @param {Function} onSelectionChange - Callback when selection changes
 */
export default function MotorSelector({ selectedMotors, onSelectionChange }) {
  const [customWidth, setCustomWidth] = useState('');
  const [customHeight, setCustomHeight] = useState('');
  const [customMotorKeys, setCustomMotorKeys] = useState([]);
  const [formError, setFormError] = useState('');

  const handleMotorToggle = (motorName) => {
    if (selectedMotors.includes(motorName)) {
      onSelectionChange(selectedMotors.filter(name => name !== motorName));
    } else {
      onSelectionChange([...selectedMotors, motorName]);
    }
  };

  const handleAddCustomMotor = (event) => {
    event.preventDefault();
    const width = Number(customWidth);
    const height = Number(customHeight);
    const motorKey = getCustomMotorKey(width, height);

    if (!motorKey || width <= 0 || height <= 0) {
      setFormError('Enter a valid stator width and height greater than 0 mm.');
      return;
    }

    setFormError('');
    setCustomMotorKeys(keys => keys.includes(motorKey) ? keys : [...keys, motorKey]);
    if (!selectedMotors.includes(motorKey)) {
      onSelectionChange([...selectedMotors, motorKey]);
    }
    setCustomWidth('');
    setCustomHeight('');
  };

  const motorKeys = [...getMotorsList(), ...customMotorKeys];

  return (
    <div className="motor-selector">
      <h2>Select Motors to Compare</h2>

      <form className="custom-motor-form" onSubmit={handleAddCustomMotor}>
        <h3>Add a custom motor</h3>
        <p>Enter the stator diameter and height in millimeters.</p>
        <div className="custom-motor-inputs">
          <label>
            Stator diameter (mm)
            <input
              type="number"
              min="0.1"
              step="0.1"
              required
              value={customWidth}
              onChange={event => setCustomWidth(event.target.value)}
              placeholder="e.g. 17"
            />
          </label>
          <label>
            Stator height (mm)
            <input
              type="number"
              min="0.1"
              step="0.1"
              required
              value={customHeight}
              onChange={event => setCustomHeight(event.target.value)}
              placeholder="e.g. 7"
            />
          </label>
        </div>
        {formError && <p className="custom-motor-error" role="alert">{formError}</p>}
        <button className="add-custom-motor-button" type="submit">Add motor to comparison</button>
      </form>

      <div className="motor-buttons">
        {motorKeys.map(name => {
          const spec = getMotorSpec(name);
          const isSelected = selectedMotors.includes(name);
          if (!spec) return null;

          return (
            <button
              key={name}
              type="button"
              className={`motor-button ${isSelected ? 'selected' : ''}`}
              onClick={() => handleMotorToggle(name)}
              style={{
                borderColor: isSelected ? spec.color : '#ccc',
                backgroundColor: isSelected ? `${spec.color}22` : 'transparent'
              }}
            >
              <div className="motor-name">{spec.name}</div>
              <div className="motor-details">
                {spec.statorWidth}mm × {spec.statorHeight}mm
              </div>
            </button>
          );
        })}
      </div>

      {selectedMotors.length > 0 && (
        <div className="selected-info">
          <h3>Selected Motors ({selectedMotors.length})</h3>
          <div className="specs-grid">
            {selectedMotors.map(name => {
              const spec = getMotorSpec(name);
              if (!spec) return null;

              return (
                <div key={name} className="spec-card" style={{ borderLeftColor: spec.color }}>
                  <div className="spec-header">
                    <strong>{spec.name}</strong>
                    <button
                      type="button"
                      className="remove-btn"
                      aria-label={`Remove ${spec.name} from comparison`}
                      onClick={() => handleMotorToggle(name)}
                    >
                      ×
                    </button>
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
