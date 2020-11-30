package org.visionsoft.common.reports

import java.io.IOException
import javax.imageio.ImageIO
import java.io.ByteArrayInputStream
import java.awt.image.BufferedImage


fun createImageFromBytes(imageData: ByteArray): BufferedImage {
    val bais = ByteArrayInputStream(imageData)
    return try {
        ImageIO.read(bais)
    } catch (e: IOException) {
        throw RuntimeException(e)
    }
}

fun ByteArray.toBufferedImage(): BufferedImage {
    return createImageFromBytes(this)
}