export const DraggableNode = ({ type, label }) => {
    const onDragStart = (event, nodeType) => {
      const appData = { nodeType }
      event.target.style.cursor = 'grabbing';
      event.dataTransfer.setData('application/reactflow', JSON.stringify(appData));
      event.dataTransfer.effectAllowed = 'move';
    };
  
    return (
      <div
        className={type}
        onDragStart={(event) => onDragStart(event, type)}
        onDragEnd={(event) => (event.target.style.cursor = 'grab')}
        style={{ 
          cursor: 'grab', 
          minWidth: '90px',
          padding: '10px 18px',
          height: '42px',
          display: 'flex', 
          alignItems: 'center', 
          borderRadius: '10px',
          backgroundColor: '#F9FAFB',
          border: '2px solid #E5E7EB',
          justifyContent: 'center', 
          flexDirection: 'column',
          transition: 'all 0.2s ease',
          fontWeight: '500',
          fontSize: '13px',
        }} 
        onMouseEnter={(e) => {
          e.target.style.backgroundColor = '#F3F4F6';
          e.target.style.borderColor = '#D1D5DB';
          e.target.style.transform = 'translateY(-1px)';
        }}
        onMouseLeave={(e) => {
          e.target.style.backgroundColor = '#F9FAFB';
          e.target.style.borderColor = '#E5E7EB';
          e.target.style.transform = 'translateY(0)';
        }}
        draggable
      >
          <span style={{ color: '#374151', fontWeight: '500' }}>{label}</span>
      </div>
    );
  };
  