import { FC, InputHTMLAttributes } from 'react';

interface FileInputProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  labelText?: string;
  accept?: string;
  // capture?: boolean | string; // da erro essa merda
}

const FileInput: FC<FileInputProps> = ({
  id,
  labelText,
  accept,
  // capture,
  ...props
}) => {
  return (
    <>
      <label className="flex flex-row-reverse px-0 py-2" htmlFor={id}>
        {labelText && labelText}
        <input
          id={id}
          style={{ display: 'none' }}
          accept={accept}
          // capture={capture}
          type="file"
          {...props}
        />
      </label>
    </>
  );
};

export default FileInput;
