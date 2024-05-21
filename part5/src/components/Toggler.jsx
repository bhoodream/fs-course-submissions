import { forwardRef, useImperativeHandle, useState } from "react";

export const Toggler = forwardRef(function Toggler(props, ref) {
  const { toggleContent, children, openLabel, closeLabel = "close" } = props;
  const [visible, setVisible] = useState(false);

  useImperativeHandle(ref, () => ({
    close: () => setVisible(false),
  }));

  if (visible)
    return (
      <div>
        {children}
        <br />
        <button onClick={() => setVisible(false)}>{closeLabel}</button>
      </div>
    );

  return (
    <div style={{ display: "flex", gap: "8px" }}>
      {toggleContent}
      <button onClick={() => setVisible(true)}>{openLabel}</button>
    </div>
  );
});
