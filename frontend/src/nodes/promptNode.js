import { useState } from 'react';
import { BaseNode, baseNodeStyles } from './baseNode';
import { PromptIcon } from '../icons';

export const PromptNode = ({ id, data }) => {
  const [template, setTemplate] = useState(data?.template || 'Answer the following question: {{question}}');

  return (
    <BaseNode
      id={id}
      data={data}
      title="Prompt"
      icon={<PromptIcon />}
      inputs={[{
        type: 'target',
        position: 'left',
        idPrefix: 'context',
        style: { top: '33%' }
      }, {
        type: 'target',
        position: 'left',
        idPrefix: 'input',
        style: { top: '66%' }
      }]}
      outputs={[{
        type: 'source',
        position: 'right',
        idPrefix: 'output',
        style: { top: '50%' }
      }]}
    >
      <div style={baseNodeStyles.inputGroup}>
        <label style={baseNodeStyles.label}>
          Template
        </label>
        <textarea
          style={{
            ...baseNodeStyles.input,
            width: '100%',
            minHeight: '60px',
            resize: 'none',
            fontFamily: 'inherit',
          }}
          value={template}
          onChange={(e) => setTemplate(e.target.value)}
        />
      </div>
    </BaseNode>
  );
};

export default PromptNode;
