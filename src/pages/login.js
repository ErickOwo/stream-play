import FormUser from '@components/Form-User';

const Login = () => {
  return (
    <div className="flex justify-center -mt-[63px]">
      <FormUser signin={true} />
    </div>
  );
};

export default Login;
