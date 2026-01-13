import React from 'react';

const ContentList = ({ items, onSelect }) => {
  return (
    <div>
      {items.map(item => (
        <div 
          key={item._id} 
          onClick={() => onSelect(item._id)} 
          style={{ borderBottom: "1px solid #E5E7EB", padding: "8px", cursor: "pointer" }}
        >
          <h4>{item.title}</h4>
          <p>{item.description.substring(0, 100)}...</p>
          <small>Status: {item.status} | Region: {item.region}</small>
        </div>
      ))}
    </div>
  );
};

export default ContentList;
