import { Button } from "@/components/ui/button";
import { Trash2, X } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function StickyHeader({ selectedCount, onClearSelection, onDelete }) {
    return (
        <div className='fixed top-0 left-0 right-0 bg-white/50 backdrop-blur-sm border-b z-50 transition-all transform'>
            <Alert className='rounded-none bg-transparent'>
                <div className='container mx-auto flex items-center justify-between py-2'>
                    <AlertDescription className='text-sm font-medium'>
                        {selectedCount} {selectedCount === 1 ? "campaign" : "campaigns"} selected
                    </AlertDescription>
                    <div className='flex gap-2'>
                        <Button
                            variant='outline'
                            size='sm'
                            onClick={onClearSelection}>
                            <X className='h-4 w-4 mr-1' />
                            Clear
                        </Button>
                        <Button
                            variant='destructive'
                            size='sm'
                            onClick={onDelete}>
                            <Trash2 className='h-4 w-4 mr-1' />
                            Delete
                        </Button>
                    </div>
                </div>
            </Alert>
        </div>
    );
}
