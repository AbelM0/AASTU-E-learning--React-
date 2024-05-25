import React from 'react';
import { Drawer, ClassPage } from '..';

const Class = ({ classData }) => {
  return (
    <div>
      <Drawer />
      <ClassPage classData = {classData} />
    </div>
  )
}

export default Class;