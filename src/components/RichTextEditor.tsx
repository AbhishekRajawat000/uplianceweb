import { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Box } from '@chakra-ui/react';

const RichTextEditor = () => {
  const [content, setContent] = useState('');
  const [userData, setUserData] = useState<string>('');

  useEffect(() => {
    const storedData = localStorage.getItem('userData');
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setUserData(JSON.stringify(parsedData, null, 2));
    }
  }, []);

  const modules = {
    toolbar: [
      [{ 'header': [1, 2, false] }],
      ['bold', 'italic', 'underline'],
      [{'list': 'ordered'}, {'list': 'bullet'}],
      ['clean']
    ],
  };

  return (
    <Box p={4}>
      <ReactQuill 
        theme="snow"
        value={content || userData}
        onChange={setContent}
        modules={modules}
        style={{ height: '300px', marginBottom: '50px' }}
      />
    </Box>
  );
};

export default RichTextEditor;
