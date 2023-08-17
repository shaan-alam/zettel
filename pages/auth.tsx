import CreateAccountTab from "@/components/CreateAccountTab";
import HomeLayout from "@/components/HomeLayout";
import LoginTab from "@/components/LoginTab";
import RootLayout from "@/components/RootLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Auth = () => {
  return (
    <RootLayout>
      <section className="bg-white dark:bg-background h-screen w-full flex items-center justify-center">
        <Tabs defaultValue="login" className="w-[400px]">
          <TabsList className="w-[400px]">
            <TabsTrigger value="login" className="w-[200px]">
              Login
            </TabsTrigger>
            <TabsTrigger value="createAccount" className="w-[200px]">
              Create an account
            </TabsTrigger>
          </TabsList>
          <TabsContent value="login">
            <LoginTab />
          </TabsContent>
          <TabsContent value="createAccount">
            <CreateAccountTab />
          </TabsContent>
        </Tabs>
      </section>
    </RootLayout>
  );
};

export default Auth;
