import { IUserData } from "./user.type";

export interface IAuthSliceStates {
  user: IUserData | IUnverifiedUser | null;
  token: string | null;
  showOnBoarding: boolean;
  isLoggedIn?: boolean;
  userProfile?: IAuthSliceProfile[] | null;
  socialAuthCode?: string;
  socialAuthType?: "" | "google" | "facebook" | "apple";
}

export interface IUnverifiedUser {
  verificationId: string | null;
  email: string;
  is_email_verified: boolean;
  in_waiting_list?: boolean;
}

export interface IAuthSliceProfile {
  _id: string;
  user_id: string;
  profile_name: string;
  configuration_id: {
    _id: string;
    user_id: string;
    columns: {
      dashboard: boolean;
      my_scans: {
        import_scans: boolean;
        submit_scan: boolean;
        scan_specific: {
          project_access: boolean;
          view_model: boolean;
          edit_scan: boolean;
          restart_training: boolean;
          download_files: boolean;
          change_visibility: boolean;
          delete_scan: boolean;
        };
      };
      scans: boolean;
      scan_requests: boolean;
      qa_reports: boolean;
      projects: {
        submit_project: boolean;
        project_specific: {
          edit_project: boolean;
          create_folder: boolean;
          add_scan: boolean;
          delete_project: boolean;
        };
      };
      concepts: boolean;
      organization: boolean;
      team_members: boolean;
      store: boolean;
      profile: boolean;
      settings: boolean;
      logout: boolean;
    };
  };
  is_enterprise_scanner: boolean;
  is_enterprise_manager: boolean;
  created_at: string;
  updated_at: string;
}
