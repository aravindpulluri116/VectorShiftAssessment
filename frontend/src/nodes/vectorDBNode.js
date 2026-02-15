import { useState } from 'react';
import { BaseNode, handleConfigs, baseNodeStyles } from './baseNode';
import { VectorDBIcon } from '../icons';

export const VectorDBNode = ({ id, data }) => {
  const [collection, setCollection] = useState(data?.collection || 'documents');
  const [topK, setTopK] = useState(data?.topK || '5');

  return (
    <BaseNode
      id={id}
      data={data}
      title="Vector DB"
      icon={<VectorDBIcon />}
      inputs={[handleConfigs.singleInput[0]]}
      outputs={[handleConfigs.singleOutput[0]]}
    >
      <div style={baseNodeStyles.inputGroup}>
        <label style={baseNodeStyles.label}>
          Collection
        </label>
        <input
          style={baseNodeStyles.input}
          type="text"
          value={collection}
          onChange={(e) => setCollection(e.target.value)}
        />
      </div>
      <div style={{ ...baseNodeStyles.inputGroup, marginTop: '10px' }}>
        <label style={baseNodeStyles.label}>
          Top K
        </label>
        <input
          style={baseNodeStyles.input}
          type="number"
          value={topK}
          onChange={(e) => setTopK(e.target.value)}
          min="1"
          max="100"
        />
      </div>
    </BaseNode>
  );
};

export default VectorDBNode;
