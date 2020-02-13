package org.visionsoft.cms.mvc.service.shipping

import com.fasterxml.jackson.databind.ObjectMapper
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service
import org.visionsoft.common.transaction.transaction
import org.visionsoft.crm.domain.dao.CzechPostDao
import org.visionsoft.crm.domain.dao.ZasilkovnaDao
import org.visionsoft.crm.domain.scheme.Zasilkovna
import java.net.URL
import javax.xml.parsers.DocumentBuilderFactory

@Service
class ZasilkovnaService {
    val url = "http://www.zasilkovna.cz/api/v3/41494564a70d6de6/branch.json"

    @Autowired
    lateinit var czechPostDao: ZasilkovnaDao

    @Autowired
    lateinit var objectMapper:ObjectMapper

    fun import() {
        val map = objectMapper.readValue(URL(url), Map::class.java)
        val rows = map["data"] as Map<String, Any>
        transaction {em->
            rows.forEach {
                val id = it.key
                val data = it.value as Map<String, Any>
                val branch = czechPostDao.findById(id)
                val zasilkovna:Zasilkovna = branch.orElseGet { Zasilkovna() }
                zasilkovna.id = id
                zasilkovna.address = data["street"] as String
                zasilkovna.city = data["city"] as String
                zasilkovna.country = data["country"] as String
                zasilkovna.name = data["name"] as String
                zasilkovna.place = data["place"] as String
                zasilkovna.zip = data["zip"] as String
                if(!branch.isPresent) {
                    em.persist(zasilkovna)
                }
            }
        }
    }


}
