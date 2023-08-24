import './styles/attendee.scss'
import MoreOptionsSvg from '@/assets/MoreOptionsSvg'
import { getDuration } from '@/utils/utils'

const AttendeeContainer = ({ attendees }) => {
  return (
    <div className='attendees-container'>
      {attendees.map((attendee) => (
        <div key={attendee.id} className='attendee'>
          {/* <img src='' alt='avatar' /> */}
          <div className='attendee-details'>
            <p>{attendee.owner}</p>
            <div className='pet-container'>
              {attendee.dogs.map((dog, index) => (
                <p key={index}>{dog.name}</p>
              ))}
            </div>
            <p>{getDuration(attendee.checkedInTime)} minutes</p>
          </div>
          <MoreOptionsSvg />
        </div>
      ))}
    </div>
  )
}
export default AttendeeContainer
