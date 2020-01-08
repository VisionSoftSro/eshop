package org.visionsoft

import com.sun.org.apache.xerces.internal.util.DOMUtil.getParent
import com.sun.tools.corba.se.idl.Util.getAbsolutePath
import org.apache.commons.io.FilenameUtils
import org.springframework.util.StringUtils
import java.io.*
import java.io.File.separator
import java.util.zip.ZipEntry
import java.util.zip.ZipInputStream
import java.math.BigDecimal
import java.text.MessageFormat
import javax.xml.crypto.Data
import java.io.FileOutputStream
import jdk.nashorn.internal.objects.NativeRegExp.source
import org.apache.commons.io.FileUtils
import java.io.FileInputStream



val mapping = mapOf("gift" to ("Dárky" to 2), "party" to ("Oslavy" to 3))
val exportPath = "/Users/tremll/devel/eshop-export/"
fun main() {
    mapping.forEach {
        DataExporter("/Users/tremll/Google Drive/${it.value.first}/", it.key, it.value.second).export()
    }
}

class DataExporter(val path: String, val category: String, val version:Int) {
    val sqlBuffer = StringBuffer()
    val exportDir = File("$exportPath/$category")
    var index = 0
    fun export() {
        if(exportDir.exists()) exportDir.deleteRecursively()
        if(!exportDir.exists()) exportDir.mkdirs()

        val root = File(path)
        if (root.isDirectory) {
            root.list()?.forEach { d ->
                val productFolder = File("$path$d")
                if (productFolder.isDirectory) {
                    val process = ProductProcessor(index++, category, productFolder)
                    process.process()
                    sqlBuffer.append(process.sqlBuffer)
                }
            }
        }
        save()
    }

    private fun save() {
        FileWriter("$exportDir/V1.0.${version}__data_$category.sql").use {
            it.write(sqlBuffer.toString())
        }
    }
}

data class SqlTemplateData(val code: String, val name: String, val description: String, val hot: Boolean, val images: Int, val stock: Int, val price: BigDecimal) {
    fun toSql() = "insert into goods (code, name, description, hot, images, stock, price) values ('${code}', '${name}', '${description}', ${hot}, ${images}, ${stock}, ${price});"
}
class ProductProcessor(index: Int, val category: String, val productFolder: File) {
    val sqlBuffer = StringBuffer()
    private val code = "${category}-${index}"
    private var images:Int = 0


    fun process() {
        processImages()
        processSql()
    }

    private fun processSql() {
        productFolder.list()?.firstOrNull { it == "Text.txt" }?.let {
            val file = File("${productFolder.absolutePath}/${it}")
            if(it == "Text.txt") {
                InputStreamReader(FileInputStream(file), "ISO-8859-2").use { txt->
                    parseData(txt.readText())?.let {tmpl->
                        sqlBuffer.append(tmpl.toSql())
                        sqlBuffer.append("\n")
                        sqlBuffer.append("insert into goods_category(category, goods) values ('${category}', currval('goods_id_seq'));")
                        sqlBuffer.append("\n")
                    }
                }
            }
        }

    }

    private fun parseData(text:String):SqlTemplateData? {
        val rows = text.split("\n")
        val firstRow = rows[0]
        return parsePriceAndStock(firstRow)?.let {
            val descriptionRows = rows.subList(2, rows.size)
            val name = productFolder.name
            SqlTemplateData(code, it.first, formatDescription(descriptionRows), false, images, it.second, it.third)
        }
    }

    private fun processImages() {
        val exportProductDirectory = File("$exportPath/$category/$code")
        if(!exportProductDirectory.exists()) exportProductDirectory.mkdir()
        productFolder.list()?.forEach {
            if(it.endsWith("jpg")) {
                images++
                FileUtils.copyFile(File("${productFolder.absolutePath}/$it"), File("${exportProductDirectory.absolutePath}/$images.jpg"))
            }
        }

    }

    private fun formatDescription(rows:List<String>):String {
        return rows.map { it.replace("\r", "") }.joinToString("") { "<br/>${it}" }
    }

    private fun parsePriceAndStock(row:String):Triple<String, Int, BigDecimal>? {
        if(!StringUtils.isEmpty(row)) {
            val cols = row.split("-")
            var startIndex = 1
            var name = cols[0]
            if(cols.size == 6) {
                startIndex = 2
                name = "$name - ${cols[1]}"
            }
            val priceCol = cols[startIndex]
            val price = priceCol.trim().let { it.substring(0, it.indexOf("k")).trim().toBigDecimal() }
            val stockCol = cols[startIndex+3]
            val stock = stockCol.trim().let { it.substring(0, it.indexOf("k")).trim().toInt() }
            return Triple(name, stock, price)
        }
        return null
    }


}