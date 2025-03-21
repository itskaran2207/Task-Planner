export const itemStyle = (priority) => ({
  item_container: {
    width: "100%",
    padding: "15px",
    borderRadius: "10px",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    backgroundColor: "#F6F8D5",
    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
    cursor: "grab",
    transition: "all 0.2s ease-in-out",
    "&:hover": {
      transform: "scale(1.02)",
      boxShadow: "0px 6px 15px rgba(0, 0, 0, 0.2)",
    },
    border: "0.5px solid black",
  },
  item_card_title: { fontWeight: "bold", textWrap: "wrap" },
  item_card_desc: { color: "#555" },
  item_card_assignee: { fontWeight: "500", color: "#333" },
  item_card_box: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  item_card_priority: {
    fontSize: "1rem",
    fontWeight: "bold",
    textAlign: "center",
    backgroundColor:
      priority === "high"
        ? "#ff6b6b"
        : priority === "medium"
        ? "#ffaf40"
        : "#4ecdc4",
    color: "white",
    borderRadius: "5px",
    padding: "4px 10px",
    minWidth: "80px",
  },
});
