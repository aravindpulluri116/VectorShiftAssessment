import { useState } from 'react';
import { BaseNode, handleConfigs, baseNodeStyles } from './baseNode';
import { OutputIcon } from '../icons';

export const OutputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.outputName || id.replace('customOutput-', 'output_'));
  const [outputType, setOutputType] = useState(data.outputType || 'Text');

  const handleNameChange = (e) => {
    setCurrName(e.target.value);
  };

  const handleTypeChange = (e) => {
    setOutputType(e.target.value);
  };

  return (
    <BaseNode
      id={id}
      data={data}
      title="Output"
      icon={<OutputIcon />}
      inputs={[{
        type: 'target',
        position: 'left',
        idPrefix: 'value',
        style: { top: '50%' }
      }]}
      outputs={[]}
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
          value={outputType}
          onChange={handleTypeChange}
        >
          <option value="Text">Text</option>
          <option value="File">Image</option>
        </select>
      </div>
    </BaseNode>
  );
};
