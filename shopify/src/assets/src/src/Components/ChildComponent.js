import React from 'react';

function ChildComponent(props) {
  const [childState, setChildState] = React.useState('Hello from Child');

  return (
    <div>
      <p>{props.message}</p>
      <p>{childState}</p>
      <button onClick={() => setChildState('Updated Child State')}>Update Child State</button>
    </div>
  );
}

export default ChildComponent;