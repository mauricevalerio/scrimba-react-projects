import { initializeApp } from "firebase/app"
import { getFirestore, collection, getDocs, doc, getDoc, query, where } from "firebase/firestore"

const firebaseConfig = {
   apiKey: "AIzaSyCwxfm42BYYSKYC1hwaNLuHLm2SBWFc6cc",
   authDomain: "vanlife-aa611.firebaseapp.com",
   projectId: "vanlife-aa611",
   storageBucket: "vanlife-aa611.appspot.com",
   messagingSenderId: "6357508119",
   appId: "1:6357508119:web:5c7dff3d97ba006ce2fc52"
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
const vansCollectionRef = collection(db, "vans")

export const getVans = async () => {

   const querySnapshot = await getDocs(vansCollectionRef)
   const vansData = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }))
   return vansData
}

export const getVanById = async (id) => {
   const docRef = doc(db, 'vans', id)
   const docSnap = await getDoc(docRef)

   if (typeof docSnap.data() === 'undefined') {
      return { errMessage: 'Van does not exist' }
   }

   return { ...docSnap.data(), id: docSnap.id }
}

export const getHostVans = async () => {
   const q = query(vansCollectionRef, where("hostId", "==", "123"))

   const querySnapshot = await getDocs(q)

   const dataArr = querySnapshot.docs.map(doc => ({
      ...doc.data(),
      id: doc.id
   }))
   return dataArr
}
