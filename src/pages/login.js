import FormUser from '@components/Form-User';

const Login = () => {
  return (
    <div className="flex justify-center">
      <FormUser signin={true} />
    </div>
  );
};

export default Login;
