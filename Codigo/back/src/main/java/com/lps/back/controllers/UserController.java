package com.lps.back.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.lps.back.dtos.user.UserLoginDTO;
import com.lps.back.dtos.user.UserRecoverPasswordDTO;
import com.lps.back.dtos.user.UserRegisterDTO;
import com.lps.back.dtos.user.UserReturnLoginDTO;
import com.lps.back.dtos.user.UserTokenDto;
import com.lps.back.dtos.user.UserUpdateDTO;
import com.lps.back.models.Usuario;
import com.lps.back.services.interfaces.IUserService;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private IUserService userService;

    @PostMapping("login")
    public ResponseEntity<?> login(@RequestBody UserLoginDTO userLoginDTO) {
        UserReturnLoginDTO result = userService.login(userLoginDTO);
        return ResponseEntity.ok(result);
    }

    @PostMapping("register")
    public ResponseEntity<?> register(@RequestBody UserRegisterDTO userRegisterDTO) {
        Usuario result = userService.register(userRegisterDTO);
        return ResponseEntity.ok(result.getId());
    }

    @PostMapping("recoverpassword")
    public ResponseEntity<?> startRecoverPasswordProcess(@RequestBody String email) {
        userService.startRecoverPasswordProcess(email);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("checktoken")
    public ResponseEntity<?> checkRecoverPasswordToken(@RequestBody UserTokenDto userTokenDto) {
        boolean result = userService.checkRecoverPasswordToken(userTokenDto);
        return ResponseEntity.ok(result);
    }

    @PostMapping("changepassword")
    public ResponseEntity<?> changePassword(@RequestBody UserRecoverPasswordDTO userRecoverPasswordDTO) {
        userService.changePassword(userRecoverPasswordDTO);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("update")
    public ResponseEntity<?> updateUser(@RequestBody UserUpdateDTO userUpdate) {
        userService.edit(userUpdate);
        return ResponseEntity.noContent().build();
    }
}
