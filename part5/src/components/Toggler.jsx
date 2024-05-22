import { forwardRef, useImperativeHandle, useState } from "react";
import PropTypes from "prop-types";

export const Toggler = forwardRef(function Toggler(props, ref) {
  const { toggleContent, children, openLabel, closeLabel = "close" } = props;
  const [visible, setVisible] = useState(false);

  useImperativeHandle(ref, () => ({
    close: () => setVisible(false),
  }));

  if (visible)
    return (
      <div className="toggler toggler__closed">
        {children}
        <br />
        <button onClick={() => setVisible(false)}>{closeLabel}</button>
      </div>
    );

  return (
    <div
      style={{ display: "flex", gap: "8px" }}
      className="toggler toggler__opened"
    >
      {toggleContent}
      <button onClick={() => setVisible(true)}>{openLabel}</button>
    </div>
  );
});

Toggler.propTypes = {
  toggleContent: PropTypes.node,
  openLabel: PropTypes.string.isRequired,
  closeLabel: PropTypes.string,
};
