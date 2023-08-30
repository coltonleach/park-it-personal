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
  orderBy,
  limit,
  onSnapshot,
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
        id: doc.data().id,
      }
    })
  )
  return attendeesData
}

export const fetchOwnersDogs = async (userSnapshot) => {
  const dogsPromises = userSnapshot.data().dogs.map(async (dog) => {
    const dogRef = doc(db, 'dogs', dog.id)
    const dogSnapshot = await getDoc(dogRef)
    return dogSnapshot.data()
  })

  return Promise.all(dogsPromises)
}

export const fetchUser = async (userId) => {
  const userDoc = doc(db, 'users', userId)
  return await getDoc(userDoc)
}

export const fetchDog = async (dogId) => {
  const dogDoc = doc(db, 'dogs', dogId)
  return await getDoc(dogDoc)
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
  const q = query(
    collection(db, 'bulletin'),
    orderBy('createdTime', 'desc'),
    limit(20)
  )
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

export const addUser = async (name, uid) => {
  //maybe make an update function
  return await setDoc(doc(db, 'users', uid), {
    name,
    id: uid,
    completed: false,
  })
}

export const completeUser = async (name, dogRef, uid) => {
  return await updateDoc(doc(db, 'users', uid), {
    name,
    dogs: dogRef,
    id: uid,
    completed: true,
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

export const addBulletinMessage = async (userId, message) => {
  const userRef = doc(db, 'users', userId)
  return await addDoc(collection(db, 'bulletin'), {
    user: userRef,
    message,
    createdTime: serverTimestamp(),
  })
}
