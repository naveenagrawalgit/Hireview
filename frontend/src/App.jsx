
import { SignedIn, SignedOut, SignInButton, SignOutButton, UserButton, useUser } from '@clerk/clerk-react'
import { Navigate, Route, Routes } from 'react-router';
import AboutPage from './pages/AboutPage';
import HomePage from './pages/HomePage';
import ProblemsPage from './pages/ProblemsPage';
import { Toaster } from 'react-hot-toast';
import DashboradPage from './pages/DashboradPage';
import ProblemPage from './pages/ProblemPage';

function App() {
  
  const {isSignedIn,isLoaded} = useUser();

  if(!isLoaded) return null;

  return (
    <>
    <Routes>
   
   <Route path="/" element ={ !isSignedIn? <HomePage/> : <Navigate to={"/dashboard"}/> } />
   <Route path="/dashboard" element ={isSignedIn? <DashboradPage/> : <Navigate to={"/"}/> } />
   <Route path='/about' element={<AboutPage/>} />
   <Route path='/problems' element={isSignedIn? <ProblemsPage/> : <Navigate to={"/"}/> } />
   <Route path='/problem/:id' element={isSignedIn? <ProblemPage/> : <Navigate to={"/"}/> } />
  


    </Routes>

    <Toaster/>
    </>

  )
};

export default App;
