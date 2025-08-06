import React, { useRef, useState } from 'react';
import { Input } from '../../../components/ui/input';
import { Button } from '../../../components/ui/button';
import { Label } from '../../../components/ui/label';

interface Props {
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  name: string;
  label: string;
}

const FileInput: React.FC<Props> = ({ onChange, label, name }) => {
  const [fileName, setFileName] = useState('');
  const inputRef = useRef<HTMLInputElement | null>(null);

  const activateInput = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFileName(event.target.files[0].name);
    } else {
      setFileName('');
    }
    onChange(event);
  };

  return (
    <div className="flex items-end gap-4">
      <div className="flex flex-col gap-1 w-full">
        <Label className="mb-2" htmlFor={name}>
          {label}
        </Label>
        <Input
          id={name}
          readOnly
          value={fileName}
          onClick={activateInput}
          className="cursor-pointer"
        />
      </div>
      <input
        type="file"
        name={name}
        ref={inputRef}
        onChange={onFileChange}
        style={{ display: 'none' }}
      />
      <Button variant="outline" onClick={activateInput}>
        Browse
      </Button>
    </div>
  );
};

export default FileInput;
