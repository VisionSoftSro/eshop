package org.visionsoft.cms.mvc.controller.api

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import org.visionsoft.common.controller.JsonList
import org.visionsoft.crm.domain.dao.CzechPostGenericDao
import org.visionsoft.crm.domain.dao.PaymentMethodDao
import org.visionsoft.crm.domain.dao.ShippingMethodDao
import org.visionsoft.crm.domain.scheme.CpBranches

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
    lateinit var dao: CzechPostGenericDao


    @GetMapping("cp")
    fun findCp(term:String?) = JsonList<CpBranches>().apply {
        list = dao.findByTerm(term?:"", "zip", "name", "address", "city", "cityPart").list()
    }

}