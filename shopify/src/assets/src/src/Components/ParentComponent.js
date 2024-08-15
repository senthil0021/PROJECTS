import React, { useState } from 'react';
import ChildComponent from './ChildComponent';

function ParentComponent() {
  const [parentState, setParentState] = useState('Hello from Parent');

  return (
    <div>
      <ChildComponent message={parentState} />
      <button onClick={() => setParentState('Updated Parent State')}>Update Parent State</button>
    </div>
  );
}

export default ParentComponent;
