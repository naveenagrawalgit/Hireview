
import { SignedIn, SignedOut, SignInButton, SignOutButton, UserButton } from '@clerk/clerk-react'

function App() {
  

  return (
    <>
    <h1 className="text-red-800 bg-orange-400 p-10 text-3xl" >welcome to the app</h1>

    <SignedOut>
      <SignInButton mode='modal' />
    </SignedOut>


    <SignedIn>
      <SignOutButton/>
    </SignedIn>

    <UserButton/>


    </>
  )
};

export default App;
