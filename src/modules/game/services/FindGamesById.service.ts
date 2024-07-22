import { PlayerNotFoundError } from '@modules/player/errors/PlayerNotFoundError';
import { PlayerRepository } from '@modules/player/repositories/contracts/PlayerRepository';
import { Injectable } from '@nestjs/common';
import { TokenPayloadSchema } from '@providers/auth/strategys/jwtStrategy';
import { Service } from '@shared/core/contracts/Service';
import { Either, left, right } from '@shared/core/errors/Either';
import { UnauthorizedError } from '@shared/errors/UnauthorizedError';
import { Game } from '../entities/Game';
import { GameNotFoundError } from '../errors/GameNotFoundError';
import { GameRepository } from '../repositories/contracts/GameRepository';

type Request = TokenPayloadSchema & { page: number; pageSize: number };

type Errors = PlayerNotFoundError | GameNotFoundError | UnauthorizedError;

type Response = {
  games: Game[];
};

@Injectable()
export class FindGamesByIdService
  implements Service<Request, Errors, Response>
{
  constructor(
    private readonly gameRepository: GameRepository,
    private readonly playerRepository: PlayerRepository,
  ) {}

  async execute({
    sub,
    page,
    pageSize,
  }: Request): Promise<Either<Errors, Response>> {
    const player = await this.playerRepository.findUniqueById(sub);

    if (!player) {
      return left(new PlayerNotFoundError());
    }

    const games = await this.gameRepository.findManyByPlayerId(
      sub,
      page,
      pageSize,
    );

    return right({
      games,
    });
  }
}