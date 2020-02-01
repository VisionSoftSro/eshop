package org.visionsoft.cms.mvc.service.czechpost

import org.springframework.stereotype.Service
import java.net.URL
import javax.xml.parsers.DocumentBuilderFactory
import org.visionsoft.common.transaction.transaction
import org.visionsoft.crm.domain.scheme.CpBranches
import org.w3c.dom.Document
import java.math.BigDecimal

@Service
class BalikovnyService {
    val url = "http://napostu.ceskaposta.cz/vystupy/balikovny.xml"


    fun migrate() {
        val doc = download()
        parse(doc)
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
                                        "NAZEV" -> entity.name = value.nodeValue
                                        "TYP" -> entity.kind = value.nodeValue
                                        "OBEC" -> entity.city = value.nodeValue
                                        "C_OBCE" -> entity.cityPart = value.nodeValue
                                        "SOUR_X" -> entity.lat = BigDecimal(value.nodeValue)
                                        "SOUR_Y" -> entity.lng = BigDecimal(value.nodeValue)

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