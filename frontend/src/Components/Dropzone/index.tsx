import React, {useCallback, useState, memo} from 'react'
import { useDropzone } from 'react-dropzone'
import { MdPublish } from 'react-icons/md';

import './styles.scss'

interface Props {
  onFileUploaded: (file: File) => void;
  name: string;
}

const Dropzone: React.FC<Props> = ({ onFileUploaded, name }) => {
  const [selectedFile, setSelectedFile] = useState('');
  const maxSize = 20971562

  const onDrop = useCallback(acceptedFiles => {
    const file = acceptedFiles[0];

    const fileURL = URL.createObjectURL(file)

    setSelectedFile(fileURL)
    onFileUploaded(file);
  }, [onFileUploaded])
  const {getRootProps, getInputProps} = useDropzone({onDrop,
  accept:'image/*',
  maxSize,
  minSize: 0
  })

  return (
    <div className="dropzone" {...getRootProps()}>
      <input {...getInputProps()} accept='image/*' />

      { selectedFile
       ? <img src={selectedFile} alt="point-thumbnail" />
       :(
        <p>
        <MdPublish />
        {name}
        </p>
       )
       }
    </div>
  )
}

export default memo(Dropzone);