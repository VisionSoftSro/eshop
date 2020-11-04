package org.visionsoft.common.reports

import net.sf.jasperreports.engine.*
import net.sf.jasperreports.engine.data.JRAbstractBeanDataSource
import net.sf.jasperreports.engine.export.JRPdfExporter
import net.sf.jasperreports.engine.export.ooxml.JRXlsxExporter
import net.sf.jasperreports.export.*
import org.hibernate.ScrollableResults
import java.io.ByteArrayOutputStream
import java.io.OutputStream
import java.util.*

class ReportPrinter {
    fun printReport(jasperReport: JasperReport, model: MutableMap<String, Any?>, dataSource:JRDataSource = JREmptyDataSource()): JasperPrint {
        return JasperFillManager.fillReport(jasperReport, model, dataSource)
    }

    fun renderToStream(jprint: JasperPrint, stream: OutputStream, type: ReportRenderType) {
        when(type) {
            ReportRenderType.XLS -> {
                val exporter = JRXlsxExporter()
                exporter.setExporterInput(SimpleExporterInput(jprint))
                exporter.exporterOutput = SimpleOutputStreamExporterOutput(stream)
                val configuration = SimpleXlsxReportConfiguration()
                configuration.isDetectCellType = true//Set configuration as you like it!!
                configuration.isCollapseRowSpan = false
                configuration.isWhitePageBackground = false
                configuration.isRemoveEmptySpaceBetweenColumns = true
                configuration.isRemoveEmptySpaceBetweenRows = true
                configuration.isIgnoreCellBorder = true
                configuration.isIgnoreGraphics = false
                exporter.setConfiguration(configuration)
                exporter.exportReport()
            }
            ReportRenderType.PDF -> JasperExportManager.exportReportToPdfStream(jprint, stream)
        }
    }

    fun exportToPdf(jasperPrint: JasperPrint): ByteArray {
        val exporter = JRPdfExporter()
        exporter.setExporterInput(SimpleExporterInput(jasperPrint))

        val bao = ByteArrayOutputStream()
        bao.use {
            exporter.exporterOutput = SimpleOutputStreamExporterOutput(it)
            val reportConfig = SimplePdfReportConfiguration()
            reportConfig.isSizePageToContent = true
            reportConfig.isForceLineBreakPolicy = false

            val exportConfig = SimplePdfExporterConfiguration()
            exportConfig.metadataAuthor = "T-Mobile"

            exporter.setConfiguration(reportConfig)
            exporter.setConfiguration(exportConfig)

            exporter.exportReport()
        }

        return bao.toByteArray()
    }

}

interface ValueExtractor<T> {
    fun extract(bean: T, field: JRField): Any
}
class HibernateScrollableDataSource<T> : JRAbstractBeanDataSource {

    private var dataScroll: ScrollableResults? = null
    private var convertors: Map<String, ValueExtractor<T>> = HashMap()

    constructor(dataScroll: ScrollableResults) : super(true) {
        this.dataScroll = dataScroll
    }



    constructor(dataScroll: ScrollableResults, convertors: Map<String, ValueExtractor<T>>) : super(true) {
        this.dataScroll = dataScroll
        this.convertors = convertors
    }


    @Throws(JRException::class)
    override fun next(): Boolean {
        return dataScroll!!.next()
    }

    @Throws(JRException::class)
    override fun getFieldValue(jrField: JRField): Any? {
        if (Thread.currentThread().isInterrupted) {
            throw JRException("Thread wwas interrupted")
        }
        val d = dataScroll!!.get(0) as T
        val extractor = this.convertors[this.getPropertyName(jrField)]
        return extractor?.extract(d, jrField) ?: this.getFieldValue(d, jrField)
    }

    @Throws(JRException::class)
    override fun moveFirst() {
        throw JRException("this method is not implemented")
    }
}

enum class ReportRenderType {
    XLS, PDF
}