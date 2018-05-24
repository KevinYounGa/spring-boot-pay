package com.itstyle.modules.store.controller;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import com.itstyle.modules.alipay.service.IAliPayService;

@Api(tags ="商店")
@Controller
@RequestMapping(value = "store")
public class StoreController {
    private static final Logger logger = LoggerFactory.getLogger(StoreController.class);
    @Autowired
    private IAliPayService aliPayService;

    @ApiOperation(value="商品主页")
    @RequestMapping(value="index",method=RequestMethod.GET)
    public String   index() {
        return "html-touch/website-c/product_detail";
    }

    @ApiOperation(value="商品主页")
    @RequestMapping(value="goPay",method=RequestMethod.GET)
    public String goPay() {
        return "html-touch/pay-c/alipay";
    }

}
