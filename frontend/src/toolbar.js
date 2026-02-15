import { DraggableNode } from './draggableNode';
import { WorkflowIcon } from './icons';

export const PipelineToolbar = () => {

    return (
        <div style={{
            padding: '20px 24px',
            backgroundColor: '#FFFFFF',
            borderBottom: '1px solid #E5E7EB',
            boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        }}>
            <h2 style={{
                margin: '0 0 18px 0',
                color: '#111827',
                fontSize: '20px',
                fontWeight: '700',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                letterSpacing: '-0.02em',
            }}>
                <WorkflowIcon />
                LLM Workflow Builder
            </h2>
            <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '12px',
                alignItems: 'center',
            }}>
                <span style={{
                    color: '#6B7280',
                    fontSize: '13px',
                    fontWeight: '600',
                    letterSpacing: '0.02em',
                    marginRight: '8px',
                }}>
                    NODES
                </span>
                <DraggableNode type='customInput' label='Input' />
                <DraggableNode type='llm' label='LLM' />
                <DraggableNode type='customOutput' label='Output' />
                <DraggableNode type='text' label='Text' />
                <DraggableNode type='api' label='API' />
                <DraggableNode type='vectorDB' label='Vector DB' />
                <DraggableNode type='prompt' label='Prompt' />
                <DraggableNode type='memory' label='Memory' />
                <DraggableNode type='filter' label='Filter' />
            </div>
        </div>
    );
};
