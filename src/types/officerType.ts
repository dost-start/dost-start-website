interface Officer {
  name: string;
  position: string;
  imageSrc: string;
  socialLinks: {
    facebook?: string;
    github?: string;
    linkedin?: string;
    instagram?: string;
    website?: string;
    behance?: string;
    youtube?: string;
    twitter?: string;
  };
}

interface Department {
  tabName: string;
  name: string;
  description: string;
  specialOfficers: Officer[];
  officers: Officer[];
}

interface BatchYear {
  year: string;
  departments: Department[];
}

interface BatchYears {
  batchYears: BatchYear[];
}

export type { Officer, Department, BatchYear, BatchYears };
