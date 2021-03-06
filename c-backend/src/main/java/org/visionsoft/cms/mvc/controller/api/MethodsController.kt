package org.visionsoft.cms.mvc.controller.api

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController
import org.visionsoft.common.controller.JsonList
import org.visionsoft.crm.domain.dao.CzechPostGenericDao
import org.visionsoft.crm.domain.dao.PaymentMethodDao
import org.visionsoft.crm.domain.dao.ShippingMethodDao
import org.visionsoft.crm.domain.dao.ZasilkovnaGenericDao
import org.visionsoft.crm.domain.scheme.CpBranches
import org.visionsoft.crm.domain.scheme.Zasilkovna

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
    lateinit var czechPostGenericDao: CzechPostGenericDao

    @Autowired
    lateinit var zasilkovnaGenericDao: ZasilkovnaGenericDao

    @GetMapping("cp")
    fun findCp(term:String?, @RequestParam(required = false, defaultValue = "1") page:Int) = JsonList<CpBranches>().apply {
        list = czechPostGenericDao.findByTerm(term?:"", 100,  "zip", "name", "address", "city").list(page)
    }
    @GetMapping("zasilkovna")
    fun findZasilkovna(term:String?, @RequestParam(required = false, defaultValue = "1") page:Int) = JsonList<Zasilkovna>().apply {
        list = zasilkovnaGenericDao.findByTerm(term?:"", 100,  "zip", "name", "address", "city", "place").list(page)
    }
}
