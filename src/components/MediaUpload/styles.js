export const baseStyle = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  borderRadius: 1,
  borderColor: "white",
  backgroundColor: "white",
  color: "white",
  outline: "none",
  transition: "border .24s ease-in-out",
};

export const thumbsContainer = {
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  marginTop: 16,
};

export const thumb = {
  display: "inline-flex",
  borderRadius: 2,
  border: "1px solid #eaeaea",
  marginBottom: 8,
  marginRight: 8,
  width: 100,
  height: 100,
  padding: 4,
  boxSizing: "border-box",
  position: "relative",
};

export const thumbInner = {
  display: "flex",
  minWidth: 0,
  overflow: "hidden",
};

export const img = {
  display: "block",
  width: "auto",
  height: "100%",
};
