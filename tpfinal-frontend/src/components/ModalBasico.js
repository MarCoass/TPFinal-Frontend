export function ModalBasico(props) {
    const { show, size, title, children, onClose } = props;

    return (
        <Modal className='modal-basic' open={show} onClose={onClose} size={size}>
            {title && <Modal.Header>{title}</Modal.Header>}
            <Modal.Content>{children}</Modal.Content>
        </Modal>
    )
}