import LoginForm from "../../components/LoginForm";

const LoginPage = () => {
  return (
    <div className="fixed inset-0 w-full h-screen bg-[rgba(171,171,171,0.5)] z-[100] top-0 backdrop-blur-lg">
      <LoginForm />
    </div>
  );
};

export default LoginPage;
