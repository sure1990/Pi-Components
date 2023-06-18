import { Controller, Req, Res, Get } from "routing-controllers";

@Controller("/test")
export class UserController {
  @Get("/users")
  getAllUsers(@Req() request: any, @Res() response: any) {
    return response.send("Hello response!");
  }

  @Get("/posts")
  getAllPosts(@Req() request: any, @Res() response: any) {
    // some response functions don't return the response object,
    // so it needs to be returned explicitly
    response.redirect("/users");

    return response;
  }
}
