import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    if (
      !createUserDto.first_name ||
      !createUserDto.email ||
      !createUserDto.password
    )
      throw new HttpException('Incomplete values', HttpStatus.BAD_REQUEST);

    return this.usersService.create(createUserDto);
  }

  // @Post('/:b')
  // testRequest(@Request() req: any) {
  //   console.log(req.query);
  //   console.log(req.params);
  //   console.log(req.body);

  //   return 'All for one';
  // }

  @Get()
  findAll(@Query('limit') limit: number) {
    console.log(limit);
    const users = this.usersService.findAll();
    return { status: 'success', users };
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    if (isNaN(+id))
      throw new HttpException('Invalid params', HttpStatus.BAD_REQUEST);

    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
