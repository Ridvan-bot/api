import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const updateUserGroup = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userIdReq = req.body.user.connect.id;
    const groupIdReq = req.body.group.connect.id;
    const userGroupIdReq = req.params.userGroup;
  
    // From string to integer
    const userGroupId = parseInt(userGroupIdReq, 10);
    const userid = parseInt(userIdReq, 10);
    const groupid = parseInt(groupIdReq, 10);

    console.log(userid, groupid, userGroupId);

    const updateduserGroup = await prisma.userGroup.update({
      where: { id: userGroupId },
      data: {
        user: {
          connect: { id: userid }
        },
        group: {
          connect: { id: groupid }
      }
    }});
    res.json(updateduserGroup);
  } catch (error) {
    next(error);
  }
};