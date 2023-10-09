export type IPermissions = {
    home: string;
    dashboard: string;
    settings: string;
    concepts: string;
    organization: string;
    profile: string;
    projects: string;
    qa_reports: string;
    scan_requests: string;
    my_scans: string;
    scans: string;
    store: string;
    team_members: string;
};

export type IMenuPermissions = {
    [key in keyof IPermissions]: string;
};
