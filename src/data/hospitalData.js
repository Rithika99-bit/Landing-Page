export const DEFAULT_HOSPITAL_NAME = "AETHERIA HEALTH";

export const NAV_LINKS = [
  { name: "HOME", href: "#hero" },
  { name: "SERVICES", href: "#services" },
  { name: "DOCTORS", href: "#doctors" },
  { name: "CONTACT", href: "#contact" },
];

export const HOVER_BOARDS_DATA = [
  {
    id: "01",
    number: "01",
    title: "Expert Doctors",
    subtitle: "Board-certified clinical luminaries across 40+ medical disciplines",
    detail: "Direct access to premier department chairs, Harvard & Johns Hopkins-trained specialists, and international advisory faculty.",
    icon: "Stethoscope",
    accent: "from-blue-500/20 to-cyan-500/20",
    badge: "Faculty Excellence"
  },
  {
    id: "02",
    number: "02",
    title: "Advanced Treatment",
    subtitle: "Next-gen robotic surgery & precision molecular protocols",
    detail: "Utilizing Da Vinci Xi robotic surgery platforms, targeted immunotherapies, and minimally invasive catheter-based interventions.",
    icon: "Zap",
    accent: "from-cyan-500/20 to-blue-600/20",
    badge: "Robotics & Gene Care"
  },
  {
    id: "03",
    number: "03",
    title: "Personalized Care",
    subtitle: "Digital twin wellness modelling tailored to your biology",
    detail: "Every patient receives an individual clinical roadmap calibrated by genomic biomarkers, metabolic tracking, and dedicated nurse navigators.",
    icon: "HeartHandshake",
    accent: "from-indigo-500/20 to-blue-500/20",
    badge: "1:1 Care Navigator"
  },
  {
    id: "04",
    number: "04",
    title: "Modern Diagnostics",
    subtitle: "Sub-millimeter 7-Tesla MRI & multi-spectral photon CT",
    detail: "Ultra-high resolution non-invasive imaging powered by AI edge detection that uncovers cellular anomalies years before clinical onset.",
    icon: "Activity",
    accent: "from-blue-600/20 to-indigo-500/20",
    badge: "Sub-Cellular Precision"
  },
  {
    id: "05",
    number: "05",
    title: "24/7 Patient Support",
    subtitle: "Always-on emergency triage & continuous biometric telemetry",
    detail: "Immediate round-the-clock telemedicine access, rapid emergency trauma dispatch, and round-the-clock clinical consultation desk.",
    icon: "ShieldAlert",
    accent: "from-sky-500/20 to-blue-500/20",
    badge: "Zero Wait Emergency"
  },
  {
    id: "06",
    number: "06",
    title: "Easy Appointments",
    subtitle: "Instant booking with smart digital sync & direct arrival passes",
    detail: "Seamless online scheduling with zero wait times, digital intake forms, calendar synchronization, and automated prescription delivery.",
    icon: "CalendarCheck",
    accent: "from-blue-400/20 to-teal-500/20",
    badge: "Instant Confirmation"
  }
];

export const WHY_CHOOSE_US = [
  {
    title: "Experienced Specialists",
    description: "Multidisciplinary consult boards with over 25+ average years of tier-one academic hospital tenure.",
    icon: "Award"
  },
  {
    title: "Personalized Patient Care",
    description: "Holistic care pathways designed around your genomic profile, lifestyle factors, and personal preferences.",
    icon: "UserCheck"
  },
  {
    title: "Modern Healthcare Technology",
    description: "Equipped with photon-counting CT, AI-augmented telemetry, and surgical robotic suites.",
    icon: "Cpu"
  },
  {
    title: "Comfortable Patient Experience",
    description: "Private acoustic glass healing suites, daylight-mimicking circadian lighting, and concierge hospitality.",
    icon: "Sparkles"
  }
];

export const MAJOR_SERVICES = [
  {
    id: "cardio",
    title: "Precision Cardiology",
    category: "Heart & Vascular",
    description: "AI hemodynamic mapping, transcatheter aortic interventions, and preventative cardiovascular preservation.",
    stat: "99.4% Survival Index",
    icon: "Heart"
  },
  {
    id: "neuro",
    title: "Advanced Neurosciences",
    category: "Brain & Spine",
    description: "Micro-neurosurgery, stereotactic radiosurgery, and cognitive restoration programs using neural plasticity.",
    stat: "Sub-mm Precision",
    icon: "Brain"
  },
  {
    id: "surgery",
    title: "Robotic & Minimally Invasive",
    category: "Surgical Suites",
    description: "Da Vinci Xi multi-quadrant robotic operations delivering minimal blood loss, minimal scarring, and same-day recovery.",
    stat: "60% Faster Recovery",
    icon: "Crosshair"
  },
  {
    id: "diagnostics",
    title: "Molecular Imaging & Labs",
    category: "Clinical Analytics",
    description: "Multi-cancer early detection liquid biopsies and 7T clinical MRI for early-stage cellular risk discovery.",
    stat: "2-Hour Rapid Results",
    icon: "Microscope"
  }
];

export const DOCTORS_DATA = [
  {
    id: "dr-elena",
    name: "Dr. Anya Sharma, MD",
    role: "Chief of Neurosciences & Cranial Surgery",
    specialty: "Advanced Neurosciences",
    experience: "16+ Years Experience",
    bio: "Fellow of the Royal College of Surgeons, internationally acclaimed for pioneering robotic micro-craniotomy and functional brain mapping.",
    education: "Johns Hopkins University (MD), Harvard Medical School (Fellowship)",
    image: "/images/dr_elena.jpg",
    tags: ["Robotic Brain Surgery", "Neuro-Oncology", "Neural Plasticity"],
    consultFee: "$180",
    rating: "4.99 / 5.0 (340+ Reviews)"
  },
  {
    id: "dr-marcus",
    name: "Dr. Arthur Vance, MD, FACC",
    role: "Chair of Cardiovascular Innovation",
    specialty: "Precision Cardiology",
    experience: "24+ Years Experience",
    bio: "Pioneer in artificial cardiac hemodynamics, transcatheter valve replacement, and digital twin cardiovascular modeling.",
    education: "Stanford School of Medicine (MD), Cleveland Clinic (Cardiology Fellow)",
    image: "/images/dr_marcus.jpg",
    tags: ["Structural Heart", "Preventative Cardiology", "Cardiac Robotics"],
    consultFee: "$220",
    rating: "4.98 / 5.0 (520+ Reviews)"
  },
  {
    id: "dr-sarah",
    name: "Dr. Sarah Jensen, MD, PhD",
    role: "Director of Genomics & Pediatrics",
    specialty: "Pediatric & Genomic Care",
    experience: "14+ Years Experience",
    bio: "Distinguished geneticist focused on inherited metabolic conditions, pediatric resilience, and precision preventative wellness.",
    education: "Columbia University (MD, PhD), Boston Children’s Hospital (Pediatric Residency)",
    image: "/images/dr_sarah.jpg",
    tags: ["Genomic Screening", "Pediatric Immunology", "Rare Diseases"],
    consultFee: "$195",
    rating: "5.0 / 5.0 (290+ Reviews)"
  },
  {
    id: "dr-rajesh",
    name: "Dr. Rajesh Sharma, MBBS, MD",
    role: "Chief of Integrative & Constitutional Care",
    specialty: "Holistic & Preventative Health",
    experience: "28+ Years Experience",
    bio: "Distinguished clinician specializing in holistic constitutional longevity, chronic pathology resolution, and integrative patient care.",
    education: "Osmania Medical College (MBBS), MUHS (MD), King's College London (Honorary Visiting Fellow)",
    image: "/images/dr_rajesh.jpg",
    tags: ["Constitutional Care", "Chronic Disorders", "Longevity Therapeutics"],
    consultFee: "$160",
    rating: "4.97 / 5.0 (610+ Reviews)"
  }
];

export const PATIENT_JOURNEY_STEPS = [
  {
    step: "01",
    title: "Book Appointment",
    description: "Choose your specialist or department online with real-time slot selection and instant digital intake.",
    tag: "Seamless Onboarding",
    icon: "Calendar"
  },
  {
    step: "02",
    title: "Consultation",
    description: "Comprehensive 1-on-1 dialogue in our serene acoustic suites or via encrypted high-definition telehealth.",
    tag: "Unrushed Dialogue",
    icon: "MessageSquare"
  },
  {
    step: "03",
    title: "Precision Diagnosis",
    description: "Sub-cellular imaging and metabolic profiling evaluated by our AI clinical decision-support engine.",
    tag: "Multi-Omic Analytics",
    icon: "Search"
  },
  {
    step: "04",
    title: "Personalized Treatment",
    description: "Minimally-invasive therapies and custom wellness roadmaps tailored to your biological signature.",
    tag: "Targeted Protocols",
    icon: "ShieldCheck"
  },
  {
    step: "05",
    title: "Follow-up & Recovery",
    description: "Continuous remote biometric telemetry, dedicated nursing check-ins, and sustained vitality tracking.",
    tag: "Lifelong Vitality",
    icon: "Sparkles"
  }
];

export const TRUST_STATS = [
  {
    value: "10+",
    numeric: 10,
    suffix: "+",
    label: "Years of Care",
    detail: "Continuously pioneering healthcare standards"
  },
  {
    value: "50K+",
    numeric: 50,
    suffix: "K+",
    label: "Patients Served",
    detail: "Patients treated from over 35 nations"
  },
  {
    value: "25+",
    numeric: 25,
    suffix: "+",
    label: "Specialists",
    detail: "World-class department directors and fellows"
  },
  {
    value: "24/7",
    numeric: 24,
    suffix: "/7",
    label: "Patient Support",
    detail: "Zero-latency emergency medical response"
  }
];
