import { BaseNode, createHandleConfig, baseNodeStyles } from './baseNode';
import { LLMIcon } from '../icons';

export const LLMNode = ({ id, data }) => {
  return (
    <BaseNode
      id={id}
      data={data}
      title="LLM"
      icon={<LLMIcon />}
      inputs={[createHandleConfig('target', 'left', { idPrefix: 'system', style: { top: '33%' } }),
              createHandleConfig('target', 'left', { idPrefix: 'prompt', style: { top: '66%' } })]}
      outputs={[createHandleConfig('source', 'right', { idPrefix: 'response', style: { top: '50%' } })]}
    >
      <div style={baseNodeStyles.inputGroup}>
        <label style={baseNodeStyles.label}>
          Model
        </label>
        <select style={baseNodeStyles.select} defaultValue="gpt-3.5">
          <option value="gpt-3.5">GPT-3.5</option>
          <option value="gpt-4">GPT-4</option>
          <option value="claude">Claude</option>
        </select>
      </div>
    </BaseNode>
  );
};
