import { AppData } from '@/types';

export const STRATEGIES = [
  '01. Managerial Leverage',
  '02. Clear Objectives & Key Results (OKRs)',
  '03. Optimize Processes',
  '04. Effective Meetings',
  '05. Training & Development',
  '06. Feedback Mechanisms',
  '07. Task-Relevant Maturity',
  '08. Cultural Alignment',
  '09. Use of Technology',
  '10. Self-Assessment & Reflection'
];

function dateX(deltaDays: number): string {
  const d = new Date();
  d.setDate(d.getDate() + deltaDays);
  return d.toISOString().slice(0, 10);
}

export const DEFAULT_DATA: AppData = {
  cycle: 'Q4-2025',
  tasks: [
    {
      id: 'T-01',
      strategy: STRATEGIES[0],
      task: 'Audit aktivitas 2 minggu: identifikasi 20% pekerjaan high-impact & eliminasi/otomasi 10% low-value.',
      owner: 'Head Ops',
      start: dateX(0),
      due: dateX(14),
      status: 'In Progress',
      progress: 40,
      kpi: '% waktu high-impact',
      target: '≥ 70%',
      notes: ''
    },
    {
      id: 'T-02',
      strategy: STRATEGIES[1],
      task: 'Tetapkan 3 Objective & 8-10 KR terukur; publikasikan di dashboard tim.',
      owner: 'PMO',
      start: dateX(0),
      due: dateX(10),
      status: 'In Progress',
      progress: 30,
      kpi: 'KR terdefinisi lengkap',
      target: '≥ 90%',
      notes: ''
    },
    {
      id: 'T-03',
      strategy: STRATEGIES[2],
      task: 'Pemetaan value stream + hilangkan 3 waste utama; set WIP limit.',
      owner: 'Ops Excellence',
      start: dateX(5),
      due: dateX(25),
      status: 'Not Started',
      progress: 0,
      kpi: 'Lead time (hari)',
      target: '≤ 5',
      notes: ''
    },
    {
      id: 'T-04',
      strategy: STRATEGIES[3],
      task: 'Standard meeting: agenda jelas, notulen & aksi ter-assign; batasi durasi 25/50 menit.',
      owner: 'All Managers',
      start: dateX(3),
      due: dateX(18),
      status: 'In Progress',
      progress: 50,
      kpi: '% meeting on-time',
      target: '≥ 85%',
      notes: ''
    },
    {
      id: 'T-05',
      strategy: STRATEGIES[4],
      task: 'Rancang kurikulum microlearning mingguan (60 menit) + mentoring.',
      owner: 'People Dev',
      start: dateX(7),
      due: dateX(30),
      status: 'Not Started',
      progress: 0,
      kpi: 'Jam pelatihan/pegawai',
      target: '≥ 2/jam bln',
      notes: ''
    },
    {
      id: 'T-06',
      strategy: STRATEGIES[5],
      task: 'Implementasi weekly 1:1 dan feedback 360° triwulanan.',
      owner: 'People Manager',
      start: dateX(2),
      due: dateX(20),
      status: 'In Progress',
      progress: 35,
      kpi: 'Frekuensi 1:1',
      target: '≥ 90% terselenggara',
      notes: ''
    },
    {
      id: 'T-07',
      strategy: STRATEGIES[6],
      task: 'Segmentasi TRM: tentukan tingkat bimbingan per individu; rencana coaching 8 minggu.',
      owner: 'Leads',
      start: dateX(1),
      due: dateX(21),
      status: 'Not Started',
      progress: 0,
      kpi: 'Autonomy score',
      target: '↑ 20%',
      notes: ''
    },
    {
      id: 'T-08',
      strategy: STRATEGIES[7],
      task: 'Deklarasi nilai & prinsip operasional; integrasi ke SOP dan penilaian.',
      owner: 'Culture Council',
      start: dateX(6),
      due: dateX(28),
      status: 'Not Started',
      progress: 0,
      kpi: '% karyawan paham nilai',
      target: '≥ 95%',
      notes: ''
    },
    {
      id: 'T-09',
      strategy: STRATEGIES[8],
      task: 'Pilih & implement 2 alat otomasi (mis: template OKR, bot notulen).',
      owner: 'Automation Team',
      start: dateX(4),
      due: dateX(24),
      status: 'In Progress',
      progress: 20,
      kpi: 'Jam hemat/bulan',
      target: '≥ 80 jam',
      notes: ''
    },
    {
      id: 'T-10',
      strategy: STRATEGIES[9],
      task: 'Ritual refleksi bulanan: review metrik, pelajaran, & perbaikan.',
      owner: 'All Hands',
      start: dateX(12),
      due: dateX(40),
      status: 'Not Started',
      progress: 0,
      kpi: 'Aksi perbaikan ditutup',
      target: '≥ 80%',
      notes: ''
    }
  ],
  okrs: [
    {
      id: 'O-1',
      objective: 'Meningkatkan output tim 30% dalam 90 hari',
      owner: 'Head Ops',
      cycle: 'Q4-2025',
      keyResults: [
        { kr: 'Throughput fitur selesai/bulan', baseline: 12, target: 16, current: 13 },
        { kr: 'Rata-rata WIP', baseline: 14, target: 8, current: 11 },
        { kr: 'Skor kepuasan karyawan', baseline: 4.2, target: 4.5, current: 4.3 }
      ]
    }
  ]
};