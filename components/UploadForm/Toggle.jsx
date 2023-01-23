import React from 'react';
// import FilePreview from './FilePreview';

export default function Toggle({
  children,
  data: { tipoDoc, nomeDoc, label },
  pushImages,
}) {
  return (
    <div className="collapse p-1">
      <input type="checkbox" className="peer" />
      <div className="flex p-4  collapse-title bg-sky-600 text-primary-content peer-checked:bg-sky-700 peer-checked:text-secondary-content shadow-xl">
        <p className="uppercase">{tipoDoc}:</p>
        <div>
          {/* {previewUrl ? <FilePreview fileDataURL={previewUrl} /> : null} */}
        </div>
      </div>
      <div className="collapse-content bg-primary text-primary-content peer-checked:bg-sky-700 peer-checked:text-secondary-content">
        {React.cloneElement(children, {
          data: { tipoDoc, nomeDoc, label },
          pushImages,
        })}
      </div>
    </div>
  );
}
