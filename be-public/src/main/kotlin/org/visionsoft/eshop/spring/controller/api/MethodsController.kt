package org.visionsoft.eshop.spring.controller.api

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.data.domain.PageRequest
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController

import org.visionsoft.crm.domain.dao.CzechPostDao
import org.visionsoft.crm.domain.dao.CzechPostSpecification
import org.visionsoft.crm.domain.dao.PaymentMethodDao
import org.visionsoft.crm.domain.dao.ShippingMethodDao
import org.visionsoft.crm.domain.dao.ZasilkovnaSpecification
import org.visionsoft.eshop.forest.JsonList

@RestController
@RequestMapping("/method/")
class MethodsController {


    @Autowired
    lateinit var paymentMethodDao: PaymentMethodDao

    @Autowired
    lateinit var shippingMethodDao: ShippingMethodDao

    @GetMapping("payments")
    fun payments() = paymentMethodDao.findPublished()

    @GetMapping("shippings")
    fun shippings() = shippingMethodDao.findPublished()

}

@RestController
@RequestMapping("/ac/")
class Autocomplete {

    @Autowired
    lateinit var czechPostDao: CzechPostDao

    @Autowired
    lateinit var zasilkovnaDao: CzechPostDao

    @GetMapping("cp")
    fun findCp(term:String?, @RequestParam(required = false, defaultValue = "1") page:Int) = JsonList((czechPostDao.findAll(CzechPostSpecification.createTermSpec(term, "zip", "name", "address", "city"), PageRequest.of(0, 100)).toList()))

    @GetMapping("zasilkovna")
    fun findZasilkovna(term:String?, @RequestParam(required = false, defaultValue = "1") page:Int) = JsonList((zasilkovnaDao.findAll(ZasilkovnaSpecification.createTermSpec(term, "zip", "name", "address", "city", "place"), PageRequest.of(0, 100)).toList()))

}
