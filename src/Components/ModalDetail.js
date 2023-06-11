import ReactModal from 'react-modal'

export default function ModalDetail({
    isModalOpen,
    setIsModalOpen,
    selectedImage
}) {
    return (
        <div>
            <ReactModal
                closeTimeoutMS={600}
                isOpen={isModalOpen}
                onRequestClose={() => setIsModalOpen(false)}
                shouldCloseOnOverlayClick={true}
                shouldCloseOnEsc={true}
                preventScroll={true}
                ariaHideApp={false}
                className='modalContainer'
                overlayClassName='modalOverlayCenter'
                contentLabel="image-detail"
            >
                {
                    !selectedImage
                        ? null
                        : <div className='selected-image'>
                            <img className='' alt={selectedImage.description} src={selectedImage.urls.full} />
                        </div>
                }

            </ReactModal>
        </div>
    )
}
