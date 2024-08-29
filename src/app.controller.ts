import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  
  @Get('')
  async hello() {
      try {
          console.log("hi");
          const result = {
              status: 200,
              message: "You have connected to this link",
              data: `My name is Glenn Quagmire, And I say "Giggity". Giggity, Giggity, Giggity, Giggity, Giggity, Giggity!`
          }
          return result;
      } catch (error) {console.error(error);}
  }
}
