import { Request, Response, NextFunction } from 'express';
import { Prisma } from '@prisma/client';

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    // Hantera specifika Prisma-fel
    switch (err.code) {
      case 'P2000':
        return res.status(400).json({ message: 'The provided value is too long for the column.' });
      case 'P2001':
        return res.status(404).json({ message: 'The record searched for does not exist.' });
      case 'P2002':
        const fields = err.meta?.target;
        return res.status(409).json({ message: `The value for ${fields} is already taken. Please choose another one.` });
      case 'P2003':
        return res.status(409).json({ message: 'Foreign key constraint failed.' });
      case 'P2004':
        return res.status(400).json({ message: 'A constraint failed on the database.' });
      case 'P2005':
        return res.status(400).json({ message: 'The value stored in the database for the field is invalid for the field\'s type.' });
      case 'P2006':
        return res.status(400).json({ message: 'The provided value for the field is not valid.' });
      case 'P2007':
        return res.status(400).json({ message: 'Data validation error.' });
      case 'P2008':
        return res.status(400).json({ message: 'Failed to parse the query.' });
      case 'P2009':
        return res.status(400).json({ message: 'Failed to validate the query.' });
      case 'P2010':
        return res.status(400).json({ message: 'Raw query failed.' });
      case 'P2011':
        return res.status(400).json({ message: 'Null constraint violation.' });
      case 'P2012':
        return res.status(400).json({ message: 'Missing a required value.' });
      case 'P2013':
        return res.status(400).json({ message: 'Missing the required argument.' });
      case 'P2014':
        return res.status(400).json({ message: 'The change you are trying to make would violate the required relation.' });
      case 'P2015':
        return res.status(400).json({ message: 'A related record could not be found.' });
      case 'P2016':
        return res.status(400).json({ message: 'Query interpretation error.' });
      case 'P2017':
        return res.status(400).json({ message: 'The records for relation are not connected.' });
      case 'P2018':
        return res.status(400).json({ message: 'The required connected records were not found.' });
      case 'P2019':
        return res.status(400).json({ message: 'Input error.' });
      case 'P2020':
        return res.status(400).json({ message: 'Value out of range for the type.' });
      case 'P2021':
        return res.status(400).json({ message: 'Table does not exist.' });
      case 'P2022':
        return res.status(400).json({ message: 'Column does not exist.' });
      case 'P2023':
        return res.status(400).json({ message: 'Inconsistent column data.' });
      case 'P2025':
        return res.status(404).json({ message: 'Resource not found' });
      default:
        return res.status(500).json({ message: 'Database error' });
    }
} else if (err instanceof Prisma.PrismaClientValidationError) {
  // Manage PrismaClientValidationError
  const message = extractRelevantMessage(err.message);
  return res.status(400).json({ message: 'Validation error', details: message });
}
  else {
    console.error(err);
  res.status(500).json({ message: 'Internal server error' });
  }
};

const extractRelevantMessage = (fullMessage: string): string => {
  const match = fullMessage.match(/Argument `[^`]+` is missing/);
  if (match) {
    return match[0];
  }

  const whereMatch = fullMessage.match(/Argument `[^`]+` of type [^`]+ needs at least one of /);
  if (whereMatch) {
    return ('Multiple required arguments are missing');
  }

  return fullMessage;
};