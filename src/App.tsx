import { useEffect } from 'react';
import { Home } from './Home';
import { LayOut } from './LayOut';
import { getFirestore, onSnapshot, collection } from 'firebase/firestore';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import { UseContextData } from './ContextFolder/UseContextData';
import { initializeApp } from 'firebase/app';
import { contextType } from './Types/Types';
import { IDLayout } from './IDLayout';
import { CheckOut } from './Components/CheckOut';
import ScrollToTop from './hooks/ScrollToTop'; // Import ScrollToTop

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDHAJYVLlNM8u2L-PMngG-oeJ9BpEw6AqA",
  authDomain: "apartmentwebsite-fe584.firebaseapp.com",
  projectId: "apartmentwebsite-fe584",
  storageBucket: "apartmentwebsite-fe584.appspot.com",
  messagingSenderId: "649191728575",
  appId: "1:649191728575:web:020b8bf5025fb749a56d0a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Firebase methods 
export const db = getFirestore();
export const colRef = collection(db, 'apartment');
export const cartRef = collection(db, 'cart');
export const userRef= collection(db, 'user')

function App() {
  const { dispatch, state } = UseContextData();

  useEffect(() => {
    // Dispatch loading state
    dispatch({ type: 'loading', payload: true });

    const unSubscribe = onSnapshot(colRef, (snapshot) => {
      // Ensure TypeScript knows the structure of the data
      const data: contextType[] = snapshot.docs.map((doc) => {
        const docData = doc.data(); // Get the data from Firestore document

        // Make sure to return an object with the full expected structure
        return {
          id: doc.id,
          fileUrls: docData.fileUrls || [], // Default to empty array if not present
          title: docData.apartment || '', // Default to empty string if not present
          daily: docData.daily || '', // Default to empty string if not present
          overview: docData.overview || '', // Default to empty string if not present
        };
      });

      // Dispatch data to state
      dispatch({ type: 'getData', payload: data });

      // Log the data for debugging
      console.log(data);

      // Turn off loading state after data is loaded
      dispatch({ type: 'loading', payload: false });
    }, (error) => {
      console.error('Error fetching data:', error);

      // Turn off loading state in case of an error
      dispatch({ type: 'loading', payload: false });
    });

    // Clean up the subscription on component unmount
    return () => unSubscribe();
  }, []);

  if (state?.loading) {
    return (
      <>
        loading
      </>
    );
  }

  // Set up router
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path='/' element={<LayOut />}>
          <Route index element={<Home />} />
          <Route path=':id' element={<IDLayout />} />
          <Route path='/checkout/:id' element={<CheckOut />} />
        </Route>
      </>
    )
  );

  return (
    <div className="App">
      <RouterProvider router={router} />
      
    </div>
  );
}

export default App;
