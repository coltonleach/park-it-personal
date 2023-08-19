import { db } from '@/firebase'
import {
  getDoc,
  getDocs,
  collection,
  query,
  where,
  doc,
} from 'firebase/firestore'

export const fetchAttendeesAndDogs = async (park) => {
  const parkDocRef = doc(db, 'parks', park)
  const q = query(collection(db, 'users'), where('park', '==', parkDocRef))
  const attendeesSnapshot = await getDocs(q)

  const attendeesData = await Promise.all(
    attendeesSnapshot.docs.map(async (document) => {
      const dogsData = await fetchDogs(document)

      return {
        owner: document.data().name,
        dogs: dogsData,
        checkedInTime: document.data().checkedInTime.seconds,
      }
    })
  )
  return attendeesData
}

export const fetchDogs = async (dogsRef) => {
  const dogsPromises = dogsRef.data().dogs.map(async (dog) => {
    const dogRef = doc(db, 'dogs', dog.id)
    const dogSnapshot = await getDoc(dogRef)
    return dogSnapshot.data()
  })

  return Promise.all(dogsPromises)
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
