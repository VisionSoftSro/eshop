package org.visionsoft.cms.mvc.service.shipping

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service
import java.net.URL
import javax.xml.parsers.DocumentBuilderFactory
import org.visionsoft.common.transaction.transaction
import org.visionsoft.crm.domain.dao.CzechPostDao
import org.visionsoft.crm.domain.scheme.CpBranches
import org.w3c.dom.Document

@Service
class CzechPostService {
    val url = "http://napostu.ceskaposta.cz/vystupy/napostu_1.xml"

    @Autowired
    lateinit var czechPostDao: CzechPostDao

    fun import() {
        if(czechPostDao.count() == 0L) {
            val doc = download()
            parse(doc)
        }
    }


    private fun parse(doc:Document) = transaction {em->
        val children = doc.documentElement.childNodes
        for(i in 0..children.length) {
            children.item(i)?.let {branch->
                if(branch.nodeName == "row") {
                    val branchData = branch.childNodes
                    branchData?.let {row->
                        val entity = CpBranches()
                        for (a in 0..row.length) {
                            row.item(a)?.let {
                                it.childNodes.item(0)?.let {value->
                                    when(it.nodeName) {
                                        "ADRESA" -> entity.address = value.nodeValue
                                        "PSC" -> entity.zip = value.nodeValue
                                        "NAZ_PROV" -> entity.name = value.nodeValue
                                        "OKRES" -> entity.city = value.nodeValue

                                    }
                                }
                            }
                        }
                        em.persist(entity)
                    }
                }
            }
        }
    }

    private fun download() = URL(url).openStream().use {
        val factory = DocumentBuilderFactory.newInstance()
        val builder = factory.newDocumentBuilder()
        builder.parse(it)
    }
}
