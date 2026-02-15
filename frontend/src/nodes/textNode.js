import { useState, useRef, useEffect, useMemo } from 'react';
import { Handle, Position } from 'reactflow';
import { baseNodeStyles } from './baseNode';
import { TextIcon } from '../icons';

const VARIABLE_PATTERN = /\{\{([a-zA-Z_][a-zA-Z0-9_]*)\}\}/g;

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || '{{input}}');
  const [dimensions, setDimensions] = useState({ width: 200, height: 100 });
  const textAreaRef = useRef(null);

  const variables = useMemo(() => {
    const matches = [];
    let match;
    while ((match = VARIABLE_PATTERN.exec(currText)) !== null) {
      if (!matches.includes(match[1])) {
        matches.push(match[1]);
      }
    }
    return matches;
  }, [currText]);

  useEffect(() => {
    if (textAreaRef.current) {
      const textarea = textAreaRef.current;
      textarea.style.height = 'auto';
      const newHeight = Math.max(60, textarea.scrollHeight + 20);
      const newWidth = Math.max(180, textarea.scrollWidth + 40);
      setDimensions({ width: newWidth, height: newHeight });
    }
  }, [currText]);

  const handleTextChange = (e) => {
    setCurrText(e.target.value);
  };

  const containerStyle = {
    ...baseNodeStyles.container,
    width: dimensions.width,
    minWidth: dimensions.width,
    height: 'auto',
    minHeight: dimensions.height,
  };

  return (
    <div style={containerStyle}>
      <div style={baseNodeStyles.header}>
        <span style={baseNodeStyles.icon}><TextIcon /></span>
        <h4 style={baseNodeStyles.title}>Text</h4>
      </div>

      {variables.map((variable, index) => (
        <Handle
          key={`${id}-var-${variable}`}
          type="target"
          position={Position.Left}
          id={`${id}-${variable}`}
          style={{ top: `${25 + (index * 15)}%` }}
        />
      ))}

      <div style={baseNodeStyles.content}>
        <textarea
          ref={textAreaRef}
          style={{
            ...baseNodeStyles.input,
            width: '100%',
            minHeight: '50px',
            resize: 'none',
            fontFamily: 'inherit',
            lineHeight: '1.4',
          }}
          type="text"
          value={currText}
          onChange={handleTextChange}
        />
      </div>

      <Handle
        type="source"
        position={Position.Right}
        id={`${id}-output`}
        style={{ top: '50%' }}
      />
    </div>
  );
};

export default TextNode;
