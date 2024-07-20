"use client";
import React from 'react';
import { IoMdCloseCircle } from "react-icons/io";

function TagsInput({ selected }: { selected: (tags: string[]) => void }) {
  const [tags, setTags] = React.useState<string[]>([]);

  const addTags = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      if (event.currentTarget.value.trim() !== '') {
        setTags([...tags, event.currentTarget.value]);
        selected([...tags, event.currentTarget.value]);
        event.currentTarget.value = '';
      }
    }
  };

  const removeTags = (index: number) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  return (
    <div className='w-full h-auto bg-n-8 rounded-lg p-2 outline-0 text-sm'>
      <div className='flex items-center flex-wrap h-auto gap-y-2'>
        <ul className='flex items-center flex-wrap gap-2'>
          {tags.map((tag, index) => {
            return (
              <li key={index} className='p-1 px-1.5 bg-n-6 rounded flex items-center space-x-1'>
                <span>{tag}</span>
                <IoMdCloseCircle onClick={() => removeTags(index)} />
              </li>
            );
          })}
        </ul>
        <input 
          onKeyDown={addTags}
          type="text" 
          className='bg-n-8 flex-1 border-none text-sm p-0.5 px-1.5 focus:outline-none'
          placeholder='Press Enter to add tags'
        />
      </div>
    </div>
  );
}

export default TagsInput;
