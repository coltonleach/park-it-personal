import './styles/notification.scss'

const Notification = ({ text, type }) => {
  return <div className={`notification ${type}`}>{text}</div>
}
export default Notification
