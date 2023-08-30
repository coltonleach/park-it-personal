export const resetNotification = (setNotification) => {
  setTimeout(() => {
    setNotification({ text: null, type: null })
  }, 5000)
}
