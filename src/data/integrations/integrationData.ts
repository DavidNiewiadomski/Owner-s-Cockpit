
export const integrationData = {
  name: "Procore",
  logo: "https://play-lh.googleusercontent.com/Fro4e_osoDhhrjgiQXUP0vpS-5-_2MW5XLBCraizY5UVA8RWm6sD6I8IAzpiAMFcBkQI",
  description: "Construction management platform",
  connected: true,
  category: "Project Management",
  onToggle: () => console.log("Toggled Procore integration")
};

export const allIntegrations = [
  {
    id: "procore",
    name: "Procore",
    logo: "https://play-lh.googleusercontent.com/Fro4e_osoDhhrjgiQXUP0vpS-5-_2MW5XLBCraizY5UVA8RWm6sD6I8IAzpiAMFcBkQI",
    description: "Construction management platform",
    connected: true,
    category: "Project Management",
    features: ["Schedule Management", "Document Control", "Quality & Safety"]
  },
  {
    id: "bim360",
    name: "BIM 360",
    logo: "https://seeklogo.com/images/A/autodesk-bim-360-logo-83A26E86F5-seeklogo.com.png",
    description: "Construction management software",
    connected: true,
    category: "Design & BIM",
    features: ["Design Collaboration", "Model Coordination", "Document Management"]
  },
  {
    id: "plangrid",
    name: "PlanGrid",
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSKDfEW5-v6YWG2Ar_WQJ_T3za3zIxbxCR7ZqCDuYxVIAhvM7lZnVP7zsJT5ZX2ebHpA&usqp=CAU",
    description: "Construction productivity software",
    connected: false,
    category: "Field Management",
    features: ["Blueprint Management", "Task Management", "Photo Documentation"]
  }
];
