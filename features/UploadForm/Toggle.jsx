import React from 'react';
// import FilePreview from './FilePreview';

export default function Toggle({ children, data: { type, name, label } }) {
  return (
    <div className='collapse p-1'>
      <input type='checkbox' className='peer' />
      <div className='flex p-4  collapse-title bg-sky-600 text-primary-content peer-checked:bg-sky-700 peer-checked:text-secondary-content shadow-xl rounded-t-md'>
        <p className='uppercase'>{type}:</p>
        <div>
          {/* {previewUrl ? <FilePreview fileDataURL={previewUrl} /> : null} */}
        </div>
      </div>
      <div className='collapse-content text-primary-content peer-checked:bg-sky-600 peer-checked:text-secondary-content'>
        {React.cloneElement(children, { data: { type, name, label } })}
      </div>
    </div>
  );
}
