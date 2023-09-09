/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

/*
  TODO:
  * remove user from park's attendees array
*/

const {onSchedule} = require("firebase-functions/v2/scheduler");

const {initializeApp} = require("firebase-admin/app");
const {getFirestore, FieldValue} = require("firebase-admin/firestore");

initializeApp();

exports.checkAttendees = onSchedule("every 5 mins", async (event) => {
  const currentTime = new Date();
  currentTime.setMinutes(currentTime.getMinutes() - 30);

  const attendeesQuery = await getFirestore()
      .collection("users")
      .where("checkedInTime", "<=", currentTime)
      .get();
  const batch = await getFirestore().batch();

  attendeesQuery.forEach(async (userDoc) => {
    const userRef = userDoc.ref;
    const parkRef = userDoc.data().park;

    batch.update(userRef, {
      checkedInTime: FieldValue.delete(),
      park: FieldValue.delete(),
    });

    batch.update(parkRef, {
      attendees: FieldValue.arrayRemove(userRef),
    });
  });

  await batch.commit();

  return null;
});
