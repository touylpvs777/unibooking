export type ChecklistStatus = 'AVAILABLE' | 'IN_PROGRESS' | 'ACTION_REQUIRED' | 'DRAFT';

export type ChecklistItem = {
  id: string;
  category: 'Legal' | 'Feasibility' | 'Financial';
  documentName: { title: string; description: string };
  status: ChecklistStatus;
  notes?: string;
  url?: string;
};

export const masterChecklist: ChecklistItem[] = [
  { id: "leg-1", category: "Legal", documentName: { title: "ໃບທະບຽນວິສາຫະກິດ", description: "Certificate of Incorporation" }, status: "AVAILABLE", url: "/documents/Enterprise_Registration_LUD.pdf" },
  { id: "leg-2", category: "Legal", documentName: { title: "ສັນຍາສຳປະທານພັດທະນາໂຄງການ", description: "Concession Agreement" }, status: "AVAILABLE", url: "/documents/Concession_Agreement_Solar50MW.pdf" },
  { id: "leg-3", category: "Legal", documentName: { title: "ໃບອະນຸຍາດລະບົບການຊຳລະ", description: "Payment System License" }, status: "AVAILABLE", url: "/documents/Fintech_License_BOL_UniPay.pdf" },
  { id: "fs-1", category: "Feasibility", documentName: { title: "ບົດວິໄຈຄວາມເປັນໄປໄດ້", description: "Technical Feasibility Report" }, status: "AVAILABLE", url: "/documents/Feasibility_Study_Executive_Summary.pdf" },
  { id: "fs-2", category: "Feasibility", documentName: { title: "ໃບຢັ້ງຢືນສິ່ງແວດລ້ອມ", description: "Environmental Impact Assessment (EIA)" }, status: "AVAILABLE", url: "/documents/EIA_MONRE_Approval_Solar50MW.pdf" },
  { id: "fs-3", category: "Feasibility", documentName: { title: "ສັນຍາຊື້-ຂາຍໄຟຟ້າ", description: "Power Purchase Agreement (PPA)" }, status: "AVAILABLE", url: "/documents/PPA_EDL_Offtake_Agreement.pdf" },
  { id: "fin-1", category: "Financial", documentName: { title: "ເອກະສານສະເໜີໂຄງການ ແລະ ຂໍ້ມູນການເງິນ", description: "Executive Pitch Deck & Financial Memorandum" }, status: "AVAILABLE", url: "/documents/LUD_Group_Pitch_Deck_2026.pdf" },
  { id: "fin-2", category: "Financial", documentName: { title: "ລາຍລະອຽດການລົງທຶນ CapEx & OpEx", description: "CapEx & OpEx Breakdown (Project Finance)" }, status: "AVAILABLE", url: "/documents/Feasibility_Study_Executive_Summary.pdf" },
  { id: "fin-3", category: "Financial", documentName: { title: "ໃບຢັ້ງຢືນການມອບພັນທະອາກອນ", description: "Enterprise Tax Clearance Certificate" }, status: "AVAILABLE", url: "/documents/Enterprise_Registration_LUD.pdf" },
];

export const getStatusIcon = (status: ChecklistStatus) => {
  switch (status) {
    case 'AVAILABLE': return '✅';
    case 'IN_PROGRESS': return '⏳';
    case 'ACTION_REQUIRED': return '🚨';
    case 'DRAFT': return '📝';
  }
};
