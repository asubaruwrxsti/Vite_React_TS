import { createContext, useState, ReactNode } from 'react';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";

// Define the interface for the context
type AlertContextType = {
    showAlert: (title: string, description: string) => void;
    hideAlert: () => void;
};

// Create the context with a defined type
export const AlertContext = createContext<AlertContextType | undefined>(undefined);

// Provider component remains the same
export const AlertProvider = ({ children }: { children: ReactNode }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [alertContent, setAlertContent] = useState({ title: '', description: '' });

    const showAlert = (title: string, description: string) => {
        setAlertContent({ title, description });
        setIsOpen(true);
    };

    const hideAlert = () => setIsOpen(false);

    return (
        <AlertContext.Provider value= {{ showAlert, hideAlert }
}>
    { children }
    < AlertDialog open = { isOpen } onOpenChange = { setIsOpen } >
        <AlertDialogContent>
        <AlertDialogHeader>
        <AlertDialogTitle>{ alertContent.title } </AlertDialogTitle>
        </AlertDialogHeader>
        < AlertDialogDescription > { alertContent.description } </AlertDialogDescription>
        < AlertDialogAction onClick = { hideAlert } > Close </AlertDialogAction>
            </AlertDialogContent>
            </AlertDialog>
            </AlertContext.Provider>
    );
};