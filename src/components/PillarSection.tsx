import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const PillarSection: React.FC = () => {
  const pillars = [
    {
      title: 'Output-Oriented Approach',
      items: [
        'Tujuan jelas & terukur; fokus pada hasil, bukan aktivitas.',
        'Gunakan OKR untuk mengarahkan upaya tim dan menilai dampak.',
        'Prioritaskan leverage manajerial & hentikan pekerjaan low-value.'
      ]
    },
    {
      title: 'Organize & Manage Team Optimally',
      items: [
        'Struktur, ritme, dan metrik (KPI, dashboard, review berkala).',
        'Optimalkan proses: hilangkan pemborosan, percepat alur.',
        'Skema kontrol: SOP, WIP limit, cadensi meeting.'
      ]
    },
    {
      title: 'Help Individuals Reach Peak Performance',
      items: [
        'Pelatihan & coaching; umpan balik yang sering dan spesifik.',
        'Sesuaikan gaya kepemimpinan dgn task-relevant maturity.',
        'Budaya tujuan bersama, teknologi sebagai akselerator.'
      ]
    }
  ];

  return (
    <section className="mb-8">
      <h2 className="text-xl font-semibold mb-4">Pilar Program</h2>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {pillars.map((pillar, index) => (
          <Card key={index} className="panel-glass">
            <CardHeader>
              <CardTitle className="text-lg">{pillar.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-muted-foreground">
                {pillar.items.map((item, itemIndex) => (
                  <li key={itemIndex} className="text-sm leading-relaxed">
                    • {item}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default PillarSection;