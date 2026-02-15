import { Handle, Position } from 'reactflow';
import { memo } from 'react';

export const baseNodeStyles = {
  container: {
    padding: '16px 20px',
    borderRadius: '12px',
    backgroundColor: '#FFFFFF',
    border: '1px solid #E5E7EB',
    minWidth: '200px',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    marginBottom: '14px',
    paddingBottom: '10px',
    borderBottom: '2px solid #F3F4F6',
  },
  icon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#6B7280',
  },
  title: {
    color: '#111827',
    fontSize: '15px',
    fontWeight: '600',
    margin: 0,
    letterSpacing: '-0.01em',
  },
  content: {
    color: '#6B7280',
    fontSize: '13px',
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    marginTop: '10px',
  },
  label: {
    color: '#374151',
    fontSize: '12px',
    fontWeight: '500',
    letterSpacing: '0.01em',
  },
  input: {
    padding: '10px 14px',
    borderRadius: '8px',
    border: '1px solid #D1D5DB',
    backgroundColor: '#F9FAFB',
    color: '#111827',
    fontSize: '13px',
    outline: 'none',
    transition: 'all 0.2s ease',
    fontWeight: '400',
  },
  select: {
    padding: '10px 14px',
    borderRadius: '8px',
    border: '1px solid #D1D5DB',
    backgroundColor: '#F9FAFB',
    color: '#111827',
    fontSize: '13px',
    outline: 'none',
    cursor: 'pointer',
    fontWeight: '400',
  },
};

export const defaultHandleConfigs = {
  input: {
    type: 'target',
    position: Position.Left,
    style: { top: '50%' },
  },
  output: {
    type: 'source',
    position: Position.Right,
    style: { top: '50%' },
  },
};

const createHandle = (id, config, index = 0, total = 1) => {
  const { type, position, style, idPrefix = '' } = config;
  const handleId = idPrefix ? `${id}-${idPrefix}` : `${id}-${type}`;
  
  const computedStyle = { ...style };
  if (total > 1 && style.top === '50%') {
    const spacing = 100 / (total + 1);
    computedStyle.top = `${spacing * (index + 1)}%`;
  }
  
  return (
    <Handle
      key={handleId}
      type={type}
      position={position}
      id={handleId}
      style={computedStyle}
    />
  );
};

export const BaseNode = memo(({
  id,
  data,
  title,
  icon,
  inputs = [],
  outputs = [],
  children,
}) => {
  return (
    <div style={baseNodeStyles.container} className="base-node">
      <div style={baseNodeStyles.header}>
        {icon && <span style={baseNodeStyles.icon}>{icon}</span>}
        <h4 style={baseNodeStyles.title}>{title}</h4>
      </div>
      
      {inputs.map((config, index) => 
        createHandle(id, config, index, inputs.length)
      )}
      
      <div style={baseNodeStyles.content}>
        {children}
      </div>
      
      {outputs.map((config, index) => 
        createHandle(id, config, index, outputs.length)
      )}
    </div>
  );
});

BaseNode.displayName = 'BaseNode';

export const createHandleConfig = (type, position, options = {}) => ({
  type,
  position,
  ...options,
});

export const handleConfigs = {
  singleInput: [createHandleConfig('target', Position.Left)],
  singleOutput: [createHandleConfig('source', Position.Right)],
  dualInput: [
    createHandleConfig('target', Position.Left, { idPrefix: 'system', style: { top: '33%' } }),
    createHandleConfig('target', Position.Left, { idPrefix: 'prompt', style: { top: '66%' } }),
  ],
  singleInputSingleOutput: [
    createHandleConfig('target', Position.Left),
    createHandleConfig('source', Position.Right),
  ],
};

export default BaseNode;
