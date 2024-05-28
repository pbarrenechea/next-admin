import { CircleX } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

const ErrorTooltip = ({ message }: { message: string }) => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="outline" className="h-6 w-6 border-0 p-0 ml-1">
          <CircleX className="text-red-500" />
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <span className="text-xs text-red-500">{message}</span>
      </TooltipContent>
    </Tooltip>
  );
};

export default ErrorTooltip;
