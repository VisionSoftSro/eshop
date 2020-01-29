package org.visionsoft.common.reports

import net.sf.jasperreports.engine.*
import org.springframework.core.io.Resource
import org.visionsoft.common.IUser
import org.visionsoft.common.async.async
import java.awt.Font
import java.io.FileInputStream
import java.io.OutputStream
import javax.annotation.PostConstruct

data class ReportExportConfig(var wrapper: ReportWrapper, var model:MutableMap<String, Any?>, var datasource: JRDataSource = JREmptyDataSource())

class ReportWrapper {
    private var jasperReport: JasperReport
    private var reportPrinter: ReportPrinter

    constructor(jasperReport: JasperReport, reportPrinter: ReportPrinter) {
        this.jasperReport = jasperReport
        this.reportPrinter = reportPrinter
    }

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

class ReportRepository {
    @javax.annotation.Resource
    lateinit var reportPrinter: ReportPrinter

    private var reports: MutableMap<String, Resource>
    private lateinit var compiledReports: MutableMap<String, ReportWrapper>

    constructor(reports: MutableMap<String, Resource>) {
        this.reports = reports
    }

    @PostConstruct
    fun initReports() {
        val jasperReportsContext = DefaultJasperReportsContext.getInstance()

        jasperReportsContext.setProperty("net.sf.jasperreports.awt.ignore.missing.font", "false")
        jasperReportsContext.setProperty("net.sf.jasperreports.default.font.name", Font.SERIF)
        jasperReportsContext.setProperty("net.sf.jasperreports.default.pdf.encoding", "Cp1250")

        async<IUser> {
            var localCompiledReports = mutableMapOf<String, ReportWrapper>()

            for ((key, value) in reports) {
                println("*********************************************************************")
                println("**********************Compiling Report ${key}************************")
                println("*********************************************************************")
                FileInputStream(value.file).use {
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
