import { forwardRef, useImperativeHandle, useState } from "react";

export const Toggler = forwardRef(function Toggler(props, ref) {
  const [visible, setVisible] = useState(false);

  useImperativeHandle(ref, () => ({
    close: () => setVisible(false),
  }));

  if (visible)
    return (
      <div>
        {props.children}
        <br />
        <button onClick={() => setVisible(false)}>cancel</button>
      </div>
    );

  return <button onClick={() => setVisible(true)}>{props.buttonLabel}</button>;
});
