import LoginTab from "@/components/LoginTab";
import RegisterTab from "@/components/RegisterTab";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Auth = () => {
  return (
    <section className="h-screen w-full flex items-center justify-center">
      <Tabs defaultValue="login" className="w-[400px]">
        <TabsList className="w-[400px]">
          <TabsTrigger value="login" className="w-[200px]">
            Login
          </TabsTrigger>
          <TabsTrigger value="register" className="w-[200px]">
            Register a new account
          </TabsTrigger>
        </TabsList>
        <TabsContent value="login">
          <LoginTab />
        </TabsContent>
        <TabsContent value="register">
          <RegisterTab />
        </TabsContent>
      </Tabs>
    </section>
  );
};

export default Auth;
