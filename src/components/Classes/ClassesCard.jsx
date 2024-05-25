import React from 'react';
import { Avatar, Card, CardContent, Typography, CardActions, Button } from '@mui/material';

const ClassCard = ({ classData }) => {
  const { Class_name, Class_code, Section, Subject, Owner_email, Description } = classData;

  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + '...';
    }
    return text;
  };

  return (
    <div className="flex justify-center">
    <div className="w-full max-w-md">
      <Card className="m-4 shadow-lg hover:shadow-xl transition-shadow duration-200 rounded-lg min-h[300px]" >
        <CardContent className="flex flex-col justify-between">
          <div>
            <div className="flex items-center mb-4">
              <Avatar className="bg-blue-500"/>
              <div className="ml-4">
                <Typography variant="h5" className="font-bold">
                  {truncateText(Class_name, 25)} 
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {Section}
                </Typography>
                {Class_code && <Typography variant="body2" color="textSecondary">
                  Class Code: {Class_code}
                </Typography>}
              </div>
            </div>
            <Typography variant="body1" className="mb-2">
              <strong>Subject:</strong> {truncateText(Subject, 20)} 
            </Typography>
            <Typography variant="body1" className="mb-2">
              <strong>Owner:</strong> {Owner_email}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {truncateText(Description, 150)}
            </Typography>
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
  );
};

export default ClassCard;

