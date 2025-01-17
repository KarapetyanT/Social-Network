import { useOutletContext } from "react-router-dom";
import { IContext, IResponse, IPost} from "../../../helpers/types";
import { ProfileHeader } from "./src/profile-header";
import { Search } from "../profile/search";
import { Feed } from "../../feed/feed";
import { useHttpQuery } from "../../../helpers/useHttp";


export const Profile = () => {
  const { user } = useOutletContext<IContext>();
  const {data} = useHttpQuery<IResponse>("/posts")
  const posts: IPost[] | null = data?.payload ? (data.payload as IPost[]) : null

  return (
    user && (
      <div className="flex">
        <ProfileHeader posts={posts || []}/>
        <Search />
        <Feed />
      </div>
    )
  );
};
