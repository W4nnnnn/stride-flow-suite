import React, { useState, useEffect, useMemo } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import Header from '@/components/Header';
import PillarSection from '@/components/PillarSection';
import TaskToolbar from '@/components/TaskToolbar';
import TaskTable from '@/components/TaskTable';
import TaskModal from '@/components/TaskModal';
import { Task, AppData, Metrics } from '@/types';
import { DEFAULT_DATA } from '@/data/defaultData';

const STORE_KEY = 'epmData_v1';

const ProductivityDashboard: React.FC = () => {
  const [data, setData] = useState<AppData>(DEFAULT_DATA);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [startMonth, setStartMonth] = useState(() => new Date().toISOString().slice(0, 7));
  const [activeTab, setActiveTab] = useState('table');
  const { toast } = useToast();

  const [filters, setFilters] = useState({
    search: '',
    strategy: '',
    owner: '',
    status: '',
    dueFrom: '',
    dueTo: ''
  });

  // Load data from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setData(parsed);
      } catch (error) {
        console.error('Failed to parse saved data:', error);
      }
    }
  }, []);

  // Save data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(STORE_KEY, JSON.stringify(data));
  }, [data]);

  const filteredTasks = useMemo(() => {
    let tasks = [...data.tasks];

    if (filters.search) {
      const search = filters.search.toLowerCase();
      tasks = tasks.filter(task =>
        task.task.toLowerCase().includes(search) ||
        task.owner.toLowerCase().includes(search) ||
        task.kpi.toLowerCase().includes(search) ||
        task.strategy.toLowerCase().includes(search) ||
        task.notes.toLowerCase().includes(search)
      );
    }

    if (filters.strategy) {
      tasks = tasks.filter(task => task.strategy === filters.strategy);
    }

    if (filters.owner) {
      tasks = tasks.filter(task => task.owner === filters.owner);
    }

    if (filters.status) {
      tasks = tasks.filter(task => task.status === filters.status);
    }

    if (filters.dueFrom) {
      tasks = tasks.filter(task => !task.due || task.due >= filters.dueFrom);
    }

    if (filters.dueTo) {
      tasks = tasks.filter(task => !task.due || task.due <= filters.dueTo);
    }

    return tasks;
  }, [data.tasks, filters]);

  const metrics = useMemo((): Metrics => {
    const tasks = filteredTasks;
    const total = tasks.length || 0;
    const done = tasks.filter(t => t.status === 'Done').length;
    const inProgress = tasks.filter(t => t.status === 'In Progress').length;
    const blocked = tasks.filter(t => t.status === 'Blocked').length;
    const notStarted = tasks.filter(t => t.status === 'Not Started').length;
    const avgProgress = Math.round(tasks.reduce((a, b) => a + (b.progress || 0), 0) / (total || 1));
    
    const today = new Date().toISOString().slice(0, 10);
    const overdue = tasks.filter(t => t.due && t.due < today && t.status !== 'Done').length;
    
    const next7Days = new Date();
    next7Days.setDate(next7Days.getDate() + 7);
    const next7 = tasks.filter(t => 
      t.due && 
      t.due >= today && 
      t.due <= next7Days.toISOString().slice(0, 10)
    ).length;

    return { total, done, inProgress, blocked, notStarted, avgProgress, overdue, next7 };
  }, [filteredTasks]);

  const owners = useMemo(() => {
    return [...new Set(data.tasks.map(t => t.owner))].filter(Boolean).sort();
  }, [data.tasks]);

  const activeFilterInfo = useMemo(() => {
    const parts = [];
    if (filters.search) parts.push(`Cari: "${filters.search}"`);
    if (filters.strategy) parts.push(filters.strategy);
    if (filters.owner) parts.push(`Owner: ${filters.owner}`);
    if (filters.status) parts.push(`Status: ${filters.status}`);
    if (filters.dueFrom || filters.dueTo) {
      parts.push(`Due ${filters.dueFrom || '...'}→${filters.dueTo || '...'}`);
    }
    return parts.length ? parts.join(' · ') : 'Semua tugas';
  }, [filters]);

  const handleFiltersChange = (newFilters: Partial<typeof filters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const handleAddTask = () => {
    setEditingTask(null);
    setIsTaskModalOpen(true);
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setIsTaskModalOpen(true);
  };

  const handleSaveTask = (taskData: Omit<Task, 'id'> & { id?: string }) => {
    if (taskData.id) {
      // Edit existing task
      setData(prev => ({
        ...prev,
        tasks: prev.tasks.map(t => t.id === taskData.id ? { ...taskData, id: taskData.id } : t)
      }));
      toast({
        title: "Tugas diperbarui",
        description: "Perubahan telah disimpan.",
      });
    } else {
      // Add new task
      const newTask: Task = {
        ...taskData,
        id: 'T-' + Math.random().toString(36).slice(2, 6).toUpperCase()
      };
      setData(prev => ({
        ...prev,
        tasks: [...prev.tasks, newTask]
      }));
      toast({
        title: "Tugas ditambahkan",
        description: "Tugas baru telah dibuat.",
      });
    }
  };

  const handleDeleteTask = (id: string) => {
    if (confirm('Hapus tugas ini?')) {
      setData(prev => ({
        ...prev,
        tasks: prev.tasks.filter(t => t.id !== id)
      }));
      toast({
        title: "Tugas dihapus",
        description: "Tugas telah dihapus dari sistem.",
      });
    }
  };

  const handleExportCsv = () => {
    const headers = ['ID', 'Strategi', 'Tugas', 'Owner', 'Mulai', 'Due', 'Status', 'Progress', 'KPI', 'Target', 'Catatan'];
    const rows = data.tasks.map(t => [
      t.id, t.strategy, t.task, t.owner, t.start, t.due, t.status, t.progress, t.kpi, t.target, (t.notes || '').replace(/\n/g, ' ')
    ]);
    
    const csv = [headers, ...rows].map(row => 
      row.map(cell => `"${String(cell || '').replace(/"/g, '""')}"`).join(',')
    ).join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'epm_tasks.csv';
    a.click();
    URL.revokeObjectURL(url);

    toast({
      title: "Export berhasil",
      description: "File CSV telah diunduh.",
    });
  };

  const handleImportJson = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const imported = JSON.parse(reader.result as string);
        if (imported.tasks) {
          setData(imported);
          toast({
            title: "Import berhasil",
            description: "Data telah diimport.",
          });
        } else {
          toast({
            variant: "destructive",
            title: "Import gagal",
            description: "Format file tidak dikenali.",
          });
        }
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Import gagal",
          description: "Gagal membaca file JSON.",
        });
      }
    };
    reader.readAsText(file);
  };

  const handleReset = () => {
    if (confirm('Reset data ke template awal? Semua perubahan lokal akan hilang.')) {
      setData(JSON.parse(JSON.stringify(DEFAULT_DATA)));
      toast({
        title: "Data direset",
        description: "Data telah dikembalikan ke template awal.",
      });
    }
  };

  const handleCycleChange = (cycle: string) => {
    setData(prev => ({ ...prev, cycle }));
  };

  return (
    <div className="min-h-screen bg-background">
      <Header
        data={data}
        metrics={metrics}
        onCycleChange={handleCycleChange}
        onStartMonthChange={setStartMonth}
        startMonth={startMonth}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        <PillarSection />

        <Card className="panel-glass">
          <TaskToolbar
            filters={filters}
            onFiltersChange={handleFiltersChange}
            owners={owners}
            onAddTask={handleAddTask}
            onExportCsv={handleExportCsv}
            onImportJson={handleImportJson}
            onReset={handleReset}
            activeFilterInfo={activeFilterInfo}
          />

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4 mx-4 mt-4">
              <TabsTrigger value="table">Tabel</TabsTrigger>
              <TabsTrigger value="kanban">Kanban</TabsTrigger>
              <TabsTrigger value="timeline">Timeline</TabsTrigger>
              <TabsTrigger value="okr">OKR</TabsTrigger>
            </TabsList>

            <TabsContent value="table" className="p-4">
              <TaskTable
                tasks={filteredTasks}
                onEditTask={handleEditTask}
                onDeleteTask={handleDeleteTask}
              />
            </TabsContent>

            <TabsContent value="kanban" className="p-4">
              <div className="text-center py-8 text-muted-foreground">
                Kanban view akan segera hadir
              </div>
            </TabsContent>

            <TabsContent value="timeline" className="p-4">
              <div className="text-center py-8 text-muted-foreground">
                Timeline view akan segera hadir
              </div>
            </TabsContent>

            <TabsContent value="okr" className="p-4">
              <div className="text-center py-8 text-muted-foreground">
                OKR view akan segera hadir
              </div>
            </TabsContent>
          </Tabs>
        </Card>

        <footer className="mt-8 text-center text-muted-foreground text-sm">
          <p>
            Data disimpan di <strong>LocalStorage</strong> browser Anda. Gunakan Export untuk backup / kirim ke tim.
          </p>
        </footer>
      </main>

      <TaskModal
        isOpen={isTaskModalOpen}
        onClose={() => setIsTaskModalOpen(false)}
        onSave={handleSaveTask}
        task={editingTask}
      />
    </div>
  );
};

export default ProductivityDashboard;