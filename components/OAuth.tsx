import { Separator } from "@radix-ui/react-dropdown-menu";
import GithubLogin from "./GithubLogin";
import GoogleLogin from "./GoogleLogin";

const OAuth = () => {
  return (
    <>
      <Separator className="my-6" />
      <p className="text-center text-muted-foreground">Or Login Using</p>
      <GoogleLogin />
      <GithubLogin />
    </>
  );
};

export default OAuth;