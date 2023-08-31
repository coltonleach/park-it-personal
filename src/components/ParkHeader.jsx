import './styles/parkHeader.scss'

const ParkHeader = ({ name, count }) => {
  return (
    <div className='park-header'>
      <h1>{name}</h1>
      {count > 0 ? (
        <p>
          {count} {count > 1 ? 'people are' : 'person is'} currently here
        </p>
      ) : (
        <p>No one is currently here</p>
      )}
    </div>
  )
}
export default ParkHeader
