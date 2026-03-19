```jsx
import React from 'react';
import './styles/quantum-lab.css';
import QuantumCircuitBuilder from './components/QuantumLab/QuantumCircuitBuilder';

function App() {
  return (
    <div className="App">
      <QuantumCircuitBuilder />
      <div className="quantum-footer">
        <p>🌀 VAULT Quantum Interface | Powered by Qiskit | Estado Quântico: Superposição</p>
        <p className="quantum-warning">
          ⚠️ Simulações quânticas podem exibir comportamento contra-intuitivo
        </p>
      </div>
    </div>
  );
}

export default App;
```