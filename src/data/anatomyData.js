/**
 * Comprehensive Anatomical Mapping & Medical Specialties Data
 * Maps 12 Human Body Areas to Specialties, Symptoms, and Certified Doctors.
 */

export const ANATOMY_REGIONS = [
  {
    id: "brain",
    name: "Brain & Head",
    specialty: "Neurology",
    departmentCode: "NEURO",
    coords3D: { x: 0, y: 3.4, z: 0.1 },
    mobilePosition: { top: "8%", left: "50%" },
    icon: "Brain",
    color: "#2F80ED",
    glowColor: "rgba(47, 128, 237, 0.6)",
    description: "Comprehensive care for neurological conditions, cognitive health, migraines, epilepsy, and precision neurosurgery.",
    availableDoctorsCount: 6,
    avgWaitTime: "10 mins",
    symptoms: [
      "headache", "migraine", "dizziness", "vertigo", "memory loss",
      "numbness", "seizures", "concussion", "brain fog", "tremors", "confusion"
    ],
    commonConcerns: [
      "Chronic Migraine Assessment",
      "Cognitive & Memory Screening",
      "Epilepsy Management",
      "Cranial Nerve Evaluation"
    ],
    doctors: [
      {
        id: "dr-elena",
        name: "Dr. Anya Sharma, MD",
        role: "Chief of Neurosciences",
        subSpecialty: "Cranial & Functional Neurosurgery",
        rating: 4.99,
        reviewsCount: 340,
        experience: "16+ Years",
        image: "/images/dr_elena.jpg",
        fee: "$180",
        nextSlot: "Today, 2:30 PM",
        hospitalAffiliation: "Johns Hopkins & Harvard Fellow"
      },
      {
        id: "dr-vikram",
        name: "Dr. Vikram Seth, MD, DM",
        role: "Senior Consultant Neurologist",
        subSpecialty: "Stroke & Movement Disorders",
        rating: 4.95,
        reviewsCount: 280,
        experience: "18+ Years",
        image: "/images/dr_rajesh.jpg",
        fee: "$170",
        nextSlot: "Tomorrow, 10:00 AM",
        hospitalAffiliation: "Oxford University Hospitals"
      }
    ]
  },
  {
    id: "eyes",
    name: "Eyes & Vision",
    specialty: "Ophthalmology",
    departmentCode: "OPHTH",
    coords3D: { x: 0, y: 3.15, z: 0.55 },
    mobilePosition: { top: "11%", left: "50%" },
    icon: "Eye",
    color: "#00C2CB",
    glowColor: "rgba(0, 194, 203, 0.6)",
    description: "Advanced diagnostic imaging, laser refractive correction, retinal microsurgery, and comprehensive ocular wellness.",
    availableDoctorsCount: 4,
    avgWaitTime: "12 mins",
    symptoms: [
      "blurry vision", "eye pain", "dry eyes", "redness", "double vision",
      "floaters", "itchy eyes", "sensitivity to light", "loss of vision", "glaucoma"
    ],
    commonConcerns: [
      "Laser Vision Correction (SMILE/LASIK)",
      "Retinal & Macular Evaluation",
      "Glaucoma & Intraocular Pressure",
      "Dry Eye & Corneal Therapy"
    ],
    doctors: [
      {
        id: "dr-elena-eyes",
        name: "Dr. Michelle Zhang, MD",
        role: "Director of Retinal Microsurgery",
        subSpecialty: "Vitreoretinal Diseases",
        rating: 4.97,
        reviewsCount: 220,
        experience: "15+ Years",
        image: "/images/dr_elena.jpg",
        fee: "$160",
        nextSlot: "Today, 4:00 PM",
        hospitalAffiliation: "Moorfields Eye Hospital Alumni"
      }
    ]
  },
  {
    id: "ent",
    name: "Ear, Nose & Throat",
    specialty: "Otolaryngology (ENT)",
    departmentCode: "ENT",
    coords3D: { x: 0, y: 2.7, z: 0.4 },
    mobilePosition: { top: "16%", left: "50%" },
    icon: "Volume2",
    color: "#8B5CF6",
    glowColor: "rgba(139, 92, 246, 0.6)",
    description: "Specialized diagnostics and surgical interventions for hearing, balance, chronic sinusitis, sleep apnea, and vocal disorders.",
    availableDoctorsCount: 5,
    avgWaitTime: "15 mins",
    symptoms: [
      "sore throat", "earache", "hearing loss", "tinnitus", "sinus pressure",
      "nasal congestion", "snoring", "difficulty swallowing", "hoarseness", "ear infection"
    ],
    commonConcerns: [
      "Endoscopic Sinus Surgery",
      "Audiology & Tinnitus Management",
      "Sleep Apnea & Airway Diagnostics",
      "Vocal Cord Restoration"
    ],
    doctors: [
      {
        id: "dr-alicia-ent",
        name: "Dr. Alicia Moreau, MD, FACS",
        role: "Chair of Otolaryngology",
        subSpecialty: "Head & Neck Reconstruction",
        rating: 4.96,
        reviewsCount: 310,
        experience: "19+ Years",
        image: "/images/dr_sarah.jpg",
        fee: "$175",
        nextSlot: "Tomorrow, 11:30 AM",
        hospitalAffiliation: "Mass Eye and Ear Fellow"
      }
    ]
  },
  {
    id: "heart",
    name: "Heart & Chest",
    specialty: "Cardiology",
    departmentCode: "CARDIO",
    coords3D: { x: -0.3, y: 1.6, z: 0.5 },
    mobilePosition: { top: "27%", left: "46%" },
    icon: "Heart",
    color: "#EF4444",
    glowColor: "rgba(239, 68, 68, 0.6)",
    description: "Premier cardiovascular care with real-time hemodynamic profiling, catheter-based therapies, and heart failure prevention.",
    availableDoctorsCount: 8,
    avgWaitTime: "8 mins",
    symptoms: [
      "chest pain", "palpitations", "shortness of breath", "irregular heartbeat",
      "high blood pressure", "swollen ankles", "fatigue", "dizziness on standing", "angina"
    ],
    commonConcerns: [
      "Comprehensive Cardiac Stress MRI",
      "Coronary Artery Disease Screening",
      "Arrhythmia & Holter Telemetry",
      "Preventative Cardiometabolic Workup"
    ],
    doctors: [
      {
        id: "dr-marcus",
        name: "Dr. Arthur Vance, MD, FACC",
        role: "Chair of Cardiovascular Innovation",
        subSpecialty: "Structural Heart & Hemodynamics",
        rating: 4.98,
        reviewsCount: 520,
        experience: "24+ Years",
        image: "/images/dr_marcus.jpg",
        fee: "$220",
        nextSlot: "Today, 1:15 PM",
        hospitalAffiliation: "Cleveland Clinic Fellowship"
      },
      {
        id: "dr-claire",
        name: "Dr. Claire Sterling, MD",
        role: "Director of Electrophysiology",
        subSpecialty: "Cardiac Arrhythmia & Pacemakers",
        rating: 4.96,
        reviewsCount: 295,
        experience: "14+ Years",
        image: "/images/dr_elena.jpg",
        fee: "$190",
        nextSlot: "Tomorrow, 9:00 AM",
        hospitalAffiliation: "Stanford Medicine Fellow"
      }
    ]
  },
  {
    id: "lungs",
    name: "Lungs & Respiratory",
    specialty: "Pulmonology",
    departmentCode: "PULMO",
    coords3D: { x: 0.35, y: 1.5, z: 0.4 },
    mobilePosition: { top: "28%", left: "54%" },
    icon: "Wind",
    color: "#06B6D4",
    glowColor: "rgba(6, 182, 212, 0.6)",
    description: "Cutting-edge lung diagnostics, asthma immunotherapy, pulmonary nodule assessment, and respiratory rehabilitation.",
    availableDoctorsCount: 5,
    avgWaitTime: "12 mins",
    symptoms: [
      "cough", "chronic cough", "wheezing", "asthma", "breathing difficulty",
      "chest tightness", "bronchitis", "blood in sputum", "sleep disruption", "pneumonia"
    ],
    commonConcerns: [
      "High-Resolution Chest CT Review",
      "Pulmonary Function Testing (PFT)",
      "Asthma & Allergy Desensitization",
      "Post-Infection Lung Recovery"
    ],
    doctors: [
      {
        id: "dr-hassan",
        name: "Dr. Tariq Hassan, MD, FCCP",
        role: "Head of Interventional Pulmonology",
        subSpecialty: "Bronchoscopy & Critical Care",
        rating: 4.94,
        reviewsCount: 215,
        experience: "17+ Years",
        image: "/images/dr_rajesh.jpg",
        fee: "$180",
        nextSlot: "Today, 3:45 PM",
        hospitalAffiliation: "Mayo Clinic Fellowship"
      }
    ]
  },
  {
    id: "stomach",
    name: "Stomach & Digestive",
    specialty: "Gastroenterology",
    departmentCode: "GASTRO",
    coords3D: { x: 0.1, y: 0.75, z: 0.45 },
    mobilePosition: { top: "37%", left: "50%" },
    icon: "ShieldAlert",
    color: "#F59E0B",
    glowColor: "rgba(245, 158, 11, 0.6)",
    description: "Advanced endoscopic mucosal resection, microbiome mapping, inflammatory bowel management, and liver health.",
    availableDoctorsCount: 6,
    avgWaitTime: "14 mins",
    symptoms: [
      "stomach pain", "abdominal pain", "acid reflux", "heartburn", "bloating",
      "nausea", "vomiting", "indigestion", "constipation", "diarrhea", "cramping"
    ],
    commonConcerns: [
      "Painless HD Capsule Endoscopy",
      "GERD & Reflux Resolution",
      "Gut Microbiome Sequencing",
      "Fatty Liver & Metabolic Screen"
    ],
    doctors: [
      {
        id: "dr-kavita",
        name: "Dr. Kavita Narang, MD",
        role: "Director of Hepatology & Endoscopy",
        subSpecialty: "Gastrointestinal Oncology",
        rating: 4.97,
        reviewsCount: 380,
        experience: "21+ Years",
        image: "/images/dr_sarah.jpg",
        fee: "$185",
        nextSlot: "Tomorrow, 2:00 PM",
        hospitalAffiliation: "King's College Hospital"
      }
    ]
  },
  {
    id: "kidneys",
    name: "Kidneys & Urinary",
    specialty: "Nephrology & Urology",
    departmentCode: "NEPHRO",
    coords3D: { x: -0.3, y: 0.4, z: -0.2 },
    mobilePosition: { top: "43%", left: "45%" },
    icon: "Activity",
    color: "#10B981",
    glowColor: "rgba(16, 185, 129, 0.6)",
    description: "Kidney preservation therapies, precision stone clearance, electrolyte stabilization, and chronic kidney disease management.",
    availableDoctorsCount: 4,
    avgWaitTime: "15 mins",
    symptoms: [
      "lower back pain", "flank pain", "kidney stones", "painful urination",
      "blood in urine", "frequent urination", "fluid retention", "foamy urine", "swollen feet"
    ],
    commonConcerns: [
      "Lithotripsy Stone Clearance",
      "Renal Function & Filtration Profiling",
      "Hypertensive Kidney Care",
      "Electrolyte Imbalance Diagnostics"
    ],
    doctors: [
      {
        id: "dr-david-kidney",
        name: "Dr. David Liang, MD",
        role: "Senior Consultant Nephrologist",
        subSpecialty: "Preventative Renal Medicine",
        rating: 4.93,
        reviewsCount: 190,
        experience: "16+ Years",
        image: "/images/dr_marcus.jpg",
        fee: "$175",
        nextSlot: "Today, 5:15 PM",
        hospitalAffiliation: "UCSF Medical Center"
      }
    ]
  },
  {
    id: "bones",
    name: "Bones & Joints",
    specialty: "Orthopedics & Sports Medicine",
    departmentCode: "ORTHO",
    coords3D: { x: -0.9, y: -0.3, z: 0.2 },
    mobilePosition: { top: "54%", left: "38%" },
    icon: "Layers",
    color: "#3B82F6",
    glowColor: "rgba(59, 130, 246, 0.6)",
    description: "Robotic joint reconstruction, regenerative cartilage therapies, sports injury repair, and complex spinal alignment.",
    availableDoctorsCount: 7,
    avgWaitTime: "10 mins",
    symptoms: [
      "knee pain", "joint pain", "back pain", "shoulder pain", "fracture",
      "arthritis", "sprain", "stiff joints", "hip pain", "swollen joint", "sports injury"
    ],
    commonConcerns: [
      "Robotic Mako Total Knee/Hip Replacement",
      "Regenerative Stem & PRP Joint Injections",
      "Minimally Invasive Spine Decompression",
      "ACL & Rotator Cuff Repair"
    ],
    doctors: [
      {
        id: "dr-nathan-ortho",
        name: "Dr. Nathan Cross, MD, FAAOS",
        role: "Chief of Orthopedic Surgery",
        subSpecialty: "Robotic Joint Reconstruction",
        rating: 4.99,
        reviewsCount: 460,
        experience: "22+ Years",
        image: "/images/dr_rajesh.jpg",
        fee: "$210",
        nextSlot: "Tomorrow, 10:45 AM",
        hospitalAffiliation: "Hospital for Special Surgery (HSS)"
      }
    ]
  },
  {
    id: "skin",
    name: "Skin & Dermatology",
    specialty: "Dermatology",
    departmentCode: "DERM",
    coords3D: { x: 0.75, y: 0.2, z: 0.35 },
    mobilePosition: { top: "35%", left: "68%" },
    icon: "Sparkles",
    color: "#EC4899",
    glowColor: "rgba(236, 72, 153, 0.6)",
    description: "Dermatoscopic mole mapping, biological therapies for psoriasis and eczema, Mohs micro-surgery, and clinical skin rejuvenation.",
    availableDoctorsCount: 5,
    avgWaitTime: "15 mins",
    symptoms: [
      "skin rash", "itching", "eczema", "acne", "mole change",
      "psoriasis", "hives", "dry patches", "skin infection", "hair loss"
    ],
    commonConcerns: [
      "AI Dermoscopic Mole Body Mapping",
      "Biologic Psoriasis Protocols",
      "Severe Acne & Scar Therapeutics",
      "Autoimmune Skin Disorders"
    ],
    doctors: [
      {
        id: "dr-elizabeth-derm",
        name: "Dr. Elizabeth Croft, MD",
        role: "Director of Clinical Dermatology",
        subSpecialty: "Immunodermatology & Phototherapy",
        rating: 4.95,
        reviewsCount: 340,
        experience: "15+ Years",
        image: "/images/dr_sarah.jpg",
        fee: "$165",
        nextSlot: "Today, 3:00 PM",
        hospitalAffiliation: "Yale School of Medicine"
      }
    ]
  },
  {
    id: "teeth",
    name: "Teeth & Oral Health",
    specialty: "Dentistry & Maxillofacial",
    departmentCode: "DENT",
    coords3D: { x: 0, y: 2.55, z: 0.5 },
    mobilePosition: { top: "18%", left: "50%" },
    icon: "Smile",
    color: "#14B8A6",
    glowColor: "rgba(20, 184, 166, 0.6)",
    description: "3D-guided dental implants, aesthetic veneers, laser periodontal care, and pain-free endodontic therapy.",
    availableDoctorsCount: 4,
    avgWaitTime: "8 mins",
    symptoms: [
      "toothache", "bleeding gums", "jaw pain", "sensitive teeth", "cavity",
      "broken tooth", "bad breath", "gum swelling", "wisdom tooth", "teeth grinding"
    ],
    commonConcerns: [
      "3D Digital Guided Dental Implants",
      "Laser Periodontal Gum Treatment",
      "Microscopic Root Canal Therapy",
      "TMJ & Jaw Pain Diagnostics"
    ],
    doctors: [
      {
        id: "dr-dent-raj",
        name: "Dr. Ronald Evans, DDS, MS",
        role: "Head of Oral & Maxillofacial Care",
        subSpecialty: "Implantology & Reconstructive Dentistry",
        rating: 4.96,
        reviewsCount: 290,
        experience: "18+ Years",
        image: "/images/dr_marcus.jpg",
        fee: "$150",
        nextSlot: "Tomorrow, 1:30 PM",
        hospitalAffiliation: "University of Zurich Fellowship"
      }
    ]
  },
  {
    id: "women",
    name: "Women's Health",
    specialty: "Gynecology & Obstetrics",
    departmentCode: "GYNEC",
    coords3D: { x: 0, y: -0.2, z: 0.3 },
    mobilePosition: { top: "47%", left: "50%" },
    icon: "HeartPulse",
    color: "#A855F7",
    glowColor: "rgba(168, 85, 247, 0.6)",
    description: "Comprehensive gynecological diagnostics, prenatal wellness, hormone balance programs, and minimally invasive robotic surgery.",
    availableDoctorsCount: 6,
    avgWaitTime: "12 mins",
    symptoms: [
      "pelvic pain", "menstrual cramps", "irregular periods", "pregnancy care",
      "hormonal imbalance", "hot flashes", "pcos", "fertility questions", "endometriosis"
    ],
    commonConcerns: [
      "Comprehensive Annual Gynecological Exam",
      "Prenatal 4D Ultrasound Care",
      "PCOS & Hormonal Optimization",
      "Minimally Invasive Endometriosis Therapy"
    ],
    doctors: [
      {
        id: "dr-sarah-gyn",
        name: "Dr. Sarah Jensen, MD, PhD",
        role: "Director of Women's Health & Genomics",
        subSpecialty: "Maternal-Fetal & Reproductive Endocrinology",
        rating: 5.0,
        reviewsCount: 420,
        experience: "17+ Years",
        image: "/images/dr_sarah.jpg",
        fee: "$195",
        nextSlot: "Today, 11:00 AM",
        hospitalAffiliation: "Columbia University MD, PhD"
      }
    ]
  },
  {
    id: "children",
    name: "Children's Health",
    specialty: "Pediatrics & Adolescent Care",
    departmentCode: "PEDIA",
    coords3D: { x: 0, y: -1.2, z: 0.3 },
    mobilePosition: { top: "58%", left: "50%" },
    icon: "Baby",
    color: "#38BDF8",
    glowColor: "rgba(56, 189, 248, 0.6)",
    description: "Nurturing pediatric care from newborn milestones to adolescent medicine, vaccination schedules, and pediatric genomics.",
    availableDoctorsCount: 5,
    avgWaitTime: "8 mins",
    symptoms: [
      "fever", "child cough", "vaccination", "growth concern", "ear pain in child",
      "infant rash", "colic", "asthma in children", "developmental delay", "pediatric checkup"
    ],
    commonConcerns: [
      "Well-Child Developmental Checkup",
      "Complete Pediatric Immunization Schedule",
      "Pediatric Allergy & Asthma Triage",
      "Newborn Nutrition & Sleep Consultation"
    ],
    doctors: [
      {
        id: "dr-maya-pedia",
        name: "Dr. Maya Lin, MD, FAAP",
        role: "Chief of Pediatric Medicine",
        subSpecialty: "Developmental & Adolescent Health",
        rating: 4.98,
        reviewsCount: 380,
        experience: "15+ Years",
        image: "/images/dr_elena.jpg",
        fee: "$160",
        nextSlot: "Tomorrow, 9:30 AM",
        hospitalAffiliation: "Boston Children's Hospital Alumni"
      }
    ]
  }
];

/**
 * Common popular symptom chips for fast one-click diagnosis
 */
export const POPULAR_SYMPTOM_CHIPS = [
  { label: "Chest Pain", regionId: "heart", symptom: "chest pain" },
  { label: "Migraine / Headache", regionId: "brain", symptom: "headache" },
  { label: "Knee & Joint Stiffness", regionId: "bones", symptom: "joint pain" },
  { label: "Blurry Vision", regionId: "eyes", symptom: "blurry vision" },
  { label: "Acid Reflux & Stomach Pain", regionId: "stomach", symptom: "stomach pain" },
  { label: "Chronic Cough", regionId: "lungs", symptom: "chronic cough" },
  { label: "Sore Throat & Sinus", regionId: "ent", symptom: "sinus pressure" },
  { label: "Lower Back / Kidney Pain", regionId: "kidneys", symptom: "lower back pain" },
  { label: "Skin Rash & Irritation", regionId: "skin", symptom: "skin rash" },
];

/**
 * Intelligent Symptom Matching Engine
 * Returns matching body regions sorted by clinical relevance
 */
export function matchSymptomToRegion(query) {
  if (!query || typeof query !== "string") return null;
  const clean = query.trim().toLowerCase();
  if (clean.length < 2) return null;

  // Direct match by body area name or specialty
  const directArea = ANATOMY_REGIONS.find(
    r => r.name.toLowerCase().includes(clean) ||
         r.specialty.toLowerCase().includes(clean) ||
         r.id === clean
  );
  if (directArea) {
    return {
      region: directArea,
      matchedSymptom: directArea.specialty,
      confidence: 1.0
    };
  }

  // Symptom keyword search
  for (const region of ANATOMY_REGIONS) {
    const matchedSymptom = region.symptoms.find(s => clean.includes(s) || s.includes(clean));
    if (matchedSymptom) {
      return {
        region,
        matchedSymptom,
        confidence: 0.95
      };
    }
  }

  // Fallback partial matching
  for (const region of ANATOMY_REGIONS) {
    const matchedConcern = region.commonConcerns.find(c => c.toLowerCase().includes(clean));
    if (matchedConcern) {
      return {
        region,
        matchedSymptom: matchedConcern,
        confidence: 0.85
      };
    }
  }

  return null;
}
