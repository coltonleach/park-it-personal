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
  deleteDoc,
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
    return { ...dogSnapshot.data(), id: dog.id }
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
      attendeeCount: doc.data().attendees.length,
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

export const addUser = async (name, userId) => {
  //maybe make an update function
  return await setDoc(doc(db, 'users', userId), {
    name,
    id: userId,
    completed: false,
  })
}

export const completeUser = async (name, dogRef, userId) => {
  return await updateDoc(doc(db, 'users', userId), {
    name,
    dogs: dogRef,
    id: userId,
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

export const addAnotherDog = async (dogRef, userId) => {
  const userRef = await doc(db, 'users', userId)
  const userSnapshot = await getDoc(userRef)
  const updatedDogs = [...userSnapshot.data().dogs, dogRef]
  return await updateDoc(userRef, {
    dogs: updatedDogs,
  })
}

export const updateDog = async (dogId, name, age, breed, sex) => {
  const dogRef = await doc(db, 'dogs', dogId)
  return await updateDoc(dogRef, {
    name,
    age,
    breed,
    sex,
  })
}
export const checkIn = async (userId, parkId) => {
  const userRef = doc(db, 'users', userId)
  const parkRef = doc(db, 'parks', parkId)

  const parkSnapshot = await getDoc(parkRef)
  const attendees = parkSnapshot.data().attendees
  const updatedAttendees = [...attendees, userRef]

  await updateDoc(userRef, {
    park: parkRef,
    checkedInTime: serverTimestamp(),
  })
  await updateDoc(parkRef, {
    attendees: updatedAttendees,
  })
}

export const checkOut = async (userId, parkId) => {
  const userRef = doc(db, 'users', userId)
  const parkRef = doc(db, 'parks', parkId)

  const parkSnapshot = await getDoc(parkRef)
  const attendees = parkSnapshot.data().attendees
  const updatedAttendees = attendees.filter(
    (attendee) => attendee.id !== userId
  )

  await updateDoc(userRef, {
    park: deleteField(),
    checkedInTime: deleteField(),
  })

  await updateDoc(parkRef, {
    attendees: updatedAttendees,
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

export const deleteDog = async (dogId, userId) => {
  const userRef = doc(db, 'users', userId)

  const userSnapshot = await getDoc(userRef)
  const dogs = userSnapshot.data().dogs
  const updatedDogs = dogs.filter((dog) => dog.id !== dogId)

  await updateDoc(userRef, {
    dogs: updatedDogs,
  })

  return await deleteDoc(doc(db, 'dogs', dogId))
}
