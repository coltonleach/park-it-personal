import './styles/attendee.scss'
import MoreOptionsSvg from '@/assets/MoreOptionsSvg'

const AttendeeContainer = ({ attendees }) => {
  return (
    <div className='attendees-container'>
      {attendees.map((attendee) => (
        <div key={attendee.id} className='attendee'>
          <img src='' alt='avatar' />
          <div className='attendee-details'>
            <p>{attendee.owner}</p>
            <div className='pet-container'>
              {attendee.pets.map((pet) => (
                <p key={pet.id}>{pet.name}</p>
              ))}
            </div>
            <p>{attendee.duration} minutes</p>
          </div>
          <MoreOptionsSvg />
        </div>
      ))}
    </div>
  )
}
export default AttendeeContainer
