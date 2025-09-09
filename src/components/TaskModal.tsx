import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Task } from '@/types';
import { STRATEGIES } from '@/data/defaultData';

interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (task: Omit<Task, 'id'> & { id?: string }) => void;
  task?: Task | null;
}

const TaskModal: React.FC<TaskModalProps> = ({ isOpen, onClose, onSave, task }) => {
  const [formData, setFormData] = useState<Omit<Task, 'id'> & { id?: string }>({
    strategy: STRATEGIES[0],
    task: '',
    owner: '',
    start: '',
    due: '',
    status: 'Not Started',
    progress: 0,
    kpi: '',
    target: '',
    notes: ''
  });

  useEffect(() => {
    if (task) {
      setFormData(task);
    } else if (isOpen) {
      setFormData({
        strategy: STRATEGIES[0],
        task: '',
        owner: '',
        start: '',
        due: '',
        status: 'Not Started',
        progress: 0,
        kpi: '',
        target: '',
        notes: ''
      });
    }
  }, [task, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  const handleChange = (field: keyof typeof formData, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const statuses = ['Not Started', 'In Progress', 'Blocked', 'Done'];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{task ? 'Edit Tugas' : 'Tambah Tugas'}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="strategy">Strategi</Label>
              <Select value={formData.strategy} onValueChange={(value) => handleChange('strategy', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {STRATEGIES.map(strategy => (
                    <SelectItem key={strategy} value={strategy}>
                      {strategy}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="owner">Owner</Label>
              <Input
                id="owner"
                value={formData.owner}
                onChange={(e) => handleChange('owner', e.target.value)}
                placeholder="Nama"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="task">Tugas/Aksi</Label>
            <Textarea
              id="task"
              value={formData.task}
              onChange={(e) => handleChange('task', e.target.value)}
              placeholder="Deskripsikan aksi konkrit"
              rows={3}
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="start">Mulai</Label>
              <Input
                id="start"
                type="date"
                value={formData.start}
                onChange={(e) => handleChange('start', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="due">Jatuh Tempo</Label>
              <Input
                id="due"
                type="date"
                value={formData.due}
                onChange={(e) => handleChange('due', e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select value={formData.status} onValueChange={(value) => handleChange('status', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {statuses.map(status => (
                    <SelectItem key={status} value={status}>
                      {status}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="progress">Progress (%)</Label>
              <Input
                id="progress"
                type="number"
                min="0"
                max="100"
                value={formData.progress}
                onChange={(e) => handleChange('progress', parseInt(e.target.value) || 0)}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="kpi">KPI</Label>
              <Input
                id="kpi"
                value={formData.kpi}
                onChange={(e) => handleChange('kpi', e.target.value)}
                placeholder="contoh: Lead time (hari)"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="target">Target</Label>
              <Input
                id="target"
                value={formData.target}
                onChange={(e) => handleChange('target', e.target.value)}
                placeholder="contoh: ≤ 5"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Catatan</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => handleChange('notes', e.target.value)}
              rows={3}
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Tutup
            </Button>
            <Button type="submit" className="bg-gradient-to-r from-primary to-accent-mint">
              Simpan
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default TaskModal;