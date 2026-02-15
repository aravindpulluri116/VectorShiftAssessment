import { useStore } from './store';
import { shallow } from 'zustand/shallow';
import { useCallback } from 'react';
import { PlayIcon } from './icons';

const selector = (state) => ({
    nodes: state.nodes,
    edges: state.edges,
});

export const SubmitButton = () => {
    const { nodes, edges } = useStore(selector, shallow);

    const handleSubmit = useCallback(async () => {
        try {
            const pipeline = {
                nodes: nodes.map(node => ({
                    id: node.id,
                    type: node.type,
                    position: node.position,
                    data: node.data,
                })),
                edges: edges.map(edge => ({
                    id: edge.id,
                    source: edge.source,
                    target: edge.target,
                    sourceHandle: edge.sourceHandle,
                    targetHandle: edge.targetHandle,
                })),
            };

            const response = await fetch('http://localhost:8000/pipelines/parse', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ pipeline: JSON.stringify(pipeline) }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            
            alert(
                `Pipeline Analysis Results:\n\n` +
                `Number of Nodes: ${data.num_nodes}\n` +
                `Number of Edges: ${data.num_edges}\n` +
                `Is DAG: ${data.is_dag ? 'Yes ✓' : 'No ✗'}\n`
            );
        } catch (error) {
            console.error('Error submitting pipeline:', error);
            alert('Error submitting pipeline. Please check the console for details.');
        }
    }, [nodes, edges]);

    return (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px',
            backgroundColor: '#FFFFFF',
            borderTop: '1px solid #E5E7EB',
            boxShadow: '0 -1px 3px 0 rgba(0, 0, 0, 0.1)',
        }}>
            <button
                onClick={handleSubmit}
                style={{
                    padding: '14px 40px',
                    fontSize: '14px',
                    fontWeight: '600',
                    color: '#FFFFFF',
                    backgroundColor: '#3B82F6',
                    border: 'none',
                    borderRadius: '10px',
                    cursor: 'pointer',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    boxShadow: '0 4px 6px -1px rgba(59, 130, 246, 0.3), 0 2px 4px -1px rgba(59, 130, 246, 0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    letterSpacing: '0.02em',
                }}
                onMouseOver={(e) => {
                    e.target.style.backgroundColor = '#2563EB';
                    e.target.style.transform = 'translateY(-2px)';
                    e.target.style.boxShadow = '0 10px 15px -3px rgba(59, 130, 246, 0.4), 0 4px 6px -2px rgba(59, 130, 246, 0.3)';
                }}
                onMouseOut={(e) => {
                    e.target.style.backgroundColor = '#3B82F6';
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = '0 4px 6px -1px rgba(59, 130, 246, 0.3), 0 2px 4px -1px rgba(59, 130, 246, 0.2)';
                }}
            >
                <PlayIcon />
                Submit Pipeline
            </button>
        </div>
    );
};
