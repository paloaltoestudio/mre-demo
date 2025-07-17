export const customStyles = {
  control: (provided: any, state: any) => ({
    ...provided,
    borderColor: state.isFocused ? "#3b82f6" : "#d1d5db",
    boxShadow: "none",
    padding: "0rem 0.5rem",
    // minHeight: "1rem",
    height: "50px"
  }),
  indicatorSeparator: () => ({ display: "none" }),
}; 