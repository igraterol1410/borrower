import React from 'react'
import { Box, Flex } from '@chakra-ui/react'
import { BsTrash, BsDownload } from "react-icons/bs";
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteDocs, downloadDocs } from '@/store/slices/kycDocs/kycDocumetsSlices';
import ConfirmAction from '../modals/ConfirmAction';
import { saveAs } from 'file-saver';

const UploadedDocumentsList = ({ document, uploadedDocuments, getUploadedAction }) => {
    const dispatch = useDispatch()
    const { user } = useSelector( state => state?.user )
    const { downloadedDocuments } = useSelector(state => state.kycDocuments)
    const [documentsToShow, setDocumentsToShow] = useState(null)
    const [documentsToDelete, setDocumentsToDelete] = useState(null)
    const [showModal, setShowModal] = useState(false)
    const [url, setUrl] = useState(null)
    const [docName, setDocName] = useState(null)

    const getFileToDownload = (downloadedDocuments) => {
        // const blob = new Blob([downloadedDocuments])
        // const blob = downloadedDocuments.blob().then(blob => {
        //     let url = URL.createObjectURL(blob);
        //     let a = document.createElement('a');
        //     a.href = url;
        //     a.download = document?.originalFileName;
        //     a.click();
        // })

        // const href = URL.createObjectURL(downloadedDocuments)

        // // console.log(href)
        // setUrl(href)
    }

    useEffect(() => {
        const listToShow = uploadedDocuments.filter((eachUploadedDocument) => (eachUploadedDocument.documentMappinID === document.documentMappinID))
        setDocumentsToShow(listToShow)
    }, [document, uploadedDocuments])

    useEffect(() => {
        if (downloadedDocuments) {
            getFileToDownload(downloadedDocuments)
        }
    }, [downloadedDocuments])

    const deleteDoc = (document) => {
        dispatch(deleteDocs(document.attachmentID)).then(() => {
            setShowModal(false)
            dispatch(getUploadedAction({ userCompanyID: user.userCompanyId }))
        })
    }

    const selectDeleteDoc = (document) => {
        setDocumentsToDelete(document)
        setShowModal(true)
    }

    const documentType = (type) => {
        switch (type) {
            case 'doc':
                return 'application/msword'
            case 'docx':
                return 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
            case 'jpeg':
                return 'image/jpeg'
            case 'jpg':
                return 'image/jpeg'
            case 'png':
                return 'image/png'
            case 'pdf':
                return 'application/pdf'
        }
    }

    const getExtension = (doc) => {
        const extension = doc.split(".");
        const extensionReal = extension[extension.length - 1]
        return documentType(extension[extension.length - 1])
    };

    const downloadDoc = (document) => {
        const currentExt = getExtension(document.originalFileName)
        dispatch(downloadDocs(document.attachmentID))
            .then((res) => {
                // let blob = new Blob([res.payload], {
                //     type: 'application/octet-stream',
                //   });
                let blob = new Blob([res.payload], { type: 'application/octet-stream' });
                saveAs(blob, document.originalFileName);
            })
    }

    return (
        <Box>
            {
                url &&
                <a href={url} download={docName} >dow</a>
            }
            <ConfirmAction show={showModal} setShow={setShowModal} action={deleteDoc} document={documentsToDelete} />
            {
                documentsToShow && documentsToShow.map((document, index) => (
                    <Flex
                        key={index}
                        mt={2}
                        alignItems='center'
                        justifyContent='space-between'
                        gap={6}
                        fontSize={12}
                    >
                        {document?.originalFileName}
                        <Flex gap={2}>
                            <Box cursor='pointer'
                                onClick={() => selectDeleteDoc(document)}
                            >
                                <BsTrash />
                            </Box>
                            <Box cursor='pointer'
                                onClick={() => downloadDoc(document)}
                            >
                                <BsDownload />
                            </Box>
                        </Flex>
                    </Flex>
                ))
            }
        </Box>
    )
}

export default UploadedDocumentsList
