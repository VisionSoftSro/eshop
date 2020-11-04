package org.visionsoft.eshop.spring.reports

import kotlinx.coroutines.runBlocking
import net.sf.jasperreports.engine.DefaultJasperReportsContext
import net.sf.jasperreports.engine.JRDataSource
import net.sf.jasperreports.engine.JREmptyDataSource
import net.sf.jasperreports.engine.JRRewindableDataSource
import net.sf.jasperreports.engine.JasperCompileManager
import net.sf.jasperreports.engine.JasperPrint
import net.sf.jasperreports.engine.JasperReport
import org.springframework.core.io.Resource
import org.visionsoft.common.reports.ReportPrinter
import org.visionsoft.common.reports.ReportRenderType
import java.awt.Font
import java.io.OutputStream
import javax.annotation.PostConstruct

data class ReportExportConfig(var wrapper: ReportWrapper, var model:MutableMap<String, Any?>, var datasource: JRDataSource = JREmptyDataSource())

class ReportWrapper(private var jasperReport: JasperReport, private var reportPrinter: ReportPrinter) {

    fun getCompiledReport() = jasperReport

    fun exportToPdf(model:MutableMap<String, Any?>, datasource: JRDataSource = JREmptyDataSource()): ByteArray {
        return reportPrinter.exportToPdf(reportPrinter.printReport(jasperReport, model, datasource))
    }

    fun renderToStream(model:MutableMap<String, Any?>, dataSource: JRRewindableDataSource = JREmptyDataSource(), stream: OutputStream, type: ReportRenderType) {
        reportPrinter.renderToStream(reportPrinter.printReport(jasperReport, model, dataSource), stream, type)
    }

    fun print(model:MutableMap<String, Any?>, datasource: JRDataSource = JREmptyDataSource()) : JasperPrint
            = reportPrinter.printReport(jasperReport, model, datasource)

}

class ReportRepository(private var reports: MutableMap<String, Resource>) {
    @javax.annotation.Resource
    lateinit var reportPrinter: ReportPrinter

    private lateinit var compiledReports: MutableMap<String, ReportWrapper>

    @PostConstruct
    fun initReports() {
        val jasperReportsContext = DefaultJasperReportsContext.getInstance()

        jasperReportsContext.setProperty("net.sf.jasperreports.awt.ignore.missing.font", "false")
        jasperReportsContext.setProperty("net.sf.jasperreports.default.font.name", Font.SERIF)
        jasperReportsContext.setProperty("net.sf.jasperreports.default.pdf.encoding", "Cp1250")

        runBlocking {
            val localCompiledReports = mutableMapOf<String, ReportWrapper>()

            for ((key, value) in reports) {
                println("*********************************************************************")
                println("**********************Compiling Report ${key}************************")
                println("*********************************************************************")
                value.inputStream.use {
                    val compiledReport = JasperCompileManager.compileReport(it)
                    localCompiledReports[key] = ReportWrapper(compiledReport, reportPrinter)
                }
            }
            compiledReports = localCompiledReports
        }
    }

    operator fun get(reportName: String): ReportWrapper {
        return compiledReports[reportName] ?: throw IllegalArgumentException("unknown report $reportName")
    }
    fun exportToStream(stream: OutputStream, type: ReportRenderType, vararg  config: ReportExportConfig) {
        var initPrint: JasperPrint? = null

        for (c in config) {
            val print = c.wrapper.print(c.model, c.datasource)
            if(initPrint==null) {
                initPrint = print
            } else {
                print.pages.forEach { initPrint.addPage(it) }
            }
        }
        reportPrinter.renderToStream(initPrint!!, stream, type)
    }

    fun exportToPdf(vararg  config: ReportExportConfig) : ByteArray {
        var initPrint: JasperPrint? = null

        for (c in config) {
            val print = c.wrapper.print(c.model, c.datasource)
            if(initPrint==null) {
                initPrint = print
            } else {
                print.pages.forEach { initPrint.addPage(it) }
            }
        }

        return reportPrinter.exportToPdf(initPrint!!)
    }
}
