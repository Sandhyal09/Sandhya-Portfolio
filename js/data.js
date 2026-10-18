/* =========================================================
   data.js — all of Sandhya's content. Edit words here.
   ========================================================= */

/* What the AI voice says when visitors tap "Hear my 30-sec intro" */
const SCRIPT = "Hi, I'm Sandhya! I'm a Senior Business Analyst at Barclays in New York. Over the last five years I've worked across insurance, pharmacy, healthcare and banking, and one thing has stayed the same: I make sure the data people rely on is actually right. I sit between business and technology teams, I ask a lot of questions, I write clear requirements, and I check the numbers with SQL before they reach a dashboard. Thanks for stopping by. Scroll down to see my work.";

/* Selected work: short case studies (from real roles, kept confidential) */
const CASES = [
  { industry: "Banking", org: "Barclays",
    title: "Catching reporting issues before they reach production",
    challenge: "Regulatory, Finance and Risk reports pull from many banking data sources. Once a report is out, a wrong number is expensive.",
    did: "I profile and reconcile the source data with SQL, document control gaps, and write UAT scenarios and acceptance criteria before every release.",
    outcome: "Discrepancies get raised before production deployment, so stakeholders receive reports they can rely on." },
  { industry: "Healthcare", org: "Yale New Haven Health",
    title: "Getting every service line to read KPIs the same way",
    challenge: "Teams were reading operational metrics like patient volume and throughput differently, so the same dashboard told different stories.",
    did: "I built data dictionaries and business glossaries in Confluence, and specified Power BI dashboards with drill-downs and Row-Level Security.",
    outcome: "One agreed definition per KPI across service lines, and secure dashboards that teams adopted for daily decisions." },
  { industry: "Pharmacy", org: "CVS Health",
    title: "Making nightly reports match the source, every night",
    challenge: "Claims and pharmacy performance reports had to agree with operational systems after every nightly batch run.",
    did: "I added control-total checks, reconciled operational data stores against the data warehouse, and analyzed exceptions on report refreshes.",
    outcome: "More accurate nightly reporting and batch outputs for pharmacy operations." }
];

/* Experience timeline (newest first) */
const JOBS = [
  { company: "Barclays", role: "Senior Business Analyst", place: "New York", dates: "Jul 2026 — Present", industry: "Banking",
    points: ["Lead requirements for regulatory, Finance, Risk and Operations reporting initiatives", "Write BRDs, FRDs, user stories and acceptance criteria for banking data and analytics", "Shape Power BI and Tableau dashboards with BI teams: KPIs, drill-downs and role-based access", "Build UAT strategies that confirm data accuracy before release"] },
  { company: "Yale New Haven Health", role: "Business Analyst", place: "West Haven, CT", dates: "Mar 2025 — Jun 2026", industry: "Healthcare",
    points: ["Led requirements for patient access, scheduling and capacity reporting through workshops and JAD sessions", "Profiled EHR data with SQL and documented data quality root causes", "Specified Power BI dashboards with KPI logic and Row-Level Security", "Coordinated UAT and business sign-off for reporting releases"] },
  { company: "CVS Health", role: "Business Analyst", place: "Woonsocket, RI", dates: "May 2024 — Aug 2024", industry: "Pharmacy",
    points: ["Defined KPIs for turnaround time, queue aging and claim rejection", "Wrote SQL for reconciliation between operational stores and the data warehouse", "Traced claims rule and formulary changes to downstream reporting impacts"] },
  { company: "Tata Consultancy Services", role: "Business / Data Analyst", place: "India", dates: "May 2020 — Nov 2023", industry: "Insurance",
    points: ["Business analysis for insurance policy, claims and regulatory reporting systems", "Defined logical data models with data architects for policy, claim and payment entities", "Validated ETL source-to-target mappings and supported UAT with QA teams"] }
];

/* How I work */
const STEPS = [
  { title: "Listen", text: "Interviews, workshops and JAD sessions with Finance, Risk, clinical and operations teams." },
  { title: "Specify", text: "BRDs, FRDs, user stories and acceptance criteria that developers and testers can build from." },
  { title: "Validate", text: "SQL profiling, reconciliation and control-total checks before anything goes live." },
  { title: "Sign off", text: "UAT scenarios, defect triage and business sign-off, then documentation that keeps teams aligned." }
];

/* Skills: names starting with * are highlighted */
const SKILLS = {
  "Data & SQL": ["*SQL", "*Reconciliation", "Data profiling", "Data quality", "Data modeling", "ETL concepts"],
  "Reporting": ["*Power BI", "*Tableau", "KPI design", "Executive dashboards", "Row-Level Security", "Regulatory reporting"],
  "Business analysis": ["*BRD / FRD", "*UAT", "User stories", "Acceptance criteria", "AS-IS / TO-BE", "Process mapping"],
  "Excel": ["*Advanced Excel", "Power Query", "Pivot tables", "XLOOKUP"],
  "Databases": ["PostgreSQL", "MySQL", "Amazon Redshift", "Google BigQuery"],
  "Tools & delivery": ["JIRA", "Confluence", "Visio", "SharePoint", "Agile / Scrum"]
};

/* Education */
const EDUCATION = [
  { degree: "M.S. Data Science", school: "University of New Haven, West Haven, CT", dates: "2024 — 2025" },
  { degree: "B.E. Computer Science & Engineering", school: "Guru Nanak Institute of Technology, Hyderabad", dates: "2017 — 2021" }
];

/* Contact */
const CONTACT = [
  { label: "Email", value: "lsandhya0910@gmail.com", copy: true },
  { label: "Phone", value: "+1 (203) 606-4745", copy: true },
  { label: "LinkedIn", value: "linkedin.com/in/sandhyal1", href: "https://www.linkedin.com/in/sandhyal1" }
];

/* Scrolling skill pills: [name, small line underneath] */
const SKILL_PILLS = [
  ["SQL", "Profiling · reconciliation"], ["Power BI", "Dashboards · Row-Level Security"], ["Tableau", "Executive reporting"],
  ["BRD & FRD", "Requirements that teams build from"], ["UAT", "Test scenarios · sign-off"], ["Data Quality", "Validation · control totals"],
  ["Advanced Excel", "Pivot tables · XLOOKUP"], ["Power Query", "Repeatable data prep"], ["AS-IS / TO-BE", "Process mapping"],
  ["Regulatory Reporting", "Banking · insurance"], ["PostgreSQL & MySQL", "SQL-based reporting"], ["Redshift & BigQuery", "Cloud data platforms"],
  ["JIRA & Confluence", "Agile delivery · documentation"], ["Data Modeling", "Logical models · data marts"]
];

/* ===== Recruiter settings (edit these) ===== */
/* Paste your links here to switch the features on:
   - CALENDLY_URL: e.g. "https://calendly.com/your-name/15min"  → shows "Book a 15-min chat" buttons
   - FORMSPREE_ID: the code after formspree.io/f/ (e.g. "xyzabcd") → contact form sends straight to your inbox */
const CALENDLY_URL = "https://calendly.com/lsandhya0910/30min";
const FORMSPREE_ID = "";
