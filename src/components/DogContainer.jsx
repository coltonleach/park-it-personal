import Dog from '@/components/Dog'

const DogContainer = ({ dogs, handleEditDog, handleDeleteDog }) => {
  return (
    <ul className='dog-container'>
      {dogs.map((dog, index) => (
        <Dog
          dog={dog}
          key={index}
          handleEditDog={handleEditDog}
          handleDeleteDog={handleDeleteDog}
        />
      ))}
    </ul>
  )
}
export default DogContainer
