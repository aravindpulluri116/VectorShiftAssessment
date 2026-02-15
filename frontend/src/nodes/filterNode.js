import { useState } from 'react';
import { BaseNode, handleConfigs, baseNodeStyles } from './baseNode';
import { FilterIcon } from '../icons';

export const FilterNode = ({ id, data }) => {
  const [condition, setCondition] = useState(data?.condition || 'contains');
  const [field, setField] = useState(data?.field || 'text');
  const [value, setValue] = useState(data?.value || '');

  return (
    <BaseNode
      id={id}
      data={data}
      title="Filter"
      icon={<FilterIcon />}
      inputs={[handleConfigs.singleInput[0]]}
      outputs={[{
        type: 'source',
        position: 'right',
        idPrefix: 'pass',
        style: { top: '33%' }
      }, {
        type: 'source',
        position: 'right',
        idPrefix: 'fail',
        style: { top: '66%' }
      }]}
    >
      <div style={baseNodeStyles.inputGroup}>
        <label style={baseNodeStyles.label}>
          Field
        </label>
        <input
          style={baseNodeStyles.input}
          type="text"
          value={field}
          onChange={(e) => setField(e.target.value)}
        />
      </div>
      <div style={{ ...baseNodeStyles.inputGroup, marginTop: '8px' }}>
        <label style={baseNodeStyles.label}>
          Condition
        </label>
        <select
          style={baseNodeStyles.select}
          value={condition}
          onChange={(e) => setCondition(e.target.value)}
        >
          <option value="contains">Contains</option>
          <option value="equals">Equals</option>
          <option value="starts_with">Starts With</option>
          <option value="ends_with">Ends With</option>
          <option value="regex">Regex</option>
        </select>
      </div>
      <div style={{ ...baseNodeStyles.inputGroup, marginTop: '8px' }}>
        <label style={baseNodeStyles.label}>
          Value
        </label>
        <input
          style={baseNodeStyles.input}
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </div>
    </BaseNode>
  );
};

export default FilterNode;
