package com.mepros.rest_springboot_crud.controller;

import com.mepros.rest_springboot_crud.models.Role;
import com.mepros.rest_springboot_crud.models.User;
import com.mepros.rest_springboot_crud.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import java.util.Set;

@Controller
@RequestMapping
public class UserController {
    @Autowired
    private UserService userService;

    @GetMapping("/")
    public String home(){
        return "redirect:/login";
    }

    @GetMapping(value = "/adminpage")
    public ModelAndView allUsers(){
        ModelAndView modelAndView = new ModelAndView();
        modelAndView.setViewName("adminpage");
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        modelAndView.addObject("authUser",user);
        modelAndView.addObject("users",userService.getAllUsers());
        modelAndView.addObject("user", new User());
        modelAndView.addObject("roles",user.getRolesName());
        modelAndView.addObject("rolesSet", Role.values());
        return modelAndView;
    }

    @GetMapping(value = "/userpage")
    public ModelAndView userPage(){
        ModelAndView modelAndView1 = new ModelAndView();
        modelAndView1.setViewName("userpage");
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        modelAndView1.addObject("user",user);
        modelAndView1.addObject("roles", user.getRolesName());
        return modelAndView1;
    }
}
