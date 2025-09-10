import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Edit, Trash2 } from 'lucide-react';
import { Task } from '@/types';

interface TaskTableProps {
  tasks: Task[];
  onEditTask: (task: Task) => void;
  onDeleteTask: (id: string) => void;
}

const TaskTable: React.FC<TaskTableProps> = ({ tasks, onEditTask, onDeleteTask }) => {
  const getStatusBadge = (status: string) => {
    const variants = {
      'Not Started': 'status-not-started',
      'In Progress': 'status-in-progress',
      'Done': 'status-done',
      'Blocked': 'status-blocked'
    };
    
    return (
      <Badge className={`${variants[status as keyof typeof variants]} text-xs px-2 py-1`}>
        {status}
      </Badge>
    );
  };

  const formatSchedule = (start: string, due: string) => {
    return `${start || '-'} → ${due || '-'}`;
  };

  return (
    <div className="overflow-x-auto -mx-4 sm:mx-0">
      <div className="min-w-[800px] px-4 sm:px-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="min-w-[140px] text-xs sm:text-sm">Strategi</TableHead>
              <TableHead className="min-w-[300px] text-xs sm:text-sm">Tugas/Aksi</TableHead>
              <TableHead className="min-w-[120px] text-xs sm:text-sm">Owner</TableHead>
              <TableHead className="min-w-[140px] text-xs sm:text-sm">KPI & Target</TableHead>
              <TableHead className="min-w-[130px] text-xs sm:text-sm">Jadwal</TableHead>
              <TableHead className="min-w-[120px] text-xs sm:text-sm">Status</TableHead>
              <TableHead className="min-w-[150px] text-xs sm:text-sm">Progress</TableHead>
              <TableHead className="text-xs sm:text-sm">Catatan</TableHead>
              <TableHead className="min-w-[100px] text-xs sm:text-sm">Aksi</TableHead>
            </TableRow>
          </TableHeader>
        <TableBody>
          {tasks.map((task) => (
            <TableRow key={task.id} className="hover:bg-muted/50">
              <TableCell className="font-medium text-xs">
                {task.strategy}
              </TableCell>
              <TableCell className="text-sm">
                {task.task}
              </TableCell>
              <TableCell className="text-sm">
                {task.owner || '-'}
              </TableCell>
              <TableCell>
                <div>
                  <div className="font-medium text-sm">{task.kpi || '-'}</div>
                  <div className="text-xs text-muted-foreground">{task.target || ''}</div>
                </div>
              </TableCell>
              <TableCell className="text-sm">
                {formatSchedule(task.start, task.due)}
              </TableCell>
              <TableCell>
                {getStatusBadge(task.status)}
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <div className="progress-container flex-1">
                    <div 
                      className="progress-bar" 
                      style={{ width: `${Math.max(0, Math.min(100, task.progress))}%` }} 
                    />
                  </div>
                  <span className="text-xs font-medium w-10 text-right">
                    {Math.max(0, Math.min(100, task.progress))}%
                  </span>
                </div>
              </TableCell>
              <TableCell className="text-sm text-muted-foreground">
                {task.notes || '-'}
              </TableCell>
              <TableCell>
                <div className="flex flex-col sm:flex-row gap-1">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onEditTask(task)}
                    className="h-8 w-full sm:w-8 p-0 text-xs"
                  >
                    <Edit className="h-3 w-3 sm:mr-0 mr-1" />
                    <span className="sm:hidden">Edit</span>
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => onDeleteTask(task.id)}
                    className="h-8 w-full sm:w-8 p-0 text-xs"
                  >
                    <Trash2 className="h-3 w-3 sm:mr-0 mr-1" />
                    <span className="sm:hidden">Hapus</span>
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default TaskTable;