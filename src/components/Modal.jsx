import { FiX } from 'react-icons/fi'
import './styles/modal.scss'

const Modal = ({ children, setShowModal }) => {
  return (
    <>
      <div className='modal' onClick={() => setShowModal(false)}>
        <div onClick={(e) => e.stopPropagation()}>
          <FiX size='2rem' onClick={() => setShowModal(false)} />
          {children}
        </div>
      </div>
    </>
  )
}
export default Modal
