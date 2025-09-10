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
    <>
      {/* Mobile Card View */}
      <div className="block lg:hidden space-y-4">
        {tasks.map((task) => (
          <div key={task.id} className="bg-card border border-border rounded-lg p-4 space-y-3">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="font-medium text-sm text-primary mb-1">{task.strategy}</div>
                <h3 className="font-semibold text-base">{task.task}</h3>
              </div>
              {getStatusBadge(task.status)}
            </div>
            
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <span className="text-muted-foreground">Owner:</span>
                <div className="font-medium">{task.owner || '-'}</div>
              </div>
              <div>
                <span className="text-muted-foreground">Jadwal:</span>
                <div className="font-medium">{formatSchedule(task.start, task.due)}</div>
              </div>
            </div>
            
            {(task.kpi || task.target) && (
              <div>
                <span className="text-muted-foreground text-sm">KPI & Target:</span>
                <div className="font-medium text-sm">{task.kpi || '-'}</div>
                {task.target && <div className="text-xs text-muted-foreground">{task.target}</div>}
              </div>
            )}
            
            <div>
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="text-muted-foreground">Progress:</span>
                <span className="font-medium">{Math.max(0, Math.min(100, task.progress))}%</span>
              </div>
              <div className="progress-container">
                <div 
                  className="progress-bar" 
                  style={{ width: `${Math.max(0, Math.min(100, task.progress))}%` }} 
                />
              </div>
            </div>
            
            {task.notes && (
              <div>
                <span className="text-muted-foreground text-sm">Catatan:</span>
                <p className="text-sm mt-1">{task.notes}</p>
              </div>
            )}
            
            <div className="flex gap-2 pt-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onEditTask(task)}
                className="flex-1"
              >
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => onDeleteTask(task.id)}
                className="flex-1"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Hapus
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop Table View */}
      <div className="hidden lg:block overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="min-w-[140px]">Strategi</TableHead>
              <TableHead className="min-w-[300px]">Tugas/Aksi</TableHead>
              <TableHead className="min-w-[120px]">Owner</TableHead>
              <TableHead className="min-w-[140px]">KPI & Target</TableHead>
              <TableHead className="min-w-[130px]">Jadwal</TableHead>
              <TableHead className="min-w-[120px]">Status</TableHead>
              <TableHead className="min-w-[150px]">Progress</TableHead>
              <TableHead>Catatan</TableHead>
              <TableHead className="min-w-[100px]">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tasks.map((task) => (
              <TableRow key={task.id} className="hover:bg-muted/50">
                <TableCell className="font-medium text-sm">
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
                  <div className="flex gap-1">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onEditTask(task)}
                      className="h-8 w-8 p-0"
                    >
                      <Edit className="h-3 w-3" />
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => onDeleteTask(task.id)}
                      className="h-8 w-8 p-0"
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
};

export default TaskTable;