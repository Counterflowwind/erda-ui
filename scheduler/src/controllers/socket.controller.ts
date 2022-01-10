// Copyright (c) 2021 Terminus, Inc.
//
// This program is free software: you can use, redistribute, and/or modify
// it under the terms of the GNU Affero General Public License, version 3
// or later ("AGPL"), as published by the Free Software Foundation.
//
// This program is distributed in the hope that it will be useful, but WITHOUT
// ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
// FITNESS FOR A PARTICULAR PURPOSE.
//
// You should have received a copy of the GNU Affero General Public License
// along with this program. If not, see <http://www.gnu.org/licenses/>.

import { Controller, Get, Post, Header, Body } from '@nestjs/common';
import { EventsGateway } from '../events/events.gateway';

@Controller('_api/socket')
export class SocketController {
  constructor(private readonly events: EventsGateway) {}

  @Post()
  @Header('content-type', 'application/json')
  registerModule(@Body() body: unknown) {
    this.events.broadcast(body);
    return { success: true };
  }
}
