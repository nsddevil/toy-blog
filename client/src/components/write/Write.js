import React, { useState } from 'react';
import { MdClose } from 'react-icons/md';

function Write({ onUploadImg, onDeleteImg, onAddPost, imgs }) {
  const [body, setBody] = useState('');
  const onTextChange = (e) => {
    const { value } = e.target;
    setBody(value);
  };

  const onImgChange = (e) => {
    const { files } = e.target;
    if (files.length === 0) return;
    const formdata = new FormData();
    [...files].forEach((file) => {
      formdata.append('image', file);
    });
    onUploadImg(formdata);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    onAddPost({ body, imgs });
  };

  return (
    <div className="container mx-auto">
      <div className="mt-4">
        <div>
          <h3 className="text-xl text-center">Preview Image</h3>
          <div className="flex flex-wrap">
            {imgs &&
              imgs.map((url) => (
                <div key={url} className="p-2 relative w-1/3">
                  <img src={url} alt={url} />
                  <span
                    className="absolute top-0 right-0 p-1 bg-red-600 rounded-full cursor-pointer"
                    onClick={() => onDeleteImg(url)}
                  >
                    <MdClose />
                  </span>
                </div>
              ))}
          </div>
        </div>
        <div className="mt-4">
          <form>
            <textarea
              className="w-full h-24 p-2 focus:outline-none focus:ring-2 rounded border"
              placeholder="#태그"
              onChange={onTextChange}
              value={body}
            />
            <div className="flex justify-end">
              <label className="p-2 cursor-pointer bg-pink-500 rounded text-white">
                <input
                  type="file"
                  className="hidden"
                  onChange={onImgChange}
                  multiple
                />
                Upload Image
              </label>
              <button
                type="submit"
                className="py-2 px-6 ml-2 focus:outline-none bg-blue-600 text-white rounded"
                onClick={onSubmit}
              >
                등록
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Write;
