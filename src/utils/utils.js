import { db } from '@/firebase'
import {
  getDoc,
  getDocs,
  collection,
  query,
  where,
  doc,
  setDoc,
  addDoc,
  updateDoc,
  serverTimestamp,
  deleteField,
} from 'firebase/firestore'

export const fetchAttendeesAndDogs = async (park) => {
  const parkDocRef = doc(db, 'parks', park)
  const q = query(collection(db, 'users'), where('park', '==', parkDocRef))
  const attendeesSnapshot = await getDocs(q)

  const attendeesData = await Promise.all(
    attendeesSnapshot.docs.map(async (doc) => {
      const dogsData = await fetchOwnersDogs(doc)

      return {
        owner: doc.data().name,
        dogs: dogsData,
        checkedInTime: doc.data().checkedInTime.seconds,
      }
    })
  )
  return attendeesData
}

export const fetchOwnersDogs = async (dogsRef) => {
  const dogsPromises = dogsRef.data().dogs.map(async (dog) => {
    const dogRef = doc(db, 'dogs', dog.id)
    const dogSnapshot = await getDoc(dogRef)
    return dogSnapshot.data()
  })

  return Promise.all(dogsPromises)
}

export const fetchUser = async (user) => {
  const userDoc = doc(db, 'users', user)
  return await getDoc(userDoc)
}

export const fetchParks = async () => {
  const q = query(collection(db, 'parks'))
  const parksSnapshot = await getDocs(q)
  return parksSnapshot.docs.map((doc) => {
    return {
      name: doc.data().name,
      id: doc.id,
    }
  })
}

export const fetchPark = async (parkId) => {
  const parkDocRef = doc(db, 'parks', parkId)
  const parkSnapshot = await getDoc(parkDocRef)
  return parkSnapshot.data()
}

export const getDuration = (checkedInTimeInSeconds) => {
  const MILLISECONDS = 1000
  const SECONDS = 60
  return Math.round(
    Date.now() / MILLISECONDS / SECONDS - checkedInTimeInSeconds / SECONDS
  )
}

export const fetchBulletinMessages = async () => {
  const q = query(collection(db, 'bulletin'))
  const bulletinSnapshot = await getDocs(q)
  const bulletinPromises = bulletinSnapshot.docs.map(async (doc) => {
    const user = await fetchUser(doc.data().user.id)
    return {
      ...doc.data(),
      user: user.data(),
    }
  })

  return Promise.all(bulletinPromises)
}

export const addUser = async (name, dogRef, uid) => {
  return await setDoc(doc(db, 'users', uid), {
    name,
    dogs: dogRef,
  })
}

export const addDog = async (age, breed, name, sex) => {
  return await addDoc(collection(db, 'dogs'), {
    age,
    breed,
    name,
    sex,
  })
}

export const checkIn = async (userId, parkId) => {
  const userRef = doc(db, 'users', userId)
  const parkRef = doc(db, 'parks', parkId)
  await updateDoc(userRef, {
    park: parkRef,
    checkedInTime: serverTimestamp(),
  })
}

export const checkOut = async (userId) => {
  const userRef = doc(db, 'users', userId)
  await updateDoc(userRef, {
    park: deleteField(),
    checkedInTime: deleteField(),
  })
}
