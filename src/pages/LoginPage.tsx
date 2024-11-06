
const LoginPage = () => {
  return (
    <div style={styles.page}>
      <h2>Login to HoodClassics</h2>
      <p>Login via OAuth (placeholder)</p>
      {/* ovdje ide oauth */}
    </div>
  )
};

const styles = {
    page: {
      padding: '2rem',
      textAlign: 'center' as const,
    },
  };
export default LoginPage