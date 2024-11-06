import Header from '../components/Header';


const HomePage = () => {
  return (
    <div>
      <Header />
      <main style={{ padding: '2rem', textAlign: 'center' }}>
        <h2>Welcome to HoodClassics</h2>
        <p>Discover unknown stories from local places. Please register or login to continue.</p>
      </main>
    </div>
  )
}

export default HomePage