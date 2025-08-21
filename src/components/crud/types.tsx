export interface CrudConfig {
    entityName: string;
    endpoint: string;
    fields: {
        name: string;
        label: string;
        type: "text" | "number" | "select" | "textarea";
        required?: boolean;
        options?: { value: string; label: string }[];
    }[];
    filters: {
        name: string;
        label: string;
        type: "select" | "search";
        options?: { value: string; label: string }[];
    }[];
    columns: {
        name: string;
        label: string;
        render?: (item: any) => React.JSX.Element;
    }[];
    badges?: {
        [key: string]: {
            [key: string]: {
                label: string;
                gradient: string;
            };
        };
    };
    actions: {
        view?: boolean;
        edit?: boolean;
        delete?: boolean;
    };
    permissions: {
        canEdit: (userRole: string) => boolean;
        canDelete: (userRole: string) => boolean;
    };
    viewModeOptions?: ("cards" | "table")[];
}