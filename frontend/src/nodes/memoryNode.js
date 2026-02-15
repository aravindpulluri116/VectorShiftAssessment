import { useState } from 'react';
import { BaseNode, handleConfigs, baseNodeStyles } from './baseNode';
import { MemoryIcon } from '../icons';

export const MemoryNode = ({ id, data }) => {
  const [type, setType] = useState(data?.type || 'Short-term');
  const [maxMessages, setMaxMessages] = useState(data?.maxMessages || '10');

  return (
    <BaseNode
      id={id}
      data={data}
      title="Memory"
      icon={<MemoryIcon />}
      inputs={[handleConfigs.singleInput[0]]}
      outputs={[handleConfigs.singleOutput[0]]}
    >
      <div style={baseNodeStyles.inputGroup}>
        <label style={baseNodeStyles.label}>
          Memory Type
        </label>
        <select
          style={baseNodeStyles.select}
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="Short-term">Short-term</option>
          <option value="Long-term">Long-term</option>
          <option value="Session">Session</option>
        </select>
      </div>
      <div style={{ ...baseNodeStyles.inputGroup, marginTop: '10px' }}>
        <label style={baseNodeStyles.label}>
          Max Messages
        </label>
        <input
          style={baseNodeStyles.input}
          type="number"
          value={maxMessages}
          onChange={(e) => setMaxMessages(e.target.value)}
          min="1"
          max="100"
        />
      </div>
    </BaseNode>
  );
};

export default MemoryNode;
