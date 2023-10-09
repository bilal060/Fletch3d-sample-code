import { useAppSelector } from "shared/hooks/useRedux";
import { IUserData } from "shared/types/auth/user.type";

const useProfile = () => {
  const user = useAppSelector((state) => state.auth.user as IUserData);

  return {
    image: user?.profile_img?.url,
    name: user?.full_name,
    email: user?.email,
    scanCredit: user?.scan_credit,
    address: user.address,
    secondaryEmail: user.secondary_email,
    secondaryEmailVerified: user.is_secondary_email_verified,
    phoneNumber: user.phone,
    phoneNumberVerified: user.is_phone_verified,
  };
};

export default useProfile;
