import { IsEmail, IsEmpty, IsNotEmpty, IsString, Max, MaxLength, Min, MinLength, validate } from "class-validator";

class UserDto {
    constructor(data){
        this.username=data.username;
        this.email=data.email;
        this.password=data.password;
    }

    static async validateForCreateUser(data){
        const createDto=new CreateUserDto(data)
        const errors=validate(createDto)
        return errors
    }

    static async validateForLoginUser(data){
        const loginDto=new LoginUserDto(data)
        const errors=validate(loginDto)
        return errors
    }
}


class LoginUserDto
{
    @IsEmail()
    @IsNotEmpty()
    email

    @IsNotEmpty
    @MinLength(6,{message:"Şifre 6 karakterden uzun olmalıdr"})
    password

    constructor(data){
        this.email=data.email;
        this.password=data.password;
    }

}
class CreateUserDto {
    @IsNotEmpty()
    @MaxLength(20,{message:"Kullanıcı adı çok uzun"})
    @MinLength(4,{message:"Kullanıcı adı çok kısa"})
    username;

    @IsEmail({},{message:"Lütfen geçerli bir email giriniz"})
    @IsNotEmpty()
    email;

    @MinLength(6)
    @MaxLength(20,{message:"Şifre 20 karakteri geçmemelidir"})
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {message: 'Şifre çok güçsüz'})
    password;

    constructor(data) {
       this.username=data.username;
       this.email=data.email;
       this.password=data.password
    }
}

export default UserDto