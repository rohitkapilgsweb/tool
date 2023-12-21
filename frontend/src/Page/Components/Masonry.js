// Masonry.js
import React, { useRef, useEffect, useState } from 'react';
import styled from 'styled-components';

const MasonryContainer = styled.div`
  column-count: ${(props) => props.columns || 3};
  padding: ${(props) => props.padding || '0px 16px'};
`;

const MasonryItem = styled.div`
  break-inside: avoid;
  margin-bottom: ${(props) => props.gap || '16px'};
`;

const Masonry = ({ columns, gap, children }) => {
  const containerRef = useRef(null);
  const [containerWidth, setContainerWidth] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
    };

    handleResize();

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const columnWidth = containerWidth / columns;

  return (
    <MasonryContainer ref={containerRef} columns={columns} gap={gap}>
      {React.Children.map(children, (child, index) => (
        <MasonryItem key={index} gap={gap} style={{ width: `${columnWidth}px`,padding:"0px  16px" }}>
          {child}
        </MasonryItem>
      ))}
    </MasonryContainer>
  );
};

export default Masonry;
