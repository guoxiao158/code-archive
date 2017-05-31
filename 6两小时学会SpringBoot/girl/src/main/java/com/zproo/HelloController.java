package com.zproo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

/**
 * Created by zproo on 2017/4/19.
 */
@RestController
public class HelloController {
    @Autowired
    private GirlProperties girlProperties;

//    @RequestMapping(value = {"/hello"} , method = RequestMethod.GET)
    @GetMapping(value = {"/hello"})
    public String say(@RequestParam("id") Integer myId) {

//        return girlProperties.getCupSize();
        return "id" + myId;
//        return "index";
    }
}
