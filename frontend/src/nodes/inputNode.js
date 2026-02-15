import { useState } from 'react';
import { BaseNode, handleConfigs, baseNodeStyles } from './baseNode';
import { InputIcon } from '../icons';

export const InputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.inputName || id.replace('customInput-', 'input_'));
  const [inputType, setInputType] = useState(data.inputType || 'Text');

  const handleNameChange = (e) => {
    setCurrName(e.target.value);
  };

  const handleTypeChange = (e) => {
    setInputType(e.target.value);
  };

  return (
    <BaseNode
      id={id}
      data={data}
      title="Input"
      icon={<InputIcon />}
      inputs={handleConfigs.singleInput}
      outputs={[{
        type: 'source',
        position: 'right',
        idPrefix: 'value',
        style: { top: '50%' }
      }]}
    >
      <div style={baseNodeStyles.inputGroup}>
        <label style={baseNodeStyles.label}>
          Name
        </label>
        <input
          style={baseNodeStyles.input}
          type="text"
          value={currName}
          onChange={handleNameChange}
        />
      </div>
      <div style={{ ...baseNodeStyles.inputGroup, marginTop: '10px' }}>
        <label style={baseNodeStyles.label}>
          Type
        </label>
        <select
          style={baseNodeStyles.select}
          value={inputType}
          onChange={handleTypeChange}
        >
          <option value="Text">Text</option>
          <option value="File">File</option>
        </select>
      </div>
    </BaseNode>
  );
};
