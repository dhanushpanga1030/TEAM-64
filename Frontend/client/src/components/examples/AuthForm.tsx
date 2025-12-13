import AuthForm from '../AuthForm';

export default function AuthFormExample() {
  return (
    <AuthForm 
      onAuthSuccess={(userType, userData) => {
        console.log('Auth successful:', userType, userData);
      }}
    />
  );
}