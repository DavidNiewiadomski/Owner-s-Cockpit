
export const financialData = {
  projectName: "All Projects",
  totalBudget: 85000000,
  spending: [
    { category: "Labor", amount: 15000000, color: "#38bdf8", status: "normal" as const },
    { category: "Materials", amount: 12000000, color: "#4ade80", status: "normal" as const },
    { category: "Equipment", amount: 8700000, color: "#f87171", status: "normal" as const }
  ],
  changeOrders: [
    { id: "CO-001", description: "Foundation expansion", amount: 450000, status: "approved" as const, date: "2024-02-15" },
    { id: "CO-002", description: "Electrical upgrades", amount: 800000, status: "approved" as const, date: "2024-03-22" }
  ]
};
