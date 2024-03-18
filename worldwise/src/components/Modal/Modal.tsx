import ReactDOM from 'react-dom'
import styles from './Modal.module.css'
import { Err, Info, Warning } from '../Icons'

type ModalProps = {
	modalType?: 'warning' | 'info' | 'err'
	children: React.ReactNode
	onModalClick: () => void
}

const Backdrop = ({ onBackdropClick }: { onBackdropClick: () => void }) => {
	return <div className={styles.backdrop} onClick={onBackdropClick}></div>
}

const ModalOverlay = ({ children, modalType, onModalClick }: ModalProps) => {
	const isWarning = modalType === 'warning'
	const isInfo = modalType === 'info'
	const isErr = modalType === 'err'

	return (
		<div
			className={`${styles.modal} ${isWarning ? styles.warn : ''} ${isErr ? styles.err : ''} ${
				isInfo ? styles.info : ''
			}`}
		>
			{isWarning && <Warning />}
			{isErr && <Err />}
			{isInfo && <Info />}

			<div className={styles['modal-content']}>
				{children}
				<button onClick={onModalClick}>Close me</button>
			</div>
		</div>
	)
}

export function Modal({ children, modalType, onModalClick }: ModalProps) {
	return (
		<>
			{ReactDOM.createPortal(<Backdrop onBackdropClick={onModalClick} />, document.getElementById('backdrop-root')!)}
			{ReactDOM.createPortal(
				<ModalOverlay modalType={modalType} onModalClick={onModalClick}>
					{children}
				</ModalOverlay>,
				document.getElementById('overlay-root')!
			)}
		</>
	)
}

export default Modal
