import Dog from '@/components/Dog'

const DogContainer = ({ dogs, setEditDog }) => {
  return (
    <ul className='dog-container'>
      {dogs.map((dog, index) => (
        <Dog dog={dog} key={index} setEditDog={setEditDog} />
      ))}
    </ul>
  )
}
export default DogContainer
