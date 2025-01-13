import { useOutletContext } from "react-router-dom";
import { IContext } from "../../../helpers/types";
import { ProfileHeader } from "./src/profile-header";
import { Search } from "../profile/search";

export const Profile = () => {
  const { user } = useOutletContext<IContext>();

  return (
    user && (
      <div className="flex">
        <ProfileHeader />
        <Search />
      </div>
    )
  );
};
