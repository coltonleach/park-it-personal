import { FiX } from 'react-icons/fi'
import './styles/modal.scss'

const Modal = ({ children, showModal }) => {
  return (
    <>
      <div className='modal' onClick={() => showModal(false)}>
        <div onClick={(e) => e.stopPropagation()}>
          <FiX size='2rem' onClick={() => showModal(false)} />
          {children}
        </div>
      </div>
    </>
  )
}
export default Modal
