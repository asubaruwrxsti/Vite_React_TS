import { createContext, useState, ReactNode, useEffect } from 'react';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { AlertContent, AlertOptions, AlertType, AlertContextType, getAlertStyles } from '@/lib/AlertContextUtils';
import { cn } from '@/lib/utils';
import { DEFAULT_TIMEOUT } from '@/lib/constants';

// Create the context with a defined type
export const AlertContext = createContext<AlertContextType | undefined>(undefined);

export const AlertProvider = ({ children }: { children: ReactNode }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [alertContent, setAlertContent] = useState<AlertContent>({
        title: '',
        description: '',
        type: AlertType.Info,
        className: '',
        timeout: DEFAULT_TIMEOUT,
    });

    useEffect(() => {
        let timeoutId: NodeJS.Timeout;
        if (isOpen && alertContent.timeout) {
            timeoutId = setTimeout(() => {
                setIsOpen(false);
            }, alertContent.timeout);
        }
        return () => clearTimeout(timeoutId);
    }, [isOpen, alertContent.timeout]);

    const showAlert = (
        title: string,
        description: string,
        options?: AlertOptions
    ) => {
        setAlertContent({
            title,
            description,
            type: options?.type || AlertType.Info,
            className: options?.className || '',
            timeout: options?.timeout || DEFAULT_TIMEOUT,
        });
        setIsOpen(true);
    };

    const hideAlert = () => setIsOpen(false);

    return (
        <AlertContext.Provider value={{ showAlert, hideAlert }}>
            {children}
            <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
                <AlertDialogContent className={cn(
                    getAlertStyles(alertContent),
                    alertContent.className
                )}>
                    <AlertDialogHeader>
                        <AlertDialogTitle>{alertContent.title}</AlertDialogTitle>
                    </AlertDialogHeader>
                    <AlertDialogDescription>{alertContent.description}</AlertDialogDescription>
                    <AlertDialogAction onClick={hideAlert}>Close</AlertDialogAction>
                </AlertDialogContent>
            </AlertDialog>
        </AlertContext.Provider>
    );
};