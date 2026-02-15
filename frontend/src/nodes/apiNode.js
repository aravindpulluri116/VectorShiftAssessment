import { useState } from 'react';
import { BaseNode, handleConfigs, baseNodeStyles } from './baseNode';
import { APIIcon } from '../icons';

export const APINode = ({ id, data }) => {
  const [endpoint, setEndpoint] = useState(data?.endpoint || 'https://api.example.com');
  const [method, setMethod] = useState(data?.method || 'GET');

  return (
    <BaseNode
      id={id}
      data={data}
      title="API"
      icon={<APIIcon />}
      inputs={[handleConfigs.singleInput[0]]}
      outputs={[handleConfigs.singleOutput[0]]}
    >
      <div style={baseNodeStyles.inputGroup}>
        <label style={baseNodeStyles.label}>
          Endpoint
        </label>
        <input
          style={baseNodeStyles.input}
          type="text"
          value={endpoint}
          onChange={(e) => setEndpoint(e.target.value)}
          placeholder="https://api.example.com"
        />
      </div>
      <div style={{ ...baseNodeStyles.inputGroup, marginTop: '10px' }}>
        <label style={baseNodeStyles.label}>
          Method
        </label>
        <select
          style={baseNodeStyles.select}
          value={method}
          onChange={(e) => setMethod(e.target.value)}
        >
          <option value="GET">GET</option>
          <option value="POST">POST</option>
          <option value="PUT">PUT</option>
          <option value="DELETE">DELETE</option>
        </select>
      </div>
    </BaseNode>
  );
};

export default APINode;
