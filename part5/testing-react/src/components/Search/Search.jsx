export const Search = ({ value, onChange }) => (
  <p>
    Search:{" "}
    <input
      required
      name="search"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  </p>
);
