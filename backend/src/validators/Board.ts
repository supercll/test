import { IsNotEmpty, MaxLength, ValidateIf } from 'class-validator';
import { Board as BoardModel } from '../models/Board';
import Boom from '@hapi/boom';

export class PostAddBoardBody {
  @IsNotEmpty({
    message: '面板名称不能为空'
  })
  @MaxLength(255, {
    message: '面板名称不能大于255个字符'
  })
  name: string;

  userName: string

  isPrivate: boolean;
}

export class PutUpdateBoardBody {
  @ValidateIf(o => o.name !== undefined)
  @MaxLength(255, {
    message: '面板名称不能大于255个字符'
  })
  name?: string;

  isPrivate: boolean;
}

export async function getAndValidateBoard(id: number, userId: number): Promise<BoardModel> {
  let board = await BoardModel.findByPk(id);

  if (!board) {
    throw Boom.notFound('指定看板不存在');
  }

  if (board.userId !== userId) {
    throw Boom.forbidden('没有权限操作该面板');
  }

  return board;
}
