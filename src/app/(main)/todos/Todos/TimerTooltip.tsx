import { Timer } from 'lucide-react';

import { TodoStatusType } from '@/app/(main)/types';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { formatTodoDate } from '@/lib/date';

type MessagesValues = 'done' | 'onTime' | 'delayed';

const messages = {
  done: { label: 'Finished', class: 'text-green-600' },
  onTime: { label: 'On time', class: 'text-amber-400' },
  delayed: { label: 'Delayed', class: 'text-red-600' },
};

const ErrorTooltip = ({ status, dueDate }: { status: TodoStatusType; dueDate: string }) => {
  const currentDate = new Date();
  let dateStatus: MessagesValues = 'onTime';
  if (status === TodoStatusType.Done) {
    dateStatus = 'done';
  } else {
    if (new Date(dueDate) <= currentDate) {
      dateStatus = 'delayed';
    }
  }
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div className="flex items-center gap-x-2">
          <Timer className={`w-6 h-6 ${messages[dateStatus].class}`} />
          <span className={`flex-1 text-sm text-slate-600 dark:text-slate-300 truncate`}>
            {formatTodoDate(dueDate)}
          </span>
        </div>
      </TooltipTrigger>
      <TooltipContent className=" text-foreground bg-primary-foreground">
        <span className="text-xs ">{messages[dateStatus].label}</span>
      </TooltipContent>
    </Tooltip>
  );
};

export default ErrorTooltip;
