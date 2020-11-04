package org.visionsoft


import org.apache.commons.io.FileUtils
import org.springframework.util.StringUtils
import java.io.File
import java.io.FileInputStream
import java.io.FileWriter
import java.io.InputStreamReader
import java.math.BigDecimal
import java.util.regex.Pattern


val mapping = mapOf("party" to ("Oslavy" to 51))//"gift" to ("Dárky" to 42)
val dir = "NEW oslavy 12.10.2020"
val exportPath = "C:\\devel\\$dir\\dest"
fun main() {
    mapping.forEach {
        DataExporter("C:\\devel\\$dir\\source\\${it.value.first}\\", it.key, it.value.second).export()
    }
}

class DataExporter(val path: String, val category: String, var index: Int) {
    val sqlBuffer = StringBuffer()
    val exportDir = File("$exportPath/$category")
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
        FileWriter("$exportDir/V1.0.x__change__data_$category.sql").use {
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
        val popis = "txt"
        val list = productFolder.list()
        list?.firstOrNull { it.endsWith("txt") }?.let {
            val file = File("${productFolder.absolutePath}/${it}")
            InputStreamReader(FileInputStream(file), "UTF-8").use { txt->
                parseData(txt.readText())?.let {tmpl->
                    sqlBuffer.append(tmpl.toSql())
                    sqlBuffer.append("\n")
                    sqlBuffer.append("insert into goods_category(category, goods) values ('${category}', currval('goods_id_seq'));")
                    sqlBuffer.append("\n")
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
        val list = productFolder.list()
        list?.sort()
        list?.forEach {
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
            val m = Pattern.compile("[kK]")
            val price = priceCol.trim().let { m.matcher(it).let {match -> if(match.find()) it.substring(0, match.start()).trim().toBigDecimal() else BigDecimal.valueOf(0)} }
            val stockCol = cols[startIndex+3]
            val stock = stockCol.trim().let { m.matcher(it).let {match -> if(match.find()) it.substring(0, match.start()).trim().toInt() else 0} }
            return Triple(name, stock, price)
        }
        return null
    }


}