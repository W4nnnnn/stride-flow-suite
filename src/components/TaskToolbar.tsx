import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Plus, Download, Upload, RotateCcw } from 'lucide-react';
import { STRATEGIES } from '@/data/defaultData';

interface Filters {
  search: string;
  strategy: string;
  owner: string;
  status: string;
  dueFrom: string;
  dueTo: string;
}

interface TaskToolbarProps {
  filters: Filters;
  onFiltersChange: (filters: Partial<Filters>) => void;
  owners: string[];
  onAddTask: () => void;
  onExportCsv: () => void;
  onImportJson: (file: File) => void;
  onReset: () => void;
  activeFilterInfo: string;
}

const TaskToolbar: React.FC<TaskToolbarProps> = ({
  filters,
  onFiltersChange,
  owners,
  onAddTask,
  onExportCsv,
  onImportJson,
  onReset,
  activeFilterInfo
}) => {
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onImportJson(file);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const statuses = ['Not Started', 'In Progress', 'Blocked', 'Done'];

  return (
    <div className="space-y-4 p-4 border-b border-border/60">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-3">
        <Input
          placeholder="Cari tugas/owner/KPI..."
          value={filters.search}
          onChange={(e) => onFiltersChange({ search: e.target.value })}
          className="lg:col-span-2"
        />
        
        <Select value={filters.strategy || "all"} onValueChange={(value) => onFiltersChange({ strategy: value === "all" ? "" : value })}>
          <SelectTrigger>
            <SelectValue placeholder="Semua strategi" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Semua strategi</SelectItem>
            {STRATEGIES.map(strategy => (
              <SelectItem key={strategy} value={strategy}>
                {strategy}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        
        <Select value={filters.owner || "all"} onValueChange={(value) => onFiltersChange({ owner: value === "all" ? "" : value })}>
          <SelectTrigger>
            <SelectValue placeholder="Semua owner" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Semua owner</SelectItem>
            {owners.map(owner => (
              <SelectItem key={owner} value={owner}>
                {owner}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        
        <Select value={filters.status || "all"} onValueChange={(value) => onFiltersChange({ status: value === "all" ? "" : value })}>
          <SelectTrigger>
            <SelectValue placeholder="Semua status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Semua status</SelectItem>
            {statuses.map(status => (
              <SelectItem key={status} value={status}>
                {status}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        
        <div className="flex gap-2">
          <Input
            type="date"
            value={filters.dueFrom}
            onChange={(e) => onFiltersChange({ dueFrom: e.target.value })}
            title="Jatuh tempo dari"
            className="w-full"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3">
        <Input
          type="date"
          value={filters.dueTo}
          onChange={(e) => onFiltersChange({ dueTo: e.target.value })}
          title="Jatuh tempo sampai"
        />
        
        <Button onClick={onAddTask} className="bg-gradient-to-r from-primary to-accent-mint">
          <Plus className="h-4 w-4 mr-2" />
          Tambah Tugas
        </Button>
        
        <Button variant="outline" onClick={onExportCsv}>
          <Download className="h-4 w-4 mr-2" />
          Export CSV
        </Button>
        
        <Button variant="outline" onClick={() => fileInputRef.current?.click()}>
          <Upload className="h-4 w-4 mr-2" />
          Import JSON
        </Button>
        
        <Button variant="destructive" onClick={onReset}>
          <RotateCcw className="h-4 w-4 mr-2" />
          Reset
        </Button>
        
        <div className="flex items-center">
          <Badge variant="outline" className="text-xs">
            {activeFilterInfo}
          </Badge>
        </div>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept=".json"
        className="hidden"
        onChange={handleFileUpload}
      />
    </div>
  );
};

export default TaskToolbar;