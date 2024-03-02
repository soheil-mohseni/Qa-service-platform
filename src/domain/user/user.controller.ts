import { Controller, Get, Request, Query, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { QuestionService } from 'src/modules/qa/question.service';
import { Role } from 'src/share/common/enums/role.enum';
import { Roles } from 'src/share/common/decorators/role';
import { AuthGuard } from 'src/share/common/guards/auth.guard';
import { RoleGuard } from 'src/share/common/guards/role.guard';
import { AnswerQuestionDto } from 'src/modules/qa/dto/question/answer-question.dto';
import { title } from 'process';
import { SearchQuestionDto } from 'src/modules/qa/dto/question/search-question.dto';
import { likeIncrementsDto } from 'src/modules/qa/dto/question/like-increments.dto';
import { dislikeIncrementsDto } from 'src/modules/qa/dto/question/dislike-increments.dto';
import { ViewIncrementsDto } from 'src/modules/qa/dto/question/view-increments.dto';
import { LikeIncrementsDto } from 'src/modules/qa/dto/answer/like-increments.dto';
import { DislikeIncrementsDto } from 'src/modules/qa/dto/answer/dislike-increments.dto';
import { AnswerService } from 'src/modules/qa/answer.service';

@Controller({ path: 'user', version: '1' })
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly questionService: QuestionService,
    private readonly answerService: AnswerService,

  ) {}
  /////////// QUESTION  //////////

  @Get('/question')
  @Roles(Role.ADMIN,Role.USER)
  @UseGuards(AuthGuard, RoleGuard)
  async findAnswerOfQuestion(@Query('title') title: AnswerQuestionDto) {
    return await this.questionService.findAnswerOfQuestion(title);
  }

  @Get('/question/search')
  @Roles(Role.ADMIN,Role.USER)
  @UseGuards(AuthGuard, RoleGuard)
  async searchQeustion(@Query('searchText') searchText: SearchQuestionDto) {
    return await this.questionService.searchQeustion(searchText);
  }

  @Get('/question/like')
  @Roles(Role.ADMIN,Role.USER)
  @UseGuards(AuthGuard, RoleGuard)
  async questionLikeIncrements(@Query('title') title: likeIncrementsDto) {
    return await this.questionService.likeIncrements(title);
  }

  @Get('/question/dislike')
  @Roles(Role.ADMIN,Role.USER)
  @UseGuards(AuthGuard, RoleGuard)
  async questionDislikeIncrements(@Query('title') title: dislikeIncrementsDto) {
    return await this.questionService.dislikeIncrements(title);
  }

  @Get('/question/view')
  @Roles(Role.ADMIN,Role.USER)
  @UseGuards(AuthGuard, RoleGuard)
  async questionViewIncrements(@Query('title') title: ViewIncrementsDto) {
    return await this.questionService.viewIncrements(title);
  }
  
  /////////// ANSWER  //////////

  @Get('/answer/like')
  @Roles(Role.ADMIN,Role.USER)
  @UseGuards(AuthGuard, RoleGuard)
  async answerLikeIncrements(@Query('value') value: LikeIncrementsDto) {
    return await this.answerService.likeIncrements(value);
  }

  @Get('/answer/dislike')
  @Roles(Role.ADMIN,Role.USER)
  @UseGuards(AuthGuard, RoleGuard)
  async answerDislikeIncrements(@Query('value') value: DislikeIncrementsDto) {
    return await this.answerService.dislikeIncrements(value);
  }

  ////////
}
