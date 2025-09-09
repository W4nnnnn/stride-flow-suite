import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Metrics } from '@/types';

interface MetricCardsProps {
  metrics: Metrics;
}

const MetricCards: React.FC<MetricCardsProps> = ({ metrics }) => {
  const cards = [
    {
      title: 'Progress rata-rata',
      value: `${metrics.avgProgress}%`,
      extra: (
        <div className="progress-container mt-2">
          <div className="progress-bar" style={{ width: `${metrics.avgProgress}%` }} />
        </div>
      )
    },
    {
      title: 'Total tugas',
      value: metrics.total,
      extra: (
        <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
          <div className="w-2 h-2 bg-accent-success rounded-full" />
          Done {metrics.done}
        </div>
      )
    },
    {
      title: 'Sedang berlangsung',
      value: metrics.inProgress,
      extra: <div className="text-xs text-muted-foreground mt-1">• Fokus eksekusi</div>
    },
    {
      title: 'Overdue',
      value: metrics.overdue,
      extra: (
        <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
          <div className="w-2 h-2 bg-destructive rounded-full" />
          Butuh perhatian
        </div>
      )
    },
    {
      title: 'Blocked',
      value: metrics.blocked,
      extra: <div className="text-xs text-muted-foreground mt-1">Hilangkan hambatan</div>
    },
    {
      title: 'Due ≤ 7 hari',
      value: metrics.next7,
      extra: (
        <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
          <div className="w-2 h-2 bg-accent-amber rounded-full" />
          Siapkan resource
        </div>
      )
    }
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-6 gap-3 mt-4">
      {cards.map((card, index) => (
        <Card key={index} className="metric-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs uppercase tracking-wider text-muted-foreground">
              {card.title}
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="text-xl lg:text-2xl font-bold">{card.value}</div>
            {card.extra}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default MetricCards;