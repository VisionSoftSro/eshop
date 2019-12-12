package org.visionsoft.cms.mvc.controller.api

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import org.visionsoft.crm.domain.dao.PaymentMethodDao
import org.visionsoft.crm.domain.dao.ShippingMethodDao

@RestController
@RequestMapping("/method/")
class MethodsController {


    @Autowired
    lateinit var paymentMethodDao: PaymentMethodDao

    @Autowired
    lateinit var shippingMethodDao: ShippingMethodDao

    @GetMapping("payments")
    fun payments() = paymentMethodDao.findAll()

    @GetMapping("shippings")
    fun shippings() = shippingMethodDao.findAll()

}