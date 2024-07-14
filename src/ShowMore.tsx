import React, { useState, useEffect, useCallback } from 'react';

type ShowMoreProps = {
  initialHeight: number;
  children: React.ReactNode;
};

function ShowMore({ initialHeight, children }: ShowMoreProps) {
  const [expanded, setExpanded] = useState(false);
  const [hasMoreContent, setHasMoreContent] = useState(false);
  const contentRef = React.createRef<HTMLDivElement>();

  const checkContentHeight = useCallback(() => {
    if (contentRef.current && contentRef.current.offsetHeight !== undefined && contentRef.current.offsetHeight > initialHeight) {
      setHasMoreContent(true);
    } else {
      setHasMoreContent(false);
    }
  }, [initialHeight, contentRef]);

  useEffect(() => {
    // Check the content height initially
    checkContentHeight();

    // Check the content height whenever the window is resized
    window.addEventListener('resize', checkContentHeight);

    // Clean up the event listener when the component is unmounted
    return () => {
      window.removeEventListener('resize', checkContentHeight);
    };
  }, [checkContentHeight, initialHeight]);

  // check the content height whenever the children change
  useEffect(() => {
    checkContentHeight();
  }, [checkContentHeight, children]);

  return (
    <>
      <div style={{ height: expanded ? 'auto' : initialHeight, overflow: 'hidden' }}>
        <div ref={contentRef}>
          {children}
        </div>
      </div>
      {hasMoreContent && (
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => setExpanded(!expanded)}>
          {expanded ? 'Show less' : 'Show more'}
        </button>
      )}
    </>
  );
}

export default ShowMore;

