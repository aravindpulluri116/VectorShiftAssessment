import { useState, useRef, useCallback } from 'react';
import ReactFlow, { Controls, Background, MiniMap } from 'reactflow';
import { useStore } from './store';
import { shallow } from 'zustand/shallow';
import { InputNode } from './nodes/inputNode';
import { LLMNode } from './nodes/llmNode';
import { OutputNode } from './nodes/outputNode';
import { TextNode } from './nodes/textNode';
import { APINode } from './nodes/apiNode';
import { VectorDBNode } from './nodes/vectorDBNode';
import { PromptNode } from './nodes/promptNode';
import { MemoryNode } from './nodes/memoryNode';
import { FilterNode } from './nodes/filterNode';

import 'reactflow/dist/style.css';

const gridSize = 20;
const proOptions = { hideAttribution: true };

const nodeTypes = {
  customInput: InputNode,
  llm: LLMNode,
  customOutput: OutputNode,
  text: TextNode,
  api: APINode,
  vectorDB: VectorDBNode,
  prompt: PromptNode,
  memory: MemoryNode,
  filter: FilterNode,
};

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
  getNodeID: state.getNodeID,
  addNode: state.addNode,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
});

export const PipelineUI = () => {
    const reactFlowWrapper = useRef(null);
    const [reactFlowInstance, setReactFlowInstance] = useState(null);
    const {
      nodes,
      edges,
      getNodeID,
      addNode,
      onNodesChange,
      onEdgesChange,
      onConnect
    } = useStore(selector, shallow);

    const getInitNodeData = (nodeID, type) => {
      let nodeData = { id: nodeID, nodeType: `${type}` };
      return nodeData;
    }

    const onDrop = useCallback(
        (event) => {
          event.preventDefault();
    
          const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
          if (event?.dataTransfer?.getData('application/reactflow')) {
            const appData = JSON.parse(event.dataTransfer.getData('application/reactflow'));
            const type = appData?.nodeType;
      
            if (typeof type === 'undefined' || !type) {
              return;
            }
      
            const position = reactFlowInstance.project({
              x: event.clientX - reactFlowBounds.left,
              y: event.clientY - reactFlowBounds.top,
            });

            const nodeID = getNodeID(type);
            const newNode = {
              id: nodeID,
              type,
              position,
              data: getInitNodeData(nodeID, type),
            };
      
            addNode(newNode);
          }
        },
        [reactFlowInstance, getNodeID, addNode]
    );

    const onDragOver = useCallback((event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    }, []);

    return (
        <>
        <div 
            ref={reactFlowWrapper} 
            style={{
                width: '100%',
                height: '100%',
            }}
        >
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                onDrop={onDrop}
                onDragOver={onDragOver}
                onInit={setReactFlowInstance}
                nodeTypes={nodeTypes}
                proOptions={proOptions}
                snapGrid={[gridSize, gridSize]}
                connectionLineType='smoothstep'
                fitView
            >
                <Background color="#D1D5DB" gap={gridSize} />
                <Controls 
                    style={{
                        backgroundColor: '#FFFFFF',
                        border: '1px solid #E5E7EB',
                    }}
                />
                <MiniMap 
                    style={{
                        backgroundColor: '#FFFFFF',
                    }}
                    nodeColor={(node) => {
                        switch (node.type) {
                            case 'customInput': return '#3B82F6';
                            case 'llm': return '#8B5CF6';
                            case 'customOutput': return '#10B981';
                            case 'text': return '#F59E0B';
                            case 'api': return '#EC4899';
                            case 'vectorDB': return '#06B6D4';
                            case 'prompt': return '#6366F1';
                            case 'memory': return '#8B5CF6';
                            case 'filter': return '#14B8A6';
                            default: return '#9CA3AF';
                        }
                    }}
                />
            </ReactFlow>
        </div>
        </>
    )
}
